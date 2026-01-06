import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createAccident } from "./api";

function Index() {
  const { t } = useTranslation();
  const [tarih, setTarih] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [kokNedenAnalizi, setKokNedenAnalizi] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    if (errorMessage.tarih) {
      setErrorMessage((prev) => ({ ...prev, tarih: "" }));
    }
  }, [tarih]);

  useEffect(() => {
    if (errorMessage.aciklama) {
      setErrorMessage((prev) => ({ ...prev, aciklama: "" }));
    }
  }, [aciklama]);

  useEffect(() => {
    if (errorMessage.fotoUrl) {
      setErrorMessage((prev) => ({ ...prev, fotoUrl: "" }));
    }
  }, [fotoUrl]);

  useEffect(() => {
    if (errorMessage.kokNedenAnalizi) {
      setErrorMessage((prev) => ({ ...prev, kokNedenAnalizi: "" }));
    }
  }, [kokNedenAnalizi]);

  useEffect(() => {
    if (errorMessage.employeeId) {
      setErrorMessage((prev) => ({ ...prev, employeeId: "" }));
    }
  }, [employeeId]);

  //const isButtonEnabled = tarih && employeeId && !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage({});

    try {
      const response = await createAccident({
        tarih,
        aciklama,
        fotoUrl,
        kokNedenAnalizi,
        employeeId,
      });
      setSuccessMessage(response.message);
      // Formu temizle
      setTarih("");
      setAciklama("");
      setFotoUrl("");
      setKokNedenAnalizi("");
      setEmployeeId("");
    } catch (error) {
      setErrorMessage(error.response?.data?.validationErrors);
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
            <div className="text-center card-header bg-danger text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-exclamation-triangle me-2"></i>
                {t("reportAccident")}
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="tarih"
                label={t("date")}
                type="date"
                value={tarih}
                onChange={(e) => setTarih(e.target.value)}
                error={errorMessage.tarih}
              />
              <Input
                id="aciklama"
                label={t("description")}
                row={4}
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value)}
                error={errorMessage.aciklama}
              />
              <Input
                id="fotoUrl"
                label={t("photoUrl")}
                type="url"
                value={fotoUrl}
                onChange={(e) => setFotoUrl(e.target.value)}
                error={errorMessage.fotoUrl}
              />
              <Input
                id="kokNedenAnalizi"
                label={t("rootCauseAnalysis")}
                row={3}
                value={kokNedenAnalizi}
                onChange={(e) => setKokNedenAnalizi(e.target.value)}
                placeholder="5N1K, Fishbone vb."
                error={errorMessage.kokNedenAnalizi}
              />
              <Input
                id="employeeId"
                label={t("employeeId")}
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                error={errorMessage.employeeId}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                //disabled={!isButtonEnabled}
                className="btn btn-danger btn-lg px-5"
              >
                {apiProgress ? (
                  <Spinner text={t("sending")} />
                ) : (
                  t("reportAccidentButton")
                )}
              </button>
              {successMessage && (
                <div className="mt-3">
                  <Alert message={successMessage} type="success" />
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
