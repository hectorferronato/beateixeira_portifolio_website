'use strict';
const languageButton = document.querySelector('#language');
let translations;
async function setLanguage(language, updateHistory = true) {
  try {
    if (!translations) {
      const response = await fetch('translations.json');
      if (!response.ok) throw new Error('Translation file unavailable');
      translations = await response.json();
    }
    const locale = ['pt', 'pt-br'].includes(language.toLowerCase()) ? 'pt' : 'en';
    document.querySelectorAll('[data-i18n]').forEach(element => {
      element.innerHTML = translations[element.dataset.i18n][locale];
    });
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
    languageButton.innerHTML = locale === 'pt' ? '🇺🇸 <span>EN</span>' : '🇧🇷 <span>PT</span>';
    languageButton.setAttribute('aria-label', locale === 'pt' ? 'Switch to English' : 'Mudar para português brasileiro');
    document.title = locale === 'pt' ? 'Bea Teixeira | Criadora de conteúdo & UGC' : 'Bea Teixeira | Lifestyle & UGC Creator';
    const url = new URL(window.location.href);
    url.searchParams.set('lang', locale === 'pt' ? 'pt-br' : 'en');
    if (updateHistory) history.pushState(null, '', url);
  } catch (error) {
    console.error(error);
    languageButton.textContent = 'Try again / Tentar novamente';
  }
}
languageButton.addEventListener('click', () => setLanguage(document.documentElement.lang === 'en' ? 'pt' : 'en'));
// The URL is the source of truth; a bare URL always opens in English.
function languageFromUrl() {
  return new URLSearchParams(location.search).get('lang') || 'en';
}
setLanguage(languageFromUrl(), false);
window.addEventListener('popstate', () => setLanguage(languageFromUrl(), false));
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    document.querySelectorAll('[data-category]').forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter;
    });
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();
