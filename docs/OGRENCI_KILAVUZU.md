# Katman Öğrenci Kılavuzu

Bu kılavuz, Katman sitesine yazı göndermek isteyen öğrenciler içindir. Kod bilmen gerekmez. Adımları sırayla izle.

> Not: Bu kılavuzdaki panel ve site adları (GitHub, Decap, Flourish, Datawrapper vb.) zaman zaman değişir. Ekranda bir buton adı farklıysa mantığı aynıdır. Emin olmadığımız ekran adlarını "(ekran adı farklı olabilir)" diye işaretledik.

## İçindekiler

1. Nasıl çalışıyor?
2. GitHub hesabı açma
3. Panele giriş
4. Yeni yazı oluşturma
5. Form alanları
6. Metin editörü
7. Görsel ekleme
8. Gömme (embed) ekleme
9. Kaydetme ve gönderme
10. Geri bildirim gelirse
11. Sık sorunlar
12. Yapmaman gerekenler

---

## 1. Nasıl çalışıyor?

1. GitHub hesabınla `/admin/` adresindeki panele girersin.
2. İlk girişte panel senden "fork" ister. Bu, sitenin deposunun senin hesabında bir kopyasını oluşturur. Ana siteye doğrudan yazamazsın, bu normal.
3. Yazını panelde yazarsın. Yazın senin kopyanda saklanır.
4. Yazın hazır olunca "Taslak" sütunundan "İncelemeye hazır" sütununa taşırsın. Bu, öğretim üyesine otomatik bir "pull request" (değişiklik önerisi) olarak gider.
5. Öğretim üyesi inceler, geri bildirim verir ya da onaylar.
6. Yazıyı yayımlayan sen değilsin, öğretim üyesidir. Yayın genellikle haftalık ya da dönem sonunda toplu yapılır. Yazının hemen yayında görünmemesi normaldir.

Netlify hesabı açman gerekmez. Yalnızca GitHub hesabı yeterli.

## 2. GitHub hesabı açma

1. https://github.com adresine git, **Sign up** (Kaydol) seç.
2. E-posta, parola ve kullanıcı adı belirle.
3. E-postanı doğrula.

Bilmen gerekenler:

- **Kullanıcı adın herkese açık olacak.** Yazının geçmişinde ve senin kopyanda görünür. Gerçek adını kullanıcı adı yapman gerekmez. Ama yazının künyesinde ad-soyadın görünecek (formdaki "Yazar (ad soyad)" alanı).
- Okul dışında kullanmak istemediğin bir kullanıcı adı seçme. Sonradan değiştirebilirsin ama eski adres bir süre başkalarında kayıtlı kalabilir.
- **İki adımlı doğrulamayı (2FA) aç.** GitHub'da Settings > Password and authentication > Two-factor authentication (ekran adı farklı olabilir). Hesabının ele geçirilmesini zorlaştırır.
- Zaten GitHub hesabın varsa onu kullanabilirsin. Kullanıcı adının herkese açık görüneceğini unutma.

## 3. Panele giriş

1. Tarayıcında sitenin adresine git ve sonuna `/admin/` ekle. Örnek: `https://katmanlar.netlify.app/admin/`
2. **GitHub ile giriş** (Login with GitHub) butonuna tıkla. (Buton adı farklı olabilir.)
3. Bir pencere (popup) açılır. GitHub'a giriş yapmadıysan giriş yap.
4. GitHub, "Decap CMS bu izinleri istiyor" gibi bir yetki ekranı gösterir. **Authorize** (Yetki ver) de. Bu uygulama `public_repo` yetkisi ister. Yani genel (public) depolarında işlem yapabilir. Bu yetki, sitenin kopyasını oluşturmak ve yazını göndermek için gerekir.
5. Panel, "fork" oluşturmak isteyip istemediğini sorar. Onayla. Birkaç saniye sürebilir.
6. Fork hazır olunca panel açılır. Sol tarafta **Yazılar** koleksiyonunu görürsün.

Fork yalnızca ilk girişte yapılır. Sonraki girişlerde doğrudan panele girersin.

## 4. Yeni yazı oluşturma

1. **Yazılar** koleksiyonunda sağ üstteki **Yeni Yazı** (New Yazılar) butonuna tıkla. (Buton adı farklı olabilir.)
2. Formu doldur (aşağıda her alan anlatılıyor).
3. Üstteki **Kaydet** (Save) ile kaydet. Yazın "Taslak" sütununda görünür.

Dosya adın (yazının kalıcı adresi) başlığından otomatik üretilir: `yıl-başlık` biçiminde. Yazının adresi `/yazilar/<dosya-adı>/` olur. Yarışmalara gönderilirse bu adres kullanılacağı için **sonradan değiştirilemez**. Başlığı baştan düşünerek yaz.

## 5. Form alanları

Panelde göreceğin alan adları aşağıdakilerle aynıdır. Zorunlu alanları doldurmadan yazıyı gönderemezsin.

| Alan | Zorunlu mu? | Ne yazacaksın? |
|---|---|---|
| **Başlık** | Evet | Yazının başlığı. Açık ve kısa olsun. Yayından sonra adres bu başlıktan üretilmiş olarak kalır. |
| **Özet** | Evet | En fazla 200 karakter. Anasayfada ve paylaşım kartlarında görünür. Sınırı aşarsan panel uyarır. |
| **Yazar (ad soyad)** | Evet | Yalnızca adın ve soyadın. Öğrenci numarası yazma. |
| **Ders adı** | Evet | Dersin adı. |
| **Dönem** | Evet | Biçim: `YIL Güz`, `YIL Bahar` ya da `YIL Yaz`. Örnek: `2026 Güz`. Başka biçim kabul edilmez. |
| **Ödev türü** | Evet | `Vize` ya da `Final` seç. |
| **Yayın tarihi** | Evet | Gün.Ay.Yıl ve saat. Yazının yayın tarihi olarak gösterilir. Yayından sonra değişmemeli, çünkü yarışmalarda referans olur. Doğru tarihi seç. |
| **Oluşturulma tarihi** | — | Yazıyı ilk açtığın an otomatik yazılır, değiştiremezsin. Sitede görünmez. |
| **Kapak görseli** | Hayır | Üç alt alanı var (aşağıda). Görsel eklemezsen bu bölümü boş bırak. |
| **Konu etiketleri** | Evet | Yazının konusu. Örnek: `iklim`, `deprem`, `ulaşım`. Virgülle ayırarak ya da tek tek ekle. |
| **Metin** | Evet | Yazının kendisi. Word ya da WordPress'teki gibi düğmelerle biçimlendirilir (bölüm 6). |
| **Veri kaynakları** | Hayır | Metnin altındadır. Yazıda kullandığın verilerin kaynakları; yazının sonunda liste olarak görünür. Aşağıya bak. |
| **Taslak (yayımlanmasın)** | Hayır | İşaretlersen yazı birleştirilse bile sitede görünmez. Normalde boş bırak. Bunu panelin "Taslak" sütunuyla karıştırma, o ayrı bir şeydir. |

### Kapak görseli alt alanları

- **Görsel adresi (https://...)**: Görselin doğrudan bağlantısı. `https://` ile başlamalı. Görselin nasıl bulunacağı bölüm 7'de.
- **Alternatif metin**: Görseli göremeyen okurlar için bir cümleyle tarif et. Kapak görseli eklediysen bu alan **zorunlu gibi düşün**. Boş bırakırsan site yapılırken uyarı çıkar ve öğretim üyesi senden ister.
- **Görsel kaynağı / telif notu**: Örnek: `Fotoğraf: Ad Soyad, CC BY 4.0`. Görselin sahibini ve lisansını yaz.

### Veri kaynakları alt alanları

Her veri kaynağı için bir satır ekle:

- **Kaynak adı**: Örnek: `TÜİK Konut Birim Fiyatları`.
- **Bağlantı**: `http://` ya da `https://` ile başlayan adres. Zorunlu değil ama mümkünse ekle.
- **Veri tarihi**: Verinin ait olduğu dönem ya da eriştiğin tarih. Örnek: `2025`, `Mart 2026`.

Metinde kullandığın her rakam bir veri kaynağına dayanmalı. Öğretim üyesi bunu kontrol edecek.

## 6. Metin editörü

**Metin** alanı Word ya da WordPress'teki gibi çalışır: yazarsın, biçimlendirmek için metni seçip üstteki düğmelere basarsın. Markdown bilmen gerekmez.

| Düğme | Ne yapar? |
|---|---|
| **B** / *I* | Kalın / italik |
| Bağlantı simgesi | Seçili metne bağlantı ekler (adres `https://` ile başlamalı) |
| Başlık (H2, H3) | Bölüm başlığı ve alt başlık. Sayfa başlığı zaten ayrıca gösterilir; yazıyı H2 ile böl. |
| Alıntı | Alıntı bloğu |
| Madde / numaralı liste | Liste |
| **+** | **Görsel** ya da **Gömme** ekler (bölüm 7 ve 8) |

İpuçları:

- Yeni paragraf için Enter'a bas.
- Word'den ya da Google Docs'tan kopyaladığın metin çoğunlukla biçimiyle gelir. Garip görünürse yapıştırdıktan sonra düğmelerle düzelt.
- Markdown biliyorsan editörün sağ üstündeki düğmeyle **Markdown** moduna geçip işaretlerle de yazabilirsin. İki mod aynı metni gösterir.

### Önizleme

Editörün sağında yazının sitedeki görünümü durur: başlık, künye, kapak görseli, metin içi görseller ve **gömmeler çalışır halde** görünür. Önizleme görünmüyorsa üstteki göz simgesine (ekran adı farklı olabilir) bas.

Önizlemenin üstündeki **Yeni pencerede aç** düğmesi önizlemeyi ayrı bir sekmede açar. Panelde yazdıkça o sekme de kendiliğinden güncellenir; geniş ekranda ya da ikinci monitörde yazının son halini görmek için kullan.

## 7. Görsel ekleme

**Görsel yükleme kapalıdır.** Bilgisayarından dosya yükleyemezsin. Görseller bir başka yerde barındırılır, sen bağlantısını yapıştırırsın.

### Görseli nereden bulursun?

- **Wikimedia Commons** (commons.wikimedia.org): Lisansı açık, serbestçe kullanılabilen görseller. Görsel sayfasında lisansı ve yazarı yazar.
- **Flickr**: Yalnızca Creative Commons lisanslı fotoğrafları kullan. Lisansı fotoğraf sayfasında görürsün.
- **Imgur**: Kendi görselini (örneğin kendi çektiğin fotoğrafı ya da kendi yaptığın grafiği) yükleyebilirsin.
- **Datawrapper / Flourish**: Kendi yaptığın grafiğin PNG dışa aktarımını alıp Imgur'a yükleyebilirsin. (Ekran adı farklı olabilir: Datawrapper'da "Publish & Embed" ya da "Export" altında PNG indirme seçeneği bulunur; Flourish'ta "Export & publish" altında görsel olarak indirme.)

**Kendi Google Drive'ını kullanma.** Drive, görselin doğrudan bağlantısını vermez; bağlantı bir önizleme sayfasına gider ve görsel sitede görünmez.

### Doğrudan görsel bağlantısı nasıl alınır?

Görselin adresi çoğunlukla `.jpg`, `.png` ya da `.webp` ile biter. Bunu elde etmenin genel yolu:

1. Görseli tarayıcıda tek başına aç (görsel sayfasında "Orijinal dosya" / "Original file" bağlantısı ya da görsel üzerinde sağ tık).
2. Sağ tık > **Görsel adresini kopyala** (Copy image address). (Menü adı tarayıcıya göre değişir.)
3. Adres `https://` ile başlıyor mu bak. Başlamıyorsa kullanma.

**"İndir" düğmesinin bağlantısını kullanma.** Pixabay, Unsplash gibi sitelerde "İndir" bağlantısı (örneğin `pixabay.com/.../download/...`) görsel değil, giriş isteyen bir sayfadır; sitede görsel görünmez. Görselin kendisine sağ tıklayıp adresini kopyala. Pixabay'de doğru adres `https://cdn.pixabay.com/photo/...` ile başlar.

### Görseli nereye yapıştırırsın?

- **Kapak görseli**: Formdaki "Kapak görseli" bölümüne (adres, alternatif metin, kaynak/telif notu).
- **Metin içi görsel**: `Metin` alanında görselin geleceği yerde boş bir satıra geç, araç çubuğundaki **+** düğmesine bas ve **Görsel**'i seç. Açılan kutuyu doldur:
  - **Görsel adresi**: `https://` ile başlayan doğrudan bağlantı.
  - **Alternatif metin**: Görseli göremeyen biri ne olduğunu bu cümleden anlar. Boş bırakma.
  - **Görsel altı yazısı / kaynak**: Görselin altında görünür. Örnek: `Fotoğraf: Ad Soyad, CC BY 4.0`.

Görsel hemen sağdaki önizlemede görünür. Görünmüyorsa adres doğrudan görsel bağlantısı değildir (yukarıya bak).

### Telif ve kaynak

- İzin vermeyen birinin görselini kullanma. İnternette bulduğun her görsel serbest değildir.
- Lisansı kontrol et ve yazarın istediği biçimde kaynak göster. Örnek: `Fotoğraf: Ad Soyad, CC BY 4.0, Wikimedia Commons`.
- Metin içi görselin kaynağını **Görsel altı yazısı / kaynak** alanına yaz.
- Görseli barındıran site görseli silerse yazında görsel kırık görünür. Önemli görseller için güvenilir bir yer seç.

## 8. Gömme (embed) ekleme

Grafik, harita, zaman çizelgesi ya da video gibi etkileşimli içerikleri "gömme kodu" ile yazına eklersin.

### Genel kural

1. Aracın gömme kodunu kopyala (aşağıda araç araç anlatılıyor).
2. `Metin` alanında göstermek istediğin yerde boş bir satıra geç.
3. Araç çubuğundaki **+** düğmesine bas ve **Gömme (iframe / embed kodu)**'nu seç.
4. Açılan kutuya kodu **olduğu gibi** yapıştır. Değiştirme, kısaltma, parçalara bölme.

Gömme, sağdaki önizlemede çalışır halde görünür (grafik birkaç saniyede yüklenebilir). Sonradan değiştirmek ya da silmek için kutunun kendisini kullan.

Notlar:

- Kodu **metnin içine doğrudan yapıştırma**; editör onu düz yazı sanar ve sitede kod olarak görünür. Her zaman **+ > Gömme** kullan.
- Kod bir `<iframe>` olabilir, bazen yanında bir `<script>` satırı da olur. İkisini de aynı kutuya birlikte yapıştır.
- Önizleme güvenlik için gömmeyi yalıtılmış bir çerçevede çalıştırır. Çok nadiren bir araç önizlemede görünmeyebilir; sitedeki asıl görünümü gönderdikten sonra açılan önizleme sitesinde (deploy preview) görürsün.
- Yalnızca tanınmış araçların kodunu kullan. Tanımadığın bir siteden aldığın kodu yapıştırma.
- Gömmenin altına ya da üstüne grafiğin ne anlattığını bir cümleyle yaz. Okurların hepsi etkileşimli içeriği kullanamayabilir.

### Araç araç gömme kodu

Ekran adları araçların güncellemelerine göre değişebilir (ekran adı farklı olabilir).

**Flourish** (flourish.studio)
1. Grafiğini hazırla.
2. **Export & publish** (Dışa aktar ve yayımla) bölümüne git.
3. Grafiği yayımla (Publish).
4. **Embed** seçeneğinden kodu kopyala.

**Datawrapper** (datawrapper.de)
1. Grafiğini hazırla.
2. **Publish & Embed** adımına git ve grafiği yayımla.
3. **Embed code (responsive iframe)** kodunu kopyala. "Responsive" olanı seç; telefonda taşmaz.

**TimelineJS** (timeline.knightlab.com)
1. Zaman çizelgeni oluşturup yayımla.
2. **Share** (Paylaş) ya da **Embed** bölümünden gömme kodunu kopyala.

**StoryMapJS** (storymap.knightlab.com)
1. Hikâye haritanı oluşturup yayımla.
2. **Share** ya da **Embed** bölümünden gömme kodunu kopyala.

**Juxtapose** (juxtapose.knightlab.com)
1. İki görseli yükleme yerine bağlantılarıyla ekle ve karşılaştırmayı oluştur.
2. Oluşturduktan sonra çıkan **Embed** kodunu kopyala.

**YouTube**
1. Videonun altından **Paylaş** (Share) butonuna tıkla.
2. **Yerleştir** (Embed) seç.
3. Çıkan `<iframe>` kodunu kopyala.

## 9. Kaydetme ve gönderme

1. **Kaydet** (Save): Yazını senin kopyana kaydeder. Yazın "Taslak" sütununda durur. İstediğin kadar kaydedip sonra devam edebilirsin.
2. Yazını tamamladığında panelin üstündeki durum menüsünden ya da **Yazılar > İş akışı** ekranında (ekran adı farklı olabilir) yazını "Taslak" sütunundan **"İncelemeye hazır"** (Ready to Review) sütununa taşı.
3. Bu, **gönderme** anlamına gelir. Otomatik olarak öğretim üyesine bir pull request açılır.
4. Yazını yayımlama butonu sende yoktur, bu da normal.

Göndermeden önce son kontrol listesi:

- [ ] Başlık, özet (200 karakter altı), yazar adı, ders, dönem, ödev türü, tarih dolu.
- [ ] Veri kullandıysan kaynaklarını "Veri kaynakları" bölümüne ekledin.
- [ ] Metindeki her rakamın bir kaynağı var.
- [ ] Kapak görseli eklediysen alternatif metin ve kaynak/telif notu dolu.
- [ ] Tüm görsellerin lisansı uygun, kaynağı yazılı.
- [ ] Gömme kodlarını kontrol ettin; çalışıp çalışmadığını önizleme sitesinde göreceksin.
- [ ] Metinde öğrenci numaran ya da başka kişisel veri yok.

## 10. Geri bildirim gelirse

Öğretim üyesi düzeltme isterse GitHub, pull request'e yazılan yorumları e-postana bildirir (e-posta bildirimleri açıksa). Ayrıca GitHub'da pull request sayfasından da görürsün.

1. Panele gir.
2. Yazını aç (ilgili sütunda durur).
3. Düzelt ve **Kaydet**.
4. Yazı yine "İncelemeye hazır" sütununda değilse tekrar o sütuna taşı.
5. Düzeltmen aynı pull request'e eklenir. Yeni bir yazı açma.

**Dosya adını (başlıktan türeyen adres kısmını) değiştirme.** Başlığı düzeltmen gerekirse öğretim üyesiyle konuş.

## 11. Sık sorunlar

**Fork sonrası panel boş görünüyor.**
- Sayfayı yenile (F5).
- Çıkış yapıp tekrar giriş yap.
- GitHub'da kendi hesabına bak: `katman` adlı bir kopya oluşmuş olmalı. (Adı farklı olabilir.) Oluşmadıysa birkaç dakika bekle ve tekrar dene.

**Yetki hatası alıyorum.**
- GitHub'da yetki ekranında Decap'e izin vermemiş olabilirsin. GitHub > Settings > Applications > Authorized OAuth Apps (ekran adı farklı olabilir) bölümünden uygulamayı kaldır, panele yeniden girip bu sefer izin ver.
- Doğru GitHub hesabıyla giriş yaptığından emin ol.
- Olmazsa öğretim üyesine hata mesajının ekran görüntüsünü gönder.

**Giriş penceresi açılmıyor.**
- Tarayıcın popup'ı (açılır pencere) engelliyordur. Adres çubuğundaki engel simgesine tıkla ve bu site için popup'lara izin ver. Sonra tekrar dene.
- Tarayıcı eklentilerini (reklam engelleyici vb.) bu site için kapatmayı dene.

**Gömme kodunu yapıştırdım ama önizlemede görünmüyor.**
- Kodu **+ > Gömme** kutusuna mı yapıştırdın? Metnin içine doğrudan yapıştırılan kod düz yazı olarak kalır.
- Kodu tam kopyaladığından emin ol (`<iframe ...></iframe>` ya da `<div ...><script ...></script></div>` tamamı).
- Birkaç saniye bekle; bazı araçlar geç yüklenir. Yine görünmüyorsa asıl görünümü deploy preview'da kontrol et.

**Özet alanı kırmızı.**
- 200 karakteri aştın. Kısalt.

**Dönem alanı kırmızı.**
- Biçim `2026 Güz` gibi olmalı. Rakam, boşluk, ardından Güz, Bahar ya da Yaz.

**Yazı kayboldu.**
- "Taslak" ve "İncelemeye hazır" sütunlarına bak. Görünmüyorsa panelde Yazılar listesinde ara. Bulamazsan öğretim üyesine yaz.

## 12. Yapmaman gerekenler

- **Öğrenci numaranı yazma.** Ne formda ne de metinde. Herkese açık sitede kalıcı olur.
- **Başkasının görselini izinsiz kullanma.** Lisansı ve kaynağı kontrol et.
- **Kişisel veri paylaşma.** Başkalarının adı, telefonu, adresi, sağlık durumu vb. yazma. Verini anonimleştirmeden kullanma.
- **Dosya adını değiştirme.** Yazının kalıcı adresi ona bağlı.
- **Yayın tarihini yayından sonra değiştirme.**
- **Başkasının yazısını düzenleme.**
- **Tanımadığın bir siteden aldığın gömme kodunu yapıştırma.**
- **Gömme kodunu değiştirme ya da kendin kod ekleme.** Gizli yönlendirme, izleme kodu gibi şeyler reddedilir.
- **Parolanı ya da GitHub'a ait gizli anahtarlarını kimseyle paylaşma.**

## Yardım

Sorun yaşarsan hatanın ekran görüntüsünü, yazının başlığını ve GitHub kullanıcı adını öğretim üyesine gönder.
