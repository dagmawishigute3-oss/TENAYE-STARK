export interface LanguageOption {
  code: string;          // Google Translate code e.g. 'en', 'am', 'om', 'ti', 'so', 'es', 'fr', 'ar'
  label: string;         // English display name e.g. 'English', 'Amharic', 'Spanish'
  native: string;        // Native script e.g. 'English', 'አማርኛ', 'Español'
  countryCode: string;   // 2-letter uppercase badge e.g. 'US', 'ET', 'SO', 'ES', 'FR'
  region: 'Horn of Africa' | 'Middle East & Africa' | 'Europe' | 'Asia' | 'Americas';
}

// 20 Primary Languages displayed in the direct dropdown (5 local + 15 common international)
export const PRIMARY_LANGUAGES: LanguageOption[] = [
  { code: 'en',    label: 'English',       native: 'English',          countryCode: 'US', region: 'Americas' },
  { code: 'am',    label: 'Amharic',       native: 'አማርኛ',              countryCode: 'ET', region: 'Horn of Africa' },
  { code: 'om',    label: 'Afan Oromo',    native: 'Afaan Oromoo',     countryCode: 'ET', region: 'Horn of Africa' },
  { code: 'ti',    label: 'Tigrinya',      native: 'ትግርኛ',              countryCode: 'ET', region: 'Horn of Africa' },
  { code: 'so',    label: 'Somali',        native: 'Soomaali',         countryCode: 'SO', region: 'Horn of Africa' },
  { code: 'es',    label: 'Spanish',       native: 'Español',          countryCode: 'ES', region: 'Europe' },
  { code: 'fr',    label: 'French',        native: 'Français',         countryCode: 'FR', region: 'Europe' },
  { code: 'ar',    label: 'Arabic',        native: 'العربية',          countryCode: 'SA', region: 'Middle East & Africa' },
  { code: 'sw',    label: 'Swahili',       native: 'Kiswahili',        countryCode: 'KE', region: 'Middle East & Africa' },
  { code: 'de',    label: 'German',        native: 'Deutsch',          countryCode: 'DE', region: 'Europe' },
  { code: 'zh-CN', label: 'Chinese',       native: '中文 (简体)',       countryCode: 'CN', region: 'Asia' },
  { code: 'hi',    label: 'Hindi',         native: 'हिन्दी',             countryCode: 'IN', region: 'Asia' },
  { code: 'pt',    label: 'Portuguese',    native: 'Português',        countryCode: 'PT', region: 'Europe' },
  { code: 'ru',    label: 'Russian',       native: 'Русский',          countryCode: 'RU', region: 'Europe' },
  { code: 'it',    label: 'Italian',       native: 'Italiano',         countryCode: 'IT', region: 'Europe' },
  { code: 'ja',    label: 'Japanese',      native: '日本語',            countryCode: 'JP', region: 'Asia' },
  { code: 'tr',    label: 'Turkish',       native: 'Türkçe',           countryCode: 'TR', region: 'Middle East & Africa' },
  { code: 'ko',    label: 'Korean',        native: '한국어',            countryCode: 'KR', region: 'Asia' },
  { code: 'nl',    label: 'Dutch',         native: 'Nederlands',       countryCode: 'NL', region: 'Europe' },
  { code: 'sv',    label: 'Swedish',       native: 'Svenska',          countryCode: 'SE', region: 'Europe' },
];

// Expanded comprehensive languages accessible via "More Languages..." modal
export const ALL_LANGUAGES: LanguageOption[] = [
  ...PRIMARY_LANGUAGES,
  { code: 'id',    label: 'Indonesian',    native: 'Bahasa Indonesia', countryCode: 'ID', region: 'Asia' },
  { code: 'vi',    label: 'Vietnamese',    native: 'Tiếng Việt',       countryCode: 'VN', region: 'Asia' },
  { code: 'pl',    label: 'Polish',        native: 'Polski',           countryCode: 'PL', region: 'Europe' },
  { code: 'uk',    label: 'Ukrainian',     native: 'Українська',       countryCode: 'UA', region: 'Europe' },
  { code: 'fa',    label: 'Persian',       native: 'فارسی',            countryCode: 'IR', region: 'Middle East & Africa' },
  { code: 'iw',    label: 'Hebrew',        native: 'עברית',            countryCode: 'IL', region: 'Middle East & Africa' },
  { code: 'ur',    label: 'Urdu',          native: 'اردو',             countryCode: 'PK', region: 'Asia' },
  { code: 'bn',    label: 'Bengali',       native: 'বাংলা',            countryCode: 'BD', region: 'Asia' },
  { code: 'th',    label: 'Thai',          native: 'ไทย',              countryCode: 'TH', region: 'Asia' },
  { code: 'ro',    label: 'Romanian',      native: 'Română',           countryCode: 'RO', region: 'Europe' },
  { code: 'el',    label: 'Greek',         native: 'Ελληνικά',         countryCode: 'GR', region: 'Europe' },
  { code: 'cs',    label: 'Czech',         native: 'Čeština',          countryCode: 'CZ', region: 'Europe' },
  { code: 'hu',    label: 'Hungarian',     native: 'Magyar',           countryCode: 'HU', region: 'Europe' },
  { code: 'da',    label: 'Danish',        native: 'Dansk',            countryCode: 'DK', region: 'Europe' },
  { code: 'fi',    label: 'Finnish',       native: 'Suomi',            countryCode: 'FI', region: 'Europe' },
  { code: 'no',    label: 'Norwegian',     native: 'Norsk',            countryCode: 'NO', region: 'Europe' },
  { code: 'tl',    label: 'Filipino',      native: 'Tagalog',          countryCode: 'PH', region: 'Asia' },
  { code: 'ms',    label: 'Malay',         native: 'Bahasa Melayu',    countryCode: 'MY', region: 'Asia' },
  { code: 'ha',    label: 'Hausa',         native: 'Harshen Hausa',    countryCode: 'NG', region: 'Middle East & Africa' },
  { code: 'yo',    label: 'Yoruba',        native: 'Èdè Yorùbá',       countryCode: 'NG', region: 'Middle East & Africa' },
  { code: 'zu',    label: 'Zulu',          native: 'isiZulu',          countryCode: 'ZA', region: 'Middle East & Africa' },
];

/**
 * Read the active language from localStorage or the Google Translate cookie
 */
export function getSavedLanguage(): LanguageOption {
  if (typeof window === 'undefined') return PRIMARY_LANGUAGES[0];

  const saved = localStorage.getItem('tenaye_lang');
  if (saved) {
    const found = ALL_LANGUAGES.find(l => l.code.toLowerCase() === saved.toLowerCase());
    if (found) return found;
  }

  // Check googtrans cookie: format is typically "/auto/lang" or "/en/lang"
  const match = document.cookie.match(/(?:^|;\s*)googtrans=([^;]*)/);
  if (match && match[1]) {
    const parts = decodeURIComponent(match[1]).split('/');
    const code = parts[parts.length - 1];
    if (code) {
      const found = ALL_LANGUAGES.find(l => l.code.toLowerCase() === code.toLowerCase());
      if (found) return found;
    }
  }

  return PRIMARY_LANGUAGES[0]; // English default
}

/**
 * Set the Google Translate cookie on all paths and domains
 */
function setGoogleTransCookie(langCode: string) {
  const cookieValue = `/en/${langCode}`;
  const autoValue = `/auto/${langCode}`;
  
  // Set both /en/ and /auto/ to guarantee Google Translate catches the target language
  document.cookie = `googtrans=${cookieValue}; path=/; max-age=31536000; SameSite=Lax`;
  document.cookie = `googtrans=${autoValue}; path=/; max-age=31536000; SameSite=Lax`;
  
  const hostname = window.location.hostname;
  if (hostname && hostname !== 'localhost') {
    document.cookie = `googtrans=${cookieValue}; domain=.${hostname}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `googtrans=${cookieValue}; domain=${hostname}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `googtrans=${autoValue}; domain=.${hostname}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `googtrans=${autoValue}; domain=${hostname}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

/**
 * Clear the Google Translate cookie to restore original site
 */
function clearGoogleTransCookie() {
  const expired = 'googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = expired;
  document.cookie = 'googtrans=/en/en; path=/; max-age=31536000; SameSite=Lax';
  
  const hostname = window.location.hostname;
  if (hostname && hostname !== 'localhost') {
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=.${hostname}; path=/;`;
    document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${hostname}; path=/;`;
    document.cookie = `googtrans=/en/en; domain=.${hostname}; path=/; max-age=31536000; SameSite=Lax`;
    document.cookie = `googtrans=/en/en; domain=${hostname}; path=/; max-age=31536000; SameSite=Lax`;
  }
}

/**
 * Translate the entire website dynamically to the target language
 */
export function setWebsiteLanguage(lang: LanguageOption, reloadOnFallback = true): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem('tenaye_lang', lang.code);
    window.dispatchEvent(new CustomEvent('tenaye-lang-change', { detail: { lang: lang.code } }));

    // When switching back to English, clear cookies and perform clean fast reload
    if (lang.code === 'en') {
      clearGoogleTransCookie();
      const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (combo) {
        combo.value = 'en';
        combo.dispatchEvent(new Event('change', { bubbles: true }));
      }
      setTimeout(() => {
        window.location.reload();
      }, 100);
      return;
    }

    // When switching to any non-English language:
    setGoogleTransCookie(lang.code);

    const combo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
    if (combo) {
      combo.value = lang.code;
      combo.dispatchEvent(new Event('change', { bubbles: true }));
      combo.dispatchEvent(new Event('input', { bubbles: true }));
      return;
    }

    // Fast polling if combo is not immediately found (50ms interval)
    let attempts = 0;
    const interval = setInterval(() => {
      attempts++;
      const lateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (lateCombo) {
        lateCombo.value = lang.code;
        lateCombo.dispatchEvent(new Event('change', { bubbles: true }));
        lateCombo.dispatchEvent(new Event('input', { bubbles: true }));
        clearInterval(interval);
      } else if (attempts >= 6) {
        clearInterval(interval);
        if (reloadOnFallback) {
          window.location.reload();
        }
      }
    }, 50);
  } catch (err) {
    console.error('Error applying website translation:', err);
    if (reloadOnFallback) {
      window.location.reload();
    }
  }
}

/**
 * Proactively eliminate Google Translate logo, arc spinners, and banners
 */
if (typeof window !== 'undefined') {
  const purgeGoogleBranding = () => {
    // Hide any external element injected directly into body outside #root (spinners, iframes, tooltips)
    document.querySelectorAll('body > :not(#root):not(script):not(style)').forEach(node => {
      const el = node as HTMLElement;
      el.style.setProperty('display', 'none', 'important');
      el.style.setProperty('visibility', 'hidden', 'important');
      el.style.setProperty('opacity', '0', 'important');
      el.style.setProperty('pointer-events', 'none', 'important');
      el.style.setProperty('width', '0', 'important');
      el.style.setProperty('height', '0', 'important');
    });

    const specificSelectors = [
      'div.VIpgJd-ZVi9od-ORHb-OEVmcb',
      'div.VIpgJd-ZVi9od-ORHb',
      'div.VIpgJd-ZVi9od-l4eHX-hSRGPd',
      'div.VIpgJd-ZVi9od-SmMuJa',
      '.goog-te-spinner-pos',
      '.goog-te-spinner',
      '.goog-te-spinner-animation',
      '.goog-te-gadget',
      '.goog-te-gadget-icon',
      '.goog-te-gadget-simple',
      '.goog-logo-link',
      '#goog-gt-tt',
      '.goog-te-balloon-frame',
      '.goog-te-banner-frame',
      'iframe.goog-te-banner-frame',
      'iframe[id*=":1.container"]',
      'iframe[id*=":2.container"]'
    ];

    specificSelectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(node => {
        const el = node as HTMLElement;
        el.style.setProperty('display', 'none', 'important');
        el.style.setProperty('visibility', 'hidden', 'important');
        el.style.setProperty('opacity', '0', 'important');
        el.style.setProperty('pointer-events', 'none', 'important');
      });
    });

    if (document.body && document.body.style.top && document.body.style.top !== '0px') {
      document.body.style.setProperty('top', '0px', 'important');
    }
  };

  // Initial and DOMContentLoaded triggers
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', purgeGoogleBranding);
  } else {
    purgeGoogleBranding();
  }

  // Active observer monitoring direct children of body for fast, reliable spinner suppression
  try {
    const observer = new MutationObserver(() => {
      purgeGoogleBranding();
    });
    if (document.body) {
      observer.observe(document.body, {
        childList: true,
        subtree: false
      });
    }
  } catch {
    // Ignore in non-browser environments
  }
}

