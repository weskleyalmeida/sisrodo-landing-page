(function () {
  'use strict';

  var STORAGE_KEY = 'sisrodo-theme';
  var htmlEl = document.documentElement;
  var systemQuery = window.matchMedia('(prefers-color-scheme: dark)');

  function getStored() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function setStored(val) {
    try { localStorage.setItem(STORAGE_KEY, val); } catch (e) {}
  }

  function resolveTheme(pref) {
    if (pref === 'dark')  return 'dark';
    if (pref === 'light') return 'light';
    return systemQuery.matches ? 'dark' : 'light';
  }

  function applyTheme(resolved) {
    htmlEl.setAttribute('data-theme', resolved);
  }

  function syncToggleUI(pref) {
    document.querySelectorAll('.theme-toggle__btn').forEach(function (btn) {
      btn.classList.toggle('active', btn.getAttribute('data-theme-value') === pref);
    });
  }

  function setTheme(pref) {
    setStored(pref);
    applyTheme(resolveTheme(pref));
    syncToggleUI(pref);
  }

  /* Init toggle buttons after DOM ready */
  document.addEventListener('DOMContentLoaded', function () {
    var stored = getStored() || 'system';
    syncToggleUI(stored);

    document.querySelectorAll('.theme-toggle__btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        setTheme(btn.getAttribute('data-theme-value'));
      });
    });
  });

  /* React to OS preference changes when user chose "system" */
  systemQuery.addEventListener('change', function () {
    var pref = getStored() || 'system';
    if (pref === 'system') applyTheme(resolveTheme('system'));
  });

})();
