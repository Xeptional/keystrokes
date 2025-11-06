import { useContext } from 'react';
import { ThemeContext } from '../contexts/AppContexts';

const AppOverview = ({ app }) => {
  const { theme } = useContext(ThemeContext);

  const totalShortcuts = app.categories.reduce((sum, cat) => sum + cat.shortcuts.length, 0);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* App Header */}
      <header className="mb-8">
        <div className="flex items-center gap-4 mb-4">
          {/* Icon placeholder - will be replaced with actual icon */}
          <div className={`w-16 h-16 rounded-lg flex items-center justify-center text-3xl ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            {app.name[0]}
          </div>
          <div>
            <h1 className={`text-4xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              {app.name}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              {app.platforms.map((platform, index) => (
                <span
                  key={index}
                  className={`px-3 py-1 text-xs font-medium rounded-full ${
                    theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>
        </div>

        <p className={`text-lg leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {app.description}
        </p>
      </header>

      {/* Statistics */}
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 ${
        theme === 'dark' ? '' : ''
      }`}>
        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`}>
            {totalShortcuts}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Total Shortcuts
          </div>
        </div>

        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-green-400' : 'text-green-600'
          }`}>
            {app.categories.length}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Categories
          </div>
        </div>

        <div className={`p-6 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'
        }`}>
          <div className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-purple-400' : 'text-purple-600'
          }`}>
            {app.platforms.length}
          </div>
          <div className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Platforms
          </div>
        </div>
      </div>

      {/* Categories Overview */}
      <section>
        <h2 className={`text-2xl font-semibold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          Categories
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {app.categories.map((category, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border ${
                theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'
              }`}
            >
              <h3 className={`font-semibold mb-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                {category.name}
              </h3>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {category.shortcuts.length} shortcut{category.shortcuts.length !== 1 ? 's' : ''}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default AppOverview;