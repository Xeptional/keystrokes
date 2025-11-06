import { useState, useContext, useMemo } from 'react';
import { X } from 'lucide-react';
import { ThemeContext, SettingsContext } from '../context/AppContexts';
import SearchBox from './SearchBox';
import DocListItem from './DocListItem';
import { mockDocumentationSets } from '../data/mockDocumentationSets';

const Sidebar = ({ isOpen, onClose, onSelectEntry }) => {
  const {theme} = useContext(ThemeContext);
  const {settings} = useContext(SettingsContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedDocs, setExpandedDocs] = useState({});

  const filteredDocs = useMemo(() => {
    return Object.values(mockDocumentationSets).filter(doc => 
      doc.enabled && settings.enabledDocs.includes(doc.id)
    );
  }, [settings.enabledDocs]);

  const toggleExpanded = (docId) => {
    setExpandedDocs(prev => ({
      ...prev,
      [docId]: !prev[docId]
    }));
  };
  
  const handleSelectEntry = (docId, entry) => {
    onSelectEntry({ docId, entry });
    if(window.innerWidth < 760) { onClose() };
  }

    return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}
      
      {/* Sidebar */}
      {/* <div className="bg-red p-4 border-green-400">This is a test component</div> */}
      <aside
        className={`fixed left-0 top-0 h-full w-80 transform transition-transform duration-300 ease-in-out z-50 md:relative md:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${theme === 'dark' ? 'bg-gray-900 border-gray-700' : 'bg-gray-50 border-gray-200'} border-r flex flex-col`}
        aria-label="Documentation navigation"
        role="navigation"
      >
        {/* Mobile close button */}
        <div className="md:hidden flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
          <span className={`font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>
            Navigation
          </span>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
              theme === 'dark' 
                ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
                : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
            }`}
            aria-label="Close sidebar"
            tabIndex={0}
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <SearchBox 
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />
        
        <div className="flex-1 overflow-y-auto p-4">
          {filteredDocs.length === 0 ? (
            <div className={`text-center py-8 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
              <p className="text-sm">No documentation sets enabled.</p>
              <p className="text-xs mt-2">Enable docs in settings.</p>
            </div>
          ) : (
            <nav aria-label="Documentation sections">
              {filteredDocs.map(doc => (
                <DocListItem
                  key={doc.id}
                  doc={doc}
                  isExpanded={expandedDocs[doc.id]}
                  onToggle={() => toggleExpanded(doc.id)}
                  onSelect={handleSelectEntry}
                  searchTerm={searchTerm}
                />
              ))}
            </nav>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;