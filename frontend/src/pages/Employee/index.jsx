import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createEmployee } from "./api";

function Index() {
  const { t } = useTranslation();
  const [adSoyad, setAdSoyad] = useState("");
  const [tcKimlik, setTcKimlik] = useState("");
  const [departman, setDepartman] = useState("");
  const [pozisyon, setPozisyon] = useState("");
  const [iseGirisTarihi, setIseGirisTarihi] = useState("");
  const [saglikRaporTarihi, setSaglikRaporTarihi] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.adSoyad) {
      setErrors((prev) => ({ ...prev, adSoyad: "" }));
    }
  }, [adSoyad]);

  useEffect(() => {
    if (errors.tcKimlik) {
      setErrors((prev) => ({ ...prev, tcKimlik: "" }));
    }
  }, [tcKimlik]);

  useEffect(() => {
    if (errors.departman) {
      setErrors((prev) => ({ ...prev, departman: "" }));
    }
  }, [departman]);

  useEffect(() => {
    if (errors.pozisyon) {
      setErrors((prev) => ({ ...prev, pozisyon: "" }));
    }
  }, [pozisyon]);

  useEffect(() => {
    if (errors.iseGirisTarihi) {
      setErrors((prev) => ({ ...prev, iseGirisTarihi: "" }));
    }
  }, [iseGirisTarihi]);

  useEffect(() => {
    if (errors.saglikRaporTarihi) {
      setErrors((prev) => ({ ...prev, saglikRaporTarihi: "" }));
    }
  }, [saglikRaporTarihi]);

  /*const isButtonEnabled =
    adSoyad &&
    tcKimlik &&
    departman &&
    pozisyon &&
    iseGirisTarihi &&
    !apiProgress;*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});

    try {
      const response = await createEmployee({
        adSoyad,
        tcKimlik,
        departman,
        pozisyon,
        iseGirisTarihi,
        saglikRaporTarihi,
      });
      setSuccessMessage(response.message);
      // Formu temizle
      setAdSoyad("");
      setTcKimlik("");
      setDepartman("");
      setPozisyon("");
      setIseGirisTarihi("");
      setSaglikRaporTarihi("");
    } catch (error) {
      setErrors(error.response?.data?.validationErrors || {});
      console.error("Hata:", error);
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-8 offset-lg-2">
          <form className="card shadow-lg border-0" onSubmit={handleSubmit}>
            <div className="text-center card-header bg-success text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>
                {t("addEmployee")}
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="adSoyad"
                label={t("fullName")}
                type="text"
                value={adSoyad}
                onChange={(e) => setAdSoyad(e.target.value)}
                error={errors.adSoyad}
              />
              <Input
                id="tcKimlik"
                label={t("tcIdentity")}
                type="text"
                value={tcKimlik}
                onChange={(e) => setTcKimlik(e.target.value)}
                error={errors.tcKimlik}
              />
              <Input
                id="departman"
                label={t("department")}
                type="text"
                value={departman}
                onChange={(e) => setDepartman(e.target.value)}
                error={errors.departman}
              />
              <Input
                id="pozisyon"
                label={t("position")}
                type="text"
                value={pozisyon}
                onChange={(e) => setPozisyon(e.target.value)}
                error={errors.pozisyon}
              />
              <Input
                id="iseGirisTarihi"
                label={t("startDate")}
                type="date"
                value={iseGirisTarihi}
                onChange={(e) => setIseGirisTarihi(e.target.value)}
                error={errors.iseGirisTarihi}
              />
              <Input
                id="saglikRaporTarihi"
                label={t("healthReportDate")}
                type="date"
                value={saglikRaporTarihi}
                onChange={(e) => setSaglikRaporTarihi(e.target.value)}
                error={errors.saglikRaporTarihi}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                //disabled={!isButtonEnabled}
                className="btn btn-success btn-lg px-5"
              >
                {apiProgress ? (
                  <Spinner text={t("adding")} />
                ) : (
                  t("addEmployeeButton")
                )}
              </button>
              {successMessage && (
                <div className="mt-3">
                  <Alert message={successMessage} type="success" />
                </div>
              )}
              {errorMessage && (
                <div className="mt-3">
                  <Alert message={errorMessage} type="danger" />
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
