import React from "react";

function Footer() {
  return (
    <footer
      className="text-white mt-2 py-2"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>İSG Yönetim Sistemi</h5>
            <p className="text-muted">
              İş Sağlığı ve Güvenliği süreçlerinizi dijital ortamda yönetin.
            </p>
          </div>
          <div className="col-md-4">
            <h5>Hızlı Erişim</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/employee" className="text-muted text-decoration-none">
                  Çalışanlar
                </a>
              </li>
              <li className="mb-2">
                <a href="/training" className="text-muted text-decoration-none">
                  Eğitimler
                </a>
              </li>
              <li className="mb-2">
                <a href="/accident" className="text-muted text-decoration-none">
                  İş Kazaları
                </a>
              </li>
              <li className="mb-2">
                <a href="/document" className="text-muted text-decoration-none">
                  Belgeler
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>İletişim</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                info@isg.com
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                +90 (212) 123 45 67
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                İstanbul, Türkiye
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="row">
          <div className="col text-center text-muted">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} İSG Yönetim Sistemi. Tüm hakları
              saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
