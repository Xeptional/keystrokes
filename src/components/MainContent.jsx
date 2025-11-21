import { useContext } from 'react';
import { Home, Book, Keyboard, Zap, HelpCircle } from 'lucide-react';
import { ThemeContext, NavigationContext } from '../contexts/AppContexts';
import AppOverview from './AppOverview';
import CategoryView from './CategoryView';
import ShortcutCard from './ShortcutCard';

const WelcomeHome = () => {
  const { theme } = useContext(ThemeContext);
  const { setCurrentView } = useContext(NavigationContext);

  const goToGuide = () => {
    setCurrentView({ type: 'guide' });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Welcome Header */}
      <header className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
            theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
          }`}>
            <Keyboard size={40} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} aria-hidden="true" />
          </div>
        </div>
        <h1 className={`text-4xl md:text-5xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Welcome to KeyStrokes
        </h1>
        <p className={`text-lg md:text-xl ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          Your comprehensive, accessible keyboard shortcuts reference
        </p>
      </header>

      {/* Quick Start Guide */}
      <section className={`mb-12 p-6 rounded-lg ${
        theme === 'dark' ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`text-2xl font-semibold mb-4 flex items-center gap-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          <Zap size={24} className="text-yellow-500" aria-hidden="true" />
          Quick Start Guide
        </h2>
        
        <div className="space-y-6">
          {/* Navigation */}
          <div>
            <h3 className={`text-lg font-medium mb-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              📍 Navigation
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Sidebar:</span>
                <span>Browse applications, categories, and bookmarked shortcuts. Select an application to see its overview.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Categories:</span>
                <span>Expand an application to see all its shortcut categories. Select a category to view all shortcuts within it.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Bookmarks:</span>
                <span>Your bookmarked shortcuts appear under each application for quick access.</span>
              </li>
            </ul>
          </div>

          {/* Search */}
          <div>
            <h3 className={`text-lg font-medium mb-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              🔍 Search
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Quick Search:</span>
                <span>Press <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">/</kbd> or <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+K</kbd> to focus the search box.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Search Tips:</span>
                <span>Search by action name, description, or category. Results show matching shortcuts from enabled applications.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">View Results:</span>
                <span>Select any search result to view the full shortcut details in the main area.</span>
              </li>
            </ul>
          </div>

          {/* Bookmarks */}
          <div>
            <h3 className={`text-lg font-medium mb-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              🔖 Bookmarks
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Save Favorites:</span>
                <span>Select the bookmark icon on any shortcut to save it for quick access.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Toggle:</span>
                <span>Press <kbd className="px-2 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+B</kbd> to bookmark/unbookmark the currently focused shortcut.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Access:</span>
                <span>Bookmarked shortcuts appear in the "Bookmarked" section under each application in the sidebar.</span>
              </li>
            </ul>
          </div>

          {/* Keyboard Navigation */}
          <div>
            <h3 className={`text-lg font-medium mb-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              ⌨️ Keyboard Navigation
            </h3>
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Tab</kbd>
                <span className="text-sm">Navigate forward</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Shift+Tab</kbd>
                <span className="text-sm">Navigate backward</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">/</kbd>
                <span className="text-sm">Focus search</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+K</kbd>
                <span className="text-sm">Focus search</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+H</kbd>
                <span className="text-sm">Go to home</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+D</kbd>
                <span className="text-sm">Toggle theme</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+,</kbd>
                <span className="text-sm">Open settings</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Alt+S</kbd>
                <span className="text-sm">Toggle sidebar</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Esc</kbd>
                <span className="text-sm">Go home / Close</span>
              </div>
              <div className="flex items-center gap-3">
                <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Enter</kbd>
                <span className="text-sm">Activate focused item</span>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div>
            <h3 className={`text-lg font-medium mb-3 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              ♿ Accessibility Features
            </h3>
            <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Screen Readers:</span>
                <span>All content is properly labeled and announced by screen readers like JAWS, NVDA, and VoiceOver.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Keyboard Only:</span>
                <span>Complete navigation and interaction without a mouse. Every feature is accessible via keyboard.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Focus Indicators:</span>
                <span>Clear visual focus indicators show which element is currently selected.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-semibold min-w-[120px]">Theme Options:</span>
                <span>Choose between light, dark, or browser default theme in settings.</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Guide Link */}
        <div className="mt-6 pt-6 border-t border-gray-300 dark:border-gray-700">
          <button
            onClick={goToGuide}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
            tabIndex={0}
          >
            <HelpCircle size={20} aria-hidden="true" />
            View Complete Guide
          </button>
        </div>
      </section>

      {/* Features Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-blue-900' : 'bg-blue-100'
            }`}>
              <Book size={24} className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Multiple Apps
            </h3>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Browse shortcuts for 20+ popular applications. Enable or disable apps based on your needs.
          </p>
        </div>

        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-green-900' : 'bg-green-100'
            }`}>
              <Zap size={24} className={theme === 'dark' ? 'text-green-400' : 'text-green-600'} aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Fast Search
            </h3>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Quickly find any shortcut by searching through actions, descriptions, and categories.
          </p>
        </div>

        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white border border-gray-200'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              theme === 'dark' ? 'bg-purple-900' : 'bg-purple-100'
            }`}>
              <Home size={24} className={theme === 'dark' ? 'text-purple-400' : 'text-purple-600'} aria-hidden="true" />
            </div>
            <h3 className={`text-lg font-semibold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Fully Accessible
            </h3>
          </div>
          <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Built with accessibility first. Complete keyboard navigation and screen reader support.
          </p>
        </div>
      </section>
    </div>
  );
};

const MainContent = () => {
  const { theme } = useContext(ThemeContext);
  const { currentView } = useContext(NavigationContext);

  const renderContent = () => {
    switch (currentView.type) {
      case 'home':
        return <WelcomeHome />;
      
      case 'app':
        return <AppOverview app={currentView.app} />;
      
      case 'category':
        return <CategoryView app={currentView.app} category={currentView.category} />;
      
      case 'shortcut':
        return (
          <div className="max-w-4xl mx-auto p-6 md:p-8">
             <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
              <button
                onClick={() => {}}
                className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
                tabIndex={0}
              >
                {currentView.app.name}
              </button>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>›</span>
              <button
                onClick={() => {}}
                className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
                  theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
                }`}
                tabIndex={0}
              >
                {currentView.category.name}
              </button>
              <span className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}>›</span>
              <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
                {currentView.shortcut.action}
              </span>
            </nav>
            
            <ShortcutCard 
              shortcut={currentView.shortcut}
              appSlug={currentView.app.slug}
              categoryName={currentView.category.name}
            />
          </div>
        );
      
      case 'guide':
        return <GuidePage />;
      
      case 'about':
        return <AboutPage />;
      
      default:
        return <WelcomeHome />;
    }
  };

  return (
    <main 
      id="main-content"
      className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      role="main"
      tabIndex={-1}
      // aria-hidden={sidebarOpen && window.innerWidth < 760 ? 'true' : 'false'}
      // inert={sidebarOpen && window.innerWidth < 760 ? '' : undefined}
    >
      {renderContent()}
    </main>
  );
};

// Guide Page Component
const GuidePage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        Complete User Guide
      </h1>
      
      <div className="prose prose-lg max-w-none">
        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Getting Started
          </h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Welcome to the Shortcuts Guide! This application is designed to help you discover and learn keyboard shortcuts for your favorite applications. Whether you're a power user looking to improve productivity or someone who relies on assistive technology, this guide is built with accessibility at its core.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Navigating the Interface
          </h2>
          
          <h3 className={`text-xl font-semibold mb-3 mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Sidebar Navigation
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            The sidebar on the left contains all available applications. Select an application to expand it and see its categories. Each application can be enabled or disabled in the settings.
          </p>

          <h3 className={`text-xl font-semibold mb-3 mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Bookmarks
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            When you expand an application, you'll see a "Bookmarked" section at the top if you've saved any shortcuts from that app. This gives you quick access to your most-used shortcuts.
          </p>

          <h3 className={`text-xl font-semibold mb-3 mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Categories
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Each application is organized into categories like "General Navigation", "Editing", "Accessibility Features", etc. Select a category to view all shortcuts in that category.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Using Search
          </h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            The search box at the top of the sidebar lets you quickly find shortcuts. Simply type what you're looking for, and results will appear as you type. Search looks through shortcut actions, descriptions, and categories. You can press "/" or "Ctrl+K" from anywhere to focus the search box.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Managing Applications
          </h2>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            You can enable or disable applications in the Settings (press Ctrl + , or Select the settings icon). Disabled applications appear at the bottom of the sidebar in the "Disabled Applications" section, where you can easily re-enable them.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Accessibility Features
          </h2>
          
          <h3 className={`text-xl font-semibold mb-3 mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Screen Reader Support
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            This application is fully compatible with screen readers including JAWS, NVDA, and VoiceOver. All interactive elements are properly labeled, and navigation announcements help you understand where you are in the application.
          </p>

          <h3 className={`text-xl font-semibold mb-3 mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Keyboard Navigation
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Every feature in this application can be accessed using only the keyboard. Use Tab to move forward through interactive elements, Shift+Tab to move backward, and Enter or Space to activate buttons and links.
          </p>

          <h3 className={`text-xl font-semibold mb-3 mt-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Visual Themes
          </h3>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Choose between Light, Dark, or Browser Default theme in the settings. The Browser Default option automatically matches your system's color scheme preference.
          </p>
        </section>

        <section className="mb-8">
          <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Keyboard Shortcuts Reference
          </h2>
          <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
            <table className="w-full">
              <thead>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-300'}`}>
                  <th className={`text-left py-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Action</th>
                  <th className={`text-left py-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>Shortcut</th>
                </tr>
              </thead>
              <tbody className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Focus search</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">/</kbd> or <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+K</kbd></td>
                </tr>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Toggle theme</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+D</kbd></td>
                </tr>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Open settings</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+,</kbd></td>
                </tr>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Go to home</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+H</kbd></td>
                </tr>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Toggle sidebar</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Alt+S</kbd></td>
                </tr>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Toggle bookmark</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Ctrl+B</kbd></td>
                </tr>
                <tr className={`border-b ${theme === 'dark' ? 'border-gray-800' : 'border-gray-200'}`}>
                  <td className="py-2">Close modal / Go home</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Esc</kbd></td>
                </tr>
                <tr>
                  <td className="py-2">Navigate elements</td>
                  <td className="py-2"><kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Tab</kbd> / <kbd className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded text-sm font-mono">Shift+Tab</kbd></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
};

// About Page Component
const AboutPage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      <h1 className={`text-4xl font-bold mb-6 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
        About
      </h1>

      {/* Application Info */}
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Shortcuts Guide
        </h2>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Version 1.0.0
        </p>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          A comprehensive, accessible keyboard shortcuts reference for visually impaired users and keyboard power users.
        </p>
      </section>

      {/* Copyright */}
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Copyright & License
        </h2>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          © {new Date().getFullYear()} Shortcuts Guide. All rights reserved.
        </p>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          This application is licensed under the MIT License. You are free to use, modify, and distribute this software in accordance with the license terms.
        </p>
        <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <p className={`text-sm font-mono ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            MIT License - Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files.
          </p>
        </div>
      </section>

      {/* Development Tools */}
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Development Tools
        </h2>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          This application was built using modern web technologies with accessibility as a priority:
        </p>
        <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <li className="flex items-start gap-3">
            <span className="font-semibold min-w-[140px]">Framework:</span>
            <span>React 18.2 - A JavaScript library for building user interfaces</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold min-w-[140px]">Build Tool:</span>
            <span>Vite - Next generation frontend tooling</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold min-w-[140px]">Styling:</span>
            <span>Tailwind CSS 3.4 - A utility-first CSS framework</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold min-w-[140px]">Icons:</span>
            <span>Lucide React - Beautiful & consistent icon toolkit</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold min-w-[140px]">Storage:</span>
            <span>Local Storage API - For persisting user preferences and bookmarks</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="font-semibold min-w-[140px]">Accessibility:</span>
            <span>WCAG 2.1 AA compliant - Full keyboard navigation and ARIA support</span>
          </li>
        </ul>
      </section>

      {/* FAQs */}
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Frequently Asked Questions
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: How do I add more applications?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: Currently, applications are pre-loaded into the system. Future versions will support user-contributed shortcuts. Contact the developer if you'd like to request a specific application.
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: Will my bookmarks and settings be saved?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: Yes! Your bookmarks, enabled applications, and theme preferences are saved in your browser's local storage and will persist between sessions.
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: Is this application free to use?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: Yes, this application is completely free and open-source. You can use it without any restrictions.
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: Which screen readers are supported?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: The application is tested with JAWS, NVDA (Windows), and VoiceOver (macOS/iOS). It should work with any modern screen reader that supports ARIA standards.
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: Can I use this offline?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: Currently, the application requires an internet connection to load. Offline support may be added in future versions.
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: How do I report a bug or request a feature?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: Please contact the developer using the information below. We appreciate all feedback!
            </p>
          </div>

          <div>
            <h3 className={`text-lg font-semibold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
              Q: Are the shortcuts platform-specific?
            </h3>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              A: Yes! Most shortcuts show variants for both Windows and macOS. Look for the platform tags (Windows/macOS) next to each keyboard combination.
            </p>
          </div>
        </div>
      </section>

      {/* Developer Contact */}
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Developer Contact
        </h2>
        <div className={`p-6 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            Have questions, suggestions, or found a bug? We'd love to hear from you!
          </p>
          <ul className={`space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            <li className="flex items-center gap-3">
              <span className="font-semibold min-w-[100px]">Email:</span>
              <a 
                href="mailto:support@shortcutsguide.com" 
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                tabIndex={0}
              >
                support@shortcutsguide.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-semibold min-w-[100px]">GitHub:</span>
              <a 
                href="https://github.com/shortcuts-guide" 
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
              >
                github.com/shortcuts-guide
              </a>
            </li>
            <li className="flex items-center gap-3">
              <span className="font-semibold min-w-[100px]">Website:</span>
              <a 
                href="https://shortcutsguide.com" 
                className="text-blue-600 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={0}
              >
                shortcutsguide.com
              </a>
            </li>
          </ul>
        </div>
      </section>

      {/* Acknowledgments */}
      <section className="mb-8">
        <h2 className={`text-2xl font-semibold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
          Acknowledgments
        </h2>
        <p className={`mb-4 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          Special thanks to:
        </p>
        <ul className={`list-disc list-inside space-y-2 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
          <li>The accessibility community for guidance and testing</li>
          <li>Open-source contributors who make projects like this possible</li>
          <li>Application developers who document their keyboard shortcuts</li>
          <li>Screen reader users who provided valuable feedback</li>
        </ul>
      </section>
    </div>
  );
};

export default MainContent;