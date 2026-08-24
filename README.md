# Güvenli Koridor

Gece tek başına yürüyen yayalar için daha aydınlık, canlı ve güvenli güzergahlar önermeyi hedefleyen Expo tabanlı mobil uygulama.

## Proje fikri

Güvenli Koridor, yalnızca en kısa veya en hızlı rotayı bulmak yerine güvenlik verilerini rota kararına dahil eder. Aydınlatma yoğunluğu, açık hizmet noktaları, toplu taşıma durakları, WiFi noktaları ve topluluk geri bildirimleri gibi sinyaller kullanılarak kullanıcıya bir güvenlik koridoru önerilmesi amaçlanır.

## Mevcut durum

Bu sürüm, konum izni akışını ve zamana göre otomatik gündüz/gece temasını içeren ilk Expo MVP ekranını sunar.

- Konum izni isteme ve izin engellendiğinde cihaz ayarlarını açma
- 19:00-06:00 arasında otomatik gece teması
- Erişilebilirlik etiketleri ve yüklenme durumu
- Gündüz ve gece renk tokenları

## Teknolojiler

- Expo SDK 57
- React Native 0.86
- React 19
- TypeScript
- `expo-location`
- `react-native-web`

## Kurulum

```bash
npm install
```

## Çalıştırma

Geliştirme sunucusunu başlatmak için:

```bash
npm start
```

Platforma göre çalıştırmak için:

```bash
npm run android
npm run ios
npm run web
```

Expo Go veya emülatör kullanırken terminalde gösterilen QR kodunu tarayabilirsiniz. Konum izni özelliğini test etmek için fiziksel cihaz ya da konum simülasyonu destekleyen bir emülatör kullanılması önerilir.

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
