import React from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function Navbar() {
  const { t } = useTranslation();
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
          {t("systemTitle")}
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
                {t("employees")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/training">
                {t("trainings")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/accident">
                {t("workAccidents")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/risk-assessment">
                {t("riskAssessment")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/periodic-check">
                {t("periodicCheck")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/document">
                {t("documents")}
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup">
                {t("singUp")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
