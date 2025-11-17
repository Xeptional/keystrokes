import adobeAcrobatData from './adobe_acrobat_shortcuts.json';
import dropboxData from './dropbox_shortcuts.json';
import chromeData from './chrome_shortcuts.json';
import edgeData from './edge_shortcuts.json';
import excelData from './excel_shortcuts.json';
import firefoxData from './firefox_shortcuts.json';
import gdocsData from './google_docs_shortcuts.json';
import gdriveData from './google_drive_gmail_shortcuts.json';
import gsheetsData from './google_sheets_shortcuts.json';
import gslidesData from './google_slides_shortcuts.json';
import onedriveData from './onedrive_shortcuts.json';
import outlookData from './outlook_shortcuts.json';
import powerpointData from './powerpoint_shortcuts.json';
import taskManagerData from './task_manager_shortcuts.json';
import teamsData from './teams_shortcuts.json';
import wordData from './word_shortcuts.json';
import zoomData from './zoom_shortcuts.json'



export const applications = {
  'adobe-acrobat': adobeAcrobatData.applications[0],
  'dropbox': dropboxData.applications[0],
  'chrome': chromeData.applications[0],
  'edge': edgeData.applications[0],
  'excel': excelData.applications[0],
  'firefox': firefoxData.applications[0],
  'google-docs': gdocsData.applications[0],
  'google-drive': gdriveData.applications[0],
  'google-sheets': gsheetsData.applications[0],
  'google-slides': gslidesData.applications[0],
  'onedrive': onedriveData.applications[0],
  'outlook': outlookData.applications[0],
  'power-point': powerpointData.applications[0],
  'task-manager': taskManagerData.applications[0],
  'teams': teamsData.applications[0],
  'word': wordData.applications[0],
  'zoom': zoomData.applications[0]

  // add more applications
};

// list of application slugs 
export const getApplicationSlugs = () => Object.keys(applications);

// single application by slug
export const getApplication = (slug) => applications[slug];

// array of applications 
export const getAllApplications = () => Object.values(applications);

//Search accross all applications
export const searchShortcuts = (query, enabledApps = []) => {
  const results = [];
  const searchTerm = query.toLowerCase();

  Object.values(applications).forEach(app => {
    //skip disabled apps
    if(!enabledApps.includes(app.slug)) return;

    app.categories.forEach(category => {
      category.shortcuts.forEach(shortcut => {
        // search action, description, category name
        const matchAction = shortcut.action.toLowerCase().includes(searchTerm);
        const matchDescription = shortcut.description.toLowerCase().includes(searchTerm);
        const matchCategory = category.name.toLowerCase().includes(searchTerm);
        const matchKeys = shortcut.keys.toLowerCase().includes(searchTerm);

        if(matchAction || matchDescription || matchCategory || matchKeys) {
          results.push({
            app,
            category,
            shortcut,
            matchType: matchAction ? 'action' : matchDescription ? 'description' : matchCategory ? 'category' : 'keys'
          });
        }
      });
    });
  });

  return results;
};

/* 
// DYNAMIC IMPORT VERSION (Use this if you have 50+ applications for better performance)

// Dynamic import function
export const loadApplication = async (slug) => {
  try {
    const module = await import(`./applications/${slug}.json`);
    return module.applications[0];
  } catch (error) {
    console.error(`Failed to load application: ${slug}`, error);
    return null;
  }
};

// Load multiple applications
export const loadApplications = async (slugs) => {
  const promises = slugs.map(slug => loadApplication(slug));
  const results = await Promise.all(promises);
  return results.filter(app => app !== null);
};

// Get all available application slugs (you'd need to maintain this list)
export const availableApplications = [
  'adobe-acrobat-reader',
  'microsoft-word',
  'visual-studio-code',
  // ... add all your apps here
];
*/