/* Katman — gömme (embed) önizlemesi. Panel önizlemesi (katman-cms.js) ve
   yeni pencere önizlemesi (onizleme.html) birlikte kullanır.

   Güvenlik: öğrencinin gömme kodu panelle aynı kökende (origin) çalışırsa
   paneldeki GitHub oturum anahtarına erişebilir. Bu yüzden kod, kendi
   opak kökeni olan bir data: çerçevesinde çalıştırılır; panele erişemez.
   Çerçeve içindeki üçüncü taraf iframe'ler (Flourish, Datawrapper, YouTube)
   kendi kökenleriyle normal çalışır. */
(function () {
  'use strict';

  var YER = 'katman-gomme-yer';        // Decap önizlemesindeki yer tutucu (data-kod taşır)
  var CERCEVE = 'katman-gomme-cerceve';

  // Çerçeve içeriği yüksekliğini üst pencereye bildirir; üst pencere çerçeveyi boyar.
  var BOY_BETIGI =
    '(function(){var s=0;function b(){var y=Math.ceil(document.documentElement.getBoundingClientRect().height);' +
    'if(y!==s){s=y;parent.postMessage({katmanGomme:y},"*")}}' +
    'if(window.ResizeObserver)new ResizeObserver(b).observe(document.documentElement);' +
    'addEventListener("load",b);setInterval(b,1000);b()})()';

  function belge(kod) {
    return '<!doctype html><html lang="tr"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width,initial-scale=1">' +
      // "//cdn..." gibi kök göreli adresler data: içinde çözülemez; site adresine bağla.
      '<base href="' + location.origin + '/" target="_blank">' +
      '<style>html,body{margin:0;padding:0;background:transparent;overflow:hidden}' +
      'body{font-family:system-ui,sans-serif}iframe{max-width:100%}</style>' +
      '</head><body>' + kod + '<script>' + BOY_BETIGI + '<\/script></body></html>';
  }

  function cerceve(doc, kod) {
    var f = doc.createElement('iframe');
    f.className = CERCEVE;
    f.title = 'Gömülü içerik önizlemesi';
    // data: çerçevesi her durumda opak kökenlidir; allow-same-origin yalnızca
    // içteki üçüncü taraf iframe'lerin kendi kökenlerini korumasını sağlar.
    f.setAttribute('sandbox', 'allow-scripts allow-same-origin allow-popups ' +
      'allow-popups-to-escape-sandbox allow-forms allow-presentation allow-downloads');
    f.setAttribute('allow', 'fullscreen; autoplay; encrypted-media; picture-in-picture; clipboard-write');
    f.setAttribute('allowfullscreen', '');
    f.style.cssText = 'display:block;width:100%;height:160px;border:0;margin:0';
    f.src = 'data:text/html;charset=utf-8,' + encodeURIComponent(belge(kod));
    return f;
  }

  // Kök altındaki hazırlanmamış yer tutucuları çerçeveye dönüştürür.
  function yerlestir(kok) {
    var yerler = kok.querySelectorAll('.' + YER + ':not([data-hazir])');
    for (var i = 0; i < yerler.length; i++) {
      var y = yerler[i], kod = '';
      try { kod = decodeURIComponent(y.getAttribute('data-kod') || ''); } catch (e) { continue; }
      y.setAttribute('data-hazir', '');
      if (!kod.trim()) {
        y.textContent = 'Gömme kodu boş.';
        continue;
      }
      y.appendChild(cerceve(y.ownerDocument, kod));
    }
  }

  // Yeni pencereye aktarmadan önce yer tutucuları ilk haline döndürür.
  function temizKopya(dugum) {
    var k = dugum.cloneNode(true);
    var yerler = k.querySelectorAll('.' + YER + '[data-hazir]');
    for (var i = 0; i < yerler.length; i++) {
      yerler[i].removeAttribute('data-hazir');
      yerler[i].textContent = '';
    }
    return k;
  }

  function yukseklikDinle(win) {
    if (win.__katmanGommeDinleniyor) return;
    win.__katmanGommeDinleniyor = true;
    win.addEventListener('message', function (e) {
      var y = e.data && e.data.katmanGomme;
      if (typeof y !== 'number') return;
      var cs = win.document.querySelectorAll('iframe.' + CERCEVE);
      for (var i = 0; i < cs.length; i++) {
        if (cs[i].contentWindow === e.source) {
          cs[i].style.height = Math.min(Math.max(y, 40), 6000) + 'px';
          return;
        }
      }
    });
  }

  function onizlemeHtml(kod) {
    return '<div class="' + YER + '" data-kod="' + encodeURIComponent(kod) + '"></div>';
  }

  window.KatmanGomme = {
    yerlestir: yerlestir,
    temizKopya: temizKopya,
    yukseklikDinle: yukseklikDinle,
    onizlemeHtml: onizlemeHtml
  };
})();
