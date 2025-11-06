import { useContext, useMemo } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { ThemeContext } from "../context/AppContexts";

const DocListItem = ({doc, isExpanded, onToggle, onSelect, searchTerm }) => {
  const { theme } = useContext(ThemeContext);
  const filteredEntries = useMemo(() => {
    if(!searchTerm) return doc.entries
    return doc.entries.filter(entry => 
      entry.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.content.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [doc.entries, searchTerm]);

    return (
    <div className="mb-1">
      <button
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
          theme === 'dark' 
            ? 'hover:bg-gray-800 text-gray-300 focus:bg-gray-800' 
            : 'hover:bg-gray-100 text-gray-700 focus:bg-gray-100'
        }`}
        aria-expanded={isExpanded}
        aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${doc.name} documentation`}
        tabIndex={0}
      >
        <div className="flex items-center gap-3">
          <span className="text-lg" aria-hidden="true">{doc.icon}</span>
          <div className="text-left">
            <div className="font-medium text-sm">{doc.name}</div>
            <div className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              {doc.version}
            </div>
          </div>
        </div>
        {isExpanded ? (
          <ChevronDown size={16} aria-hidden="true" />
        ) : (
          <ChevronRight size={16} aria-hidden="true" />
        )}
      </button>
      
      {isExpanded && (
        <div className="ml-6 mt-1 space-y-1" role="group" aria-label={`${doc.name} entries`}>
          {filteredEntries.length === 0 ? (
            <div className={`p-3 text-sm ${theme === 'dark' ? 'text-gray-500' : 'text-gray-500'}`}>
              No matching entries
            </div>
          ) : (
            filteredEntries.map(entry => (
              <button
                key={entry.id}
                onClick={() => onSelect(doc.id, entry)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelect(doc.id, entry);
                  }
                }}
                className={`w-full text-left p-2.5 rounded-lg transition-colors focus:ring-2 focus:ring-blue-500 ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-800 text-gray-400 focus:bg-gray-800' 
                    : 'hover:bg-gray-100 text-gray-600 focus:bg-gray-100'
                }`}
                aria-label={`Open ${entry.name} documentation`}
                tabIndex={0}
              >
                <div className="font-medium text-sm">{entry.name}</div>
                <div className={`text-xs mt-0.5 ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
                  {entry.type}
                </div>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DocListItem;