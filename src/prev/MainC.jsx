import { useContext } from "react";
import { Home, ChevronRight, ExternalLink } from 'lucide-react';
import { ThemeContext } from "../context/AppContexts";
import { mockDocumentationSets } from "../data/mockDocumentationSets";
import MarkdownRenderer from "./MarkdownRenderer";

const MainContent = ({ selectedEntry }) => {
  const { theme } = useContext(ThemeContext);

  if(!selectedEntry) {
    return (
      <div 
        id="main-content"
        className={`flex-1 flex items-center justify-center p-6 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
        role="main"
        tabIndex={-1}
      >
        <div className="text-center max-w-md">
          <Home 
            size={64} 
            className={`mx-auto mb-6 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}`}
            aria-hidden="true"
          />
          <h2 className={`text-3xl font-semibold mb-3 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to KeyStrokes
          </h2>
          <p className={`text-base ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
            Select a documentation entry from the sidebar to get started.
          </p>
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-50 text-gray-600'
          }`}>
            <p className="text-sm font-medium mb-2">Keyboard Shortcuts:</p>
            <ul className="text-xs space-y-1 text-left max-w-xs mx-auto">
              <li><kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">/</kbd> or <kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+K</kbd> - Focus search</li>
              <li><kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+D</kbd> - Toggle theme</li>
              <li><kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Ctrl+H</kbd> - Go to home</li>
              <li><kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Alt+S</kbd> - Toggle sidebar</li>
              <li><kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Tab</kbd> - Navigate forward</li>
              <li><kbd className="font-mono px-1.5 py-0.5 bg-gray-200 dark:bg-gray-700 rounded">Shift+Tab</kbd> - Navigate backward</li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <main 
      id="main-content"
      className={`flex-1 overflow-y-auto ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`}
      role="main"
      tabIndex={-1}
    >
      <div className="max-w-4xl mx-auto p-6 md:p-8">
        <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
          <a href="#"
            onClick={(e) => e.preventDefault()}
            className={`hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
              theme === 'dark' ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'
            }`}
            tabIndex={0}
          >
            {mockDocumentationSets[selectedEntry.docId].name}
          </a>
          <ChevronRight 
            size={16} 
            className={theme === 'dark' ? 'text-gray-600' : 'text-gray-400'}
            aria-hidden="true"
          />
          <span 
            className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}
            aria-current="page"
          >
            {selectedEntry.entry.name}
          </span>
        </nav>
        
        <article className="prose prose-lg max-w-none">
          <MarkdownRenderer content={selectedEntry.entry.content} />
        </article>
        
        <footer className={`mt-12 pt-6 border-t ${
          theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
        }`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>
              <time dateTime={new Date().toISOString()}>
                Last updated: Just now
              </time>
            </div>
            <a href="#"
              className={`inline-flex items-center gap-1 text-sm hover:underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded ${
                theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
              }`}
              onClick={(e) => e.preventDefault()}
              tabIndex={0}
            >
              View source <ExternalLink size={14} aria-hidden="true" />
            </a>
          </div>
        </footer>
      </div>
    </main>
  )
};

export default MainContent;