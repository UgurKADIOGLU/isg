import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createAccident } from "./api";

function Index() {
  const [tarih, setTarih] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [fotoUrl, setFotoUrl] = useState("");
  const [kokNedenAnalizi, setKokNedenAnalizi] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonEnabled = tarih && aciklama && employeeId && !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");

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
      setErrorMessage(error.response?.data?.message || "Bir hata oluştu");
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
                <i className="bi bi-exclamation-triangle me-2"></i>İş Kazası
                Raporla
              </h1>
            </div>
            <div className="card-body p-4">
              <InputField
                id="tarih"
                label="Tarih"
                type="date"
                value={tarih}
                onChange={(e) => setTarih(e.target.value)}
              />
              <div className="mb-3">
                <label htmlFor="aciklama" className="form-label">
                  Açıklama
                </label>
                <textarea
                  id="aciklama"
                  className="form-control"
                  rows="4"
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                ></textarea>
              </div>
              <InputField
                id="fotoUrl"
                label="Fotoğraf URL"
                type="file"
                value={fotoUrl}
                onChange={(e) => setFotoUrl(e.target.value)}
              />
              <div className="mb-3">
                <label htmlFor="kokNedenAnalizi" className="form-label">
                  Kök Neden Analizi
                </label>
                <textarea
                  id="kokNedenAnalizi"
                  className="form-control"
                  rows="3"
                  value={kokNedenAnalizi}
                  onChange={(e) => setKokNedenAnalizi(e.target.value)}
                  placeholder="5N1K, Fishbone vb."
                ></textarea>
              </div>
              <InputField
                id="employeeId"
                label="Çalışan ID"
                type="number"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-danger btn-lg px-5"
              >
                {apiProgress ? (
                  <Spinner text="Gönderiliyor..." />
                ) : (
                  "Kazayı Raporla"
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
