import { events } from "./data.js";

const container = document.querySelector("#detay");
const params = new URLSearchParams(window.location.search);
const id = params.get("id");

const event = events.find(e => e.id === id);

if (!event) {
  if (container) {
    container.innerHTML = `
      <div style="border: 1px solid #e53e3e; background: #fff5f5; color: #c53030; padding: 1rem; border-radius: 8px;">
        <h2>Etkinlik bulunamadı</h2>
        <p>"${id || 'eksik'}" numaralı bir etkinlik yok. Listeden bir etkinlik seçin.</p>
        <br>
        <a href="etkinlikler.html" style="background:#2b6cb0; color:white; padding:0.5rem 1rem; border-radius:4px; text-decoration:none;">&larr; Listeye dön</a>
      </div>
    `;
  }
} else {
  document.title = event.title;
  if (container) {
    container.innerHTML = `
      <h2>${event.title}</h2>
      <dl>
        <dt>Tarih:</dt><dd>${event.date} ${event.time}</dd>
        <dt>Yer:</dt><dd>${event.location}</dd>
        <dt>Kategori:</dt><dd>${event.category}</dd>
        <dt>Kontenjan:</dt><dd>${event.capacity} kişi</dd>
      </dl>
      <h3>Açıklama</h3>
      <p>${event.description}</p>
      <br>
      <div style="display:flex; gap:10px;">
        <a href="etkinlikler.html" style="background:#2b6cb0; color:white; padding:0.5rem 1rem; border-radius:4px; text-decoration:none;">&larr; Listeye dön</a>
        <a href="etkinlik-guncelle.html?id=${event.id}" style="background:#2f855a; color:white; padding:0.5rem 1rem; border-radius:4px; text-decoration:none;">Bu etkinliği güncelle</a>
      </div>
    `;
  }
}