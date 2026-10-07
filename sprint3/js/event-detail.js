import { events } from "./data.js";

const container = document.querySelector("#detay");

const id = new URLSearchParams(location.search).get("id");

const event = events.find(e => e.id === id);

if (!event) {

    container.innerHTML = `
        <div class="event-card">
            <h2>Etkinlik bulunamadı</h2>
            <p>Geçerli bir etkinlik seçilmedi.</p>
            <a href="etkinlikler.html">Listeye dön</a>
        </div>
    `;

} else {

    document.title = event.title;

    const tarih = new Date(
        event.date.split("-").reverse().join("-")
    ).toLocaleDateString("tr-TR", {
        day: "numeric",
        month: "long",
        year: "numeric"
    });

    container.innerHTML = `
        <article class="event-detail">

            <div class="event-image">
                <figure>
                    <img src="afis.jpg" alt="${event.title} etkinlik afişi">
                    <figcaption>${event.title} afişi</figcaption>
                </figure>
            </div>

            <div class="event-info">

                <h1>${event.title}</h1>

                <dl>
                    <dt>Tarih</dt>
                    <dd>${tarih}, ${event.time}</dd>

                    <dt>Yer</dt>
                    <dd>${event.location}</dd>

                    <dt>Kategori</dt>
                    <dd>${event.category}</dd>

                    <dt>Kontenjan</dt>
                    <dd>${event.capacity}</dd>
                </dl>

                <p>${event.description}</p>

                <p>
                    <a href="etkinlikler.html">Listeye dön</a>
                </p>

                <p>
                    <a href="etkinlik-guncelle.html?id=${event.id}">
                        Bu etkinliği güncelle
                    </a>
                </p>

            </div>

        </article>
    `;
}