import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { CampusEvent, Category } from "./types/campus-event.ts";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";

type PageName = "home" | "events" | "detail" | "add" | "update";

// Menü öğeleri (map ile çizilir)
const menu: { page: PageName; label: string }[] = [
  { page: "home", label: "Ana Sayfa" },
  { page: "events", label: "Etkinlikler" },
  { page: "add", label: "Etkinlik Ekle" }
];

// "2026-10-12" → "12 Ekim 2026"
const formatDate = (date: string) =>
  new Date(`${date}T00:00`).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

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
    window.scrollTo(0, 0);
  }

  // Adım 12: Seçili etkinliği bulma
  const selected = selectedId ? findEventById(events, selectedId) : undefined;

  // Sayfa başlığı (detayda etkinliğin adı)
  const titles: Record<PageName, string> = {
    home: "Kampüs Etkinlikleri",
    events: "Tüm Etkinlikler",
    detail: selected ? selected.title : "Etkinlik bulunamadı",
    add: "Etkinlik Ekle",
    update: "Etkinlik Güncelle"
  };
  const title = titles[page];

  // Adım 11: Sekme başlığını güncelleme (useEffect)
  useEffect(() => {
    document.title = `Kampüs Etkinlikleri — ${page === "home" ? "Ana Sayfa" : title}`;
  }, [page, title]);

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

  // Etkinlik Kartı Render Fonksiyonu (Sprint 3'teki kartın JSX hali)
  function renderCard(event: CampusEvent) {
    return (
      <article className="event-card" key={event.id}>
        <h2>{event.title}</h2>
        <p>
          {event.category} · {formatDate(event.date)} · {event.location}
        </p>
        <p>{event.description}</p>
        <p>Kontenjan: {event.capacity}</p>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            go("detail", event.id);
          }}
        >
          Detayları gör
        </a>
      </article>
    );
  }

  return (
    <>
      <header className="site-baslik">
        <h1>{title}</h1>

        <nav className="menu">
          {menu.map((item) => (
            <a
              key={item.page}
              href="#"
              aria-current={page === item.page ? "page" : undefined}
              onClick={(e) => {
                e.preventDefault();
                go(item.page);
              }}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </header>

      <main>
        {/* ADIM 9: Ana Sayfa */}
        {page === "home" && (
          <>
            <h2>Yaklaşan Etkinlikler</h2>
            <section className="event-grid">{upcoming.map(renderCard)}</section>
          </>
        )}

        {/* ADIM 10: Etkinlikler Sayfası */}
        {page === "events" && (
          <>
            <form className="filtre" onSubmit={(e) => e.preventDefault()}>
              <div className="filtre-alani">
                <label htmlFor="arama">Etkinlik ara</label>
                <input
                  type="search"
                  id="arama"
                  placeholder="Etkinlik veya açıklama ara..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
              </div>
              <div className="filtre-alani">
                <label htmlFor="kategori-filtre">Kategori</label>
                <select
                  id="kategori-filtre"
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Category | "")}
                >
                  <option value="">Tümü</option>
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <p id="sonuc">
              {filteredEvents.length === 0
                ? "Etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <section className="event-grid">{filteredEvents.map(renderCard)}</section>
          </>
        )}

        {/* ADIM 12: Detay Sayfası */}
        {page === "detail" && !selected && (
          <div className="event-card">
            <p>Geçerli bir etkinlik seçilmedi.</p>
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                go("events");
              }}
            >
              Listeye dön
            </a>
          </div>
        )}

        {page === "detail" && selected && (
          <article className="event-detail">
            {selected.image && (
              <div className="event-image">
                <figure>
                  <img src={selected.image} alt={`${selected.title} etkinlik afişi`} />
                  <figcaption>{selected.title} afişi</figcaption>
                </figure>
              </div>
            )}

            <div className="event-info">
              <dl>
                <dt>Tarih</dt>
                <dd>
                  {formatDate(selected.date)}, {selected.time}
                </dd>
                <dt>Yer</dt>
                <dd>{selected.location}</dd>
                <dt>Kategori</dt>
                <dd>{selected.category}</dd>
                <dt>Kontenjan</dt>
                <dd>{selected.capacity}</dd>
              </dl>

              <p>{selected.description}</p>

              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("events");
                  }}
                >
                  Listeye dön
                </a>
              </p>
              <p>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    go("update", selected.id);
                  }}
                >
                  Bu etkinliği güncelle
                </a>
              </p>
            </div>
          </article>
        )}

        {/* ADIM 13: Ekle ve Güncelle Sayfaları Formu */}
        {/* key: Ekle ↔ Güncelle geçişinde form yeniden kurulur, eski değerler kalmaz */}
        {(page === "add" || page === "update") && (
          <form
            key={`${page}-${selectedId ?? ""}`}
            className="form"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="form-alani">
              <label htmlFor="title">Etkinlik Adı</label>
              <input
                id="title"
                type="text"
                maxLength={80}
                defaultValue={page === "update" && selected ? selected.title : ""}
              />
            </div>

            <div className="form-alani">
              <label htmlFor="category">Kategori</label>
              <select
                id="category"
                defaultValue={page === "update" && selected ? selected.category : "Seminer"}
              >
                <option value="Seminer">Seminer</option>
                <option value="Atölye">Atölye</option>
                <option value="Söyleşi">Söyleşi</option>
                <option value="Yarışma">Yarışma</option>
              </select>
            </div>

            <div className="form-alani">
              <label htmlFor="capacity">Kontenjan</label>
              <input
                id="capacity"
                type="number"
                defaultValue={page === "update" && selected ? selected.capacity : 50}
              />
            </div>

            <div className="form-alani">
              <label htmlFor="date">Tarih</label>
              <input
                id="date"
                type="date"
                defaultValue={page === "update" && selected ? selected.date : ""}
              />
            </div>

            <div className="form-alani">
              <label htmlFor="time">Saat</label>
              <input
                id="time"
                type="time"
                defaultValue={page === "update" && selected ? selected.time : ""}
              />
            </div>

            <div className="form-alani">
              <label htmlFor="location">Konum</label>
              <input
                id="location"
                type="text"
                defaultValue={page === "update" && selected ? selected.location : ""}
              />
            </div>

            <div className="form-alani">
              <label htmlFor="description">Açıklama</label>
              <textarea
                id="description"
                rows={5}
                defaultValue={page === "update" && selected ? selected.description : ""}
              />
            </div>

            <button type="submit">{page === "add" ? "Kaydet" : "Güncelle"}</button>
          </form>
        )}
      </main>

      <footer>
        <p>elif avcı · 2416501019 · 2026</p>
      </footer>
    </>
  );
}
