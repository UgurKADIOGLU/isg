import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createDocument } from "./api";

function Index() {
  const [ad, setAd] = useState("");
  const [tur, setTur] = useState("");
  const [dosyaYolu, setDosyaYolu] = useState("");
  const [aciklama, setAciklama] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonEnabled = ad && tur && dosyaYolu && !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await createDocument({
        ad,
        tur,
        dosyaYolu,
        aciklama,
      });
      setSuccessMessage(response.message);
      // Formu temizle
      setAd("");
      setTur("");
      setDosyaYolu("");
      setAciklama("");
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
          <form className="card" onSubmit={handleSubmit}>
            <div className="text-center card-header">
              <h1>Belge Yükle</h1>
            </div>
            <div className="card-body">
              <InputField
                id="ad"
                label="Belge Adı"
                type="text"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
              />
              <div className="mb-3">
                <label htmlFor="tur" className="form-label">
                  Belge Türü
                </label>
                <select
                  id="tur"
                  className="form-select"
                  value={tur}
                  onChange={(e) => setTur(e.target.value)}
                >
                  <option value="">-- Belge Türü Seçin --</option>
                  <option value="talimat">Talimat</option>
                  <option value="prosedür">Prosedür</option>
                  <option value="tutanak">Tutanak</option>
                  <option value="rapor">Rapor</option>
                </select>
              </div>
              <InputField
                id="dosyaYolu"
                label="Dosya Yolu"
                type="file"
                value={dosyaYolu}
                onChange={(e) => setDosyaYolu(e.target.value)}
              />
              <div className="mb-3">
                <label htmlFor="aciklama" className="form-label">
                  Açıklama
                </label>
                <textarea
                  id="aciklama"
                  className="form-control"
                  rows="3"
                  value={aciklama}
                  onChange={(e) => setAciklama(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className="text-center card-footer">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-primary"
              >
                {apiProgress ? (
                  <Spinner text="Yükleniyor..." />
                ) : (
                  "Belgeyi Yükle"
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
