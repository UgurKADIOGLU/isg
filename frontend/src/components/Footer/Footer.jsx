import React from "react";
import { useTranslation } from "react-i18next";

function Footer() {
  const { t } = useTranslation();
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
            <h5>{t("systemTitle")}</h5>
            <p className="text-muted">{t("description")}</p>
          </div>
          <div className="col-md-4">
            <h5>{t("quickAccess")}</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/employee" className="text-muted text-decoration-none">
                  {t("employees")}
                </a>
              </li>
              <li className="mb-2">
                <a href="/training" className="text-muted text-decoration-none">
                  {t("trainings")}
                </a>
              </li>
              <li className="mb-2">
                <a href="/accident" className="text-muted text-decoration-none">
                  {t("workAccidents")}
                </a>
              </li>
              <li className="mb-2">
                <a href="/document" className="text-muted text-decoration-none">
                  {t("documents")}
                </a>
              </li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>{t("contact")}</h5>
            <ul className="list-unstyled text-muted">
              <li className="mb-2">
                <i className="bi bi-envelope me-2"></i>
                {t("email_contact")}
              </li>
              <li className="mb-2">
                <i className="bi bi-telephone me-2"></i>
                {t("phone")}
              </li>
              <li className="mb-2">
                <i className="bi bi-geo-alt me-2"></i>
                {t("location")}
              </li>
            </ul>
          </div>
        </div>
        <hr className="bg-secondary" />
        <div className="row">
          <div className="col text-center text-muted">
            <p className="mb-0">
              {t("copyright").replace("{year}", new Date().getFullYear())}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
