import type { CampusEvent } from "../../types/campus-event";
import { formatDate } from "../../utils/format-date";

interface EventCardProps {
  event: CampusEvent;
  onShowDetail: (id: string) => void;
}

function EventCard({ event, onShowDetail }: EventCardProps) {
  return (
    <article className="event-card">
      {/* Eski renderCard fonksiyonundaki kart içeriğini buraya taşıyacağız. */}
      <h2>{event.title}</h2>
      <p>{formatDate(event.date)} · {event.location}</p>
      <p>{event.description}</p>
      <button onClick={() => onShowDetail(event.id)}>
        Detayları gör
      </button>
    </article>
  );
}

export default EventCard;