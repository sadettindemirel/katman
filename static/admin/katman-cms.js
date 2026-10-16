/* Katman — Decap CMS eklentileri
   - Metin editörü düğmeleri: "Görsel" (bağlantıyla) ve "Gömme" (iframe / script kodu)
   - Yazı ve sayfa önizlemesi: sitenin kendi stiliyle, görseller ve gömmeler dahil
   - "Yeni pencerede aç": taslağın canlı önizlemesi (onizleme.html), yazdıkça güncellenir */
(function () {
  'use strict';

  var CMS = window.CMS, h = window.h, G = window.KatmanGomme;
  var ONIZLEME_ANAHTARI = 'katman-onizleme';

  function kacis(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  // ---------------------------------------------------------------- Görsel
  // Yerleşik görsel bileşeninin yerine geçer (aynı id): dosya yükleme yok, yalnızca adres.
  // Markdown karşılığı: ![alternatif metin](https://adres "görsel altı yazısı")
  CMS.registerEditorComponent({
    id: 'image',
    label: 'Görsel',
    fields: [
      { name: 'src', label: 'Görsel adresi (https://...)', widget: 'string',
        hint: 'Görselin üzerine sağ tıklayıp "Görsel adresini kopyala" ile aldığın bağlantı. Dosya yükleme kapalıdır.' },
      { name: 'alt', label: 'Alternatif metin', widget: 'string',
        hint: 'Görseli göremeyen okurlar için bir cümleyle anlat. Boş bırakma.' },
      { name: 'title', label: 'Görsel altı yazısı / kaynak (isteğe bağlı)', widget: 'string', required: false,
        hint: 'Görselin altında görünür. Örnek: Fotoğraf: Ad Soyad, CC BY 4.0' }
    ],
    pattern: /^!\[([^\]\n]*)\]\((\S+?)(?:\s+"([^"\n]*)")?\)$/,
    fromBlock: function (m) {
      return { alt: m[1], src: m[2], title: m[3] || '' };
    },
    toBlock: function (d) {
      var alt = String(d.alt || '').replace(/[\[\]\n]/g, ' ').trim();
      var src = String(d.src || '').trim().replace(/\s/g, '%20');
      var title = String(d.title || '').replace(/"/g, '”').replace(/\n/g, ' ').trim();
      return '![' + alt + '](' + src + (title ? ' "' + title + '"' : '') + ')';
    },
    toPreview: function (d) {
      var src = String(d.src || '').trim();
      if (!/^https:\/\//.test(src)) {
        return '<p class="katman-uyari">Görsel adresi https:// ile başlamalı.</p>';
      }
      return '<figure class="katman-figur"><img src="' + kacis(src) + '" alt="' + kacis(d.alt) + '">' +
        (d.title ? '<figcaption>' + kacis(d.title) + '</figcaption>' : '') + '</figure>';
    }
  });

  // ---------------------------------------------------------------- Gömme
  // Kod, sitede olduğu gibi çalışır (hugo.yaml: goldmark unsafe). Sarmalayıcı, zengin
  // metin editörünün bloğu tanıyıp bozmadan saklaması için gerekir; mevcut yazılar da
  // bu biçimdedir. Boş satırlar silinir: HTML bloğu boş satırda biter.
  var GOMME_BAS = '<div class="katman-gomme">';
  var GOMME_SON = '</div><!-- /gomme -->';

  function gommeTemizle(kod) {
    return String(kod || '').replace(/\r\n?/g, '\n').trim().replace(/\n[ \t]*(?=\n)/g, '').replace(/\n+/g, '\n');
  }

  CMS.registerEditorComponent({
    id: 'gomme',
    label: 'Gömme (iframe / embed kodu)',
    fields: [
      { name: 'kod', label: 'Gömme kodu', widget: 'text',
        hint: 'Flourish, Datawrapper, Knight Lab, YouTube vb. araçların "Embed" kodunu olduğu gibi yapıştır. <iframe> ve <script> satırlarını birlikte al.' }
    ],
    pattern: /^<div class="katman-gomme">\n([\s\S]*?)\n<\/div><!-- \/gomme -->/,
    fromBlock: function (m) {
      return { kod: m[1] };
    },
    toBlock: function (d) {
      return GOMME_BAS + '\n' + gommeTemizle(d.kod) + '\n' + GOMME_SON;
    },
    // Önizlemede yalnızca yer tutucu üretilir (Decap'in temizleyicisinden geçer);
    // önizleme şablonu onu yalıtılmış bir çerçeveye dönüştürür.
    toPreview: function (d) {
      return G.onizlemeHtml(gommeTemizle(d.kod));
    }
  });

  // ---------------------------------------------------------------- Önizleme
  // Sitenin gerçek stil dosyası (Hugo parmak izli adres verir) anasayfadan bulunur.
  CMS.registerPreviewStyle('/admin/onizleme.css');
  fetch('/', { credentials: 'same-origin' })
    .then(function (r) { return r.ok ? r.text() : ''; })
    .then(function (html) {
      var m = html.match(/<link[^>]+href="([^"]*\/stylesheet[^"]*\.css)"/);
      if (m) CMS.registerPreviewStyle(m[1]);
    })
    .catch(function () {});

  function tarihYaz(t) {
    if (!t) return '';
    var d = t instanceof Date ? t : new Date(t);
    if (isNaN(d)) return '';
    return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function guvenliAdres(u, desen) {
    u = String(u || '').trim();
    return desen.test(u) ? u : '';
  }

  // Önizleme DOM'u değiştikçe: gömmeleri çerçevele, yeni pencere için kaydet.
  var kayitZamanlayici = null;
  function kaydet(kok) {
    var makale = kok.querySelector('article');
    if (!makale) return;
    var baslik = (kok.querySelector('.post-title') || {}).textContent || '';
    try {
      localStorage.setItem(ONIZLEME_ANAHTARI, JSON.stringify({
        html: G.temizKopya(makale).outerHTML,
        baslik: baslik,
        zaman: Date.now()
      }));
    } catch (e) { /* özel pencere / kota: yeni pencere önizlemesi çalışmaz, panel önizlemesi çalışır */ }
  }
  function kaydetPlanla(kok) {
    clearTimeout(kayitZamanlayici);
    kayitZamanlayici = setTimeout(function () { kaydet(kok); }, 400);
  }

  function onizlemeRef(kok) {
    if (!kok || kok.__katman) return;
    kok.__katman = true;
    var win = kok.ownerDocument.defaultView;
    G.yukseklikDinle(win);
    G.yerlestir(kok);
    kaydetPlanla(kok);
    new win.MutationObserver(function () {
      G.yerlestir(kok);
      kaydetPlanla(kok);
    }).observe(kok, { childList: true, subtree: true, characterData: true });
  }

  function yeniPencere(e) {
    var kok = e.currentTarget.closest('.katman-onizleme');
    if (kok) { clearTimeout(kayitZamanlayici); kaydet(kok); }
    window.open('/admin/onizleme.html', 'katman-onizleme');
  }

  function aracCubugu() {
    return h('div', { className: 'katman-onizleme__arac' },
      h('span', null, 'Taslak önizleme'),
      h('button', { type: 'button', onClick: yeniPencere, title: 'Önizlemeyi ayrı pencerede aç; yazdıkça güncellenir' },
        'Yeni pencerede aç ↗'));
  }

  function YaziOnizleme(props) {
    var d = function (yol) { return props.entry.getIn(['data'].concat(yol)); };
    var baslik = d('title'), ozet = d('description'), yazar = d('author'), tarih = tarihYaz(d('date'));
    var kapak = guvenliAdres(d(['cover', 'image']), /^https:\/\/\S+$/);
    var etiketler = (d('tags') || { toArray: function () { return []; } }).toArray().filter(Boolean);
    var kaynaklar = (d('veri_kaynaklari') || { toArray: function () { return []; } }).toArray();
    var kunye = [
      ['Yazar', yazar], ['Ders', d('ders')], ['Dönem', d('donemler')],
      ['Ödev türü', d('odevler')], ['Yayın tarihi', tarih]
    ].filter(function (s) { return s[1]; });

    return h('div', { className: 'katman-onizleme', ref: onizlemeRef },
      aracCubugu(),
      d('draft') ? h('p', { className: 'katman-uyari' }, '"Taslak (yayımlanmasın)" işaretli: bu yazı birleştirilse bile sitede görünmez.') : null,
      h('main', { className: 'main' },
        h('article', { className: 'post-single' },
          h('header', { className: 'post-header' },
            h('h1', { className: 'post-title' }, baslik || 'Başlıksız yazı'),
            ozet ? h('div', { className: 'post-description' }, ozet) : null,
            h('div', { className: 'post-meta' }, [yazar, tarih].filter(Boolean).join(' · '))),
          kunye.length ? h('aside', { className: 'katman-kunye' },
            h('h2', { className: 'katman-kunye__baslik' }, 'Künye'),
            h('dl', null, kunye.map(function (s) {
              return h('div', { key: s[0] }, h('dt', null, s[0]), h('dd', null, s[1]));
            }))) : null,
          kapak ? h('figure', { className: 'entry-cover' },
            h('img', { src: kapak, alt: d(['cover', 'alt']) || '' }),
            d(['cover', 'caption']) ? h('figcaption', null, d(['cover', 'caption'])) : null) : null,
          h('div', { className: 'post-content md-content' }, props.widgetFor('body')),
          kaynaklar.length ? h('section', { className: 'katman-arastirma' },
            h('h2', null, 'Veri kaynakları'),
            h('ol', { className: 'katman-kaynaklar' }, kaynaklar.map(function (k, i) {
              var ad = k.get('ad'), bag = guvenliAdres(k.get('baglanti'), /^https?:\/\/\S+$/), t = k.get('tarih');
              return h('li', { key: i }, bag ? h('a', { href: bag, target: '_blank', rel: 'noopener' }, ad) : ad,
                t ? h('span', { className: 'katman-kaynak-tarih' }, ' (' + t + ')') : null);
            }))) : null,
          etiketler.length ? h('footer', { className: 'post-footer' },
            h('ul', { className: 'post-tags' }, etiketler.map(function (t) {
              return h('li', { key: t }, h('a', null, t));
            }))) : null)));
  }

  function SayfaOnizleme(props) {
    var d = function (k) { return props.entry.getIn(['data', k]); };
    return h('div', { className: 'katman-onizleme', ref: onizlemeRef },
      aracCubugu(),
      h('main', { className: 'main' },
        h('article', { className: 'post-single' },
          h('header', { className: 'post-header' },
            h('h1', { className: 'post-title' }, d('title') || 'Başlıksız sayfa')),
          h('div', { className: 'post-content md-content' }, props.widgetFor('body')))));
  }

  CMS.registerPreviewTemplate('yazilar', YaziOnizleme);
  CMS.registerPreviewTemplate('sayfalar', SayfaOnizleme);
})();
