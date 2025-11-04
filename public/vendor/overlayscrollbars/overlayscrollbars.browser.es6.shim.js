/* Simple shim for OverlayScrollbars to allow the app to start offline.
   This provides a minimal API used by the app: OverlayScrollbarsGlobal.OverlayScrollbars(...)
   Replace this shim with the real overlayscrollbars.browser.es6.min.js when you can download it.
*/
(function () {
  function OverlayScrollbars(target, options) {
    // Return a tiny object that matches the subset of the API the app uses.
    return {
      update: function () {},
      destroy: function () {},
      options: options || {},
      elements: { viewport: target },
    };
  }

  var OverlayScrollbarsGlobal = { OverlayScrollbars: OverlayScrollbars };
  if (typeof window !== "undefined")
    window.OverlayScrollbarsGlobal = OverlayScrollbarsGlobal;
})();
