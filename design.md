# Güvenli Koridor — Tasarım Dokümanı (design.md)


## 1. Tasarım Felsefesi

Uygulama, kullanıcının psikolojik güven hissini görsel olarak da desteklemelidir. Bu nedenle tasarım dili **iki kimlikli** kurgulanır:

- **Gündüz Teması (Day Mode):** Açık, sakin, güven veren, "her şey yolunda" hissi veren bir arayüz.
- **Gece Teması (Night Mode):** Göz yormayan, dikkat dağıtmayan, ama güvenlik/acil durum unsurlarını net vurgulayan; parlaklığı düşük ama kontrastı yüksek bir arayüz.

Tema geçişi otomatik olabilir (gün doğumu/batımı verisine göre) veya kullanıcı manuel seçebilir. Varsayılan: **saat 19:00–06:00 arası otomatik Gece Modu.**

## 2. Renk Paleti

### 2.1. Gündüz Teması (Light Mode)

| Rol | Renk | Hex | Kullanım |
|---|---|---|---|
| Primary | Gündüz Mavisi | `#2563EB` | Butonlar, aktif rota çizgisi |
| Secondary | Açık Yeşil | `#22C55E` | Güvenli Koridor rota rengi, olumlu göstergeler |
| Background | Kırık Beyaz | `#F8FAFC` | Genel arka plan |
| Surface | Beyaz | `#FFFFFF` | Kart, panel yüzeyleri |
| Text Primary | Koyu Gri | `#1E293B` | Ana metin |
| Text Secondary | Orta Gri | `#64748B` | Alt metin, açıklamalar |
| Border | Açık Gri | `#E2E8F0` | Ayraç çizgileri |
| Uyarı | Amber | `#F59E0B` | Orta risk segmentleri |
| Tehlike | Kırmızı | `#EF4444` | Acil durum, düşük güvenlik skoru |

### 2.2. Gece Teması (Night Mode / Dark Mode)

| Rol | Renk | Hex | Kullanım |
|---|---|---|---|
| Primary | Neon Camgöbeği | `#38BDF8` | Aktif rota çizgisi, vurgular |
| Secondary | Parlak Yeşil | `#4ADE80` | Güvenli Koridor rota rengi (yüksek kontrast) |
| Background | Gece Lacivert-Siyah | `#0B1120` | Genel arka plan (OLED dostu) |
| Surface | Koyu Gri-Lacivert | `#161E2E` | Kart, panel yüzeyleri |
| Text Primary | Kırık Beyaz | `#F1F5F9` | Ana metin |
| Text Secondary | Soluk Gri | `#94A3B8` | Alt metin, açıklamalar |
| Border | Koyu Gri | `#1E293B` | Ayraç çizgileri |
| Uyarı | Amber (parlatılmış) | `#FBBF24` | Orta risk segmentleri |
| Tehlike / Acil | Parlak Kırmızı | `#F87171` | Acil Kaçış Modu, panik butonu |

> **Not:** Gece temasında parlak/doygun renkler yalnızca **rota çizgileri, ikonlar ve acil durum unsurları** için kullanılır; büyük yüzeylerde asla yüksek parlaklık kullanılmaz (göz yormasın, pil tasarrufu sağlansın, dikkat çekmesin).

## 3. Rota Renk Kodlaması (Her İki Temada Ortak Mantık)

| Rota Tipi | Gündüz Rengi | Gece Rengi | Çizgi Stili |
|---|---|---|---|
| En Hızlı | `#2563EB` (mavi) | `#38BDF8` (camgöbeği) | Düz çizgi, 4px |
| Güvenli Koridor | `#22C55E` (yeşil) | `#4ADE80` (parlak yeşil) | Düz çizgi, 6px, hafif glow efekti (gece) |
| Acil Kaçış | `#EF4444` (kırmızı) | `#F87171` (parlak kırmızı) | Kesikli çizgi, 6px, yanıp sönen uç noktası |

Harita üzerindeki güvenlik skoru ısı haritası (heatmap) olarak da gösterilebilir:
- Yeşil ton → yüksek güvenlik skoru (aydınlık, canlı)
- Sarı/amber → orta
- Kırmızı → düşük (kaçınılması önerilen segment)

## 4. Tipografi

| Seviye | Font | Ağırlık | Boyut (mobil) | Kullanım |
|---|---|---|---|---|
| Display | Inter / SF Pro | Bold (700) | 28sp | Karşılama ekranı, büyük başlıklar |
| H1 | Inter / SF Pro | SemiBold (600) | 22sp | Ekran başlıkları |
| H2 | Inter / SF Pro | SemiBold (600) | 18sp | Kart başlıkları |
| Body | Inter / SF Pro | Regular (400) | 15sp | Ana metin |
| Caption | Inter / SF Pro | Regular (400) | 12sp | Zaman, mesafe, alt bilgiler |
| Button | Inter / SF Pro | Medium (500) | 16sp | CTA metinleri |

**Gece modunda** font ağırlığı bir kademe artırılabilir (örn. Body → Medium) çünkü koyu zeminde ince fontlar okunabilirliği azaltır.

## 5. İkonografi

- Stil: **Outline (çizgi) ikonlar**, gündüzde 1.5px, gecede 2px kalınlık (daha iyi görünürlük için).
- Kütüphane önerisi: Lucide Icons veya Phosphor Icons (her iki temada tutarlı render).
- Özel ikon seti gereken alanlar:
  - 💡 Aydınlatma yoğunluğu göstergesi
  - 📶 İBB WiFi menzil ikonu
  - 🚇 7/24 toplu taşıma durağı
  - 💊 Nöbetçi eczane
  - 🚕 Taksi durağı / İSPARK
  - 🚨 Acil Kaçış Modu (panik butonu — her zaman kırmızı, tema bağımsız)
  - 👮 Zabıta/güvenlik noktası

## 6. Bileşen Kütüphanesi (Component Library)

### 6.1. Rota Seçim Kartı
- Üç sekmeli yapı: "En Hızlı" / "Güvenli Koridor" / "Acil Kaçış"
- Her sekmede: tahmini süre, mesafe, güvenlik skoru rozeti (0–100)
- Aktif sekme: dolgun renk + hafif gölge (gündüz) / glow (gece)

### 6.2. Güvenlik Skoru Rozeti
- Dairesel progress gösterge (0–100 arası)
- 80-100: Yeşil "Güvenli"
- 50-79: Amber "Orta"
- 0-49: Kırmızı "Dikkat"

### 6.3. Acil Durum Butonu (Panik Butonu)
- Her iki temada da **sabit kırmızı** (`#EF4444` gündüz / `#F87171` gece), tema değişiminden etkilenmez.
- Ekranın alt sağ köşesinde sabit (floating action button), her zaman erişilebilir.
- Basılı tutma (long-press) ile aktifleşir → yanlışlıkla tetiklenmeyi önler.
- Aktifleştiğinde: haptic feedback + kısa sesli onay + ekran kenarında kırmızı nabız animasyonu.

### 6.4. Canlı Takip Kartı (Alt Sheet)
- Rota üzerindeyken ekranın altından açılan sabit panel.
- İçerik: kalan süre, sıradaki güvenli nokta, "Eve Vardım" bildirimi durumu, acil kişi listesi kısayolu.

### 6.5. Topluluk Geri Bildirim Butonu
- Harita üzerinde uzun basma (long-press) ile açılan hızlı menü:
  - "Bu sokak lambası yanmıyor"
  - "Bu alt geçit karanlık"
  - "Burada güvende hissetmedim"
- Gönderim sonrası küçük teşekkür animasyonu (toplulukla katkı hissi).

## 7. Harita Stili

### 7.1. Gündüz Harita Stili
- Standart açık renkli sokak haritası (Mapbox Light / Google Maps Standard)
- Binalar açık gri, yeşil alanlar pastel yeşil, su mavi ton

### 7.2. Gece Harita Stili
- Özel **koyu (dark) harita stili** — sokak isimleri düşük kontrast gri, ana arterler hafif aydınlık
- Aydınlatma yoğunluğu yüksek caddeler haritada **hafif sıcak sarı glow** ile vurgulanır (gerçek sokak lambası hissi verir)
- İBB WiFi noktaları haritada küçük mavi halka (pulse) animasyonuyla gösterilir

## 8. Etkileşim ve Hareket (Motion) Prensipleri

- Geçişler yumuşak ve yavaş olmalı (200–300ms ease-in-out) — kullanıcıda acele/kaygı hissi yaratmamalı.
- **İstisna:** Acil Kaçış Modu tetiklendiğinde geçişler hızlanır (100ms), aciliyet hissi verilir.
- Tema geçişi (gündüz↔gece) crossfade animasyonuyla yapılır, ani parlaklık sıçraması olmamalı (göz sağlığı).

## 9. Erişilebilirlik (Accessibility)

- Tüm metin/arka plan kontrast oranları WCAG AA standardını karşılamalı (min. 4.5:1).
- Panik butonu ekran okuyucu için özel etiketli: "Acil Kaçış Modu, basılı tutarak aktifleştir."
- Renk körlüğü desteği: güvenlik skoru sadece renkle değil, ikon + sayı ile de gösterilir.
- Titreşim/haptic geri bildirim, görme engelli kullanıcılar için ek yönlendirme katmanı sağlar.

## 10. Ekran Envanteri (Öncelikli MVP Ekranları)

1. **Karşılama / Konum İzni** ekranı
2. **Ana Harita Ekranı** (varsayılan görünüm, tema otomatik)
3. **Rota Planlama Ekranı** (üçlü rota kartları)
4. **Aktif Navigasyon Ekranı** (canlı takip paneli + panik butonu)
5. **Acil Kaçış Modu Ekranı** (tam ekran, sade, tek CTA: "En Yakın Güvenli Nokta")
6. **Acil Durum Kişileri Ayarları**
7. **Topluluk Geri Bildirim Geçmişi**
8. **Profil / Tema Ayarları** (Otomatik / Gündüz / Gece seçimi)

## 11. Tasarım Token Özeti (Geliştirici Referansı)

```css
:root[data-theme="light"] {
  --color-primary: #2563EB;
  --color-secondary: #22C55E;
  --color-bg: #F8FAFC;
  --color-surface: #FFFFFF;
  --color-text-primary: #1E293B;
  --color-text-secondary: #64748B;
  --color-border: #E2E8F0;
  --color-warning: #F59E0B;
  --color-danger: #EF4444;
}

:root[data-theme="dark"] {
  --color-primary: #38BDF8;
  --color-secondary: #4ADE80;
  --color-bg: #0B1120;
  --color-surface: #161E2E;
  --color-text-primary: #F1F5F9;
  --color-text-secondary: #94A3B8;
  --color-border: #1E293B;
  --color-warning: #FBBF24;
  --color-danger: #F87171;
}
```

## 12. Marka Kişiliği (Brand Voice)

- **Ton:** Güven veren, sakin, koruyucu — asla korkutucu veya panik uyandırıcı değil.
- **Mikro-metinler:** "Seni eve güvenle götürüyoruz." gibi destekleyici ifadeler tercih edilir.
- **Kaçınılması gerekenler:** Alarmist dil, suçlayıcı ton, aşırı teknik jargon.