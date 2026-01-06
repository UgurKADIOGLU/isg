import React from "react";
import { useTranslation } from "react-i18next";

function LanguageSelector() {
  const { i18n } = useTranslation();
  const onSelectLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("lang", lng);
  };
  return (
    <>
      <img
        role="button"
        src="https://flagcdn.com/28x21/tr.png"
        width="28"
        height="21"
        alt="Turkey"
        onClick={() => onSelectLanguage("tr")}
      ></img>
      <img
        role="button"
        src="https://flagcdn.com/28x21/us.png"
        width="28"
        height="21"
        alt="United States"
        onClick={() => onSelectLanguage("en")}
      ></img>
    </>
  );
}

export default LanguageSelector;
