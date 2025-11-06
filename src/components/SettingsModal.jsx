import { useContext, useState, useEffect, useRef } from 'react';
import { X, Check } from 'lucide-react';
import { ThemeContext, AppsContext, AuthContext, NavigationContext } from '../contexts/AppContexts';
import { getAllApplications } from '../data/applications';

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme, themePreference, setThemePreference } = useContext(ThemeContext);
  const { enabledApps, toggleApp } = useContext(AppsContext);
  const { user, login } = useContext(AuthContext);
  const { setCurrentView } = useContext(NavigationContext);
  
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);
  
  const allApps = getAllApplications();

  // Focus trap
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
      
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          onClose();
        }
        
        // Trap focus inside modal
        if (e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll(
            'button, input, [tabindex]:not([tabindex="-1"])'
          );
          
          if (!focusableElements || focusableElements.length === 0) return;
          
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];
          
          if (e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (!e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };
      
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;
  
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if (loginForm.username.trim()) {
      login(loginForm.username, loginForm.password);
      setLoginForm({ username: '', password: '' });
    }
  };

  const handleNavigateToGuide = () => {
    setCurrentView({ type: 'guide' });
    onClose();
  };

  const handleNavigateToAbout = () => {
    setCurrentView({ type: 'about' });
    onClose();
  };
  
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="settings-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div 
        ref={modalRef}
        className={`w-full max-w-3xl rounded-lg shadow-xl ${
          theme === 'dark' ? 'bg-gray-900' : 'bg-white'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`flex items-center justify-between p-6 border-b ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <h2 
            id="settings-title"
            className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
          >
            Settings
          </h2>
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-400 focus:bg-gray-800' 
                : 'hover:bg-gray-100 text-gray-500 focus:bg-gray-100'
            }`}
            aria-label="Close settings dialog"
            tabIndex={0}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>
        
        <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
          {/* Theme Selection */}
          <section aria-labelledby="theme-heading">
            <h3 
              id="theme-heading"
              className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              Theme
            </h3>
            <div className="space-y-3" role="radiogroup" aria-label="Theme selection">
              {[
                { value: 'system', label: 'Browser Default', description: 'Matches your system preference' },
                { value: 'light', label: 'Light', description: 'Light color scheme' },
                { value: 'dark', label: 'Dark', description: 'Dark color scheme' }
              ].map((option) => (
                <label
                  key={option.value}
                  className={`flex items-start gap-3 p-4 rounded-lg cursor-pointer transition-colors ${
                    themePreference === option.value
                      ? theme === 'dark' ? 'bg-blue-900 border-2 border-blue-500' : 'bg-blue-50 border-2 border-blue-500'
                      : theme === 'dark' ? 'bg-gray-800 border-2 border-transparent hover:bg-gray-750' : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setThemePreference(option.value);
                    }
                  }}
                >
                  <input
                    type="radio"
                    name="theme"
                    value={option.value}
                    checked={themePreference === option.value}
                    onChange={() => setThemePreference(option.value)}
                    className="mt-1"
                    tabIndex={-1}
                    aria-label={option.label}
                  />
                  <div className="flex-1">
                    <div className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {option.label}
                      {themePreference === option.value && (
                        <Check size={16} className="inline ml-2 text-blue-500" aria-hidden="true" />
                      )}
                    </div>
                    <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                      {option.description}
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Authentication Section */}
          <section aria-labelledby="auth-heading">
            <h3 
              id="auth-heading"
              className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              Authentication
            </h3>
            {user ? (
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                  Logged in as <strong>{user.name}</strong>
                </p>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                <div>
                  <label 
                    htmlFor="username"
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Username
                  </label>
                  <input
                    id="username"
                    type="text"
                    value={loginForm.username}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, username: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter username"
                    tabIndex={0}
                  />
                </div>
                <div>
                  <label 
                    htmlFor="password"
                    className={`block text-sm font-medium mb-2 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                    className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
                      theme === 'dark' 
                        ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                    placeholder="Enter password"
                    tabIndex={0}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium"
                  tabIndex={0}
                >
                  Login
                </button>
              </form>
            )}
          </section>
          
          {/* Applications List */}
          <section aria-labelledby="apps-heading">
            <h3 
              id="apps-heading"
              className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              Applications
            </h3>
            <p className={`text-sm mb-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              Enable or disable applications to customize your sidebar.
            </p>
            <div className="space-y-2 max-h-64 overflow-y-auto" role="group" aria-label="Applications list">
              {allApps.map(app => (
                <label 
                  key={app.slug} 
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleApp(app.slug);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={enabledApps.includes(app.slug)}
                    onChange={() => toggleApp(app.slug)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    tabIndex={-1}
                    aria-label={`Toggle ${app.name}`}
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-8 h-8 rounded flex-shrink-0 flex items-center justify-center text-sm font-semibold ${
                      theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {app.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`font-medium text-sm ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                        {app.name}
                      </div>
                      <div className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                        {app.categories.length} categories • {app.platforms.join(', ')}
                      </div>
                    </div>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <section aria-labelledby="links-heading">
            <h3 
              id="links-heading"
              className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              Help & Information
            </h3>
            <div className="space-y-2">
              <button
                onClick={handleNavigateToGuide}
                className={`w-full text-left p-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-750 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
                tabIndex={0}
              >
                <div className="font-medium mb-1">User Guide</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Learn how to use this application effectively
                </div>
              </button>

              <button
                onClick={handleNavigateToAbout}
                className={`w-full text-left p-4 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'bg-gray-800 hover:bg-gray-750 text-white' 
                    : 'bg-gray-50 hover:bg-gray-100 text-gray-900'
                }`}
                tabIndex={0}
              >
                <div className="font-medium mb-1">About</div>
                <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                  Copyright, license, FAQs, and developer contact
                </div>
              </button>
            </div>
          </section>
        </div>
        
        <div className={`flex justify-end gap-3 p-6 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <button
            onClick={onClose}
            className={`px-6 py-2 rounded-lg border transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800 focus:bg-gray-800' 
                : 'border-gray-300 text-gray-700 hover:bg-gray-50 focus:bg-gray-50'
            }`}
            tabIndex={0}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;