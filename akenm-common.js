(() => {
  'use strict';

  const STORAGE_KEY = 'akenm-language';
  const supported = ['ko', 'en', 'ja', 'zh'];
  const htmlLang = {
    ko: 'ko',
    en: 'en',
    ja: 'ja',
    zh: 'zh-CN'
  };

  const routes = [
    { key: 'home', path: '/home/', local: 'home.html' },
    { key: 'about', path: '/about/', local: 'about.html' },
    { key: 'music', path: '/music/', local: 'music.html' },
    { key: 'film', path: '/film-visual/', local: 'film-visual.html' },
    { key: 'publish', path: '/publications/', local: 'publications.html' },
    { key: 'artists', path: '/artists/', local: 'artists.html' },
    { key: 'atelier', path: '/atelier/', local: 'atelier.html' },
    { key: 'contact', path: '/contact/', local: 'contact.html' }
  ];

  const labels = {
    ko: {
      home: '홈',
      about: '소개',
      music: '음악',
      film: '필름 / 비주얼',
      publish: '출판',
      artists: '아티스트',
      atelier: '아틀리에',
      contact: '문의'
    },
    en: {
      home: 'HOME',
      about: 'ABOUT',
      music: 'MUSIC',
      film: 'FILM / VISUAL',
      publish: 'PUBLISH',
      artists: 'ARTISTS',
      atelier: 'ATELIER',
      contact: 'CONTACT'
    },
    ja: {
      home: 'ホーム',
      about: '紹介',
      music: '音楽',
      film: '映像',
      publish: '出版',
      artists: 'アーティスト',
      atelier: 'アトリエ',
      contact: 'お問い合わせ'
    },
    zh: {
      home: '首页',
      about: '关于',
      music: '音乐',
      film: '影像',
      publish: '出版',
      artists: '艺术家',
      atelier: '创作空间',
      contact: '联系'
    }
  };

  const safeRead = () => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (supported.includes(saved)) return saved;
    } catch (_) {}

    const browser = (navigator.language || 'en')
      .slice(0, 2)
      .toLowerCase();

    return supported.includes(browser) ? browser : 'en';
  };

  const safeWrite = language => {
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch (_) {}
  };

  const language = safeRead();

  safeWrite(language);

  document.documentElement.lang = htmlLang[language];
  document.documentElement.dataset.akenmLanguage = language;

  const style = document.createElement('style');

  style.id = 'akenm-common-style';

  style.textContent = `
    .akenm-brand{
      position:fixed!important;
      left:max(18px,env(safe-area-inset-left))!important;
      top:max(18px,env(safe-area-inset-top))!important;
      z-index:90!important;
      color:rgba(233,236,241,.82)!important;
      font:500 10px/1 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
      letter-spacing:.46em!important;
      text-transform:uppercase!important;
      text-decoration:none!important;
      white-space:nowrap!important;
      opacity:1!important;
      animation:none!important
    }

    .akenm-top-menu{
      position:fixed!important;
      right:18px!important;
      top:14px!important;
      z-index:100!important;
      width:44px!important;
      height:44px!important;
      display:grid!important;
      place-items:center!important;
      border-radius:999px!important;
      border:1px solid rgba(233,236,241,.14)!important;
      background:rgba(5,7,13,.20)!important;
      backdrop-filter:blur(12px)!important;
      -webkit-backdrop-filter:blur(12px)!important;
      color:rgba(233,236,241,.88)!important;
      font:400 16px/1 ui-sans-serif,system-ui!important;
      letter-spacing:.18em!important;
      cursor:pointer!important;
      transform:none!important;
      transition:border-color .18s ease,background .18s ease!important
    }

    .akenm-top-menu:hover{
      border-color:rgba(233,236,241,.36)!important;
      background:rgba(5,7,13,.34)!important;
      transform:none!important
    }

    .akenm-top-menu:focus-visible{
      outline:2px solid rgba(233,236,241,.32)!important;
      outline-offset:5px!important
    }

    .akenm-menu-overlay{
      position:fixed!important;
      inset:0!important;
      z-index:95!important;
      display:none!important;
      visibility:visible!important;
      opacity:1!important;
      background:rgba(0,0,0,.55)!important;
      backdrop-filter:blur(12px)!important;
      -webkit-backdrop-filter:blur(12px)!important;
      transition:none!important
    }

    .akenm-menu-overlay.open{
      display:block!important;
      visibility:visible!important;
      opacity:1!important
    }

    .akenm-menu-panel{
      position:absolute!important;
      right:18px!important;
      top:68px!important;
      width:auto!important;
      min-width:240px!important;
      padding:14px 14px 10px!important;
      border-radius:18px!important;
      border:1px solid rgba(233,236,241,.16)!important;
      background:rgba(5,7,13,.86)!important;
      box-shadow:0 18px 60px rgba(0,0,0,.45)!important
    }

    .akenm-menu-list{
      list-style:none!important;
      padding:0!important;
      margin:0!important
    }

    .akenm-menu-list a{
      display:block!important;
      padding:10px!important;
      border-radius:12px!important;
      text-decoration:none!important;
      color:rgba(233,236,241,.84)!important;
      font:500 12px/1.2 ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,Arial,sans-serif!important;
      letter-spacing:.16em!important;
      text-transform:uppercase!important;
      border:1px solid transparent!important;
      transform:none!important
    }

    .akenm-menu-list a:hover,
    .akenm-menu-list a[aria-current="page"]{
      color:rgba(233,236,241,.98)!important;
      border-color:rgba(233,236,241,.18)!important;
      background:rgba(233,236,241,.06)!important;
      transform:none!important
    }

    .akenm-menu-sep{
      height:1px!important;
      background:rgba(233,236,241,.12)!important;
      margin:10px 6px!important
    }

    .akenm-lang-row{
      display:flex!important;
      align-items:center!important;
      justify-content:flex-end!important;
      gap:8px!important;
      margin:0!important;
      padding:6px 6px 2px!important;
      border:0!important
    }

    .akenm-lang-row button{
      appearance:none!important;
      border:1px solid rgba(233,236,241,.14)!important;
      border-radius:999px!important;
      background:rgba(5,7,13,.20)!important;
      color:rgba(233,236,241,.72)!important;
      padding:6px 8px!important;
      font:500 10px/1 ui-sans-serif,system-ui!important;
      letter-spacing:.14em!important;
      cursor:pointer!important
    }

    .akenm-lang-row button:hover{
      color:#fff!important;
      border-color:rgba(233,236,241,.34)!important
    }

    .akenm-lang-row button.active{
      color:#05070d!important;
      background:rgba(233,236,241,.92)!important;
      border-color:rgba(233,236,241,.92)!important
    }

    @media(max-width:560px){
      .akenm-brand{
        left:14px!important;
        top:max(16px,env(safe-area-inset-top))!important;
        font-size:9px!important;
        letter-spacing:.36em!important
      }

      .akenm-top-menu{
        right:12px!important;
        top:10px!important
      }

      .akenm-menu-panel{
        right:12px!important;
        top:62px!important;
        min-width:220px!important
      }
    }
  `;

  document.head.appendChild(style);

  const localMode = location.protocol === 'file:';
  const page = document.body.dataset.akenmPage || 'home';

  const routeHref = route => {
    return localMode ? route.local : route.path;
  };

  const brand = document.createElement('a');

  brand.className = 'brand akenm-brand';
  brand.href = routeHref(routes[0]);
  brand.setAttribute('aria-label', 'AK ENM Home');
  brand.textContent = 'AK ENM';

  const button = document.createElement('button');

  button.id = 'akenmTopMenu';
  button.className = 'top-menu akenm-top-menu';
  button.type = 'button';
  button.setAttribute('aria-label', 'Menu');
  button.setAttribute('aria-expanded', 'false');
  button.setAttribute('aria-controls', 'akenmMenuOverlay');
  button.textContent = '⋯';

  const overlay = document.createElement('div');

  overlay.id = 'akenmMenuOverlay';
  overlay.className = 'menu-overlay akenm-menu-overlay';
  overlay.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('nav');

  panel.className = 'menu-panel akenm-menu-panel';
  panel.setAttribute('aria-label', 'Site menu');

  const list = document.createElement('ul');

  list.className = 'menu-list akenm-menu-list';

  routes.forEach(route => {
    const item = document.createElement('li');
    const link = document.createElement('a');

    link.href = routeHref(route);
    link.textContent = labels[language][route.key];

    if (route.key === page) {
      link.setAttribute('aria-current', 'page');
    }

    item.appendChild(link);
    list.appendChild(item);
  });

  const separator = document.createElement('div');

  separator.className = 'menu-sep akenm-menu-sep';
  separator.setAttribute('aria-hidden', 'true');

  const languageRow = document.createElement('div');

  languageRow.className = 'lang-row akenm-lang-row';
  languageRow.setAttribute('aria-label', 'Language');

  [
    ['ko', 'KO'],
    ['en', 'EN'],
    ['ja', 'JP'],
    ['zh', 'CN']
  ].forEach(([key, text]) => {
    const control = document.createElement('button');

    control.type = 'button';
    control.dataset.lang = key;
    control.textContent = text;

    const active = key === language;

    control.classList.toggle('active', active);
    control.setAttribute('aria-pressed', String(active));

    languageRow.appendChild(control);
  });

  panel.append(list, separator, languageRow);
  overlay.appendChild(panel);

  const oldBrand = document.querySelector('body > .brand');
  const oldButton = document.querySelector('body > .top-menu');
  const oldOverlay = document.querySelector('body > .menu-overlay');

  if (oldBrand) {
    oldBrand.replaceWith(brand);
  } else {
    document.body.prepend(brand);
  }

  if (oldButton) {
    oldButton.replaceWith(button);
  } else {
    brand.after(button);
  }

  if (oldOverlay) {
    oldOverlay.replaceWith(overlay);
  } else {
    button.after(overlay);
  }

  const setOpen = open => {
    overlay.classList.toggle('open', open);
    overlay.setAttribute('aria-hidden', String(!open));
    button.setAttribute('aria-expanded', String(open));

    if (open) {
      list.querySelector('a')?.focus();
    } else if (
      document.activeElement &&
      overlay.contains(document.activeElement)
    ) {
      button.focus();
    }
  };

  button.addEventListener('click', event => {
    event.stopPropagation();
    setOpen(!overlay.classList.contains('open'));
  });

  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      setOpen(false);
    }
  });

  panel.addEventListener('pointerdown', event => {
    event.stopPropagation();
  });

  list.addEventListener('click', () => {
    setOpen(false);
  });

  addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setOpen(false);
    }
  });

  languageRow.addEventListener('click', event => {
    const control = event.target.closest('[data-lang]');

    if (!control) return;

    const next = control.dataset.lang;

    if (!supported.includes(next)) return;

    safeWrite(next);

    if (next === language) {
      setOpen(false);
    } else {
      location.reload();
    }
  });

  window.AKENM = Object.freeze({
    language,
    routes: routes.map(route => ({ ...route }))
  });
})();
