import { useState, useContext, useEffect, useRef } from 'react';
import { X } from 'lucide-react';
import { ThemeContext, SettingsContext, AuthContext } from '../context/AppContexts';
import { mockDocumentationSets } from '../data/mockDocumentationSets';

const SettingsModal = ({ isOpen, onClose }) => {
  const { theme } = useContext(ThemeContext);
  const { settings, updateSettings } = useContext(SettingsContext);
  const { user, login } = useContext(AuthContext);
  const [loginForm, setLoginForm] = useState({username: '', password: ''});
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  //Focus trap
  useEffect(() => {
    if(isOpen) {
      closeButtonRef.current?.focus();

      const handleKeyDown = (e) => {
        if(e.key === 'Escape') {
          onClose();
        }

        if(e.key === 'Tab') {
          const focusableElements = modalRef.current?.querySelectorAll('button, input, [tabindex]:not([tabindex="-1"])');

          if(!focusableElements || focusableElements.length === 0) return;
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if(e.shiftKey && document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          } else if (e.shiftKey && document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, onClose]);

  if(!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    if(loginForm.username.trim()) {
      login(loginForm.username, loginForm.password);
      setLoginForm({username: '', password: ''});
    }
  }

  const toggleDocEnabled = (docId) => {
    const newEnabledDocs = settings.newEnabledDocs.includes(docId)
    ? settings.enabledDocs.filter(id => id !== docId)
    : [...settings.enabledDocs, docId];
    updateSettings({ enabledDocs: newEnabledDocs });
  }

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
        className={`w-full max-w-2xl rounded-lg shadow-xl ${
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
                    placeholder="Enter username (any value works)"
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
                    placeholder="Enter password (any value works)"
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
          
          {/* Documentation Sets */}
          <section aria-labelledby="docs-heading">
            <h3 
              id="docs-heading"
              className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              Enabled Documentation Sets
            </h3>
            <div className="space-y-3" role="group" aria-label="Documentation sets">
              {Object.values(mockDocumentationSets).map(doc => (
                <label 
                  key={doc.id} 
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    theme === 'dark' ? 'hover:bg-gray-800' : 'hover:bg-gray-50'
                  }`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleDocEnabled(doc.id);
                    }
                  }}
                >
                  <input
                    type="checkbox"
                    checked={settings.enabledDocs.includes(doc.id)}
                    onChange={() => toggleDocEnabled(doc.id)}
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
                    tabIndex={-1}
                    aria-label={`Toggle ${doc.name} documentation`}
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-lg" aria-hidden="true">{doc.icon}</span>
                    <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                      {doc.name}
                    </span>
                    <span className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
                      {doc.version}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </section>
          
          {/* Keyboard Shortcuts */}
          <section aria-labelledby="shortcuts-heading">
            <h3 
              id="shortcuts-heading"
              className={`text-lg font-medium mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            >
              Keyboard Shortcuts
            </h3>
            <div 
              className={`space-y-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}
              role="list"
            >
              {[
                { label: 'Focus search', keys: ['/', 'Ctrl+K'] },
                { label: 'Toggle theme', keys: ['Ctrl+D'] },
                { label: 'Open settings', keys: ['Ctrl+,'] },
                { label: 'Go to home', keys: ['Ctrl+H'] },
                { label: 'Toggle sidebar', keys: ['Alt+S'] },
                { label: 'Close / Go home', keys: ['Esc'] },
                { label: 'Navigate forward', keys: ['Tab'] },
                { label: 'Navigate backward', keys: ['Shift+Tab'] },
              ].map((shortcut, index) => (
                <div key={index} className="flex justify-between items-center py-2" role="listitem">
                  <span>{shortcut.label}</span>
                  <div className="flex gap-2">
                    {shortcut.keys.map((key, i) => (
                      <kbd 
                        key={i}
                        className={`px-2 py-1 text-xs font-mono rounded ${
                          theme === 'dark' ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {key}
                      </kbd>
                    ))}
                  </div>
                </div>
              ))}
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