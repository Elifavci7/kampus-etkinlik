import { useState, useEffect } from "react";
import "./App.css";
import { events } from "./data/events";
import type { Category } from "./types/campus-event.ts";
import { searchEvents, filterByCategory, findEventById } from "./utils/filter-events";
import Footer from "./components/layout/Footer";
import type { PageName } from "./types/page";

import Header from "./components/layout/Header";
import Navigation from "./components/layout/Navigation";
import EventList from "./components/events/EventList";
import EventFilter from "./components/events/EventFilter";
import EventDetail from "./components/events/EventDetail";
// Menü öğeleri (map ile çizilir)




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
  

  return (
    <>
      <Header title={title} />

        <Navigation
  page={page}
  onNavigate={go}
/>
  

      <main>
        {/* ADIM 9: Ana Sayfa */}
        {page === "home" && (
          <>
            <h2>Yaklaşan Etkinlikler</h2>
            <EventList events={upcoming} onShowDetail={(id) => go("detail", id)} />
          </>
        )}

        {/* ADIM 10: Etkinlikler Sayfası */}
        {page === "events" && (
          <>
            <EventFilter
  searchText={searchText}
  onSearchChange={setSearchText}
  category={category}
  categories={categories}
  onCategoryChange={setCategory}
/>

            <p id="sonuc">
              {filteredEvents.length === 0
                ? "Etkinlik bulunamadı."
                : `${filteredEvents.length} etkinlik listeleniyor.`}
            </p>

            <EventList
  events={filteredEvents}
  onShowDetail={(id) => go("detail", id)}
  emptyText="Etkinlik bulunamadı."
/>
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
  <EventDetail
    event={selected}
    onBack={() => go("events")}
    onEdit={(id) => go("update", id)}
  />
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

      <Footer />
    </>
  );
}
