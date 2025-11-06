import { useContext } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { ThemeContext, BookmarksContext } from '../contexts/AppContexts';

const ShortcutCard = ({ shortcut, appSlug, categoryName }) => {
  const { theme } = useContext(ThemeContext);
  const { isBookmarked, toggleBookmark } = useContext(BookmarksContext);

  //Generate unique id for shortcuts - changes later in SQL database
  const shortcutId = `${appSlug}-${categoryName}-${shortcut.action}`.toLowerCase().replace(/\s+/g, '-');
  const bookmarked = isBookmarked(appSlug, shortcutId);

  const handleBookmarkToggle = () => {
    toggleBookmark(appSlug, shortcutId);
  };

  return (
    <article 
      id={shortcutId}
      className={`mb-8 pb-8 border-b scroll-mt-24 ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
      }`}
      tabIndex={0}
      aria-labelledby={`${shortcutId}-title`}
    >
      <div className="flex items-start justify-between gap-4 mb-4">
        <h3 
          id={`${shortcutId}-title`}
          className={`text-2xl font-semibold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
        >
          {shortcut.action}
        </h3>
        <button
          onClick={handleBookmarkToggle}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleBookmarkToggle();
            }
          }}
          className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 flex-shrink-0 ${
            theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
          }`}
          aria-label={bookmarked ? `Remove ${shortcut.action} from bookmarks` : `Add ${shortcut.action} to bookmarks`}
          aria-pressed={bookmarked}
          tabIndex={0}
        >
          {bookmarked ? 
            <BookmarkCheck size={20} className="text-yellow-500" aria-hidden="true" /> : 
            <Bookmark size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} aria-hidden="true" />
          }
        </button>
      </div>

      {/* Keyboard shortcuts */}
      <div className="mb-4">
        <h4 className={`text-sm font-medium mb-2 ${
          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Keyboard Shortcut:
        </h4>
        <div className="flex flex-wrap gap-3">
          {shortcut.variants ? (
            shortcut.variants.map((variant, index) => (
              <div key={index} className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'
              }`}>
                <span className={`text-sm font-medium ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {variant.os}:
                </span>
                <kbd className={`px-3 py-1 text-sm font-mono rounded ${
                  theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 border border-gray-300'
                }`}>
                  {variant.keys}
                </kbd>
              </div>
            ))
          ) : (
            <kbd className={`px-3 py-1 text-sm font-mono rounded ${
              theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-white text-gray-900 border border-gray-300'
            }`}>
              {shortcut.keys}
            </kbd>
          )}
        </div>
      </div>

      {/* Context */}
      {shortcut.context && (
        <div className="mb-3">
          <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
            theme === 'dark' ? 'bg-blue-900 text-blue-200' : 'bg-blue-100 text-blue-800'
          }`}>
            {shortcut.context}
          </span>
        </div>
      )}

      {/* Description */}
      <p className={`mb-3 leading-relaxed ${
        theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {shortcut.description}
      </p>

      {/* Notes */}
      {shortcut.notes && (
        <div className={`mt-4 p-4 rounded-lg ${
          theme === 'dark' ? 'bg-gray-800 border-l-4 border-blue-500' : 'bg-blue-50 border-l-4 border-blue-400'
        }`}>
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}>
            <strong className={theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}>
              Note:
            </strong>{' '}
            {shortcut.notes}
          </p>
        </div>
      )}
    </article>
  );
};

export default ShortcutCard;