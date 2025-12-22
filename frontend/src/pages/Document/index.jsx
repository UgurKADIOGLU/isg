import React, { useState, useEffect } from "react";
import Input from "../../components/InputField/InputField";
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
  const [errorMessage, setErrorMessage] = useState({});

  //const isButtonEnabled = ad && tur && dosyaYolu && !apiProgress;

  useEffect(() => {
    if (errorMessage.ad) {
      setErrorMessage((prev) => ({ ...prev, ad: "" }));
    }
  }, [ad]);

  useEffect(() => {
    if (errorMessage.tur) {
      setErrorMessage((prev) => ({ ...prev, tur: "" }));
    }
  }, [tur]);

  useEffect(() => {
    if (errorMessage.dosyaYolu) {
      setErrorMessage((prev) => ({ ...prev, dosyaYolu: "" }));
    }
  }, [dosyaYolu]);

  useEffect(() => {
    if (errorMessage.aciklama) {
      setErrorMessage((prev) => ({ ...prev, aciklama: "" }));
    }
  }, [aciklama]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage({});

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
      setErrorMessage(error.response?.data?.validationErrors || {});
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
            <div className="text-center card-header bg-secondary text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-file-earmark-text me-2"></i>Belge Yükle
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="ad"
                label="Belge Adı"
                type="text"
                value={ad}
                onChange={(e) => setAd(e.target.value)}
                error={errorMessage.ad}
              />
              <div className="mb-3">
                <label htmlFor="tur" className="form-label">
                  Belge Türü
                </label>
                <select
                  id="tur"
                  className={
                    errorMessage.tur ? "form-select is-invalid" : "form-select"
                  }
                  value={tur}
                  onChange={(e) => setTur(e.target.value)}
                >
                  <option value="">-- Belge Türü Seçin --</option>
                  <option value="talimat">Talimat</option>
                  <option value="prosür">Prosür</option>
                  <option value="tutanak">Tutanak</option>
                  <option value="rapor">Rapor</option>
                </select>
                {errorMessage.tur && (
                  <div className="invalid-feedback d-block">
                    {errorMessage.tur}
                  </div>
                )}
              </div>
              <Input
                id="dosyaYolu"
                label="Dosya Yolu"
                type="url"
                value={dosyaYolu}
                onChange={(e) => setDosyaYolu(e.target.value)}
                error={errorMessage.dosyaYolu}
              />
              <Input
                id="aciklama"
                label="Açıklama"
                rows={3}
                value={aciklama}
                onChange={(e) => setAciklama(e.target.value)}
                error={errorMessage.aciklama}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                //disabled={!isButtonEnabled}
                className="btn btn-secondary btn-lg px-5"
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
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
