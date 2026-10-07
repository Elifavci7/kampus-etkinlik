import { events } from "./data.js";

const list = document.querySelector("#etkinlik-listesi");
const aramaInput = document.querySelector("#arama");
const kategoriSelect = document.querySelector("#kategori-filtre");
const sonucSatiri = document.querySelector("#sonuc");

// Kart Şablonu
function createCard(event) {
  const parts = event.date.split("-");
  const formattedDate = `${parts[2]}.${parts[1]}.${parts[0]}`;

  return `
    <article class="kart">
      <h3>${event.title}</h3>
      <p><strong>Kategori:</strong> ${event.category}</p>
      <p><strong>Tarih:</strong> ${formattedDate} - ${event.time}</p>
      <p><strong>Yer:</strong> ${event.location}</p>
      <p><strong>Kontenjan:</strong> ${event.capacity} kişi</p>
      <p>${event.description}</p>
      <br>
      <a href="etkinlik-detay.html?id=${event.id}">Detayları gör &rarr;</a>
    </article>
  `;
}

// Ekrana Kartları Basma
function render(dizi) {
  if (list) {
    list.innerHTML = dizi.map(createCard).join("");
  }
}

// Dinamik Kategorileri Doldurma
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
  const aranan = aramaInput ? aramaInput.value.toLocaleLowerCase("tr-TR").trim() : "";
  const secilenKategori = kategoriSelect ? kategoriSelect.value : "";

  const sonuc = events.filter(e => {
    const metinUyuyor = e.title.toLocaleLowerCase("tr-TR").includes(aranan) ||
                        e.description.toLocaleLowerCase("tr-TR").includes(aranan) ||
                        e.category.toLocaleLowerCase("tr-TR").includes(aranan);
    const kategoriUyuyor = secilenKategori === "" || e.category === secilenKategori;
    return metinUyuyor && kategoriUyuyor;
  });

  render(sonuc);

  if (sonucSatiri) {
    if (sonuc.length === 0) {
      sonucSatiri.textContent = "Aramanıza uygun etkinlik bulunamadı.";
    } else {
      sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
    }
  }
}

// Başlangıç Çalıştırması
if (list) {
  if (list.dataset.limit) {
    // Ana sayfa için en yakın 2 etkinlik
    const yaklasan = [...events]
      .sort((a, b) => a.date.localeCompare(b.date))
      .slice(0, Number(list.dataset.limit));
    render(yaklasan);
  } else {
    // Etkinlikler sayfası için hepsi
    render(events);
    if (sonucSatiri) {
      sonucSatiri.textContent = `${events.length} etkinlik listeleniyor.`;
    }
    if (aramaInput) aramaInput.addEventListener("input", filtrele);
    if (kategoriSelect) kategoriSelect.addEventListener("change", filtrele);
  }
}