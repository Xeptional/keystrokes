import { useContext } from 'react';
import { ThemeContext } from '../context/AppContexts';

const CodeBlock = ({ code, language }) => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <pre 
      className={`p-4 rounded-lg overflow-x-auto text-sm my-4 ${
        theme === 'dark' ? 'bg-gray-900 text-gray-300' : 'bg-gray-100 text-gray-800'
      }`}
      tabIndex={0}
      role="region"
      aria-label={`Code example in ${language}`}
    >
      <code className={`language-${language}`}>{code}</code>
    </pre>
  );
};

export default CodeBlock;