import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createPeriodicCheck } from "./api";

function Index() {
  const [ekipmanAdi, setEkipmanAdi] = useState("");
  const [kategori, setKategori] = useState("");
  const [sonKontrolTarihi, setSonKontrolTarihi] = useState("");
  const [birSonrakiKontrolTarihi, setBirSonrakiKontrolTarihi] = useState("");
  const [durum, setDurum] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonEnabled =
    ekipmanAdi &&
    kategori &&
    sonKontrolTarihi &&
    birSonrakiKontrolTarihi &&
    durum &&
    !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");

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
              <h1>Periyodik Kontrol Ekle</h1>
            </div>
            <div className="card-body">
              <InputField
                id="ekipmanAdi"
                label="Ekipman Adı"
                type="text"
                value={ekipmanAdi}
                onChange={(e) => setEkipmanAdi(e.target.value)}
              />
              <div className="mb-3">
                <label htmlFor="kategori" className="form-label">
                  Kategori
                </label>
                <select
                  id="kategori"
                  className="form-select"
                  value={kategori}
                  onChange={(e) => setKategori(e.target.value)}
                >
                  <option value="">-- Kategori Seçin --</option>
                  <option value="Basınçlı Kap">Basınçlı Kap</option>
                  <option value="Kaldırma Aracı">Kaldırma Aracı</option>
                  <option value="Vinç">Vinç</option>
                  <option value="Forklift">Forklift</option>
                  <option value="Merdiven">Merdiven</option>
                  <option value="Diğer">Diğer</option>
                </select>
              </div>
              <InputField
                id="sonKontrolTarihi"
                label="Son Kontrol Tarihi"
                type="date"
                value={sonKontrolTarihi}
                onChange={(e) => setSonKontrolTarihi(e.target.value)}
              />
              <InputField
                id="birSonrakiKontrolTarihi"
                label="Bir Sonraki Kontrol Tarihi"
                type="date"
                value={birSonrakiKontrolTarihi}
                onChange={(e) => setBirSonrakiKontrolTarihi(e.target.value)}
              />
              <div className="mb-3">
                <label htmlFor="durum" className="form-label">
                  Durum
                </label>
                <select
                  id="durum"
                  className="form-select"
                  value={durum}
                  onChange={(e) => setDurum(e.target.value)}
                >
                  <option value="">-- Durum Seçin --</option>
                  <option value="Uygun">Uygun</option>
                  <option value="Uygun Değil">Uygun Değil</option>
                  <option value="Bakım Beklemede">Bakım Beklemede</option>
                  <option value="Hizmet Dışı">Hizmet Dışı</option>
                </select>
              </div>
            </div>
            <div className="text-center card-footer">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-primary"
              >
                {apiProgress ? <Spinner text="Ekleniyor..." /> : "Kontrol Ekle"}
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
