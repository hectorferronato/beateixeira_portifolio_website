'use strict';
const languageButton = document.querySelector('#language');
let translations;
async function setLanguage(language, updateHistory = true) {
  try {
    if (!translations) {
      const response = await fetch('translations.json?v=80ecfc7606f7');
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
    const locale = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
    document.querySelectorAll('[data-topic-field]').forEach(element => {
      const key = `topic_${button.dataset.filter}_${element.dataset.topicField}`;
      element.dataset.i18n = key;
      if (translations) element.innerHTML = translations[key][locale];
    });
  });
});
document.querySelector('#year').textContent = new Date().getFullYear();

// Keep the chosen topic photograph beside its creative approach.
const topicPhotos = {
  all: ['portrait-2.jpg', 'Bea in New York', 615, 820],
  beauty: ['pink.jpg', 'Bea exploring a pink boutique', 615, 820],
  family: ['bounce.jpg', 'Bea walking with her daughter', 620, 412],
  travel: ['disney.jpg', 'Bea and her daughter at Disney World', 615, 820]
};
document.querySelectorAll('[data-filter]').forEach(button => {
  button.addEventListener('click', () => {
    const [file, alt, width, height] = topicPhotos[button.dataset.filter];
    const photo = document.querySelector('#topic-photo');
    photo.src = `assets/${file}`;
    photo.alt = alt;
    photo.width = width;
    photo.height = height;
  });
});
// Mount only the selected post; Instagram manages the player's own height.
document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    if (button.getAttribute('aria-pressed') === 'true') return;
    document.querySelectorAll('[data-video]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const url = button.dataset.videoUrl;
    const host = document.querySelector('#instagram-player');
    const post = document.createElement('blockquote');
    post.className = 'instagram-media';
    post.dataset.instgrmPermalink = url;
    post.dataset.instgrmVersion = '14';
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.i18n = 'embedfallback';
    const locale = document.documentElement.lang === 'pt-BR' ? 'pt' : 'en';
    link.textContent = translations?.embedfallback[locale] || 'Watch on Instagram';
    post.append(link);
    host.replaceChildren(post);
    document.querySelectorAll('[data-video-field]').forEach(element => {
      const key = element.dataset.videoField + button.dataset.video;
      element.dataset.i18n = key;
      if (translations) element.innerHTML = translations[key][locale];
      if (element.tagName === 'A') element.href = url;
    });
    window.instgrm?.Embeds?.process();
  });
});
