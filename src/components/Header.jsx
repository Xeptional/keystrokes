import { useContext } from 'react';
import { Menu, Settings, Sun, Moon, Book } from 'lucide-react';
import { ThemeContext, AuthContext, NavigationContext } from '../contexts/AppContexts';

const Header = ({ onToggleSidebar, onOpenSettings }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const { setCurrentView } = useContext(NavigationContext);

  const goHome = () => {
    setCurrentView({ type: 'home' });
    setTimeout(() => {
      document.getElementById('main-content')?.focus();
    }, 100);
  };

  return (
    <header 
      className={`border-b ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}
      role="banner"
    >
      <div className="flex items-center justify-between px-4 py-3 gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleSidebar}
            className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
            }`}
            aria-label="Toggle sidebar"
            tabIndex={0}
          >
            <Menu size={20} aria-hidden="true" />
          </button>
          <button
            onClick={goHome}
            className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg p-1 -m-1"
            aria-label="Go to home page"
            tabIndex={0}
          >
            <Book size={24} className="text-blue-600" aria-hidden="true" />
            <h1 className={`text-xl font-bold ${theme === 'dark' ? 'text-white hover:text-gray-200' : 'text-gray-900 hover:text-gray-700'} transition-colors`}>
              KeyStrokes
            </h1>
          </button>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
            }`}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme (Ctrl+D)`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            tabIndex={0}
          >
            {theme === 'light' ? <Moon size={20} aria-hidden="true" /> : <Sun size={20} aria-hidden="true" />}
          </button>
          
          <button
            onClick={onOpenSettings}
            className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
            }`}
            aria-label="Open settings (Ctrl+,)"
            title="Open settings"
            tabIndex={0}
          >
            <Settings size={20} aria-hidden="true" />
          </button>

          {user && (
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-300 dark:border-gray-700">
              <span className={`text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                {user.name}
              </span>
              <button
                onClick={logout}
                className={`text-sm px-3 py-1.5 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                    : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
                }`}
                tabIndex={0}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;