const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const source = fs.readFileSync('assets/js/storefront.js', 'utf8');

function fixture({ scriptFailure = false, dataFailure = false, addFailure = false, hostname = 'conduitdsp.com' } = {}) {
  const calls = [];
  const handlers = {};
  const timers = new Map();
  let nextTimer = 0;
  class Element {
    constructor(tag) { this.tagName = tag; this.attrs = {}; this.dataset = {}; this.children = []; this.hidden = false; this.classList = { remove: name => calls.push(['close-menu', name]) }; }
    setAttribute(k, v) { this.attrs[k] = v; }
    getAttribute(k) { return this.attrs[k]; }
    removeAttribute(k) { delete this.attrs[k]; }
    appendChild(child) { this.children.push(child); }
    replaceChildren(...children) { this.children = children; }
    addEventListener(k, fn) { this[k] = fn; }
    closest() { return this; }
  }
  const body = new Element('body'), root = new Element('html');
  const nav = new Element('nav'), toggle = new Element('button');
  const sdk = {
    on: (event, fn) => { handlers[event] = fn; },
    setup: async (tenant, options) => {
      calls.push(['setup', tenant, options]);
      if (!dataFailure) handlers['storefront-updated']({ storefront: {} });
    },
    add_to_cart: async args => { calls.push(['add', args]); if (addFailure) throw new Error('network'); },
    view_cart: () => calls.push(['cart']),
    view_account: () => calls.push(['account']),
    download_product: args => calls.push(['download', args])
  };
  const document = {
    body, documentElement: root,
    createElement: tag => new Element(tag),
    createTextNode: text => ({ textContent: text }),
    head: { appendChild: script => { calls.push(['script', script.src]); queueMicrotask(() => scriptFailure ? script.onerror() : script.onload()); } },
    getElementById: () => nav,
    querySelector: () => toggle,
    addEventListener: (event, fn) => { handlers[event] = fn; }
  };
  const context = { document, window: { Moonbase: sdk }, location: { search: '', hostname }, URLSearchParams,
    setTimeout: fn => { const id = ++nextTimer; timers.set(id, fn); return id; }, clearTimeout: id => timers.delete(id) };
  vm.runInNewContext(source, context);
  const control = action => { const el = new Element('a'); el.dataset.storeAction = action; return el; };
  const click = (el, extra = {}) => handlers.click({ target: el, button: 0, preventDefault() { this.defaultPrevented = true; }, ...extra });
  const settle = async () => { for (let i = 0; i < 20; i++) await Promise.resolve(); };
  return { calls, control, click, settle, root, body, timers, toggle };
}

test('one initialization, explicit optional marketing, no analytics forwarding', async () => {
  const f = fixture(); await f.settle();
  assert.equal(f.root.dataset.storefront, 'ready');
  const setup = f.calls.find(c => c[0] === 'setup');
  assert.equal(setup[1], 'https://conduitdsp.moonbase.sh');
  assert.equal(setup[2].auth.signUp.marketingConsent, 'OptIn');
  assert.equal(setup[2].integrations, undefined);
  await f.click(f.control('view_account'));
  await f.click(f.control('view_cart'));
  assert.equal(f.calls.filter(c => c[0] === 'script').length, 1);
});

test('Lite action uses actual product/variation and guards repeated click while loading', async () => {
  const f = fixture(); const el = f.control('add_to_cart');
  const first = f.click(el); const second = f.click(el);
  await Promise.all([first, second]);
  const adds = f.calls.filter(c => c[0] === 'add');
  assert.equal(adds.length, 1);
  assert.deepEqual(JSON.parse(JSON.stringify(adds[0][1])), { product_id: 'robin-control-lite', variation_id: 'free', quantity: 1, show_cart: true });
  assert.equal(el.getAttribute('aria-busy'), undefined);
  assert.equal(f.toggle.getAttribute('aria-expanded'), 'false');
});

test('modified clicks preserve normal link navigation', async () => {
  const f = fixture(); await f.settle();
  await f.click(f.control('add_to_cart'), { ctrlKey: true });
  assert.equal(f.calls.filter(c => c[0] === 'add').length, 0);
});

test('SDK load failure preserves a real hosted product fallback', async () => {
  const f = fixture({ scriptFailure: true }); await f.settle();
  const el = f.control('add_to_cart'); await f.click(el);
  const notice = f.body.children[0];
  assert.equal(f.root.dataset.storefront, 'unavailable');
  assert.equal(notice.hidden, false);
  assert.equal(notice.children.find(c => c.tagName === 'a').href, 'https://conduitdsp.moonbase.sh/buy/robin-control-lite');
  assert.equal(el.getAttribute('aria-busy'), undefined);
});

test('setup success without storefront data times out rather than falsely reporting ready', async () => {
  const f = fixture({ dataFailure: true }); await f.settle();
  assert.notEqual(f.root.dataset.storefront, 'ready');
  for (const fn of f.timers.values()) fn();
  await f.settle();
  assert.equal(f.root.dataset.storefront, 'unavailable');
});

test('failed cart mutation does not redirect or leave a disabled control', async () => {
  const f = fixture({ addFailure: true }); await f.settle();
  const el = f.control('add_to_cart'); await f.click(el);
  assert.equal(f.body.children[0].hidden, false);
  assert.equal(el.getAttribute('aria-busy'), undefined);
});

test('owned download uses product without pinning an old release', async () => {
  const f = fixture(); await f.settle(); await f.click(f.control('download_product'));
  assert.deepEqual(JSON.parse(JSON.stringify(f.calls.find(c => c[0] === 'download')[1])), { product_id: 'robin-control-lite' });
});

test('loopback preview uses hosted checkout while HTTPS production keeps automatic checkout', async () => {
  const preview = fixture({ hostname: '127.0.0.1' }); await preview.settle();
  assert.equal(preview.calls.find(c => c[0] === 'setup')[2].checkout.redirect, 'always');
  const production = fixture(); await production.settle();
  assert.equal(production.calls.find(c => c[0] === 'setup')[2].checkout.redirect, 'auto');
});
