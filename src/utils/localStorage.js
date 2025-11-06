const STORAGE_KEYS = {
  BOOKMARKS: 'shortcuts_app_bookmarks',
  ENABLED_APPS: 'shortcuts_app_enabled',
  THEME: 'shortcuts_app_theme',
  USER: 'shortcuts_app_user',
};

export const getBookmarks = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.BOOKMARKS);
    return data ? JSON.parse(data) : {};
  } catch (error) {
    console.error('Error reading bookmarks:', error);
    return {};
  }
};

export const saveBookmarks = (bookmarks) => {
  try {
    localStorage.setItem(STORAGE_KEYS.BOOKMARKS, JSON.stringify(bookmarks));
    return true;
  } catch (error) {
    console.error("Error saving bookmarks: ", error);
    return false;
  }
};

export const addBookmark = (appSlug, shortcutId) => {
  const bookmarks = getBookmarks();
  if(!bookmarks[appSlug]) {
    bookmarks[appSlug] = [];
  }
  if(!bookmarks[appSlug].includes(shortcutId)) {
    bookmarks[appSlug].push(shortcutId);
    saveBookmarks(bookmarks);
  }
};

export const removeBookmarks = (appSlug, shortcutId) => {
  const bookmarks = getBookmarks();
  if(bookmarks[appSlug]) {
    bookmarks[appSlug] = bookmarks[appSlug].filter(id => id !== shortcutId);
    saveBookmarks(bookmarks)
  }
};

export const isBookmarked = (appSlug, shortcutId) => {
  const bookmarks = getBookmarks();
  return bookmarks[appSlug]?.includes(shortcutId) || false;
}

//Enabled apps - array of slugs
export const getEnabledApps = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ENABLED_APPS);
    return data ? JSON.parse(data) : ['adobe-acrobat-reader'] //add other apps
  } catch (error) {
    console.error("Error reading enabled apps: ", error);
    return ['adobe-acrobat-reader']
  }
};

export const saveEnabledApps = (apps) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ENABLED_APPS, JSON.stringify(apps))
    return true;
  } catch (error) {
    console.error("Error saving enabled apps: ", error);
    return false;
  }
};

// Theme: 'light', 'dark', or 'system'
export const getTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEYS.THEME) || 'system';
  } catch (error) {
    console.error('Error reading theme:', error);
    return 'system';
  }
};

export const saveTheme = (theme) => {
  try {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    return true;
  } catch (error) {
    console.error('Error saving theme:', error);
    return false;
  }
};

// User data
export const getUser = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading user:', error);
    return null;
  }
};

export const saveUser = (user) => {
  try {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
    return true;
  } catch (error) {
    console.error('Error saving user:', error);
    return false;
  }
};

export const clearUser = () => {
  try {
    localStorage.removeItem(STORAGE_KEYS.USER);
    return true;
  } catch (error) {
    console.error('Error clearing user:', error);
    return false;
  }
};

// Clear all app data
export const clearAllData = () => {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    return true;
  } catch (error) {
    console.error('Error clearing all data:', error);
    return false;
  }
};