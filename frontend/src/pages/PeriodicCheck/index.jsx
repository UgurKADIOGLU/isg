import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createPeriodicCheck } from "./api";

function Index() {
  const { t } = useTranslation();
  const [ekipmanAdi, setEkipmanAdi] = useState("");
  const [kategori, setKategori] = useState("");
  const [sonKontrolTarihi, setSonKontrolTarihi] = useState("");
  const [birSonrakiKontrolTarihi, setBirSonrakiKontrolTarihi] = useState("");
  const [durum, setDurum] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (errors.ekipmanAdi) {
      setErrors((prev) => ({ ...prev, ekipmanAdi: "" }));
    }
  }, [ekipmanAdi]);

  useEffect(() => {
    if (errors.kategori) {
      setErrors((prev) => ({ ...prev, kategori: "" }));
    }
  }, [kategori]);

  useEffect(() => {
    if (errors.sonKontrolTarihi) {
      setErrors((prev) => ({ ...prev, sonKontrolTarihi: "" }));
    }
  }, [sonKontrolTarihi]);

  useEffect(() => {
    if (errors.birSonrakiKontrolTarihi) {
      setErrors((prev) => ({ ...prev, birSonrakiKontrolTarihi: "" }));
    }
  }, [birSonrakiKontrolTarihi]);

  useEffect(() => {
    if (errors.durum) {
      setErrors((prev) => ({ ...prev, durum: "" }));
    }
  }, [durum]);

  /*const isButtonEnabled =
    ekipmanAdi &&
    kategori &&
    sonKontrolTarihi &&
    birSonrakiKontrolTarihi &&
    durum &&
    !apiProgress;*/

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");
    setErrors({});

    try {
      const response = await createPeriodicCheck({
        ekipmanAdi,
        kategori,
        sonKontrolTarihi,
        birSonrakiKontrolTarihi,
        durum,
      });
      setSuccessMessage(response.message);
      // Formu temizle
      setEkipmanAdi("");
      setKategori("");
      setSonKontrolTarihi("");
      setBirSonrakiKontrolTarihi("");
      setDurum("");
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
            <div className="text-center card-header bg-info text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-clipboard-check me-2"></i>
                {t("addPeriodicCheck")}
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="ekipmanAdi"
                label={t("equipmentName")}
                type="text"
                value={ekipmanAdi}
                onChange={(e) => setEkipmanAdi(e.target.value)}
                error={errors.ekipmanAdi}
              />
              <div className="mb-3">
                <label htmlFor="kategori" className="form-label">
                  {t("category")}
                </label>
                <select
                  id="kategori"
                  className={
                    errors.kategori ? "form-select is-invalid" : "form-select"
                  }
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="">{t("selectCategory")}</option>
                  <option value="Basınçlı Kap">{t("pressurizedVessel")}</option>
                  <option value="Kaldırma Aracı">{t("liftingTool")}</option>
                  <option value="Vinç">{t("crane")}</option>
                  <option value="Forklift">{t("forklift")}</option>
                  <option value="Merdiven">{t("ladder")}</option>
                  <option value="Diğer">{t("other")}</option>
                </select>
                {errors.kategori && (
                  <div className="invalid-feedback d-block">
                    {errors.kategori}
                  </div>
                )}
              </div>
              <Input
                id="sonKontrolTarihi"
                label={t("lastCheckDate")}
                type="date"
                value={sonKontrolTarihi}
                onChange={(e) => setSonKontrolTarihi(e.target.value)}
                error={errors.sonKontrolTarihi}
              />
              <Input
                id="birSonrakiKontrolTarihi"
                label={t("nextCheckDate")}
                type="date"
                value={birSonrakiKontrolTarihi}
                onChange={(e) => setBirSonrakiKontrolTarihi(e.target.value)}
                error={errors.birSonrakiKontrolTarihi}
              />
              <div className="mb-3">
                <label htmlFor="durum" className="form-label">
                  {t("status")}
                </label>
                <select
                  id="durum"
                  className={
                    errors.durum ? "form-select is-invalid" : "form-select"
                  }
                  value={durum}
                  onChange={(e) => setDurum(e.target.value)}
                >
                  <option value="">{t("selectStatus")}</option>
                  <option value="Uygun">{t("suitable")}</option>
                  <option value="Uygun Değil">{t("unsuitable")}</option>
                  <option value="Bakım Beklemede">
                    {t("maintenancePending")}
                  </option>
                  <option value="Hizmet Dışı">{t("outOfService")}</option>
                </select>
                {errors.durum && (
                  <div className="invalid-feedback d-block">{errors.durum}</div>
                )}
              </div>
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                //disabled={!isButtonEnabled}
                className="btn btn-info btn-lg px-5"
              >
                {apiProgress ? (
                  <Spinner text={t("adding")} />
                ) : (
                  t("addCheckButton")
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
