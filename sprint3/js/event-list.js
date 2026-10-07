import { events } from "./data.js";

// Tarih dizgesini (DD-MM-YYYY) güvenli şekilde Date objesine çeviren yardımcı fonksiyon
function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("-").map(Number);
    // Ay indeksi 0-Tabanlı olduğu için (month - 1) yapılır
    return new Date(year, month - 1, day);
}

function createCard(event) {
    const tarih = parseDate(event.date).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    return `
        <article class="event-card">
            <h2>${event.title}</h2>

            <p>
                ${event.category} · ${tarih} · ${event.location}
            </p>

            <p>${event.description}</p>

            <p>Kontenjan: ${event.capacity}</p>

            <a href="etkinlik-detay.html?id=${event.id}">
                Detayları gör
            </a>
        </article>
    `;
}

const list = document.querySelector("#etkinlik-listesi");

function render(dizi) {
    if (!list) return;
    list.innerHTML = dizi.map(createCard).join("");
}

if (list && list.dataset.limit) {

    const yaklasan = [...events]
        .sort((a, b) => parseDate(a.date) - parseDate(b.date))
        .slice(0, Number(list.dataset.limit));

    render(yaklasan);

} else if (list) {

    const arama = document.querySelector("#arama");
    const kategoriFiltre = document.querySelector("#kategori-filtre");
    const sonucSatiri = document.querySelector("#sonuc");

    // Kategorileri data.js içindeki verilerden oluştur
    if (kategoriFiltre) {
        const kategoriler = [...new Set(events.map(event => event.category))];

        kategoriler.forEach(kategori => {
            const option = document.createElement("option");
            option.value = kategori;
            option.textContent = kategori;
            kategoriFiltre.appendChild(option);
        });
    }

    function filtrele() {
        const aranan = arama ? arama.value.trim().toLocaleLowerCase("tr-TR") : "";
        const secilenKategori = kategoriFiltre ? kategoriFiltre.value : "";

        const sonuc = events.filter(event => {
            const metin = `
                ${event.title}
                ${event.description}
                ${event.location}
                ${event.category}
            `.toLocaleLowerCase("tr-TR");

            const metinUyuyor = metin.includes(aranan);
            const kategoriUyuyor =
                secilenKategori === "" ||
                event.category === secilenKategori;

            return metinUyuyor && kategoriUyuyor;
        });

        render(sonuc);

        if (sonucSatiri) {
            if (sonuc.length === 0) {
                sonucSatiri.textContent = "Etkinlik bulunamadı.";
            } else {
                sonucSatiri.textContent = `${sonuc.length} etkinlik listeleniyor.`;
            }
        }
    }

    if (arama) arama.addEventListener("input", filtrele);
    if (kategoriFiltre) kategoriFiltre.addEventListener("change", filtrele);

    filtrele();
}