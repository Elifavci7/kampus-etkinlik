# Kampüs Etkinlikleri - Backend (Sprint 9)

Node.js, Express ve MongoDB / Mongoose kullanılarak geliştirilmiş RESTful API sunucusu. Etkinlik verilerini veritabanında saklar ve tam CRUD desteği sunar.

**Öğrenci:** Elif Avcı  
**Öğrenci No:** 2416501019  

---

## Kurulum ve Çalıştırma

Projeyi yerel ortamda çalıştırmak için aşağıdaki adımları izleyin:

```bash
# Backend dizinine gidin
cd backend

# Bağımlılıkları yükleyin
npm install

# Örnek verileri veritabanına yükleyin
npm run seed

# Geliştirme modunda başlatın
npm run dev

# Canlı (production) modunda başlatın
npm start
```

---

## Ortam Değişkenleri (.env)

Sunucu ayarları `.env` dosyası üzerinden yapılandırılır:

| Değişken | Varsayılan Değer | Açıklama |
| --- | --- | --- |
| `PORT` | `3000` | API sunucusunun dinleyeceği port |
| `MONGODB_URI` | `mongodb://127.0.0.1:27017/kampus` | MongoDB bağlantı adresi |

Örnek `.env` dosyası (`.env.example`):
```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/kampus
```

---

## REST API Sözleşmesi

Sunucu ile istemci arasındaki REST iletişim kuralları aşağıdaki tabloda belirtilmiştir:

| Method | Endpoint | Amaç | Başarılı | Hata | Durum |
| --- | --- | --- | --- | --- | --- |
| `GET` | `/health` | Sunucu sağlık kontrolü ve öğrenci bilgisi | `200` | — | çalışıyor |
| `GET` | `/events` | Etkinlik listesini getir (?search= & ?category= destekler) | `200` | — | çalışıyor |
| `GET` | `/events/upcoming` | Yaklaşan etkinlikleri tarihe göre sıralı getir | `200` | — | çalışıyor |
| `GET` | `/events/:id` | ID'ye göre tekil etkinlik detayını getir | `200` | `404` | çalışıyor |
| `POST` | `/events` | Yeni etkinlik oluştur | `201` | `400` | çalışıyor |
| `PATCH` | `/events/:id` | Belirtilen ID'deki etkinliği güncelle | `200` | `400`, `404` | çalışıyor |
| `DELETE` | `/events/:id` | Belirtilen ID'deki etkinliği sil | `204` | `404` | çalışıyor |

---

## HTTP Durum Kodları (Status Codes)

- **200 OK**: İstek başarılı, veri döndürüldü.
- **201 Created**: Yeni kaynak başarıyla oluşturuldu.
- **204 No Content**: İstek başarılı ancak yanıt gövdesi boş (silme işlemi).
- **400 Bad Request**: Eksik veya hatalı istek verisi.
- **404 Not Found**: İstenen kaynak veya route bulunamadı.

---

## Hata Yanıt Formatı

Sunucu tarafındaki tüm hata yanıtları tutarlı bir JSON formatında döndürülür:

```json
{
  "error": {
    "message": "Event not found"
  }
}
```