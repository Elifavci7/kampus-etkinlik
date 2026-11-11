# Kampüs Etkinlikleri - Backend (Sprint 7)

Node.js ve Express kullanılarak geliştirilmiş RESTful API sunucusu. Etkinlik verilerini JSON formatında istemcilere sunar.

**Öğrenci:** Elif Avcı  
**Öğrenci No:** 2416501019  

---

## 🚀 Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Backend dizinine gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# Geliştirme modunda başlatın (dosya değişikliklerinde otomatik yeniden başlatma)
npm run dev

# Canlı (production) modunda başlatın
npm start
```

---

## ⚙️ Ortam Değişkenleri (.env)

Sunucu ayarları `.env` dosyası üzerinden yapılandırılır:

| Değişken | Varsayılan Değer | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | API sunucusunun dinleyeceği port |

Örnek `.env` dosyası (`.env.example`):
```env
PORT=3000
```

> **Not:** `.env` dosyası hassas veriler içerebileceği için `.gitignore` içine eklenmiştir ve Git deposuna gönderilmez. Depoyu indiren kullanıcılar `.env.example` dosyasını kopyalayarak `.env` oluşturabilir.

---

## 📋 REST API Sözleşmesi

Sunucu ile istemci arasındaki REST iletişim kuralları aşağıdaki tabloda belirtilmiştir:

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci bilgisi | `200` | — | Bu sprint |
| `GET` | `/events` | Etkinlik listesini getir (?category=... destekler) | `200` | — | Bu sprint |
| `GET` | `/events/:id` | ID'ye göre tekil etkinlik detayını getir | `200` | `404` | Bu sprint |
| `POST` | `/events` | Yeni etkinlik oluştur | `201` | `400` | Bu sprint |
| `PATCH` | `/events/:id` | Belirtilen ID'deki etkinliği güncelle | `200` | `400`, `404` | Sprint 9 |
| `DELETE` | `/events/:id` | Belirtilen ID'deki etkinliği sil | `204` | `404` | Sprint 9 |

---

## 🚥 HTTP Durum Kodları (Status Codes)

- **200 OK**: İstek başarılı, veri döndürüldü.
- **201 Created**: Yeni kaynak başarıyla oluşturuldu.
- **204 No Content**: İstek başarılı ancak yanıt gövdesi boş (silme işlemi).
- **400 Bad Request**: Eksik veya hatalı istek verisi (örn. zorunlu alanlar gönderilmediğinde).
- **404 Not Found**: İstenen kaynak veya route bulunamadı.

---

## ⚠️ Hata Yanıt Formatı

Sunucu tarafındaki tüm hata yanıtları tutarlı bir JSON formatında döndürülür:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```

---

## 🔍 Endpoint Örnekleri

### 1. GET `/health`
- **Başarılı Yanıt (200 OK):**
```json
{
  "status": "ok",
  "time": "2026-11-11T11:45:00.000Z",
  "student": "2416501019"
}
```

### 2. GET `/events`
- Kategoriye göre filtreleme: `GET /events?category=Atölye`
- **Başarılı Yanıt (200 OK):**
```json
[
  {
    "id": "event-1",
    "title": "Yazılım Sektöründe Kariyer Zirvesi 2026",
    "category": "Seminer",
    "capacity": 120,
    "date": "2026-10-12",
    "time": "14:00",
    "location": "Merkez Kampüs Mavi Amfi",
    "description": "Teknoloji liderleri ve mezunlarla yazılım dünyasında kariyer imkanları ve staj fırsatları söyleşisi."
  }
]
```

### 3. GET `/events/:id`
- Var olan etkinlik: `GET /events/event-2` -> `200 OK`
- Bulunamayan etkinlik: `GET /events/yok` -> `404 Not Found`
```json
{
  "error": {
    "message": "Event not found"
  }
}
```

### 4. POST `/events`
- **Gövde (Body):**
```json
{
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile CV'nize katkı..."
}
```
- **Başarılı Yanıt (201 Created):**
```json
{
  "id": "event-1730794052020",
  "title": "Git Atölyesi",
  "category": "Atölye",
  "date": "2026-12-01",
  "capacity": 30,
  "time": "14:00",
  "location": "Bilgisayar Laboratuvarı 1",
  "description": "Git ve GitHub ile CV'nize katkı..."
}
```
- **Eksik Alan Hatası (400 Bad Request):** (title, category veya date eksikse)
```json
{
  "error": {
    "message": "title, category and date are required"
  }
}
```
