import React, { useState, useEffect } from "react";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createRiskAssessment } from "./api";

function Index() {
  const [tehlikeTanimi, setTehlikeTanimi] = useState("");
  const [olasilik, setOlasilik] = useState("");
  const [siddet, setSiddet] = useState("");
  const [riskSkoru, setRiskSkoru] = useState(0);
  const [mevcutOnlemler, setMevcutOnlemler] = useState("");
  const [ilaveOnlemler, setIlaveOnlemler] = useState("");
  const [sorumluKisi, setSorumluKisi] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.tehlikeTanimi) {
      setErrors((prev) => ({ ...prev, tehlikeTanimi: "" }));
    }
  }, [tehlikeTanimi]);

  useEffect(() => {
    if (errors.olasilik) {
      setErrors((prev) => ({ ...prev, olasilik: "" }));
    }
  }, [olasilik]);

  useEffect(() => {
    if (errors.siddet) {
      setErrors((prev) => ({ ...prev, siddet: "" }));
    }
  }, [siddet]);

  useEffect(() => {
    if (errors.mevcutOnlemler) {
      setErrors((prev) => ({ ...prev, mevcutOnlemler: "" }));
    }
  }, [mevcutOnlemler]);

  useEffect(() => {
    if (errors.ilaveOnlemler) {
      setErrors((prev) => ({ ...prev, ilaveOnlemler: "" }));
    }
  }, [ilaveOnlemler]);

  useEffect(() => {
    if (errors.sorumluKisi) {
      setErrors((prev) => ({ ...prev, sorumluKisi: "" }));
    }
  }, [sorumluKisi]);

  /*const isButtonEnabled =
    tehlikeTanimi &&
    olasilik &&
    siddet &&
    mevcutOnlemler &&
    sorumluKisi &&
    !apiProgress;*/

  const handleOlasIlIkChange = (value) => {
    setOlasilik(value);
    calculateRiskScore(value, siddet);
  };

  const handleSiddeetChange = (value) => {
    setSiddet(value);
    calculateRiskScore(olasilik, value);
  };

  const calculateRiskScore = (olasIlIk, sIddeet) => {
    const score = parseInt(olasIlIk) * parseInt(sIddeet);
    setRiskSkoru(score);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});

    try {
      const response = await createRiskAssessment({
        tehlikeTanimi,
        olasilik: parseInt(olasilik),
        siddet: parseInt(siddet),
        riskSkoru,
        mevcutOnlemler,
        ilaveOnlemler,
        sorumluKisi,
      });
      setSuccessMessage(response.message);
      // Formu temizle
      setTehlikeTanimi("");
      setOlasilik("");
      setSiddet("");
      setRiskSkoru(0);
      setMevcutOnlemler("");
      setIlaveOnlemler("");
      setSorumluKisi("");
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
            <div className="text-center card-header bg-warning text-dark py-4">
              <h1 className="mb-0">
                <i className="bi bi-shield-exclamation me-2"></i>Risk
                Değerlendirmesi
              </h1>
            </div>
            <div className="card-body p-4">
              <div className="mb-3">
                <label htmlFor="tehlikeTanimi" className="form-label">
                  Tehlike Tanımı
                </label>
                <textarea
                  id="tehlikeTanimi"
                  className={
                    errors.tehlikeTanimi
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  rows="3"
                  value={tehlikeTanimi}
                  onChange={(e) => setTehlikeTanimi(e.target.value)}
                ></textarea>
                {errors.tehlikeTanimi && (
                  <div className="invalid-feedback d-block">
                    {errors.tehlikeTanimi}
                  </div>
                )}
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="olasilik" className="form-label">
                      Olasılık (1-5)
                    </label>
                    <select
                      id="olasilik"
                      className={
                        errors.olasilik
                          ? "form-select is-invalid"
                          : "form-select"
                      }
                      value={olasilik}
                      onChange={(e) => handleOlasIlIkChange(e.target.value)}
                    >
                      <option value="">-- Olasılık Seçin --</option>
                      <option value="1">1 - Çok Düşük</option>
                      <option value="2">2 - Düşük</option>
                      <option value="3">3 - Orta</option>
                      <option value="4">4 - Yüksek</option>
                      <option value="5">5 - Çok Yüksek</option>
                    </select>
                    {errors.olasilik && (
                      <div className="invalid-feedback d-block">
                        {errors.olasilik}
                      </div>
                    )}
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="siddet" className="form-label">
                      Şiddet (1-5)
                    </label>
                    <select
                      id="siddet"
                      className={
                        errors.siddet ? "form-select is-invalid" : "form-select"
                      }
                      value={siddet}
                      onChange={(e) => handleSiddeetChange(e.target.value)}
                    >
                      <option value="">— Şiddet Seçin --</option>
                      <option value="1">1 - Hafif</option>
                      <option value="2">2 - Orta</option>
                      <option value="3">3 - Ciddi</option>
                      <option value="4">4 - Çok Ciddi</option>
                      <option value="5">5 - Ölümcül</option>
                    </select>
                    {errors.siddet && (
                      <div className="invalid-feedback d-block">
                        {errors.siddet}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">
                  Risk Skoru: {riskSkoru}
                </label>
                <div className="alert alert-info" role="alert">
                  Risk Skoru otomatik olarak hesaplanır (Olasılık × Şiddet)
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="mevcutOnlemler" className="form-label">
                  Mevcut Önlemler
                </label>
                <textarea
                  id="mevcutOnlemler"
                  className={
                    errors.mevcutOnlemler
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  rows="3"
                  value={mevcutOnlemler}
                  onChange={(e) => setMevcutOnlemler(e.target.value)}
                ></textarea>
                {errors.mevcutOnlemler && (
                  <div className="invalid-feedback d-block">
                    {errors.mevcutOnlemler}
                  </div>
                )}
              </div>

              <div className="mb-3">
                <label htmlFor="ilaveOnlemler" className="form-label">
                  İlave Önlemler
                </label>
                <textarea
                  id="ilaveOnlemler"
                  className={
                    errors.ilaveOnlemler
                      ? "form-control is-invalid"
                      : "form-control"
                  }
                  rows="3"
                  value={ilaveOnlemler}
                  onChange={(e) => setIlaveOnlemler(e.target.value)}
                ></textarea>
                {errors.ilaveOnlemler && (
                  <div className="invalid-feedback d-block">
                    {errors.ilaveOnlemler}
                  </div>
                )}
              </div>

              <Input
                id="sorumluKisi"
                label="Sorumlu Kişi"
                type="text"
                value={sorumluKisi}
                onChange={(e) => setSorumluKisi(e.target.value)}
                error={errors.sorumluKisi}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                //disabled={!isButtonEnabled}
                className="btn btn-warning btn-lg px-5"
              >
                {apiProgress ? (
                  <Spinner text="Kaydediliyor..." />
                ) : (
                  "Değerlendirmeyi Kaydet"
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
