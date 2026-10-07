import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesaj = document.querySelector("#form-mesaj");

const hataAlanlari = {
    ad: document.querySelector("#ad-hata"),
    kategori: document.querySelector("#kategori-hata"),
    tarih: document.querySelector("#tarih-hata"),
    saat: document.querySelector("#saat-hata"),
    yer: document.querySelector("#yer-hata"),
    kontenjan: document.querySelector("#kontenjan-hata")
};

const alanlar = {
    ad: document.querySelector("#etkinlik-adi"),
    kategori: document.querySelector("#kategori"),
    tarih: document.querySelector("#tarih"),
    saat: document.querySelector("#saat"),
    yer: document.querySelector("#yer"),
    kontenjan: document.querySelector("#kontenjan")
};

/* Güncelleme sayfasıysa URL'deki etkinliği bul ve formu doldur */
if (form.dataset.mode === "guncelle") {

    const id = new URLSearchParams(location.search).get("id");

    const etkinlik = events.find(event => event.id === id);

    if (!etkinlik) {

        form.outerHTML = `
            <div class="event-card">
                <h2>Etkinlik bulunamadı</h2>
                <p>Güncellenecek etkinlik bulunamadı.</p>
                <a href="etkinlikler.html">Etkinliklere git</a>
            </div>
        `;

    } else {

        form.elements.ad.value = etkinlik.title;
        form.elements.kategori.value = etkinlik.category;

        const tarih =
            etkinlik.date.split("-").reverse().join("-");

        form.elements.tarih.value = tarih;
        form.elements.saat.value = etkinlik.time;
        form.elements.yer.value = etkinlik.location;
        form.elements.aciklama.value = etkinlik.description;
        form.elements.kontenjan.value = etkinlik.capacity;
    }
}

function hatalariTemizle() {

    Object.values(hataAlanlari).forEach(alan => {
        alan.textContent = "";
    });

    Object.values(alanlar).forEach(alan => {
        alan.removeAttribute("aria-invalid");
    });

    mesaj.innerHTML = "";
    mesaj.className = "";
}

form.addEventListener("submit", function (e) {

    e.preventDefault();

    hatalariTemizle();

    const fd = new FormData(form);

    const data = {
        title: fd.get("ad").trim(),
        category: fd.get("kategori"),
        date: fd.get("tarih"),
        time: fd.get("saat"),
        location: fd.get("yer").trim(),
        description: fd.get("aciklama").trim(),
        capacity: fd.get("kontenjan")
            ? Number(fd.get("kontenjan"))
            : null
    };

    const errors = {};

    if (data.title.length < 3) {
        errors.ad = "En az 3 karakter olmalı.";
    }

    if (!data.category) {
        errors.kategori = "Kategori seçilmeli.";
    }

    if (!data.date) {
        errors.tarih = "Tarih boş bırakılamaz.";
    }

    if (!data.time) {
        errors.saat = "Saat boş bırakılamaz.";
    }

    if (!data.location) {
        errors.yer = "Yer boş bırakılamaz.";
    }

    if (
        data.capacity !== null &&
        (data.capacity < 1 || data.capacity > 1000)
    ) {
        errors.kontenjan =
            "Kontenjan 1-1000 arasında olmalı.";
    }

    Object.entries(errors).forEach(([alan, hata]) => {

        hataAlanlari[alan].textContent = hata;
        alanlar[alan].setAttribute(
            "aria-invalid",
            "true"
        );
    });

    if (Object.keys(errors).length > 0) {

        mesaj.textContent = "Formda hatalı alanlar var.";
        mesaj.className = "form-hata-mesaji";

        return;
    }

    if (form.dataset.mode === "guncelle") {

        mesaj.innerHTML = `
            <h3>Etkinlik başarıyla güncellendi.</h3>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;

    } else {

        mesaj.innerHTML = `
            <h3>Etkinlik başarıyla oluşturuldu.</h3>
            <pre>${JSON.stringify(data, null, 2)}</pre>
        `;
    }

    mesaj.className = "form-basari";
});