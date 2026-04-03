const cart = {
  items: [],
  currency: 'USD',
  exchangeRates: { USD: 1, EUR: 0.92, GBP: 0.79, CAD: 1.36 }
};

const currencySymbols = { USD: '$', EUR: '€', GBP: '£', CAD: 'CA$' };

function addToCart(productId, name, price) {
  const existing = cart.items.find(item => item.id === productId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.items.push({ id: productId, name: name, price: parseFloat(price), qty: 1 });
  }
  updateCartUI();
}

function removeFromCart(productId) {
  cart.items = cart.items.filter(item => item.id !== productId);
  updateCartUI();
}

function getTotalUSD() {
  return cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
}

function getConvertedTotal() {
  return getTotalUSD() * cart.exchangeRates[cart.currency];
}

function updateCartUI() {
  const totalEl = document.getElementById('cart-total');
  const countEl = document.getElementById('cart-count');

  if (totalEl) {
    const symbol = currencySymbols[cart.currency];
    const total = getConvertedTotal().toFixed(2);
    totalEl.textContent = symbol + total;
  }

  if (countEl) {
    const count = cart.items.reduce((sum, item) => sum + item.qty, 0);
    countEl.textContent = count;
    countEl.classList.toggle('hidden', count === 0);
  }
}

function handleCurrencyChange(e) {
  cart.currency = e.target.value;
  updateCartUI();
}

document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('.btn--add-cart').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var id = this.getAttribute('data-product-id');
      var price = this.getAttribute('data-price');
      var name = this.getAttribute('data-name');
      addToCart(id, name, price);
    });
  });

  var currencySelect = document.getElementById('currency-select');
  if (currencySelect) {
    currencySelect.addEventListener('change', handleCurrencyChange);
  }
});
