// TR/EN seçimi: <html data-dil> değişir, CSS diğer dili gizler.
(function () {
  var kok = document.documentElement;
  var dil = "tr";
  try { dil = localStorage.getItem("dil") || "tr"; } catch (e) {}
  if (location.hash === "#en") dil = "en";
  function uygula(d) {
    dil = d === "en" ? "en" : "tr";
    kok.setAttribute("data-dil", dil);
    kok.lang = dil;
    document.querySelectorAll("[data-dil-sec]").forEach(function (b) {
      b.setAttribute("aria-pressed", b.getAttribute("data-dil-sec") === dil);
    });
    try { localStorage.setItem("dil", dil); } catch (e) {}
  }
  uygula(dil);
  document.addEventListener("DOMContentLoaded", function () {
    uygula(dil);
    // Bilgisayarda dosyadan açınca klasör bağlantıları index.html'e gitsin.
    if (location.protocol === "file:") {
      document.querySelectorAll("a[href]").forEach(function (a) {
        var h = a.getAttribute("href");
        if (!/^[a-z]+:/i.test(h) && /\/$/.test(h.split("#")[0])) a.setAttribute("href", h.replace(/\/(#|$)/, "/index.html$1"));
      });
    }
    document.querySelectorAll("[data-dil-sec]").forEach(function (b) {
      b.addEventListener("click", function () { uygula(b.getAttribute("data-dil-sec")); });
    });
  });
})();
