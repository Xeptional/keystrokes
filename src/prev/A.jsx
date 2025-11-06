import { useState, useEffect, useCallback } from 'react';
import { ThemeContext, SettingsContext, AuthContext, BookmarksContext } from './context/AppContexts';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import SettingsModal from './components/SettingsModal';

function App() {
  //detect systtem theme
  const getSystemTheme = () => {
    if(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getSystemTheme());
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    enabledDocs: ['javascript', 'react', 'css'],
    shortcuts: true,
    autosave: true
  });
  const [bookmarks, setBookmarks] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const toggleTheme = useCallback(() => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  }, []);

  const login = useCallback((username, password) => {
    setUser({ name: username, id: Date.now() });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  }, []);

  const toggleBookmark = useCallback((bookmark) => {
    setBookmarks(prev => {
      const exists = prev.some(b => b.title === bookmark.title);
      if(exists) {
        return prev.filter(b => b.title !== bookmark.title);
      } else {
        return [ ...prev, bookmark ];
      }
    });
  }, []);
  
  const removeBookmark = useCallback((index) => {
    setBookmarks(prev => prev.filter((_, i) => i !== index));
  }, []);

  const goHome = useCallback(() => {
    setSelectedEntry(null)
    //focus on main content
    setTimeout(() => {
      document.getElementById('main-content')?.focus();
    }, 100);
  }, [])

  //global keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      //ctrl and cmd shortcuts
      if(e.ctrlKey || e.metaKey) {
        switch(e.key) {
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
            e.preventDefault()
            document.querySelector('input[type="text"]')?.focus();
            break;
          case 'h':
          case 'H':
            e.preventDefault();
            goHome();
            break;
        }
      }

      //Escape key
      if(e.key === 'Escape') {
        if(settingsOpen) { //Close settings if open
          setSettingsOpen(false);
        } else if(window.innerWidth < 760 && sidebarOpen) { //If sidebar is open on mobile
          setSidebarOpen(false);
        } else { //Otherwise, go back to home page
          goHome();
        }
      }

      //Alt + s to toggle sidebar
      if(e.altKey && e.key === 's') {
        e.preventDefault();
        setSidebarOpen(prev => !prev);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [toggleTheme, settingsOpen, sidebarOpen, goHome])

  //Apply theme to document
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  //Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark');
    
    const handleChange = (e) => {
      setTheme(e.matches ? 'dark' : 'light');
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  })

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <AuthContext.Provider value={{ user, login, logout }}>
        <SettingsContext.Provider value={{ settings, updateSettings }}>
          <BookmarksContext.Provider value={{ bookmarks, toggleBookmark, removeBookmark }}>
            {/* Skip to main content link for accessibility */}
            <a 
              href="#main-content" 
              className="skip-link"
              tabIndex={0}
            >
              Skip to main content
            </a>

            <div className={`flex h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
              <Sidebar 
                isOpen={sidebarOpen} 
                onClose={() => setSidebarOpen(false)}
                onSelectEntry={setSelectedEntry}
              />
              
              <div className="flex flex-col flex-1 min-w-0">
                <Header 
                  onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
                  onOpenSettings={() => setSettingsOpen(true)}
                  onGoHome={goHome}
                />
                
                <MainContent selectedEntry={selectedEntry} />
              </div>
              
              <SettingsModal 
                isOpen={settingsOpen} 
                onClose={() => setSettingsOpen(false)} 
              />
            </div>
          </BookmarksContext.Provider>
        </SettingsContext.Provider>
      </AuthContext.Provider>
    </ThemeContext.Provider>
  );
}

export default App
