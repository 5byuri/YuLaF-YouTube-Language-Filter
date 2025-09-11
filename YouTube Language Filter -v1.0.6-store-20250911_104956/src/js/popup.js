import { StorageManager } from '../popup/storage-manager.js';
import { UIManager } from '../popup/ui-manager.js';
import { ToggleHandler } from '../popup/toggle-handler.js';
import { LanguageHandler } from '../popup/language-handler.js';

class PopupController {
  constructor() {
    this.tab = null;
    this.storageManager = new StorageManager();
    this.uiManager = new UIManager();
    this.toggleHandler = null;
    this.languageHandler = null;
    this.listenersAdded = false;
    this.init();
  }

  async init() {
    try {
      // Get active tab
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      this.tab = tab;

      // Not YouTube → show special screen
      if (!tab.url.includes('youtube.com')) {
        this.uiManager.showNonYouTubePage();
        this.uiManager.setupNonYouTubeEventListeners();
        return;
      }

      // Init handlers
      this.toggleHandler = new ToggleHandler(this.storageManager, this.uiManager, tab);
      this.languageHandler = new LanguageHandler(this.storageManager, this.uiManager, tab);

      // Load current state + languages
      const [state, languages] = await Promise.all([
        this.storageManager.loadCurrentState(tab),
        this.storageManager.loadLanguages(tab)
      ]);

      // Apply state
      this.toggleHandler.setCurrentState(state);
      this.languageHandler.setCurrentState(state);
      this.languageHandler.setLanguages(languages);

      // Setup
      this.setupEventListeners();
      this.updateUI(state);

      // Fade-in UI
      setTimeout(() => this.uiManager.showLoaded(), 100);
    } catch (err) {
      console.error('Popup init error:', err);
      setTimeout(() => this.uiManager.showLoaded(), 100);
    }
  }

  updateUI(state) {
    this.toggleHandler.updateToggles(state);
    this.uiManager.updateSortUI(state.sortBy || 'popularity');
    this.languageHandler.renderLanguages();
    this.uiManager.setupLanguageExpansion();
  }

  setupEventListeners() {
    if (this.listenersAdded) return;

    // Components
    this.toggleHandler.setupEventListeners();
    this.languageHandler.setupEventListeners();

    // Global click handler (close dropdowns etc.)
    document.addEventListener('click', (e) => {
      const langSel = document.querySelector('.language-selector');
      const sortCont = document.querySelector('.sort-container');

      if (langSel && !langSel.contains(e.target)) {
        document.getElementById('languageOptions')?.classList.remove('expanded', 'force-open');
      }
      if (sortCont && !sortCont.contains(e.target)) {
        document.getElementById('sortDropdown')?.classList.remove('show');
        document.getElementById('sortButton')?.classList.remove('active');
      }
    });

    this.setupFooterButtons();

    // Listen for storage updates
    chrome.storage.onChanged.addListener((changes, area) => {
      if (area === 'sync') this.handleStorageChanges(changes);
    });

    this.listenersAdded = true;
  }

  setupFooterButtons() {
    const openTab = (url, cb) =>
      chrome.tabs.create({ url }, cb).then(() => window.close());

    document.getElementById('guideBtn')?.addEventListener('click', () =>
      openTab(chrome.runtime.getURL('src/html/welcome.html'))
    );

    document.getElementById('feedbackBtn')?.addEventListener('click', () =>
      chrome.tabs.create({ url: chrome.runtime.getURL('src/html/welcome.html') }, (tab) => {
        setTimeout(() => chrome.tabs.sendMessage(tab.id, { action: 'openFeedback' }).catch(() => {}), 1500);
      }).then(() => window.close())
    );

    document.getElementById('rateUsBtn')?.addEventListener('click', () =>
      openTab('https://chromewebstore.google.com/detail/yulaf-youtube-language-fi/ejfoldoabjeidjdddhomeaojicaemdpm')
    );

    document.getElementById('coffeeBtn')?.addEventListener('click', () =>
      openTab('https://buymeacoffee.com/yulafdev')
    );
  }

  handleStorageChanges(changes) {
    const current = this.toggleHandler.currentState;
    const newState = { ...current };
    let changed = false;

    for (const key in changes) {
      if (key in current && JSON.stringify(changes[key].newValue) !== JSON.stringify(current[key])) {
        newState[key] = changes[key].newValue;
        changed = true;
      }
    }

    if (changed) {
      this.toggleHandler.setCurrentState(newState);
      this.languageHandler.setCurrentState(newState);
      this.updateUI(newState);
    }
  }
}

// Boot
document.addEventListener('DOMContentLoaded', () => new PopupController());
