# Katman Yönetici Kılavuzu

Bu kılavuz öğretim üyesi (yönetici) içindir. Kurulum için `KURULUM.md`, öğrencilere dağıtılacak kılavuz için `OGRENCI_KILAVUZU.md` dosyasına bak.

> Ekran adları: Netlify ve GitHub arayüzleri değişir. Emin olmadığımız ekran adlarını "(ekran adı farklı olabilir)" diye işaretledik. Doğrulanamayan davranışlar "doğrulanmadı" diye işaretlidir.

## İçindekiler

1. Temel fikir
2. PR inceleme akışı
3. Deploy preview ve sensitive variable policy
4. Toplu merge (birincil yöntem: Stopped builds)
5. Toplu merge (ikinci seçenek: ara dal)
6. Vitrin ve yarışma işaretleme
7. Rakam ve kaynak tutarlılığı kontrol listesi
8. Gömme kodu güvenlik kontrol listesi
9. Build uyarıları (deploy log)
10. Yayından kaldırma
11. Kredi takibi
12. Acil durum
13. Dönem başı ve sonu kontrol listeleri

---

## 1. Temel fikir

- Öğrenci GitHub hesabıyla `/admin/` panelinden yazar. Yazı, "İncelemeye hazır" sütununa taşınınca otomatik pull request (PR) olur.
- Öğrenci yayımlayamaz. Production yayın yalnızca `main` dalına merge ile olur.
- **Öğrenci yazıları senin Decap "İş Akışı" ekranına düşmez.** Öğrencinin PR'ı kendi fork'undan gelir ve Decap yöneticinin iş akışında yalnızca ana repodaki dalları listeler. Öğrenci gönderilerinin gelen kutusu GitHub'daki **Pull requests** sekmesidir (bildirim için repoda **Watch → All Activity**). Senin panelindeki İş Akışı yalnızca kendi yazdığın yazılar içindir.
- Her `main` merge'i bir production deploy demektir ve **15 kredi** harcar (Free plan: 300 kredi/ay). Bu yüzden PR'ları **toplu** yayımlarız. Ayrıntı bölüm 4 ve `KURULUM.md` "Kredi tahmini".
- Deploy preview ve branch deploy 0 kredidir. Başarısız deploy da 0 kredidir.

## 2. PR inceleme akışı

Her PR için sırayla:

1. GitHub'da repo > **Pull requests** sekmesini aç. Decap'in açtığı PR'ları listede görürsün. PR'a Decap'in durum etiketi eklenir; öğrenci "İncelemeye hazır"a taşımadıysa PR hazır değildir. (Etiket adları doğrulanmadı.) Hazır olmayan PR'ı inceleme.
2. **Deploy preview'a bak.** PR sayfasında Netlify'ın yorumundaki/kontrollerindeki "Deploy Preview" bağlantısını aç. Yazı sayfasında şunlara bak:
   - Sayfa açılıyor mu, künye kutusu doğru mu (yazar, ders, dönem, tarih, kaynaklar)?
   - Gömmeler görünüyor mu, mobilde taşıyor mu (tarayıcıda dar pencere dene)?
   - Görseller açılıyor mu, alt metin var mı?
3. **Files changed** sekmesine geç. Kural: **yalnızca tek bir dosya** değişmiş olmalı: `content/yazilar/<dosya-adı>.md`.
4. **Hemen reddet** (yorum yaz, "Request changes" ya da kapat) eğer şunlardan biri varsa:
   - `data/` altında herhangi bir değişiklik (vitrin ve yarışma yalnızca sende).
   - `layouts/`, `assets/`, `i18n/`, `archetypes/` değişikliği.
   - `static/` altında herhangi bir değişiklik, özellikle `static/uploads/` (görsel yükleme kapalıdır).
   - `hugo.yaml`, `netlify.toml`, `go.mod`, `go.sum`, `static/admin/config.yml`, `.github/` değişikliği.
   - Başkasının yazısının değiştirilmesi ya da silinmesi.
   - **Dosya yeniden adlandırma** (Files changed'de "renamed" görünüyorsa). Kalıcı adres bozulur.
   - Yayınlanmış bir yazıda `date` değişikliği.
   - Birden fazla yazı dosyası (her öğrenci PR'ı tek yazı içermeli; istisna kararı sende).
5. **Front matter kontrolü.** Dosyanın başındaki `---` arası alanlara bak:
   - `title`, `description` (en fazla 200 karakter), `author`, `ders`, `donemler` (örnek: `2026 Güz`), `odevler` (Vize/Final), `date` dolu mu? (`veri_kaynaklari` isteğe bağlıdır.)
   - `author` alanı o öğrencinin gerçek adı mı? PR'ı açan GitHub kullanıcısıyla öğrenci listesini eşleştir.
   - Öğrenci numarası ya da kimlik verisi yok mu?
   - `draft: true` ise yazı yayımlanmaz. Bilerek mi?
   - `vitrin`, `yarisma` gibi alanlar öğrenci dosyasında olmamalı (varsa sil/reddet; vitrin ve yarışma `data/` dosyalarında).
6. **Dosya adı kuralı:** `YIL-baslik.md` (ASCII, tireli). Aynı adı iki kez kullanan başka bir dosya var mı?
7. Metin kontrolü: bölüm 7 (rakam/kaynak) ve bölüm 8 (gömme güvenliği) listelerini uygula.
8. Deploy log'da `KATMAN:` ile başlayan WARN satırlarına bak (bölüm 9).
9. Sonuç:
   - Sorun varsa PR'a yorum yaz ve öğrenciden düzeltmesini iste. Öğrenci aynı PR'a düzeltme ekler; deploy preview yenilenir.
   - Sorun yoksa PR'a **Approve** ver. Bu aşamada **henüz merge etme**, toplu merge bekler (bölüm 4).

## 3. Deploy preview ve sensitive variable policy

Öğrenci PR'ları fork'tan gelir. Bu PR'larda Netlify'ın deploy preview'ı çalışabilir, ama gizli (sensitive) ortam değişkenlerinin fork kodundan okunması istenmez.

Bir kez ayarla:

1. Netlify > projeni aç > **Project configuration** > **Environment variables** > **Site policies** (ya da **Sensitive variable policy**; ekran adı farklı olabilir).
2. **Deploy without sensitive variables** seçeneğini seç.
3. Kaydet.

Bu sitede zaten gizli değişken kullanılmıyor (OAuth secret Netlify'ın OAuth sağlayıcısındadır, repoda ve ortam değişkeninde yoktur). Yine de bu ayar, ileride birisi gizli değişken eklerse fork PR'larının ona erişmesini önler.

Deploy preview davranışı:

- Netlify her PR için ücretsiz önizleme üretir (0 kredi).
- Gömme kodları önizlemede çalışır. Panelin önizlemesi güvenlik nedeniyle iframe göstermeyebilir; gerçek görünüm deploy preview'dadır.
- Production deploy yalnızca `main`'e merge'de olur.

## 4. Toplu merge (birincil yöntem: Stopped builds)

Amaç: Birçok PR'ı merge edip yalnızca **tek** production deploy yapmak (15 kredi). Her merge ayrı deploy olursa 60 PR = 900 kredi ve site durur.

**Önemli:** "Stopped builds" açıkken Netlify production deploy'ların yanında **deploy preview ve branch deploy'ları da** durdurur (Netlify dokümanı: production deploy, Deploy Preview ve branch deploy build'lerini engeller). Bu yüzden **önce tüm PR'ları incele ve onayla (bölüm 2), sonra builds'i durdur.**

Adımlar:

1. **Hazırlık.** İnceleme yapılmış, deploy preview'ı kontrol edilmiş ve Approve verilmiş PR'ların listesini çıkar. Her biri bölüm 2'deki kontrollerden geçmiş olsun.
2. **Build'leri durdur.** Netlify > **Project configuration** > **Build & deploy** > **Continuous deployment** > **Build settings** > **Configure** (ekran adı farklı olabilir) > **Build status: Stopped builds** > **Save**.
3. **GitHub'da PR'ları merge et.** Onaylanan PR'ları art arda merge et. Merge türü olarak "Squash and merge" ya da "Create a merge commit" kullanabilirsin. Dosya adı değişmediğinden emin ol. Bu sırada Netlify build tetiklemez.
4. **Vitrin ve yarışma düzenlemelerini yap.** `data/vitrin.yaml` ve `data/yarismalar.yaml` dosyalarını GitHub web editörüyle düzenle (bölüm 6), `main`'e commit et. Bunlar da bu toplu yayına dahil olur.
5. **Build'leri tekrar aç.** Aynı ekrana dön > **Build status: Activate builds** > **Save**. Builds'i aktif etmek otomatik olarak yeni bir build tetiklemez (Netlify dokümanı).
6. **Tek deploy başlat.** Netlify > **Deploys** > **Trigger deploy** > **Deploy site**. Bu tek bir production deploy yapar: **15 kredi**.
7. Deploy bitince **Deploys** sayfasından logu aç, `KATMAN:` uyarılarına bak (bölüm 9).
8. **Sitede kontrol et.** Yeni yazıların kalıcı adresleri `/yazilar/<dosya-adı>/` açılıyor mu, anasayfada ve arşivde görünüyor mu, vitrin doğru mu, RSS'te (`/index.xml`) var mı?

Kredi hesabı: n PR + data düzenlemeleri = **1 production deploy = 15 kredi**. Bandwidth ve web istekleri ayrıca hesaplanır (`KURULUM.md`).

Uyarılar:

- Builds durdurulmuşken **unutma**: yayın yapılmaz. İşin sonunda mutlaka "Activate builds" ve "Deploy site" yap. Site açık kalır, eski deploy yayında durur.
- Builds'i aktif etmeden `main`'e merge yaptıysan site güncellenmez; bu zararsızdır.
- Bu ekran adları ve düğme adları değişebilir (ekran adı farklı olabilir).

### Alternatif: merge commit mesajına `[skip netlify]`

Bazı Netlify kurulumlarında commit mesajına `[skip netlify]` eklemek build'i atlatır. Bu davranış **doğrulanmadı**; Netlify'ın güncel dokümanına bakmadan buna güvenme. Squash merge'de commit mesajı sonradan düzenlenebilir, ama her merge'in mesajına eklemeyi unutursan o merge'de deploy olur (15 kredi). Bu yüzden birincil yöntem olarak önerilmez.

## 5. Toplu merge (ikinci seçenek: ara dal)

Bu yöntem builds'i durdurmaya gerek bırakmaz, ama her PR'ın hedef dalını elle değiştirmek gerekir. Branch deploys "None" olduğundan ara dala yapılan merge'ler deploy üretmez (0 kredi).

Ön koşul: Netlify > **Project configuration** > **Build & deploy** > **Continuous deployment** > **Branches and deploy contexts**: Production branch `main`, **Branch deploys: None**, **Deploy Previews: Any pull request**.

Adımlar:

1. `main`'den yeni bir ara dal aç: GitHub > repo > dal menüsü > yeni dal adı `toplu-yayin` > **Create branch**.
2. Onayladığın her PR için:
   1. PR sayfasını aç.
   2. Başlığın yanındaki **Edit** butonuna tıkla.
   3. **base** dalını `main`'den `toplu-yayin`'e değiştir.
   4. **Merge pull request** yap.
   (PR'ın deploy preview'ını base'i değiştirmeden **önce** incele. Base değişince önizlemenin yenilenip yenilenmediği doğrulanmadı.)
3. `toplu-yayin` dalında `data/vitrin.yaml` ve `data/yarismalar.yaml` düzenlemelerini yap (GitHub web editöründe dal olarak `toplu-yayin`'i seç).
4. `toplu-yayin` > `main` için **tek bir PR** aç. Deploy preview (0 kredi) ile son kontrolü yap, `KATMAN:` uyarılarına bak.
5. Bu PR'ı **Create a merge commit** ile `main`'e merge et. Bu **tek** production deploy tetikler (15 kredi).
6. Dalı sil ya da sonraki toplu yayından önce `main`'den yeniden oluştur (dallar ayrışmasın diye). Kontrol: yeni yazılar kalıcı adreslerinde açılıyor mu?

Dezavantaj: Her PR'ın base'ini elle değiştirmek gerekir. Öğrenci aynı PR'a sonradan düzeltme eklerse yeniden bakman gerekebilir.

## 6. Vitrin ve yarışma işaretleme

Bu bilgiler öğrenci formunda yoktur. Sen GitHub'da düzenlersin. Bu değişiklikleri **toplu yayına dahil et** (bölüm 4, adım 4; ya da ara dal yönteminde bölüm 5, adım 3).

Yazı tanımlayıcısı = **dosya adı** (uzantısız). Örnek: `content/yazilar/2026-istanbulda-kira-artisi.md` dosyası için `2026-istanbulda-kira-artisi`.

### Vitrin: `data/vitrin.yaml`

Yazı dosya adlarının listesidir. Listedeki yazılar anasayfadaki "Vitrin" bölümünde görünür.

```yaml
- 2026-istanbulda-kira-artisi
- 2026-deprem-bolgesinde-konut
```

### Yarışmalar: `data/yarismalar.yaml`

Dosya adı anahtarlı bir listedir. Her kayıt: `ad` (yarışma adı), `yil`, `sonuc`.

```yaml
2026-istanbulda-kira-artisi:
  - {ad: Örnek Veri Gazeteciliği Ödülleri, yil: 2027, sonuc: Finalist}
  - {ad: Başka Bir Yarışma, yil: 2027, sonuc: Başvuruldu}
```

Aynı yazı için birden fazla yarışma satırı ekleyebilirsin.

### GitHub web editörüyle düzenleme

1. GitHub > repo > `data/` klasörü > ilgili dosya.
2. Sağ üstte kalem simgesi (**Edit this file**).
3. Düzenle.
4. **Commit changes**: Doğrudan `main`'e commit ederken, Netlify'ın build'ini hesaba kat:
   - Birincil yöntemde (bölüm 4) builds **durdurulmuşken** commit et.
   - Ara dal yönteminde (bölüm 5) `toplu-yayin` dalına commit et.
   - Builds açıkken doğrudan `main`'e commit etmek 15 kredilik ayrı bir deploy demektir.

Kontroller:

- YAML'da girinti ve iki nokta boşluk hataları build'i bozabilir. Hugo build hata verirse deploy başarısız olur (0 kredi) ama site güncellenmez. Deploy log'u oku.
- Listedeki dosya adı gerçekten var mı? Yazım hatasını kontrol et.
- Bir öğrenci PR'ında `data/` değişikliği varsa reddet (bölüm 2).

### Başka bir sitede önce yayımlanmış yazılar

Yazı daha önce başka bir yerde (örneğin haberuskudar.com) yayımlandıysa dosyanın front matter'ına iki satır ekle:

```yaml
ilk_yayin: "https://haberuskudar.com/haberin-adresi"
canonicalURL: "https://haberuskudar.com/haberin-adresi"
```

`ilk_yayin` künyede ve yazının sonunda "Bu yazı ilk olarak ... adresinde yayımlandı" bağlantısı olarak görünür. `canonicalURL` arama motorlarına asıl kaynağı bildirir (kopya içerik sayılmaz). Bu alanlar öğrenci formunda yoktur.

## 7. Rakam ve kaynak tutarlılığı kontrol listesi

Her yazı için:

- [ ] Metindeki **her sayının** bir veri kaynağına bağlanıyor mu? (Veri kaynakları listesinde karşılığı var mı?)
- [ ] **Tarih ve dönem** doğru mu? Verinin tarihi (örneğin "Mart 2026") yazıda anlatılan dönemle uyumlu mu?
- [ ] **Birimler** doğru mu (TL/USD, bin/milyon, yıllık/aylık, kişi/hane)?
- [ ] **Yüzde ve yüzde puan** ayrımı doğru mu? (%10'dan %15'e artış = 5 yüzde puan, %50 artış.)
- [ ] Hesaplamalar tutuyor mu? (Toplamlar, ortalamalar, oranlar, değişim yüzdeleri.)
- [ ] **Grafik ile metin uyumlu mu?** Metnin söylediği rakam grafikteki değerle aynı mı? Eksen başlangıcı yanıltıcı mı?
- [ ] **Kaynak bağlantıları çalışıyor mu?** Veri kaynakları listesindeki ve metindeki bağlantılara tıkla. Kırık ya da yanlış sayfaya gidiyorsa düzelttir.
- [ ] Kaynak **veri tarihi** yazılı mı? Verinin eski olup olmadığı belli mi?
- [ ] Metin, verinin söyleyebileceğinden fazlasını iddia etmiyor mu (nedensellik)?
- [ ] Rakamların nasıl üretildiği metinde anlaşılır mı?
- [ ] **Görsel telifi:** Her görselin kaynağı ve lisansı yazılı mı? Telifli görsel izinsiz kullanılmış mı?
- [ ] **Alt metin:** Kapak görseli ve metin içi görsellerde anlamlı alt metin var mı?
- [ ] **Kişisel veri / KVKK riski:** Yazıda gerçek kişilerin adı, telefon, adres, sağlık verisi, ekran görüntülerinde kişi bilgisi ya da yeniden tanımlanabilir mikro veri var mı? Öğrenci numarası var mı?
- [ ] Dil: iftira, hakaret, doğrulanmamış suçlama var mı?

## 8. Gömme kodu güvenlik kontrol listesi

Site gömme kodlarını filtrelemez; Goldmark'ta ham HTML açıktır (`unsafe: true`). Güvenlik denetimi **senin incelemendir**. Dosyayı Files changed'de açıp gömme kodunu gözle oku.

**İzin verilen bilinen alan adları** (script src ve iframe src için):

- `flourish.studio`, `public.flourish.studio`
- `datawrapper.dwcdn.net`
- `cdn.knightlab.com`, `uploads.knightlab.com`, `juxtapose.knightlab.com`
- `youtube.com`, `youtube-nocookie.com` (mümkünse `youtube-nocookie.com` tercih et)

Kontrol listesi:

- [ ] Her `<script src="...">` ve `<iframe src="...">` yukarıdaki alan adlarından birine mi gidiyor? **Bu listenin dışındaki script kaynaklarına şüpheyle bak.** Gerekirse öğrenciye sor ve aracın resmi dokümanını kontrol et.
- [ ] `<script>` içinde **satır içi (inline) kod** var mı? Resmi gömme kodları genelde yalnızca `src` verir. Satır içi kod varsa içeriğini oku.
- [ ] `document.cookie`, `window.location`, `location.href`, `eval(`, `atob(`, `fromCharCode`, `unescape` geçiyor mu? Reddet.
- [ ] **Gizli iframe**: `width="0"`, `height="0"`, `display:none`, `visibility:hidden` ya da ekran dışına konumlandırma var mı?
- [ ] **Analitik / izleme**: `gtag`, `googletagmanager`, `google-analytics`, `fbq(` / `facebook` pixel, `hotjar`, `clarity`, `mixpanel` vb. var mı? Sitede izleme yok; reddet.
- [ ] `<form>` etiketi var mı? Veri toplama olabilir. Reddet.
- [ ] `<meta http-equiv="refresh">` var mı? Yönlendirme. Reddet.
- [ ] `<style>` etiketi ile sayfanın genel görünümünü bozan/gizleyen kural (örneğin `body`, `header`, `a` seçicileri) var mı?
- [ ] Satır içi olaylar: `onerror=`, `onload=`, `onclick=`, `onmouseover=` gibi nitelikler var mı?
- [ ] `javascript:` ile başlayan bağlantı ya da `data:` adresi var mı?
- [ ] Kod öğrencinin eklediği ek parçalar içeriyor mu (aracın resmi kodundan farklı mı)?
- [ ] Kısaltılmış ya da tanınmayan alan adları, IP adresleri var mı?
- [ ] Deploy preview'da gömme çalışıyor ve beklenen içeriği gösteriyor mu? Sayfa başka yere yönleniyor mu?

Not: Üçüncü taraf gömmeler (özellikle YouTube) kendi çerezlerini ve izleme kodlarını getirebilir. Sitemiz kendisi çerez/izleme eklemez. İstersen "Hakkında" sayfasında üçüncü taraf gömmelerin kendi çerez politikalarına tabi olduğunu belirt.

Şüpheli bir şey bulursan PR'ı onaylama ve öğrenciden gömmeyi aracın resmi sayfasından yeniden almasını iste.

## 9. Build uyarıları (deploy log)

Hugo build sırasında içerik denetimi uyarıları üretir. Netlify > **Deploys** > ilgili deploy > log'da `KATMAN:` ile başlayan `WARN` satırlarına bak. Örnekler:

- Özet 200 karakteri aşıyor.
- Kapak görseli var ama alt metin yok.
- Zorunlu alan eksik.

Hem deploy preview'larda hem production deploy'da bak. Uyarı varsa öğrenciden düzeltme iste, ya da toplu yayından önce kendin düzelt (ama öğrencinin PR'ından geçmek daha temizdir). Uyarılar build'i durdurmaz; yine de yayından önce temizlenmesi iyi olur.

## 10. Yayından kaldırma

Yayından kaldırma, kalıcı adresi etkiler. Yarışmaya gönderilmiş bir yazıda dikkatli ol.

Seçenekler:

1. **Taslağa çevir (önerilen geri alınabilir yol):** Yazının dosyasında front matter'a `draft: true` yaz (GitHub web editörü). Sonraki production deploy'da adres 404 olur. Dosya repoda kalır, sonra geri açılabilir.
2. **Dosyayı sil:** GitHub'da dosyayı sil. Kalıcı adres kaybolur. Git geçmişinde içerik durur (tamamen silinmez; bkz. `ONAM_METNI.md`).
3. **Alternatif: yazıyı yerinde bırakıp başına not ekle.** Örneğin düzeltme ya da geri çekme notu. Kalıcı adres ve yarışma bağlantıları bozulmaz.

Dikkat:

- `data/vitrin.yaml` ve `data/yarismalar.yaml` içinde o yazıya referans varsa onu da güncelle.
- Bu değişikliği de toplu yayına dahil et. Kişisel veri ya da hukuki acil durum varsa beklemeden tek deploy yap (15 kredi) ve ardından yeniden dön.
- Acil durumda eski bir deploy'a dönmek de mümkündür (bölüm 12). Bu 0 kredidir ama yalnızca eski bir hâle döner, o yazı eski deploy'da varsa geri gelir.
- Öğrenci geri çekme talep ederse `ONAM_METNI.md`'deki süreci izle.

## 11. Kredi takibi

- Netlify > ekibini seç > **Usage** (ya da **Usage and billing**; ekran adı farklı olabilir) sayfasında kalan krediyi, production deploy ve bandwidth tüketimini görürsün.
- Bildirimler kredinin %50, %75, %90 ve %100'ünde gelir.
- Free planda ek kredi alınamaz. Kredi biterse hesaptaki tüm siteler durur ("Site not available").
- Oranlar (14 Nisan 2026 değişikliğine göre): 300 kredi/ay; production deploy 15 kredi; bandwidth 20 kredi/GB; web istekleri 2 kredi/10.000; deploy preview ve branch deploy 0 kredi; başarısız deploy 0 kredi. Güncel oranlar için Netlify'ın fiyat sayfasına bak.
- Haftalık alışkanlık: toplu yayından sonra Usage sayfasına bak.
- Her merge = bir production deploy olmasın diye toplu yöntem şart (bölüm 4/5).

## 12. Acil durum

**Beklenmedik bir build ya da deploy tetikleniyor, kredi hızla gidiyor:**

1. Netlify > **Project configuration** > **Build & deploy** > **Continuous deployment** > **Build settings** > **Configure** > **Build status: Stopped builds** > **Save**. (Production deploy, deploy preview ve branch deploy durur.)
2. Nedeni bul (örneğin otomatik bot PR'ı, eklenmiş bir iş akışı, tekrarlanan push).
3. Sorun giderilince **Activate builds** ile aç. Otomatik build tetiklenmez; gerekirse **Deploys > Trigger deploy > Deploy site**.

**Yayında hatalı bir deploy var:**

1. Netlify > **Deploys** listesinde önceki çalışan deploy'u aç.
2. **Publish deploy** de. Bu, eski sürümü yayına alır ve **0 kredidir**.
3. Düzeltmeyi hazırla; hazır olunca yeni bir toplu yayın yap. (Eski bir deploy'u yayına almak otomatik yayını kilitleyebilir; sonra "Auto publishing" durumunu kontrol et. Ekran adı farklı olabilir, doğrulanmadı.)

**Kredi bitti, site "Site not available" gösteriyor:**

- Free planda ek kredi alınamaz. Sonraki ayın başında kredi yenilenir (yenilenme tarihi için Usage sayfasına bak). Bu arada içerik başka yere kopyalanmak istenirse repo `public` ve `hugo` ile başka yerde derlenebilir.

**Şüpheli bir PR merge edildi:**

1. Builds'i durdur (yukarıdaki adımlar), `draft: true` ya da dosyayı sil, sonra tek deploy yap. Gerekirse eski deploy'u yayına al.

## 13. Dönem başı ve sonu kontrol listeleri

### Dönem başı

- [ ] Netlify: kredi yenilenmiş mi, Usage sayfasına bak.
- [ ] Netlify: Production branch `main`, Branch deploys None, Deploy Previews Any pull request.
- [ ] Netlify: Sensitive variable policy "Deploy without sensitive variables".
- [ ] Netlify GitHub App yalnızca `sadettindemirel/katman` reposuna kısıtlı mı?
- [ ] Decap `config.yml`: `donemler` varsayılanı yeni dönemi gösteriyor mu (örneğin `2026 Güz`)? Gerekirse güncelle.
- [ ] Öğrencilerden onam formları toplandı mı (`ONAM_METNI.md`)?
- [ ] Öğrenci GitHub kullanıcı adları listesi hazır mı?
- [ ] Öğrencilere `OGRENCI_KILAVUZU.md` dağıtıldı mı?
- [ ] Bir deneme yazısıyla akış test edildi mi (`KURULUM.md` bölüm k)?
- [ ] Gömme araçları (Flourish, Datawrapper vb.) için örnek kod gösterildi mi?

### Dönem içi (haftalık)

- [ ] Yeni PR'ları incele (bölüm 2).
- [ ] Onaylanan PR'ları toplu yayına hazırla.
- [ ] Usage sayfasına bak.

### Dönem sonu

- [ ] Tüm vize/final PR'ları incelendi mi? Reddedilenler kapandı mı?
- [ ] Toplu merge yapıldı mı? Tek deploy, 15 kredi.
- [ ] Vitrin seçimi (`data/vitrin.yaml`) yapıldı mı?
- [ ] Yarışmaya gönderilen yazılar `data/yarismalar.yaml`'a işlendi mi?
- [ ] Tüm yazıların kalıcı adresleri açılıyor mu? RSS ve sitemap güncel mi?
- [ ] Deploy log'da `KATMAN:` uyarısı kalmadı mı?
- [ ] Kaynak bağlantıları ve harici görseller hâlâ çalışıyor mu? (Kırık olanlar için öğrenciyle konuş.)
- [ ] Geri çekme talepleri var mı (`ONAM_METNI.md`)?
- [ ] Bir sonraki dönem için dönem etiketi ve varsayılan güncellendi mi?
- [ ] Netlify kredi tüketimi kaydedildi mi (gelecek dönemi planlamak için)?
