import { useContext, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { ThemeContext } from '../context/AppContexts';

const SearchBox = ({ searchTerm, onSearchChange }) => {
  const {theme} = useContext(ThemeContext);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {

      //Use / or Ctrl+k to focus on search
      if((e.key === '/' && !e.ctrlKey && !e.metaKey && !e.altKey) || ((e.ctrlKey && e.metaKey) && e.key === 'k')) {
        const activeElement = document.activeElement;
        const isInputFocused = activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA';

        if(!isInputFocused) {
          e.preventDefault()
          searchInputRef.current?.focus()
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

    return (
    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
      <div className="relative">
        <Search 
          size={16} 
          className={`absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
          }`}
          aria-hidden="true"
        />
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search docs (Press '/' or Ctrl+K)"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
            theme === 'dark' 
              ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          aria-label="Search documentation"
          role="searchbox"
          tabIndex={0}
        />
      </div>
    </div>
  );
};

export default SearchBox;