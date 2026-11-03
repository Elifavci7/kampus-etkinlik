import type { Category } from "../../types/campus-event";

interface EventFilterProps {
  searchText: string;
  category: Category | "";
  categories: Category[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: Category | "") => void;
}

function EventFilter({
  searchText,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: EventFilterProps) {
  return (
    <form className="filtre" onSubmit={(e) => e.preventDefault()}>
      <div className="filtre-alani">
        <label htmlFor="arama">Etkinlik ara</label>
        <input
          id="arama"
          type="search"
          value={searchText}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Örn. atölye, kariyer"
        />
      </div>

      <div className="filtre-alani">
        <label htmlFor="kategori">Kategori</label>
        <select
          id="kategori"
          value={category}
          onChange={(e) =>
            onCategoryChange(e.target.value as Category | "")
          }
        >
          <option value="">Tümü</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    </form>
  );
}

export default EventFilter;
