import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Sprint 2 CSS yapısıyla tam uyumlu kart şablonu
function createCard(event) {
  const parts = event.date.split("-");
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p class="kategori">${event.category}</p>
      <p><strong>Tarih:</strong> ${formattedDate}, ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör</a>
    </article>
  `;
}

// Ekrana Kartları Basma
function render(dizi) {
  if (list) {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// Dinamik Kategoriler
if (kategoriSelect) {
  const kategoriler = [...new Set(events.map(e => e.category))];
  kategoriler.forEach(kat => {
    const opt = document.createElement("option");
    opt.value = kat;
    opt.textContent = kat;
    kategoriSelect.appendChild(opt);
  });
}

// Filtreleme
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

// Sayfa Açılış Kontrolü
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