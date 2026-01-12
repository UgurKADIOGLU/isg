import React from "react";
import { useTranslation } from "react-i18next";
import "./Home.css";

function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-container">
      <div className="home-hero">
        <h1>{t("home.welcome")}</h1>
        <p>{t("home.description")}</p>
      </div>
      <div className="home-features">
        <div className="feature-card">
          <h3>{t("home.features.safety")}</h3>
          <p>{t("home.features.safetyDesc")}</p>
        </div>
        <div className="feature-card">
          <h3>{t("home.features.compliance")}</h3>
          <p>{t("home.features.complianceDesc")}</p>
        </div>
        <div className="feature-card">
          <h3>{t("home.features.training")}</h3>
          <p>{t("home.features.trainingDesc")}</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
