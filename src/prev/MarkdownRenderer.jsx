import { useContext } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { ThemeContext, BookmarksContext } from '../context/AppContexts';
import CodeBlock from './CodeBlock';

const MarkdownRenderer = ({ content }) => {
  const { theme } = useContext(ThemeContext);
  const { bookmarks, toggleBookmark } = useContext(BookmarksContext);
  
  const lines = content.split('\n');
  const elements = [];
  let currentCodeBlock = null;
  let currentLanguage = '';
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    if (line.startsWith('```')) {
      if (currentCodeBlock === null) {
        currentLanguage = line.slice(3);
        currentCodeBlock = [];
      } else {
        elements.push(
          <CodeBlock 
            key={i} 
            code={currentCodeBlock.join('\n')} 
            language={currentLanguage} 
          />
        );
        currentCodeBlock = null;
        currentLanguage = '';
      }
      continue;
    }
    
    if (currentCodeBlock !== null) {
      currentCodeBlock.push(line);
      continue;
    }
    
    if (line.startsWith('# ')) {
      const title = line.slice(2);
      const isBookmarked = bookmarks.some(b => b.title === title);
      elements.push(
        <div key={i} className="flex items-start justify-between gap-4 mb-6 mt-8">
          <h1 
            className={`text-4xl font-bold flex-1 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
            id={title.toLowerCase().replace(/\s+/g, '-')}
            tabIndex={-1}
          >
            {title}
          </h1>
          <button
            onClick={() => toggleBookmark({ title, content: line })}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleBookmark({ title, content: line });
              }
            }}
            className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 flex-shrink-0 ${
              theme === 'dark' ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
            aria-label={isBookmarked ? `Remove ${title} from bookmarks` : `Add ${title} to bookmarks`}
            aria-pressed={isBookmarked}
            tabIndex={0}
          >
            {isBookmarked ? 
              <BookmarkCheck size={20} className="text-yellow-500" aria-hidden="true" /> : 
              <Bookmark size={20} className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} aria-hidden="true" />
            }
          </button>
        </div>
      );
    } else if (line.startsWith('## ')) {
      const heading = line.slice(3);
      elements.push(
        <h2 
          key={i} 
          className={`text-3xl font-semibold mt-8 mb-4 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          id={heading.toLowerCase().replace(/\s+/g, '-')}
          tabIndex={-1}
        >
          {heading}
        </h2>
      );

    } else if (line.startsWith('### ')) {
      const heading = line.slice(4);
      elements.push(
        <h3 
          key={i} 
          className={`text-2xl font-semibold mt-6 mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}
          id={heading.toLowerCase().replace(/\s+/g, '-')}
          tabIndex={-1}
        >
          {heading}
        </h3>
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i} className="h-4" />);
    } else if (line.startsWith('- ')) {
      elements.push(
        <li 
          key={i} 
          className={`ml-6 mb-2 leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {line.slice(2)}
        </li>
      );
    } else if (line.match(/^\d+\.\s/)) {
      const text = line.replace(/^\d+\.\s/, '');
      elements.push(
        <li 
          key={i} 
          className={`ml-6 mb-2 leading-relaxed list-decimal ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {text}
        </li>
      );
    } else {
      // Handle inline code and bold text
      const processedLine = line
        .replace(/`([^`]+)`/g, '<code class="bg-gray-200 dark:bg-gray-700 px-1.5 py-0.5 rounded text-sm">$1</code>')
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
      
      elements.push(
        <p 
          key={i} 
          className={`mb-4 leading-relaxed text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
          dangerouslySetInnerHTML={{ __html: processedLine }}
        />
      );
    }
  }
  
  return <div role='article'>{elements}</div>;
}

export default MarkdownRenderer