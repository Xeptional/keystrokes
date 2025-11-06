import { useContext } from 'react';
import { ThemeContext } from '../contexts/AppContexts';
import ShortcutCard from './ShortcutCard';

const CategoryView = ({ app, category }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div className="max-w-4xl mx-auto p-6 md:p-8">
      {/* Category Header */}
      <header className="mb-8">
        <h1 className={`text-4xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {category.name}
        </h1>
        <p className={`text-lg ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          {category.shortcuts.length} shortcut{category.shortcuts.length !== 1 ? 's' : ''} in this category
        </p>
      </header>

      {/* Shortcuts List */}
      <div role="list" aria-label={`${category.name} shortcuts`}>
        {category.shortcuts.map((shortcut, index) => (
          <ShortcutCard
            key={index}
            shortcut={shortcut}
            appSlug={app.slug}
            categoryName={category.name}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoryView;