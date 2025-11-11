import React, { useState, useMemo, useEffect, useRef } from 'react';
import { X, ChevronDown, ChevronRight, Bookmark, Search as SearchIcon } from 'lucide-react';
import { ThemeContext, AppsContext, BookmarksContext, NavigationContext } from '../../contexts/AppContexts';
import { getAllApplications } from '../../data/applications';

const Sidebar = ({ isOpen, onClose }) => {
  const { theme } = React.useContext(ThemeContext);
  const { enabledApps, disabledApps, enableApp } = React.useContext(AppsContext);
  const { getAppBookmarks } = React.useContext(BookmarksContext);
  const { currentView, setCurrentView, searchQuery, setSearchQuery, searchResults } = React.useContext(NavigationContext);
  
  const [expandedApps, setExpandedApps] = useState({});
  const [showDisabledApps, setShowDisabledApps] = useState(false);
  const searchInputRef = useRef(null);
  const sidebarRef = useRef(null);
  const closeButtonRef = useRef(null);

  const allApps = getAllApplications();
  const enabledAppsList = allApps.filter(app => enabledApps.includes(app.slug));
  const disabledAppsList = allApps.filter(app => disabledApps.includes(app.slug));

  // Focus trap when sidebar opens on mobile
  useEffect(() => {
    if (isOpen && window.innerWidth < 768) {
      // Focus the close button when sidebar opens
      closeButtonRef.current?.focus();

      // Prevent body scroll
      document.body.style.overflow = 'hidden';

      // Focus trap
      const handleKeyDown = (e) => {
        if (e.key === 'Tab') {
          const focusableElements = sidebarRef.current?.querySelectorAll(
            'button:not([tabindex="-1"]), input:not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])'
          );
          
          if (!focusableElements || focusableElements.length === 0) return;
          
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey) {
            // Shift + Tab
            if (document.activeElement === firstElement) {
              e.preventDefault();
              lastElement.focus();
            }
          } else {
            // Tab
            if (document.activeElement === lastElement) {
              e.preventDefault();
              firstElement.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isOpen]);

  // Auto-expand app when it's selected
  useEffect(() => {
    if (currentView.type === 'app' || currentView.type === 'category' || currentView.type === 'shortcut') {
      setExpandedApps(prev => ({
        ...prev,
        [currentView.appSlug]: true
      }));
    }
  }, [currentView]);

  const toggleAppExpanded = (slug) => {
    setExpandedApps(prev => ({
      ...prev,
      [slug]: !prev[slug]
    }));
  };

  const handleAppClick = (app) => {
    setCurrentView({
      type: 'app',
      appSlug: app.slug,
      app
    });
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleCategoryClick = (app, category) => {
    setCurrentView({
      type: 'category',
      appSlug: app.slug,
      app,
      category
    });
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleBookmarkClick = (app, shortcut, category) => {
    setCurrentView({
      type: 'shortcut',
      appSlug: app.slug,
      app,
      category,
      shortcut
    });
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleSearchResultClick = (result) => {
    setCurrentView({
      type: 'shortcut',
      appSlug: result.app.slug,
      app: result.app,
      category: result.category,
      shortcut: result.shortcut
    });
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  const handleReEnableApp = (app) => {
    enableApp(app.slug);
  };

  // Focus search on '/' or Ctrl+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) || 
          ((e.ctrlKey || e.metaKey) && e.key === 'k')) {
        const activeElement = document.activeElement;
        const isInputFocused = activeElement?.tagName === 'INPUT' || 
                              activeElement?.tagName === 'TEXTAREA';
        
        if (!isInputFocused) {
          e.preventDefault();
          searchInputRef.current?.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Determine if we're on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && isMobile && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-r flex flex-col`}
        aria-label="Application navigation"
        aria-hidden={isMobile && !isOpen}
        aria-modal={isMobile && isOpen ? 'true' : undefined}
        role={isMobile && isOpen ? 'dialog' : 'navigation'}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
            <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Navigation
            </span>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                theme === 'dark' 
                  ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                  : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
              }`}
              aria-label="Close navigation sidebar"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Search Box */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="relative">
              <SearchIcon 
                size={16} 
                className={`absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
                aria-hidden="true"
              />
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search shortcuts (Press '/')"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                  theme === 'dark' 
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                }`}
                aria-label="Search shortcuts by action or description"
                role="searchbox"
              />
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {/* Search Results */}
            {searchQuery.length >= 2 && searchResults.length > 0 ? (
              <div role="region" aria-label="Search results" aria-live="polite">
                <h3 className={`text-xs font-semibold uppercase tracking-wider mb-3 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  Search Results ({searchResults.length})
                </h3>
                <div className="space-y-1">
                  {searchResults.map((result, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearchResultClick(result)}
                      className={`w-full text-left p-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'hover:bg-gray-800 focus:bg-gray-800' 
                          : 'hover:bg-gray-100 focus:bg-gray-100'
                      }`}
                      aria-label={`${result.shortcut.action} in ${result.app.name}, ${result.category.name} category`}
                    >
                      <div className="flex items-start gap-3">
                        {/* App icon placeholder */}
                        <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-sm font-semibold ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                        }`} aria-hidden="true">
                          {result.app.name[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className={`text-sm font-medium truncate ${
                            theme === 'dark' ? 'text-white' : 'text-gray-900'
                          }`}>
                            {result.shortcut.action}
                          </div>
                          <div className={`text-xs truncate ${
                            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                          }`}>
                            {result.app.name} • {result.category.name}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : searchQuery.length >= 2 && searchResults.length === 0 ? (
              <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} role="status">
                <p className="text-sm">No shortcuts found for "{searchQuery}"</p>
              </div>
            ) : (
              /* Application List */
              <nav aria-label="Applications list">
                {enabledAppsList.length === 0 ? (
                  <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`} role="status">
                    <p className="text-sm">No applications enabled.</p>
                    <p className="text-xs mt-2">Enable apps in settings.</p>
                  </div>
                ) : (
                  enabledAppsList.map(app => {
                    const isExpanded = expandedApps[app.slug];
                    const bookmarks = getAppBookmarks(app.slug, app);
                    
                    return (
                      <div key={app.slug} className="mb-2">
                        {/* App Header */}
                        <button
                          onClick={() => toggleAppExpanded(app.slug)}
                          className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                            theme === 'dark' 
                              ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                              : 'hover:bg-gray-100 text-gray-700 focus:bg-gray-100'
                          }`}
                          aria-expanded={isExpanded}
                          aria-label={`${app.name}, ${app.categories.length} categories. ${isExpanded ? 'Expanded' : 'Collapsed'}. Press to ${isExpanded ? 'collapse' : 'expand'}`}
                        >
                          <div 
                            className="flex items-center gap-3 flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAppClick(app);
                            }}
                          >
                            {/* App icon placeholder */}
                            <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-sm font-semibold ${
                              theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                            }`} aria-hidden="true">
                              {app.name[0]}
                            </div>
                            <div className="text-left flex-1 min-w-0">
                              <div className="font-medium text-sm truncate">{app.name}</div>
                              <div className={`text-xs ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`} aria-hidden="true">
                                {app.categories.length} categories
                              </div>
                            </div>
                          </div>
                          {isExpanded ? (
                            <ChevronDown size={16} aria-hidden="true" />
                          ) : (
                            <ChevronRight size={16} aria-hidden="true" />
                          )}
                        </button>
                        
                        {/* App Content (Categories + Bookmarks) */}
                        {isExpanded && (
                          <div className="ml-6 mt-1 space-y-1" role="group" aria-label={`${app.name} sections`}>
                            {/* Bookmarks Section */}
                            {bookmarks.length > 0 && (
                              <div className="mb-2">
                                <div className={`flex items-center gap-2 px-3 py-2 text-xs font-semibold uppercase tracking-wider ${
                                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                                }`} role="heading" aria-level="3">
                                  <Bookmark size={12} aria-hidden="true" />
                                  Bookmarked ({bookmarks.length})
                                </div>
                                {bookmarks.map((bookmark, index) => (
                                  <button
                                    key={index}
                                    onClick={() => handleBookmarkClick(app, bookmark.shortcut, bookmark.category)}
                                    className={`w-full text-left p-2.5 pl-6 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                                      theme === 'dark' 
                                        ? 'hover:bg-gray-800 text-gray-400 focus:bg-gray-800' 
                                        : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
                                    }`}
                                    aria-label={`Bookmarked shortcut: ${bookmark.shortcut.action}, from ${bookmark.category.name} category`}
                                  >
                                    <div className="text-sm truncate">{bookmark.shortcut.action}</div>
                                    <div className={`text-xs truncate ${
                                      theme === 'dark' ? 'text-gray-600' : 'text-gray-500'
                                    }`} aria-hidden="true">
                                      {bookmark.category.name}
                                    </div>
                                  </button>
                                ))}
                              </div>
                            )}

                            {/* Categories */}
                            {app.categories.map((category, index) => (
                              <button
                                key={index}
                                onClick={() => handleCategoryClick(app, category)}
                                className={`w-full text-left p-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                                  currentView.type === 'category' && 
                                  currentView.category?.name === category.name &&
                                  currentView.appSlug === app.slug
                                    ? theme === 'dark' 
                                      ? 'bg-gray-800 text-white' 
                                      : 'bg-gray-200 text-gray-900'
                                    : theme === 'dark' 
                                      ? 'hover:bg-gray-800 text-gray-400 focus:bg-gray-800' 
                                      : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
                                }`}
                                aria-label={`${category.name} category, ${category.shortcuts.length} shortcuts`}
                                aria-current={
                                  currentView.type === 'category' && 
                                  currentView.category?.name === category.name ? 
                                  'page' : undefined
                                }
                              >
                                <div className="font-medium text-sm">{category.name}</div>
                                <div className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`} aria-hidden="true">
                                  {category.shortcuts.length} shortcuts
                                </div>
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })
                )}

                {/* Disabled Applications Dropdown */}
                {disabledAppsList.length > 0 && (
                  <div className="mt-6">
                    <button
                      onClick={() => setShowDisabledApps(!showDisabledApps)}
                      className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                        theme === 'dark' 
                          ? 'hover:bg-gray-800 text-gray-400 focus:bg-gray-800' 
                          : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
                      }`}
                      aria-expanded={showDisabledApps}
                      aria-label={`Disabled applications, ${disabledAppsList.length} apps. ${showDisabledApps ? 'Expanded' : 'Collapsed'}. Press to ${showDisabledApps ? 'collapse' : 'expand'}`}
                    >
                      <span className="text-sm font-medium">
                        Disabled Applications ({disabledAppsList.length})
                      </span>
                      {showDisabledApps ? (
                        <ChevronDown size={16} aria-hidden="true" />
                      ) : (
                        <ChevronRight size={16} aria-hidden="true" />
                      )}
                    </button>

                    {showDisabledApps && (
                      <div className="ml-3 mt-2 space-y-1" role="group" aria-label="Disabled applications">
                        {disabledAppsList.map(app => (
                          <div
                            key={app.slug}
                            className={`flex items-center justify-between p-2.5 rounded-lg ${
                              theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
                            }`}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              <div className={`w-6 h-6 rounded flex-shrink-0 flex items-center justify-center text-xs ${
                                theme === 'dark' ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'
                              }`} aria-hidden="true">
                                {app.name[0]}
                              </div>
                              <span className={`text-sm truncate ${
                                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                              }`}>
                                {app.name}
                              </span>
                            </div>
                            <button
                              onClick={() => handleReEnableApp(app)}
                              className={`text-xs px-2 py-1 rounded transition-colors focus:ring-2 focus:ring-blue-500 ${
                                theme === 'dark' 
                                  ? 'bg-blue-900 text-blue-200 hover:bg-blue-800' 
                                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                              }`}
                              aria-label={`Enable ${app.name} application`}
                            >
                              Enable
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </nav>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;