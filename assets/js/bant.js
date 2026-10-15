// Anasayfa bandı: 6 saniyede bir sonraki yazıya geçer.
// Fare üzerindeyken, klavye odağı içerideyken ya da sekme gizliyken durur.
// "Hareketi azalt" tercihinde kendiliğinden dönmez.
(function () {
  var bant = document.getElementById("katman-bant");
  if (!bant) return;
  var slaytlar = bant.querySelectorAll(".katman-bant__slayt");
  var noktalar = bant.querySelectorAll(".katman-bant__nokta");
  var ray = bant.querySelector(".katman-bant__ray");
  var sure = 6000;
  var sira = 0;
  var zamanlayici = null;
  var durdu = false;
  var hareketsiz = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  bant.querySelectorAll("[hidden]").forEach(function (el) { el.hidden = false; });

  function goster(i) {
    sira = (i + slaytlar.length) % slaytlar.length;
    ray.style.transform = "translateX(" + (-100 * sira) + "%)";
    slaytlar.forEach(function (s, j) {
      var aktif = j === sira;
      s.setAttribute("aria-hidden", aktif ? "false" : "true");
      s.tabIndex = aktif ? 0 : -1;
    });
    noktalar.forEach(function (n, j) {
      if (j === sira) n.setAttribute("aria-current", "true");
      else n.removeAttribute("aria-current");
    });
  }

  function baslat() {
    if (hareketsiz || durdu) return;
    dur();
    zamanlayici = setInterval(function () { goster(sira + 1); }, sure);
  }
  function dur() { clearInterval(zamanlayici); zamanlayici = null; }

  bant.querySelector(".katman-bant__ok--onceki").addEventListener("click", function () { goster(sira - 1); baslat(); });
  bant.querySelector(".katman-bant__ok--sonraki").addEventListener("click", function () { goster(sira + 1); baslat(); });
  noktalar.forEach(function (n, j) { n.addEventListener("click", function () { goster(j); baslat(); }); });

  bant.addEventListener("mouseenter", function () { durdu = true; dur(); });
  bant.addEventListener("mouseleave", function () { durdu = false; baslat(); });
  bant.addEventListener("focusin", function () { durdu = true; dur(); });
  bant.addEventListener("focusout", function () { durdu = false; baslat(); });
  document.addEventListener("visibilitychange", function () { document.hidden ? dur() : baslat(); });

  // Dokunmatik kaydırma
  var x0 = null;
  bant.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; dur(); }, { passive: true });
  bant.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (Math.abs(dx) > 40) goster(sira + (dx < 0 ? 1 : -1));
    x0 = null;
    baslat();
  });

  goster(0);
  baslat();
})();
