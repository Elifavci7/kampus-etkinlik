# Kampüs Etkinlikleri - Sprint 7 (Express REST API)

**Öğrenci:** Elif Avcı  
**Öğrenci No:** 2416501019  

---

## 🌐 Canlı Vercel Adresi (Frontend)

🔗 **[https://elifavci-frontend.vercel.app](https://elifavci-frontend.vercel.app)**

---

## 🔌 Backend (Sprint 7 - Express REST API)

Backend uygulaması Node.js ve Express ile geliştirilmiş REST API servisidir:
- **Dizin:** `backend/`
- **Varsayılan Port:** `3000` (`.env` ile yapılandırılır)
- **Sağlık Kontrolü:** `GET http://localhost:3000/health`
- **Etkinlikler:** `GET /events`, `GET /events/:id`, `POST /events`
- **Postman Koleksiyonu:** `backend/requests/kampus-api.json`
- Detaylı API sözleşmesi ve çalıştırma talimatları için [backend/README.md](backend/README.md) belgesine bakın.

### Backend Kurulum ve Çalıştırma

```bash
# Backend dizinine geçin
cd backend

# Bağımlılıkları kurun
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

---

## 🚀 Frontend Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Frontend dizinine gidin
cd frontend

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev

# Projeyi derlemek için (production build)
npm run build
```

---

## 🗺️ Frontend Route Haritası (10 Adres, 10 Sayfa)

| Adres | Sayfa Bileşeni | Açıklama |
|---|---|---|
| `/` | `HomePage` | Ana sayfa (yaklaşan 2 etkinlik ve hızlı bağlantılar) |
| `/events` | `EventsPage` | Tüm etkinliklerin listelendiği, arama ve kategori filtreli sayfa |
| `/events/:id` | `EventDetailPage` | Belirli bir etkinliğin detay sayfası (`useParams` ile id okunur) |
| `/login` | `LoginPage` | Kullanıcı giriş sayfası (kontrollü form & doğrulama) |
| `/register` | `RegisterPage` | Yeni kullanıcı kayıt sayfası (şifre eşleşme & alan kontrolü) |
| `/forgot-password` | `ForgotPasswordPage` | Şifre sıfırlama bağlantı talep sayfası |
| `/admin` | `AdminPage` | Etkinlik yönetim paneli (tablo görünümü, responsive kartlar, silme onayı) |
| `/admin/new` | `AddEventPage` | Yeni etkinlik ekleme formu |
| `/admin/:id/edit` | `EditEventPage` | Mevcut etkinliği güncelleme formu |
| `*` | `NotFoundPage` | Tanımsız veya bulunamayan adresler için 404 sayfası |

---

## 🛠️ Proje Mimarisi ve Özellikleri

- **React Router (`react-router-dom` v7):** Sayfa geçişleri, dinamik route parametreleri (`useParams`), programatik yönlendirme (`useNavigate`) ve aktif menü (`NavLink`).
- **Context API (`EventsContext`):** Etkinlik listesi, etkinlik ekleme, güncelleme ve silme durum yönetimi tek bir merkezi sağlayıcıda tutulur ve tüm sayfalarda reaktif olarak güncellenir.
- **Form Doğrulama (Controlled Forms):** HTML5 varsayılan balonları devre dışı bırakılmış (`noValidate`), özel doğrulama fonksiyonu (`validateEvent`) ve erişilebilir hata bildirimleri (`aria-invalid`, `.hata-metni`).
- **Responsive Tasarım (Mobil & Masaüstü):** 
  - Yönetim tablosu mobilde kart düzenine (`@media (max-width: 699px)`) dönüşür (`data-baslik`).
  - Etkinlik ızgarası (`.event-grid`) ve detay sayfaları mobil uyumludur.
- **Öğrenci Numarasına Özel Tema:** Öğrenci numarasına bağlı dinamik HSL ton hesaplamasıyla tutarlı kurumsal renk paleti.
