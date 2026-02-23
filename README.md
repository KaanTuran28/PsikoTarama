# PsikoTarama - Klinik Ön Değerlendirme Aracı

PsikoTarama, bireylerin psikolojik semptom yoğunluklarını 6 farklı klinik alt boyutta analiz eden, tamamen istemci tarafında (client-side) çalışan modern bir web uygulamasıdır. 

Klinik psikoloji prensipleri ve modern UX/UI standartları gözetilerek "Dark Theme" (Karanlık Tema) eşliğinde tasarlanmıştır.

##  Yasal Uyarı ve Etik Beyan
**Bu uygulama tıbbi veya psikiyatrik bir tanı koymaz.** Çıkan sonuçlar "tanı" değil, yalnızca klinik alt boyutlardaki belirti yoğunluğu profilidir. Kesin tanı ve tedavi için bir psikiyatrist veya klinik psikolog muayenesi şarttır. Geliştirici, uygulamanın kullanımından doğabilecek sonuçlardan sorumlu tutulamaz.

##  Özellikler

* **Çok Boyutlu Analiz:** 30 soru ile 6 temel klinik boyutu ölçer:
  * Depresif Belirtiler (DEP)
  * Anksiyete (Kaygı) (ANX)
  * Obsesif-Kompulsif Eğilimler (OKB)
  * Somatizasyon (Bedensel Dışavurum) (SOM)
  * Tükenmişlik ve Stres (STR)
  * Sosyal İzolasyon (SOS)
* **Tamamen Gizli (Zero-Backend):** Veritabanı veya sunucu bağlantısı yoktur. Tüm veriler kullanıcının tarayıcısında anlık işlenir ve sayfa kapandığında yok olur.
* **Modern UX/UI:** Pürüzsüz animasyonlar, göz yormayan karanlık tema ve ilerleme çubuğu (progress bar) içerir.
* **Mobil Uyumlu:** Tüm cihazlarda (Responsive) kusursuz çalışır.

##  Teknoloji Yığını (Tech Stack)

* **HTML5:** Semantik ve erişilebilir (a11y) yapı.
* **CSS3:** Modern CSS değişkenleri (Custom Properties), Flexbox ve CSS Transition ile "Vanilla" tasarım.
* **JavaScript (ES6+):** Framework (React, Vue vb.) kullanılmadan yazılmış saf, performanslı iş mantığı ve DOM manipülasyonu.

## ⚙️ Kurulum ve Kullanım

Proje herhangi bir sunucu veya derleyici (build tool) gerektirmez. Doğrudan tarayıcıda çalıştırılabilir.

1. Depoyu bilgisayarınıza klonlayın:
   ```bash
   git clone [https://github.com/KaanTuran28/psikotarama.git](https://github.com/KaanTuran28/psikotarama.git)
