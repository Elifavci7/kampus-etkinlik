import { events } from "./data.js";

const form = document.querySelector("#etkinlik-formu");
const mesajKutusu = document.querySelector("#form-mesaj");

// Güncelleme Modu Kontrolü
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const etkinlik = events.find(e => e.id === id);

if (form && form.dataset.mode === "guncelle") {
  if (etkinlik) {
    if (form.elements.ad) form.elements.ad.value = etkinlik.title;
    if (form.elements.kategori) form.elements.kategori.value = etkinlik.category;
    if (form.elements.tarih) form.elements.tarih.value = etkinlik.date;
    if (form.elements.yer) form.elements.yer.value = etkinlik.location;
    if (form.elements.kontenjan) form.elements.kontenjan.value = etkinlik.capacity;
  } else {
    form.outerHTML = `
      <div style="border:1px solid #e53e3e; background:#fff5f5; color:#c53030; padding:1rem; border-radius:8px; margin-bottom:1rem;">
        <p><strong>Güncellenecek etkinlik seçilmedi.</strong> Önce listeden bir etkinlik seçip, detay sayfasındaki "Bu etkinliği güncelle" butonunu kullanın.</p>
        <br>
        <a href="etkinlikler.html" style="background:#2b6cb0; color:white; padding:0.5rem 1rem; border-radius:4px; text-decoration:none;">Etkinliklere git</a>
      </div>
    `;
  }
}

// Form Gönderim Kontrolü
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const fd = new FormData(form);
    const data = {
      title: fd.get("ad") ? fd.get("ad").trim() : "",
      category: fd.get("kategori") || "",
      date: fd.get("tarih") || "",
      location: fd.get("yer") ? fd.get("yer").trim() : "",
      capacity: fd.get("kontenjan") ? Number(fd.get("kontenjan")) : 0
    };

    document.querySelectorAll("span[id$='-hata']").forEach(sp => sp.textContent = "");
    document.querySelectorAll("[aria-invalid]").forEach(el => el.removeAttribute("aria-invalid"));

    const errors = {};

    if (data.title.length < 3) errors.ad = "En az 3 karakter olmalı.";
    if (!data.category) errors.kategori = "Kategori seçilmelidir.";
    if (!data.date) errors.tarih = "Tarih alanı boş bırakılamaz.";
    if (!data.location) errors.yer = "Yer alanı boş bırakılamaz.";
    if (data.capacity < 1 || data.capacity > 1000) errors.kontenjan = "Kontenjan 1-1000 arasında olmalıdır.";

    if (Object.keys(errors).length > 0) {
      Object.keys(errors).forEach(key => {
        const inputEl = document.querySelector(`#${key}`);
        const hataSpan = document.querySelector(`#${key}-hata`);
        if (inputEl) inputEl.setAttribute("aria-invalid", "true");
        if (hataSpan) hataSpan.textContent = errors[key];
      });

      if (mesajKutusu) {
        mesajKutusu.innerHTML = `<p style="color:red; font-weight:bold;">Formda hatalı alanlar var!</p>`;
      }
      return;
    }

    if (mesajKutusu) {
      mesajKutusu.innerHTML = `
        <div style="background-color: #e6fffa; border: 1px solid #319795; padding: 1rem; border-radius: 8px;">
          <p style="color:#234e52; font-weight:bold;">Başarılı! Oluşan Nesne:</p>
          <pre style="color:#234e52;">${JSON.stringify(data, null, 2)}</pre>
        </div>
      `;
    }
  });
}