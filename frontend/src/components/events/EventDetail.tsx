import { Link } from "react-router-dom";
import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventDetailProps {
  event: CampusEvent;
}

function EventDetail({ event }: EventDetailProps) {
  return (
    <article className="event-detail">
      {event.image && (
        <div className="event-image">
          <figure>
            <img src={event.image} alt={event.title} />
          </figure>
        </div>
      )}
      <div className="event-info">
        <dl>
          <dt>Tarih</dt>
          <dd>{formatDate(event.date)}</dd>
          <dt>Saat</dt>
          <dd>{event.time}</dd>
          <dt>Yer</dt>
          <dd>{event.location}</dd>
          <dt>Kategori</dt>
          <dd>{event.category}</dd>
          <dt>Kontenjan</dt>
          <dd>{event.capacity} kişi</dd>
        </dl>

        <h3>Açıklama</h3>
        <p>{event.description}</p>

        <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
          <Link className="buton" to="/events">
            Listeye dön
          </Link>
          <Link className="buton" to={`/admin/${event.id}/edit`}>
            Güncelle
          </Link>
        </div>
      </div>
    </article>
  );
}

export default EventDetail;
