import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h2 className="bolum-baslik">Sayfa bulunamadı</h2>
      <p style={{ margin: "20px 0", color: "#666" }}>
        Aradığınız sayfa ya da etkinlik yok.
      </p>
      <Link className="buton" to="/">
        Ana sayfaya dön
      </Link>
    </div>
  );
}

export default NotFoundPage;
