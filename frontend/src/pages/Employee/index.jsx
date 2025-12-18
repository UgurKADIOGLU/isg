import React, { useState } from "react";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createEmployee } from "./api";

function Index() {
  const [adSoyad, setAdSoyad] = useState("");
  const [tcKimlik, setTcKimlik] = useState("");
  const [departman, setDepartman] = useState("");
  const [pozisyon, setPozisyon] = useState("");
  const [iseGirisTarihi, setIseGirisTarihi] = useState("");
  const [saglikRaporTarihi, setSaglikRaporTarihi] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isButtonEnabled =
    adSoyad &&
    tcKimlik &&
    departman &&
    pozisyon &&
    iseGirisTarihi &&
    !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");

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
            <div className="text-center card-header bg-success text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-person-plus me-2"></i>Çalışan Ekle
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="adSoyad"
                label="Ad Soyad"
                type="text"
                value={adSoyad}
                onChange={(e) => setAdSoyad(e.target.value)}
              />
              <Input
                id="tcKimlik"
                label="TC Kimlik"
                type="text"
                value={tcKimlik}
                onChange={(e) => setTcKimlik(e.target.value)}
              />
              <Input
                id="departman"
                label="Departman"
                type="text"
                value={departman}
                onChange={(e) => setDepartman(e.target.value)}
              />
              <Input
                id="pozisyon"
                label="Pozisyon"
                type="text"
                value={pozisyon}
                onChange={(e) => setPozisyon(e.target.value)}
              />
              <Input
                id="iseGirisTarihi"
                label="İşe Giriş Tarihi"
                type="date"
                value={iseGirisTarihi}
                onChange={(e) => setIseGirisTarihi(e.target.value)}
              />
              <Input
                id="saglikRaporTarihi"
                label="Sağlık Rapor Tarihi"
                type="date"
                value={saglikRaporTarihi}
                onChange={(e) => setSaglikRaporTarihi(e.target.value)}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-success btn-lg px-5"
              >
                {apiProgress ? <Spinner text="Ekleniyor..." /> : "Çalışan Ekle"}
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
