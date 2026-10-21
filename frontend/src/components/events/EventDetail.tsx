
import type { CampusEvent } from "../../types/campus-event";

interface EventDetailProps {
  event: CampusEvent;
  onBack: () => void;
  onEdit: (id: string) => void;
}

function EventDetail({
  event,
  onBack,
  onEdit,
}: EventDetailProps) {
  return (
    <article className="event-card">
      <h2>{event.title}</h2>

      <p>
        {event.category} · {event.date} · {event.location}
      </p>

      <h3>Etkinlik Künyesi</h3>
      <p>Tarih: {event.date}</p>
      <p>Saat: {event.time}</p>
      <p>Yer: {event.location}</p>
      <p>Kategori: {event.category}</p>
      <p>Kontenjan: {event.capacity} kişi</p>

      <h3>Açıklama</h3>
      <p>{event.description}</p>

      <button type="button" onClick={onBack}>
        Listeye dön
      </button>

      <button
        type="button"
        onClick={() => onEdit(event.id)}
      >
        Bu etkinliği güncelle
      </button>
    </article>
  );
}

export default EventDetail;
