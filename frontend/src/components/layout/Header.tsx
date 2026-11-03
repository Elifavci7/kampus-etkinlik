import { useEffect } from "react";
import { useLocation, matchPath } from "react-router-dom";
import { useEvents } from "../../context/EventsContext";
import { findEventById } from "../../utils/filter-events";

const routeMeta = [
  { path: "/", title: "Kampüs Etkinlikleri", text: "Fakültedeki seminer, atölye ve söyleşileri tek yerden takip edin." },
  { path: "/events", title: "Tüm Etkinlikler", text: "Ekim ayında kampüste düzenlenen etkinlikler." },
  { path: "/admin", title: "Etkinlik Yönetimi" },
  { path: "/admin/new", title: "Etkinlik Ekle" },
  { path: "/login", title: "Giriş Yap" },
  { path: "/register", title: "Kayıt Ol" },
  { path: "/forgot-password", title: "Şifremi Unuttum" }
];

function Header() {
  const { pathname } = useLocation();
  const { events } = useEvents();

  const matchDetail = matchPath("/events/:id", pathname) ?? matchPath("/admin/:id/edit", pathname);
  const matchedEvent = matchDetail ? findEventById(events, matchDetail.params.id ?? "") : undefined;
  const matchedRoute = routeMeta.find((item) => matchPath(item.path, pathname));

  const title = matchedEvent ? matchedEvent.title : (matchedRoute ? matchedRoute.title : "Sayfa Bulunamadı");
  const text = matchedEvent ? `${matchedEvent.category} · ${matchedEvent.location}` : matchedRoute?.text;

  useEffect(() => {
    const site = "Kampüs Etkinlikleri";
    document.title = title === site ? site : `${title} — ${site}`;
  }, [title]);

  return (
    <header className="site-baslik">
      <h1>{title}</h1>
      {text && <p>{text}</p>}
    </header>
  );
}

export default Header;
