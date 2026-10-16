# Katman

**Öğrenci perspektifinden veri hikâyeleri** · *Layers | Student data stories*

Dr. Sadettin Demirel'in Üsküdar Üniversitesi'nde verdiği derslerde hazırlanan öğrenci projeleri: dijital hikâye anlatımı, veri gazeteciliği, veri görselleştirme ve görsel gazetecilik çalışmaları.

- Site: https://katmanlar.netlify.app
- Yazar paneli: `/admin/`

## Yapı

- [Hugo](https://gohugo.io/) 0.168.0 + [PaperMod](https://github.com/adityatelange/hugo-PaperMod) (Hugo modülü, sürümü `go.mod`'da sabit)
- [Decap CMS](https://decapcms.org/) 3.17.1: GitHub backend, open authoring, editorial workflow
- Netlify: yalnızca `main`'e merge'de production deploy; pull request'ler için ücretsiz önizleme

Tema dosyalarına dokunulmaz. Değişiklikler sitenin kendi `layouts/`, `assets/` ve `i18n/` klasörlerindedir.

| Yol | İçerik |
|---|---|
| `content/yazilar/` | Öğrenci yazıları (dosya adı = kalıcı adres) |
| `content/sayfalar/` | Hakkında gibi sayfalar, kök adreste yayımlanır (`/hakkinda/`) |
| `config/_default/menus.yaml` | Ana menü (panelde Site ayarları > Site menüsü) |
| `data/vitrin.yaml`, `data/yarismalar.yaml` | Vitrin ve yarışma bilgileri (yalnızca yönetici) |
| `static/admin/config.yml` | Decap CMS form alanları |
| `static/admin/katman-cms.js`, `katman-gomme.js` | Editörün Görsel/Gömme düğmeleri, önizleme şablonları |
| `static/admin/onizleme.html` | Yeni pencerede canlı taslak önizlemesi |
| `layouts/_partials/katman/` | Künye, araştırma notu, kart, içerik denetimi |
| `docs/` | Kılavuzlar |

## Kılavuzlar

- [Öğrenci kılavuzu](docs/OGRENCI_KILAVUZU.md)
- [Yönetici kılavuzu](docs/YONETICI_KILAVUZU.md)
- [Kurulum](docs/KURULUM.md)
- [Onam metni taslağı](docs/ONAM_METNI.md)

## Yerelde çalıştırma

Hugo (0.160+) ve Go gerekir.

```sh
hugo server
```

Build sırasında `KATMAN:` ile başlayan uyarılar içerik denetimidir (eksik alan, uzun özet, alt metinsiz görsel vb.); build'i durdurmaz.
