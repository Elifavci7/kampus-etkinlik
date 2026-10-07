import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Kart Oluşturma Fonksiyonu
function createCard(event) {
  const parts = event.date.split("-");
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

  return `
    <article class="kart" style="background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
      <h3 style="margin-top: 0; color: #2b6cb0; font-size: 1.25rem;">${event.title}</h3>
      <p style="margin: 0.4rem 0;"><strong>Kategori:</strong> ${event.category}</p>
      <p style="margin: 0.4rem 0;"><strong>Tarih:</strong> ${formattedDate} - ${event.time}</p>
      <p style="margin: 0.4rem 0;"><strong>Yer:</strong> ${event.location}</p>
      <p style="margin: 0.4rem 0;"><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      <p style="margin: 0.8rem 0 1rem 0; color: #4a5568;">${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}" style="display: inline-block; background: #3182ce; color: #ffffff; padding: 0.4rem 0.8rem; border-radius: 4px; text-decoration: none; font-weight: 500;">Detayları gör &rarr;</a>
    </article>
  `;
}

// Ekrana Kartları Basma
function render(dizi) {
  if (list) {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// Kategorileri Seçim Kutusuna Doldurma
if (kategoriSelect) {
  const kategoriler = [...new Set(events.map(e => e.category))];
  kategoriler.forEach(kat => {
    const opt = document.createElement("option");
    opt.value = kat;
    opt.textContent = kat;
    kategoriSelect.appendChild(opt);
  });
}

// Filtreleme Fonksiyonu
function filtrele() {
  const aranan = aramaInput ? aramaInput.value.toLowerCase().trim() : "";
  const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

  const sonuc = events.filter(e => {
    const metinUyuyor = e.title.toLowerCase().includes(aranan) ||
                        e.description.toLowerCase().includes(aranan) ||
                        e.category.toLowerCase().includes(aranan);
    const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);

  if (sonucSatiri) {
    sonucSatiri.textContent = sonuc.length === 0 
      ? "Aramanıza uygun etkinlik bulunamadı." 
      : `${sonuc.length} etkinlik listeleniyor.`;
  }
}

// Sayfa Açıldığında Çalıştırma
if (list) {
  if (list.dataset.limit) {
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    render(events);
    if (sonucSatiri) {
      sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
    }
    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
  }
}
