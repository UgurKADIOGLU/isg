import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <i className="bi bi-shield-check me-2"></i>
          İSG Yönetim Sistemi
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/employee">
                Çalışanlar
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/training">
                Eğitimler
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accident">
                İş Kazaları
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/risk-assessment">
                Risk Değerlendirme
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/periodic-check">
                Periyodik Kontrol
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/document">
                Belgeler
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                Kayıt Ol
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
