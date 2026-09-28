/* Shared Moonbase storefront. Public tenant/product IDs only; no admin keys.
 * Moonbase owns cart, pricing, authentication and URL intents on every page.
 * The legacy conduit_cart_v1 is intentionally neither replayed nor deleted.
 */
(function () {
  'use strict';
  const tenant = 'https://conduitdsp.moonbase.sh';
  const lite = 'robin-control-lite';
  const actions = new Set(['add_to_cart', 'view_cart', 'view_account', 'sign_in', 'sign_up', 'view_products', 'download_product']);
  let pending;

  function bounded(promise, milliseconds) {
    let timer;
    return Promise.race([
      promise,
      new Promise((_, reject) => { timer = setTimeout(() => reject(new Error('Store unavailable')), milliseconds); })
    ]).finally(() => clearTimeout(timer));
  }

  function loadStore() {
    if (pending) return pending;
    pending = bounded(new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.src = 'https://assets.moonbase.sh/storefront/moonbase.js';
      script.async = true;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    }).then(async () => {
      if (!window.Moonbase) throw new Error('Store unavailable');
      const dataReady = new Promise(resolve => window.Moonbase.on('storefront-updated', resolve));
      const setup = window.Moonbase.setup(tenant, {
        toolbar: { enabled: false },
        auth: { signUp: { marketingConsent: 'OptIn' } },
        // Moonbase's checkout CSP permits HTTPS and localhost frames, but not
        // http://127.0.0.1. Use its supported hosted handoff for this preview.
        checkout: { redirect: location.hostname === '127.0.0.1' ? 'always' : 'auto' },
        cart: { quantity: 'single', leadMagnets: { quantity: 'single' } },
        promotions: { enabled: false },
        theme: {
          dark: false,
          colors: { primary: '#1F5C58', background: 'white' },
          fonts: { heading: { family: '"DM Sans", sans-serif' }, body: { family: '"DM Sans", sans-serif' } },
          corners: 'sharp', buttons: 'light', cards: 'outlined'
        }
        // No analytics forwarding. GA4 remains controlled by cookie-banner.js.
      });
      // setup can resolve even when the initial data request fails (e.g. CORS).
      await Promise.all([setup, dataReady]);
      return window.Moonbase;
    }), 15000).then(store => {
      document.documentElement.dataset.storefront = 'ready';
      return store;
    }).catch(() => {
      document.documentElement.dataset.storefront = 'unavailable';
      throw new Error('Store unavailable');
    });
    return pending;
  }

  const notice = document.createElement('div');
  notice.className = 'storefront-notice';
  notice.hidden = true;
  notice.setAttribute('role', 'status');
  notice.setAttribute('aria-live', 'polite');
  document.body.appendChild(notice);

  function showNotice(message, fallback) {
    notice.replaceChildren(document.createTextNode(message + ' '));
    if (fallback) {
      const link = document.createElement('a');
      link.href = fallback.href;
      link.textContent = fallback.label;
      notice.appendChild(link);
    }
    const close = document.createElement('button');
    close.type = 'button';
    close.textContent = 'Dismiss';
    close.addEventListener('click', () => { notice.hidden = true; });
    notice.appendChild(close);
    notice.hidden = false;
  }

  document.addEventListener('click', async event => {
    const control = event.target.closest('[data-store-action]');
    if (!control || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const action = control.dataset.storeAction;
    if (!actions.has(action)) return;
    event.preventDefault();
    if (control.getAttribute('aria-busy') === 'true') return;
    control.setAttribute('aria-busy', 'true');
    const nav = document.getElementById('site-nav');
    if (nav) nav.classList.remove('site-nav--open');
    const toggle = document.querySelector('.nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
    showNotice('Opening the store…');
    try {
      const store = await loadStore();
      if (action === 'add_to_cart') {
        await bounded(store.add_to_cart({ product_id: lite, variation_id: 'free', quantity: 1, show_cart: true }), 15000);
      } else if (action === 'download_product') {
        store.download_product({ product_id: lite });
      } else {
        store[action]();
      }
      notice.hidden = true;
    } catch (_) {
      const productAction = action === 'add_to_cart' || action === 'download_product';
      showNotice('The store could not open here.', {
        href: action === 'add_to_cart' ? tenant + '/buy/' + lite : action === 'download_product' ? tenant + '/download/' + lite : tenant,
        label: productAction ? 'Continue on Moonbase' : 'Open the customer portal'
      });
    } finally {
      control.removeAttribute('aria-busy');
    }
  });

  // Eager setup also handles emailed confirmation, activation and reset intents.
  loadStore().catch(() => {
    if (new URLSearchParams(location.search).has('mb_intent')) {
      showNotice('This account link could not open. Reload to try again, or contact hello@conduitdsp.com.');
    }
  });
})();
