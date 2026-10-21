
import type { Category } from "../../types/campus-event";

interface EventFormProps {
  onSubmit: () => void;
}

function EventForm({ onSubmit }: EventFormProps) {
  return (
    <form
      className="form"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <label htmlFor="title">Etkinlik Adı</label>
      <input id="title" name="title" type="text" required />

      <label htmlFor="category">Kategori</label>
      <select id="category" name="category" required defaultValue="">
        <option value="" disabled>Seçiniz</option>
        {(["Seminer", "Atölye", "Söyleşi"] as Category[]).map(
          (item) => (
            <option key={item} value={item}>
              {item}
            </option>
          )
        )}
      </select>

      <label htmlFor="date">Tarih</label>
      <input id="date" name="date" type="date" required />

      <label htmlFor="time">Saat</label>
      <input id="time" name="time" type="time" required />

      <label htmlFor="location">Yer</label>
      <input id="location" name="location" type="text" required />

      <label htmlFor="capacity">Kontenjan</label>
      <input
        id="capacity"
        name="capacity"
        type="number"
        min="1"
        required
      />

      <label htmlFor="description">Açıklama</label>
      <textarea id="description" name="description" required />

      <button type="submit">Kaydet</button>
    </form>
  );
}

export default EventForm;
