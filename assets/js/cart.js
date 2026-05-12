/* ============================================================
 * Conduit DSP — Cart
 *
 * In-browser cart with localStorage persistence. Wires up:
 *   - Add-to-cart buttons across the site
 *   - Header cart widget (total + count)
 *   - /cart/ page (line items + subtotal + checkout)
 *
 * LEMON SQUEEZY:
 * After the Lemon Squeezy store is set up, fill in the
 * `LEMON_SQUEEZY` config block below with the store handle and
 * each product's checkout URL. The checkout button will then
 * open Lemon's overlay (or redirect if lemon.js isn't loaded).
 * ============================================================ */

// ---------- Lemon Squeezy config (fill in when store is ready) ----------
const LEMON_SQUEEZY = {
  // Your store subdomain on lemonsqueezy.com — e.g., 'conduitdsp'
  storeName: 'conduitdsp',

  // Map product IDs (matches data-product-id on Add-to-Cart buttons)
  // to their Lemon Squeezy buy URLs. Example:
  //   'robin-control': 'https://conduitdsp.lemonsqueezy.com/buy/xxxx-xxxx-xxxx'
  productUrls: {
    'robin-control': '',
    'robin-control-lite': 'https://conduitdsp.lemonsqueezy.com/checkout/buy/ba915cb2-2594-4470-abda-b8e12b50a6d5'
  },

  // Use Lemon's overlay (true) or redirect to hosted checkout (false).
  // Overlay requires lemon.js to be loaded; cart.js loads it on demand.
  useOverlay: true
};

// ---------- Cart state ----------
const cart = {
  items: [],
  currency: 'USD',
  exchangeRates: { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36 }
};

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$' };

const STORAGE_KEY = 'conduit_cart_v1';

// ---------- Persistence ----------
function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      items: cart.items,
      currency: cart.currency
    }));
  } catch (e) { /* storage unavailable — silently no-op */ }
}

function loadCart() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return;
    const saved = JSON.parse(raw);
    if (Array.isArray(saved.items)) cart.items = saved.items;
    if (saved.currency && cart.exchangeRates[saved.currency]) cart.currency = saved.currency;
  } catch (e) { /* corrupt — ignore */ }
}

// ---------- Mutations ----------
function addToCart(productId, name, price) {
  const existing = cart.items.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({ id: productId, name: name, price: parseFloat(price), qty: 1 });
  }
  saveCart();
  updateCartUI();
}

function removeFromCart(productId) {
  cart.items = cart.items.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
}

// ---------- Totals ----------
function getTotalUSD() {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getConvertedTotal() {
  return getTotalUSD() * cart.exchangeRates[cart.currency];
}

function formatMoney(usdAmount) {
  const symbol = currencySymbols[cart.currency];
  const value = (usdAmount * cart.exchangeRates[cart.currency]).toFixed(2);
  return symbol + value;
}

// ---------- UI: header widget + cart page ----------
function updateCartUI() {
  const totalEl = document.getElementById('cart-total');
  const countEl = document.getElementById('cart-count');

  if (totalEl) {
    totalEl.textContent = currencySymbols[cart.currency] + getConvertedTotal().toFixed(2);
  }

  if (countEl) {
    const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = count;
    countEl.classList.toggle('hidden', count === 0);
  }

  renderCartPage();
}

function renderCartPage() {
  const empty = document.getElementById('cart-empty');
  const filled = document.getElementById('cart-filled');
  const list = document.getElementById('cart-items');
  const subtotalEl = document.getElementById('cart-subtotal');
  if (!empty || !filled || !list || !subtotalEl) return; // not on /cart/

  if (cart.items.length === 0) {
    empty.classList.remove('hidden');
    filled.classList.add('hidden');
    return;
  }

  empty.classList.add('hidden');
  filled.classList.remove('hidden');

  list.innerHTML = '';
  cart.items.forEach(item => {
    const li = document.createElement('li');
    li.className = 'cart-item';

    const info = document.createElement('div');
    info.className = 'cart-item__info';

    const name = document.createElement('h3');
    name.className = 'cart-item__name';
    name.textContent = item.name;

    const price = document.createElement('p');
    price.className = 'cart-item__price';
    const unitPriceStr = item.price > 0 ? formatMoney(item.price) : 'Free';
    price.textContent = item.qty > 1
      ? unitPriceStr + ' × ' + item.qty
      : unitPriceStr;

    info.appendChild(name);
    info.appendChild(price);

    const lineTotal = document.createElement('div');
    lineTotal.className = 'cart-item__line-total';
    lineTotal.textContent = item.price > 0 ? formatMoney(item.price * item.qty) : 'Free';

    const remove = document.createElement('button');
    remove.className = 'cart-item__remove';
    remove.setAttribute('aria-label', 'Remove ' + item.name);
    remove.textContent = String.fromCharCode(0x00D7); // multiplication sign — kept as code-point for ASCII-safe source
    remove.addEventListener('click', () => removeFromCart(item.id));

    li.appendChild(info);
    li.appendChild(lineTotal);
    li.appendChild(remove);
    list.appendChild(li);
  });

  subtotalEl.textContent = formatMoney(getTotalUSD());
}

// ---------- Checkout (Lemon Squeezy) ----------
function loadLemonScript() {
  return new Promise((resolve, reject) => {
    if (window.LemonSqueezy && window.LemonSqueezy.Url) return resolve();
    const existing = document.querySelector('script[data-lemon-js]');
    if (existing) {
      existing.addEventListener('load', resolve, { once: true });
      existing.addEventListener('error', reject, { once: true });
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://app.lemonsqueezy.com/js/lemon.js';
    s.defer = true;
    s.setAttribute('data-lemon-js', '');
    s.addEventListener('load', () => {
      if (typeof window.createLemonSqueezy === 'function') window.createLemonSqueezy();
      resolve();
    }, { once: true });
    s.addEventListener('error', reject, { once: true });
    document.head.appendChild(s);
  });
}

function showCheckoutNotice(msg) {
  const notice = document.getElementById('cart-checkout-notice');
  if (!notice) return;
  notice.textContent = msg;
  notice.classList.remove('hidden');
}

function handleCheckout() {
  if (cart.items.length === 0) return;

  // Pick first item with a configured URL. Multi-item carts will need
  // Lemon Squeezy's Cart API (server-side) — out of scope for this static site.
  const item = cart.items.find(i => LEMON_SQUEEZY.productUrls[i.id]);
  if (!item) {
    showCheckoutNotice('Checkout is being set up. Lemon Squeezy URLs are not yet configured.');
    return;
  }
  const url = LEMON_SQUEEZY.productUrls[item.id];

  if (LEMON_SQUEEZY.useOverlay) {
    loadLemonScript()
      .then(() => {
        if (window.LemonSqueezy && window.LemonSqueezy.Url) {
          window.LemonSqueezy.Url.Open(url);
        } else {
          window.location.href = url;
        }
      })
      .catch(() => { window.location.href = url; });
  } else {
    window.location.href = url;
  }
}

// ---------- Currency ----------
function handleCurrencyChange(e) {
  cart.currency = e.target.value;
  saveCart();
  updateCartUI();
}

// ---------- Init ----------
document.addEventListener('DOMContentLoaded', function () {
  loadCart();

  // Sync currency select if we restored a non-default value.
  const currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.value = cart.currency;
    currencySelect.addEventListener('change', handleCurrencyChange);
  }

  document.querySelectorAll('.btn--add-cart').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var id = this.getAttribute('data-product-id');
      if (!id) return; // not a real add-to-cart trigger (e.g. styled anchor) — let the default action run
      e.preventDefault();
      e.stopPropagation();
      var price = this.getAttribute('data-price');
      var name = this.getAttribute('data-name');
      addToCart(id, name, price);
    });
  });

  const checkoutBtn = document.getElementById('cart-checkout-btn');
  if (checkoutBtn) checkoutBtn.addEventListener('click', handleCheckout);

  updateCartUI();
});
