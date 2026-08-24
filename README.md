# Güvenli Koridor

Android Studio ile geliştirilen, gece tek başına yürüyen yayalar için daha aydınlık, canlı ve güvenli güzergahlar önermeyi hedefleyen bir mobil uygulama. Projenin ilk taslak ve üretim sürecinde Google AI Studio'dan yararlanılmıştır.

## Proje fikri

Güvenli Koridor, yalnızca en kısa veya en hızlı rotayı bulmak yerine güvenlik verilerini rota kararına dahil eder. Aydınlatma yoğunluğu, açık hizmet noktaları, toplu taşıma durakları, WiFi noktaları ve topluluk geri bildirimleri gibi sinyaller kullanılarak kullanıcıya bir güvenlik koridoru önerilmesi amaçlanır.

## Mevcut durum

Bu sürüm, konum izni akışını ve zamana göre otomatik gündüz/gece temasını içeren ilk MVP ekranını sunar.

- Konum izni isteme ve izin engellendiğinde cihaz ayarlarını açma
- 19:00-06:00 arasında otomatik gece teması
- Erişilebilirlik etiketleri ve yüklenme durumu
- Gündüz ve gece renk tokenları

## Geliştirme ortamı

- Android Studio
- Android SDK ve Android Emulator
- Google AI Studio ile oluşturulan tasarım ve uygulama çıktıları

## Kurulum ve çalıştırma

1. Repository'yi klonlayın:

	```bash
	git clone https://github.com/sumeyyeonat/guvenli_koridor_app.git
	cd guvenli_koridor_app
	```

2. Projeyi Android Studio ile açın.

3. Android SDK bağımlılıklarının yüklenmesini ve proje senkronizasyonunun tamamlanmasını bekleyin.

4. Bir Android Emulator başlatın veya USB hata ayıklaması açık bir Android cihaz bağlayın.

5. Android Studio'daki **Run** düğmesiyle uygulamayı çalıştırın. Konum izni özelliğini test etmek için emülatörde bir konum seçin veya fiziksel cihaz kullanın.

## Yol haritası

- Harita ve güvenli rota görselleştirmesi
- En Hızlı, Güvenli Koridor ve Acil Kaçış rota seçenekleri
- Güvenlik skoru ve rota segmenti puanlama
- Canlı takip ve Eve Vardım bildirimi
- Acil durum kişileri ve panik butonu
- Topluluk geri bildirimleri
- İBB ve diğer güvenlik verileriyle entegrasyon

## Tasarım belgeleri

- [Tasarım dokümanı](design.md)
- [Ürün amacı ve kapsamı](intent.md)

## Lisans

Bu proje [LICENSE](LICENSE) dosyasındaki koşullara tabidir.
