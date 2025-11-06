import { useState, useEffect, useCallback, useMemo } from 'react';
import { ThemeContext, AuthContext, AppsContext, BookmarksContext, NavigationContext } from './contexts/AppContexts';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContext';
import SettingsModal from './components/SettingsModal';
import { 
  getBookmarks, 
  saveBookmarks, 
  getEnabledApps, 
  saveEnabledApps,
  getTheme,
  saveTheme,
  getUser,
  saveUser,
  clearUser
} from './utils/localStorage';
import { getAllApplications, searchShortcuts } from './data/applications';

function App() {
  // Detect system theme preference
  const getSystemTheme = () => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  // Theme state - 'system', 'light', or 'dark'
  const [themePreference, setThemePreferenceState] = useState(() => getTheme());
  const [actualTheme, setActualTheme] = useState(() => {
    const pref = getTheme();
    if (pref === 'system') {
      return getSystemTheme();
    }
    return pref;
  });

  // Auth state
  const [user, setUser] = useState(() => getUser());

  // Apps state
  const [enabledApps, setEnabledApps] = useState(() => getEnabledApps());
  
  // Bookmarks state
  const [bookmarks, setBookmarks] = useState(() => getBookmarks());

  // Navigation state
  const [currentView, setCurrentView] = useState({ type: 'home' });
  const [searchQuery, setSearchQuery] = useState('');
  
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Get all applications
  const allApps = useMemo(() => getAllApplications(), []);
  
  // Get disabled apps
  const disabledApps = useMemo(() => {
    return allApps
      .filter(app => !enabledApps.includes(app.slug))
      .map(app => app.slug);
  }, [allApps, enabledApps]);

  // Search results
  const searchResults = useMemo(() => {
    if (searchQuery.length < 2) return [];
    return searchShortcuts(searchQuery, enabledApps);
  }, [searchQuery, enabledApps]);

  // Theme preference setter with localStorage
  const setThemePreference = useCallback((pref) => {
    setThemePreferenceState(pref);
    saveTheme(pref);
    
    // Update actual theme
    if (pref === 'system') {
      setActualTheme(getSystemTheme());
    } else {
      setActualTheme(pref);
    }
  }, []);

  const toggleTheme = useCallback(() => {
    const newTheme = actualTheme === 'light' ? 'dark' : 'light';
    setThemePreference(newTheme);
  }, [actualTheme, setThemePreference]);

  // Auth functions
  const login = useCallback((username, password) => {
    const userData = { name: username, id: Date.now() };
    setUser(userData);
    saveUser(userData);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    clearUser();
  }, []);

  // Apps functions
  const toggleApp = useCallback((slug) => {
    setEnabledApps(prev => {
      const newApps = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug];
      saveEnabledApps(newApps);
      return newApps;
    });
  }, []);

  const enableApp = useCallback((slug) => {
    setEnabledApps(prev => {
      if (prev.includes(slug)) return prev;
      const newApps = [...prev, slug];
      saveEnabledApps(newApps);
      return newApps;
    });
  }, []);

  // Bookmarks functions
  const toggleBookmark = useCallback((appSlug, shortcutId) => {
    setBookmarks(prev => {
      const newBookmarks = { ...prev };
      if (!newBookmarks[appSlug]) {
        newBookmarks[appSlug] = [];
      }
      
      if (newBookmarks[appSlug].includes(shortcutId)) {
        newBookmarks[appSlug] = newBookmarks[appSlug].filter(id => id !== shortcutId);
      } else {
        newBookmarks[appSlug].push(shortcutId);
      }
      
      saveBookmarks(newBookmarks);
      return newBookmarks;
    });
  }, []);

  const isBookmarked = useCallback((appSlug, shortcutId) => {
    return bookmarks[appSlug]?.includes(shortcutId) || false;
  }, [bookmarks]);

  const getAppBookmarks = useCallback((appSlug, app) => {
    const appBookmarkIds = bookmarks[appSlug] || [];
    const bookmarkedShortcuts = [];
    
    app.categories.forEach(category => {
      category.shortcuts.forEach(shortcut => {
        const shortcutId = `${appSlug}-${category.name}-${shortcut.action}`.toLowerCase().replace(/\s+/g, '-');
        if (appBookmarkIds.includes(shortcutId)) {
          bookmarkedShortcuts.push({ shortcut, category });
        }
      });
    });
    
    return bookmarkedShortcuts;
  }, [bookmarks]);

  const goHome = useCallback(() => {
    setCurrentView({ type: 'home' });
    setTimeout(() => {
      document.getElementById('main-content')?.focus();
    }, 100);
  }, []);

  // Global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd shortcuts
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'd':
          case 'D':
            e.preventDefault();
            toggleTheme();
            break;
          case ',':
            e.preventDefault();
            setSettingsOpen(true);
            break;
          case 'k':
          case 'K':
            e.preventDefault();
            // Focus search - handled in Sidebar component
            document.querySelector('input[type="text"]')?.focus();
            break;
          case 'h':
          case 'H':
            e.preventDefault();
            goHome();
            break;
          case 'b':
          case 'B':
            // Toggle bookmark on current shortcut if viewing one
            if (currentView.type === 'shortcut') {
              e.preventDefault();
              const shortcutId = `${currentView.appSlug}-${currentView.category.name}-${currentView.shortcut.action}`.toLowerCase().replace(/\s+/g, '-');
              toggleBookmark(currentView.appSlug, shortcutId);
            }
            break;
        }
      }
      
      // Escape key
      if (e.key === 'Escape') {
        // If settings is open, close it
        if (settingsOpen) {
          setSettingsOpen(false);
        }
        // If sidebar is open on mobile, close it
        else if (window.innerWidth < 768 && sidebarOpen) {
          setSidebarOpen(false);
        }
        // Otherwise, go home
        else {
          goHome();
        }
      }

      // Alt + S to toggle sidebar
      if (e.altKey && e.key === 's') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggleTheme, settingsOpen, sidebarOpen, goHome, currentView, toggleBookmark]);

  // Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (actualTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [actualTheme]);

  // Listen to system theme changes (only when preference is 'system')
  useEffect(() => {
    if (themePreference !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e) => {
      setActualTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [themePreference]);

  return (
    <ThemeContext.Provider value={{ theme: actualTheme, toggleTheme, themePreference, setThemePreference }}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <AppsContext.Provider value={{ enabledApps, disabledApps, toggleApp, enableApp }}>
          <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, isBookmarked, getAppBookmarks }}>
            <NavigationContext.Provider value={{ 
              currentView, 
              setCurrentView, 
              searchQuery, 
              setSearchQuery,
              searchResults 
            }}>
              {/* Skip to main content link for accessibility */}
              <a 
                href="#main-content" 
                className="skip-link"
                tabIndex={0}
              >
                Skip to main content
              </a>

              <div className={`flex h-screen ${actualTheme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
                <Sidebar 
                  isOpen={sidebarOpen} 
                  onClose={() => setSidebarOpen(false)}
                />
                
                <div className="flex flex-col flex-1 min-w-0">
                  <Header 
                    onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                    onOpenSettings={() => setSettingsOpen(true)}
                  />
                  
                  <MainContent />
                </div>
                
                <SettingsModal 
                  isOpen={settingsOpen} 
                  onClose={() => setSettingsOpen(false)} 
                />
              </div>
            </NavigationContext.Provider>
          </BookmarksContext.Provider>
        </AppsContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App;