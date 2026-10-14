

import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

export default function App() {
  const [page, setPage] = useState<PageName>("home");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // Adım 10: State'ler (Arama metni ve Seçili Kategori)
  const [searchText, setSearchText] = useState("");
  const [category, setCategory] = useState<Category | "">("");

  // Sayfa değiştirme fonksiyonu
  function go(next: PageName, id: string | null = null) {
    setPage(next);
    setSelectedId(id);
  }

  // Adım 12: Seçili etkinliği bulma
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Adım 11: Sekme başlığını güncelleme (useEffect)
  useEffect(() => {
    if (page === "home") {
      document.title = "Kampüs Etkinlikleri — Ana Sayfa";
    } else if (page === "events") {
      document.title = "Kampüs Etkinlikleri — Tüm Etkinlikler";
    } else if (page === "detail" && selected) {
      document.title = `Kampüs Etkinlikleri — ${selected.title}`;
    } else if (page === "add") {
      document.title = "Kampüs Etkinlikleri — Etkinlik Ekle";
    } else if (page === "update") {
      document.title = "Kampüs Etkinlikleri — Etkinlik Güncelle";
    }
  }, [page, selected]);

  // Adım 10: Filtrelenmiş liste hesabı
  const filteredEvents = filterByCategory(
    searchEvents(events, searchText),
    category
  );

  // Adım 10: Kategorileri veriden tek satırda üretme
  const categories = [...new Set(events.map((e) => e.category))];

  // Adım 9: Yaklaşan 2 etkinlik
  const upcoming = [...events]
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Etkinlik Kartı Render Fonksiyonu
  function renderCard(event: CampusEvent) {
    return (
      <article className="kart" key={event.id}>
        <h3>{event.title}</h3>
        <p><strong>Kategori:</strong> {event.category}</p>
        <p><strong>Tarih:</strong> {event.date} - {event.time}</p>
        <p><strong>Konum:</strong> {event.location}</p>
        <p><strong>Kontenjan:</strong> {event.capacity} Kişi</p>
        <button onClick={() => go("detail", event.id)}>Detay Gör</button>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>Kampüs Etkinlikleri</h1>
      </header>

      <nav className="menu">
        <button
          onClick={() => go("home")}
          aria-current={page === "home" ? "page" : undefined}
        >
          Ana Sayfa
        </button>
        <button
          onClick={() => go("events")}
          aria-current={page === "events" ? "page" : undefined}
        >
          Etkinlikler
        </button>
        <button
          onClick={() => go("add")}
          aria-current={page === "add" ? "page" : undefined}
        >
          Etkinlik Ekle
        </button>
      </nav>

      <main>
        {/* ADIM 9: Ana Sayfa */}
        {page === "home" && (
          <section>
            <h2>Yaklaşan Etkinlikler</h2>
            <div className="etkinlik-listesi">
              {upcoming.map(renderCard)}
            </div>
          </section>
        )}

        {/* ADIM 10: Etkinlikler Sayfası */}
        {page === "events" && (
          <section>
            <h2>Tüm Etkinlikler</h2>
            <div className="filtreler" style={{ marginBottom: "1rem", display: "flex", gap: "10px" }}>
              <input
                type="search"
                placeholder="Etkinlik veya açıklama ara..."
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category | "")}
              >
                <option value="">Tüm Kategoriler</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            <p className="sonuc-sayisi">
              {filteredEvents.length === 0
                ? "Bulunamadı."
                : `Toplam ${filteredEvents.length} etkinlik bulundu.`}
            </p>

            <div className="etkinlik-listesi">
              {filteredEvents.map(renderCard)}
            </div>
          </section>
        )}

        {/* ADIM 12: Detay Sayfası */}
        {page === "detail" && (
          <section>
            {!selected ? (
              <div className="hata-kutusu">
                <p>Etkinlik bulunamadı!</p>
                <button onClick={() => go("events")}>Listeye Dön</button>
              </div>
            ) : (
              <article className="detay">
                <h2>{selected.title}</h2>
                {selected.image && (
                  <figure>
                    <img src={selected.image} alt={selected.title} />
                  </figure>
                )}
                <div className="kunye">
                  <p><strong>Kategori:</strong> {selected.category}</p>
                  <p><strong>Tarih:</strong> {selected.date} - {selected.time}</p>
                  <p><strong>Konum:</strong> {selected.location}</p>
                  <p><strong>Kontenjan:</strong> {selected.capacity} Kişi</p>
                </div>
                <p className="aciklama">{selected.description}</p>
                <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
                  <button onClick={() => go("update", selected.id)}>
                    Bu Etkinliği Güncelle
                  </button>
                  <button onClick={() => go("events")}>Listeye Dön</button>
                </div>
              </article>
            )}
          </section>
        )}

        {/* ADIM 13: Ekle ve Güncelle Sayfaları Formu */}
        {(page === "add" || page === "update") && (
          <section>
            <h2>{page === "add" ? "Etkinlik Ekle" : "Etkinlik Güncelle"}</h2>
            <form
              className="form"
              onSubmit={(e) => e.preventDefault()}
              style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "400px" }}
            >
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                id="title"
                type="text"
                maxLength={80}
                defaultValue={page === "update" && selected ? selected.title : ""}
              />

              <label htmlFor="category">Kategori</label>
              <select id="category" defaultValue={page === "update" && selected ? selected.category : "Seminer"}>
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>

              <label htmlFor="capacity">Kontenjan</label>
              <input
                id="capacity"
                type="number"
                defaultValue={page === "update" && selected ? selected.capacity : 50}
              />

              <label htmlFor="date">Tarih</label>
              <input
                id="date"
                type="date"
                defaultValue={page === "update" && selected ? selected.date : ""}
              />

              <label htmlFor="time">Saat</label>
              <input
                id="time"
                type="time"
                defaultValue={page === "update" && selected ? selected.time : ""}
              />

              <label htmlFor="location">Konum</label>
              <input
                id="location"
                type="text"
                defaultValue={page === "update" && selected ? selected.location : ""}
              />

              <label htmlFor="description">Açıklama</label>
              <textarea
                id="description"
                rows={5}
                defaultValue={page === "update" && selected ? selected.description : ""}
              />

              <button type="submit">
                {page === "add" ? "Kaydet" : "Güncelle"}
              </button>
            </form>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2026 Kampüs Etkinlikleri</p>
      </footer>
    </>
  );
}