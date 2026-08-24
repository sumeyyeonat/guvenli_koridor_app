# Gece Güvenli Ulaşım Güzergahı (Güvenli Koridor)

## 1. Proje Özeti

**Güvenli Koridor**, klasik navigasyon uygulamalarının sunduğu "en kısa" veya "en hızlı" rota mantığı yerine, gece saatlerinde yayalar için **en aydınlık, en canlı ve en güvenli** rotayı optimize eden akıllı bir mobil rota asistanıdır.

## 2. Problem Tanımı

Standart harita servisleri (Google Maps, Yandex Navi vb.) gece saatlerinde kullanıcıyı:
- Boş ara sokaklara,
- Aydınlatması yetersiz park içlerine,
- Issız alt geçitlere

yönlendirebilir. Bu durum özellikle:
- Tek başına seyahat eden kadınlar,
- Öğrenciler,
- Gece vardiyasında çalışanlar

için ciddi bir tedirginlik ve güvenlik açığı yaratmaktadır.

## 3. Çözüm Mantığı

Rota motoru, mesafeyi minimumda tutmak yerine harita üzerindeki sokak segmentlerine **"Güvenlik Ağırlığı" (Safety Score)** atar ve yayayı canlı/aydınlık noktaların oluşturduğu sanal bir **güvenlik koridorundan** geçirir.

## 4. Kullanılacak Veri Setleri

| # | Veri Kaynağı | Amaç |
|---|---|---|
| 1 | İBB Aydınlatma ve Altyapı Verileri | Ana arter, cadde ve sokak aydınlatma direği yoğunluk haritası |
| 2 | İBB WiFi Noktaları | Meydan, park ve duraklardaki aktif WiFi lokasyonları (kesintisiz iletişim koridoru) |
| 3 | 7/24 Toplu Taşıma Hatları ve Durakları | Gece metrosu (M2, M4 vb.), İETT Gece Hatları, metrobüs istasyonları ve sefer sıklıkları |
| 4 | Nöbetçi Eczaneler ve 7/24 Hizmet Noktaları | İBB Sağlık verileri, eczane API'leri; ışık/tabela aydınlatması ve insan hareketliliği |
| 5 | Taksi Durakları ve İSPARK Noktaları | Gece saatlerinde görevli personel/araç sirkülasyonu bulunan güvenli duraklama alanları |
| 6 | Zabıta / Güvenlik Noktaları & Kameralar | İBB Zabıta noktaları ve kamusal izleme koridorları |

## 5. Algoritma ve Rota Puanlama Mantığı

Standart bir **Dijkstra** veya **A\*** rota algoritmasına, mesafe maliyetinin yanında bir **ceza/ödül katsayısı** eklenir.

### 5.1. Ödül Puanları (Yüksek Skor)
- Açık nöbetçi eczane önü: **+20**
- İBB WiFi menzili: **+15**
- 7/24 açık toplu taşıma durağı çevresi: **+25**
- Yüksek aydınlatmalı ana cadde: **+30**

### 5.2. Ceza Puanları (Düşük Skor)
- Aydınlatması yetersiz sokaklar
- Kapalı park geçişleri
- İnşaat alanları
- Çıkmaz sokaklar

### 5.3. Toplam Maliyet Formülü (Kavramsal)

```
Segment_Maliyeti = Mesafe_Maliyeti - (Güvenlik_Ödül_Puanları) + (Güvenlik_Ceza_Puanları)
```

Rota motoru, toplam maliyeti en düşük olan güzergahı seçer; bu her zaman en kısa mesafe anlamına gelmez.

## 6. Öne Çıkan Özellikler

### 6.1. Üçlü Rota Seçeneği
1. **En Hızlı** — Klasik en kısa rota.
2. **Güvenli Koridor** — Maksimum aydınlatma ve insan yoğunluuğunu takip eden rota (%10-15 daha uzun olabilir).
3. **Acil Kaçış Modu** — En yakın 7/24 açık alana (nöbetçi eczane, taksi durağı, metro istasyonu) götüren panik rotası.

### 6.2. Canlı Takip ve "Eve Vardım" Bildirimi
Kullanıcı belirlenen koridordan saptığında veya belirli bir süre duraksadığında, seçilen acil durum kişilerine anlık bildirim gönderilir.

### 6.3. Görünmez İletişim (İBB WiFi Mesh)
Kullanıcının mobil interneti bitse dahi, güzergah boyunca İBB WiFi noktalarına otomatik bağlanarak konum güvende tutulur.

### 6.4. Topluluk Doğrulaması (Crowdsourcing)
Kullanıcıların "burada sokak lambası yanmıyor" veya "bu alt geçit karanlık" gibi anlık geri bildirimleri, İBB Çözüm Merkezi ile senkronize edilir.

## 7. Hedef Kullanıcı Kitlesi
- Gece tek başına seyahat eden kadınlar
- Üniversite öğrencileri
- Gece vardiyasında çalışanlar (sağlık, güvenlik, hizmet sektörü)
- Gece yürüyüşü/koşusu yapan bireyler

## 8. Kapsam Dışı (Bu Aşamada)
- Araç içi navigasyon (uygulama yaya odaklıdır)
- Şehir dışı / kırsal rotalar
- Gündüz saatleri için optimizasyon

## 9. Başarı Kriterleri
- Kullanıcının seçtiği "Güvenli Koridor" rotasının, aydınlatma ve canlılık verisi yüksek segmentlerden geçme oranı
- Acil Kaçış Modu'nun ortalama yönlendirme süresi (< 3 saniye)
- Topluluk geri bildirimlerinin harita güncellemesine yansıma hızı
- "Eve Vardım" bildirim sisteminin gecikme süresi