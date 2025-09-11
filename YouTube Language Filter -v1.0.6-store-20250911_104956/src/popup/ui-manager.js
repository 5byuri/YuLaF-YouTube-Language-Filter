export class UIManager {
  constructor() {
    this.container = document.querySelector('.container');
  }

  showLoaded() {
    this.container?.classList.add('loaded');
    if (this.container) this.container.style.opacity = '1';
  }

  updateStatusText(enabled) {
    const statusText = document.getElementById('statusText');
    if (statusText) {
      statusText.textContent = enabled ? 'Filter Enabled' : 'Filter Disabled';
      statusText.style.color = enabled ? '#10B981' : '#aaa';
    }
  }

  updateStrictModeUI(filterEnabled, strictModeEnabled) {
    const strictModeToggle = document.getElementById('strictModeToggle');
    const strictModeText = document.getElementById('strictModeText');
    const toggleGroup = strictModeToggle?.closest('.toggle-group');

    if (filterEnabled) {
      toggleGroup?.classList.remove('disabled');
      if (strictModeText) {
        strictModeText.style.color = strictModeEnabled ? 'var(--text-primary)' : 'var(--text-secondary)';
      }
    } else {
      toggleGroup?.classList.add('disabled');
      if (strictModeText) strictModeText.style.color = 'var(--text-secondary)';
    }
  }

  updateLanguageSelectorVisibility(enabled) {
    const languageSelector = document.querySelector('.language-selector');
    if (languageSelector) {
      enabled
        ? languageSelector.classList.remove('disabled')
        : languageSelector.classList.add('disabled');
    }
  }

  updateSelectedCount(count) {
    const selectedCount = document.getElementById('selectedCount');
    if (selectedCount) selectedCount.textContent = count;
  }

  updateSortUI(currentSortBy) {
    const sortText = document.querySelector('.sort-text');
    if (sortText) sortText.textContent = 'Sort by';

    const sortOptions = document.querySelectorAll('.sort-option');
    sortOptions.forEach(option => {
      option.classList.remove('active');
      if (option.dataset.sort === currentSortBy) {
        option.classList.add('active');
      }
    });
  }

  setButtonLoading(buttonId, loading = true) {
    const button = document.getElementById(buttonId);
    if (button) {
      button.classList.toggle('loading', loading);
      button.disabled = loading;
    }
  }

  showNonYouTubePage() {
    document.body.style.cssText = 'margin: 0; padding: 0; overflow: hidden;';
    document.body.innerHTML = `
      <div style="
        width: 380px;
        min-height: 420px;
        padding: 40px 30px;
        background: linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 100%);
        color: #fff;
        text-align: center;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        box-sizing: border-box;
        margin: 0;
        position: relative;
        opacity: 1;
      ">
        <div style="
          width: 85px;
          height: 85px;
          background: linear-gradient(45deg, #ff0000, #ff4444);
          border-radius: 22px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 2.8rem;
          box-shadow: 0 10px 30px rgba(255, 0, 0, 0.4);
          margin-bottom: 10px;
          transform: scale(1);
          transition: transform 0.3s ease;
        ">
          🎯
        </div>
        
        <h2 style="
          margin: 0;
          font-size: 1.5rem;
          font-weight: 700;
          color: #fff;
          line-height: 1.3;
        ">
          YuLaF is Ready!
        </h2>
        
        <p style="
          margin: 0;
          font-size: 1.05rem;
          color: #ccc;
          line-height: 1.6;
          max-width: 300px;
        ">
          Please visit <strong style="color: #ff4444;">YouTube</strong> to start filtering videos by language.
        </p>
        
        <button id="goToYouTubeBtn" style="
          background: linear-gradient(45deg, #ff0000, #ff2222);
          color: white;
          border: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
          display: flex; justify-content: center; align-items: center;
          box-shadow: 0 5px 15px rgba(255, 0, 0, 0.3);
        ">
          Go to YouTube
        </button>
        
        <div style="
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-template-rows: 1fr 1fr;
          gap: 12px;
          margin-top: 25px;
          padding-top: 25px;
          border-top: 1px solid #333;
          width: 100%;
          max-width: 300px;
        ">
          <button id="guideBtn" style="
            background: linear-gradient(45deg, #ff0000, #ff2222);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex; justify-content: center; align-items: center;
            min-height: 42px;
          ">
            📘 Guide
          </button>
          
          <button id="feedbackBtn" style="
            background: linear-gradient(45deg, #10B981, #34D399);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex; justify-content: center; align-items: center;
            min-height: 42px;
          ">
            📝 Feedback
          </button>

          <button id="rateUsBtn" style="
            background: linear-gradient(45deg, #F59E0B, #FBBF24);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex; justify-content: center; align-items: center;
            min-height: 42px;
          ">
            ⭐ Rate Us
          </button>

          <button id="coffeeBtn" style="
            background: linear-gradient(45deg, #8B5CF6, #FF6B6B);
            color: white;
            border: none;
            padding: 12px 16px;
            border-radius: 8px;
            font-size: 0.95rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex; justify-content: center; align-items: center;
            min-height: 42px;
          ">
            ☕ Donate Us
          </button>
        </div>
        
        <p style="
          margin: 20px 0 0 0;
          font-size: 0.85rem;
          color: #666;
          font-style: italic;
        ">
          YouTube Language Filter - YuLaF
        </p>
      </div>
    `;
  }

  setupNonYouTubeEventListeners() {
    setTimeout(() => {
      const goToYouTubeBtn = document.getElementById('goToYouTubeBtn');
      const guideBtn = document.getElementById('guideBtn');
      const feedbackBtn = document.getElementById('feedbackBtn');
      const rateUsBtn = document.getElementById('rateUsBtn');
      const coffeeBtn = document.getElementById('coffeeBtn');

      const addHoverEffect = (btn, hoverStyle, originalStyle) => {
        if (!btn) return;
        btn.addEventListener('mouseover', () => Object.assign(btn.style, hoverStyle));
        btn.addEventListener('mouseout', () => Object.assign(btn.style, originalStyle));
      };

      if (goToYouTubeBtn) {
        goToYouTubeBtn.addEventListener('click', () => {
          chrome.tabs.create({ url: 'https://www.youtube.com' });
          window.close();
        });
        addHoverEffect(goToYouTubeBtn, {
          background: 'linear-gradient(45deg, #ff2222, #ff4444)',
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 25px rgba(255, 0, 0, 0.5)'
        }, {
          background: 'linear-gradient(45deg, #ff0000, #ff2222)',
          transform: 'translateY(0)',
          boxShadow: '0 5px 15px rgba(255, 0, 0, 0.3)'
        });
      }

      if (guideBtn) {
        guideBtn.addEventListener('click', () => {
          chrome.tabs.create({ url: chrome.runtime.getURL('src/html/welcome.html') });
          window.close();
        });
      }

      if (feedbackBtn) {
        feedbackBtn.addEventListener('click', () => {
          chrome.tabs.create({ url: chrome.runtime.getURL('src/html/welcome.html') }, (tab) => {
            setTimeout(() => {
              chrome.tabs.sendMessage(tab.id, { action: 'openFeedback' }).catch(() => {});
            }, 1500);
          });
          window.close();
        });
      }

      if (rateUsBtn) {
        rateUsBtn.addEventListener('click', () => {
          chrome.tabs.create({ url: 'https://chromewebstore.google.com/detail/yulaf-youtube-language-fi/ejfoldoabjeidjdddhomeaojicaemdpm' });
          window.close();
        });
      }

      if (coffeeBtn) {
        coffeeBtn.addEventListener('click', () => {
          chrome.tabs.create({ url: 'https://buymeacoffee.com/yulafdev' });
          window.close();
        });
      }
    }, 100);
  }

  setupLanguageExpansion() {
    document.addEventListener('click', (e) => {
      const languageSelector = document.querySelector('.language-selector');
      const languageOptions = document.getElementById('languageOptions');
      if (languageSelector && !languageSelector.contains(e.target)) {
        languageOptions?.classList.remove('expanded', 'force-open');
        document.body.classList.remove('language-expanded');
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const languageOptions = document.getElementById('languageOptions');
        languageOptions?.classList.remove('expanded', 'force-open');
        document.body.classList.remove('language-expanded');
      }
    });
  }
}
