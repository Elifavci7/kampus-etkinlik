import type { PageName } from "../../types/page";

interface NavigationProps {
  page: PageName;
  onNavigate: (page: PageName) => void;
}

function Navigation({ page, onNavigate }: NavigationProps) {
  return (
    <nav className="menu">
      <button
        onClick={() => onNavigate("home")}
        aria-current={page === "home" ? "page" : undefined}
      >
        Ana Sayfa
      </button>

      <button
        onClick={() => onNavigate("events")}
        aria-current={page === "events" ? "page" : undefined}
      >
        Etkinlikler
      </button>

      <button
        onClick={() => onNavigate("add")}
        aria-current={page === "add" ? "page" : undefined}
      >
        Etkinlik Ekle
      </button>
    </nav>
  );
}

export default Navigation;