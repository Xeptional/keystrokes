# Shortcuts Guide - Keyboard Shortcuts Reference

A comprehensive, accessible keyboard shortcuts reference application for visually impaired users and keyboard power users.

## Features

- 📚 **Multiple Applications**: Browse shortcuts for 20+ popular applications
- 🔍 **Fast Search**: Quickly find any shortcut by searching through actions, descriptions, and categories
- 🔖 **Bookmarks**: Save your favorite shortcuts for quick access
- ♿ **Fully Accessible**: Complete keyboard navigation and screen reader support
- 🎨 **Theme Options**: Light, Dark, or Browser Default themes
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile devices

## Project Structure
```
src/
├── components/
│   ├── layout/
│   │   ├── Header.jsx          # Top navigation bar
│   │   └── Sidebar.jsx         # Left sidebar with apps and categories
│   ├── shortcuts/
│   │   ├── ShortcutCard.jsx    # Individual shortcut display
│   │   ├── CategoryView.jsx    # Display all shortcuts in a category
│   │   ├── AppOverview.jsx     # Application overview page
│   │   └── MainContent.jsx     # Main content area (home, guide, about)
│   └── modals/
│       └── SettingsModal.jsx   # Settings dialog
├── contexts/
│   └── AppContexts.jsx         # React contexts for state management
├── data/
│   └── applications/
│       ├── adobe-acrobat-reader.json  # Application shortcut data
│       └── index.js            # Data loading and search functions
├── utils/
│   └── localStorage.js         # LocalStorage utility functions
├── App.jsx                     # Main application component
├── main.jsx                    # React entry point
└── index.css                   # Global styles
```

## Data Structure

Each application follows this JSON schema:
```json
{
  "applications": [{
    "name": "Application Name",
    "slug": "application-slug",
    "platforms": ["Windows", "macOS"],
    "description": "Application description with accessibility features",
    "categories": [{
      "name": "Category Name",
      "shortcuts": [{
        "action": "What the shortcut does",
        "keys": "Primary key combination",
        "variants": [
          {"os": "Windows", "keys": "Ctrl + C"},
          {"os": "macOS", "keys": "Cmd + C"}
        ],
        "context": "When this shortcut is available",
        "description": "Detailed description",
        "notes": "Additional information for screen reader users"
      }]
    }]
  }]
}
```

## Adding New Applications

1. Create a new JSON file in `src/data/applications/` following the schema above
2. Import it in `src/data/applications/index.js`:
```javascript
   import newAppData from './new-app.json';
```
3. Add to the applications object:
```javascript
   export const applications = {
     'adobe-acrobat-reader': adobeAcrobatData.applications[0],
     'new-app': newAppData.applications[0],
   };
```

## Keyboard Shortcuts

| Action | Shortcut |
|--------|----------|
| Focus search | `/` or `Ctrl+K` |
| Toggle theme | `Ctrl+D` |
| Open settings | `Ctrl+,` |
| Go to home | `Ctrl+H` |
| Toggle sidebar | `Alt+S` |
| Toggle bookmark | `Ctrl+B` |
| Close / Go home | `Esc` |
| Navigate forward | `Tab` |
| Navigate backward | `Shift+Tab` |

## Accessibility Features

- **Screen Reader Support**: Compatible with JAWS, NVDA, and VoiceOver
- **Keyboard Navigation**: All features accessible via keyboard
- **ARIA Labels**: Proper semantic HTML and ARIA attributes
- **Focus Management**: Clear focus indicators and logical tab order
- **Announcements**: Screen reader announcements for all state changes

## Technologies Used

- **React 18.2** - JavaScript library for building user interfaces
- **Vite** - Next generation frontend tooling
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **Lucide React** - Beautiful & consistent icon toolkit
- **Local Storage API** - For persisting user preferences

## Development
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## License

MIT License - See LICENSE file for details

## Contact

- Email: support@shortcutsguide.com
- GitHub: github.com/shortcuts-guide
- Website: shortcutsguide.com