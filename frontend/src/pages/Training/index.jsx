import React, { useState, useEffect } from "react";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { createTraining } from "./api";

function Index() {
  const [egitimAdi, setEgitimAdi] = useState("");
  const [egitmen, setEgitmen] = useState("");
  const [tarih, setTarih] = useState("");
  const [sertifikaVerildi, setSertifikaVerildi] = useState(false);
  const [katilimcilar, setKatilimcilar] = useState([]);
  //const [employees, setEmployees] = useState([]);
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {};

  const isButtonEnabled = egitimAdi && egitmen && tarih && !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await createTraining({
        egitimAdi,
        egitmen,
        tarih,
        sertifikaVerildi,
        katilimcilarIds: katilimcilar,
      });
      setSuccessMessage(response.message);
      // Formu temizle
      setEgitimAdi("");
      setEgitmen("");
      setTarih("");
      setSertifikaVerildi(false);
      setKatilimcilar([]);
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
            <div className="text-center card-header bg-primary text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-book me-2"></i>Eğitim Ekle
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="egitimAdi"
                label="Eğitim Adı"
                type="text"
                value={egitimAdi}
                onChange={(e) => setEgitimAdi(e.target.value)}
              />
              <Input
                id="egitmen"
                label="Eğitmen"
                type="text"
                value={egitmen}
                onChange={(e) => setEgitmen(e.target.value)}
              />
              <Input
                id="tarih"
                label="Tarih"
                type="date"
                value={tarih}
                onChange={(e) => setTarih(e.target.value)}
              />
              <div className="mb-3">
                <div className="form-check">
                  <input
                    id="sertifikaVerildi"
                    type="checkbox"
                    className="form-check-input"
                    checked={sertifikaVerildi}
                    onChange={(e) => setSertifikaVerildi(e.target.checked)}
                  />
                  <label
                    htmlFor="sertifikaVerildi"
                    className="form-check-label"
                  >
                    Sertifika Verildi
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Katılımcılar</label>

                <small className="text-muted">
                  Seçilen: {katilimcilar.length} kişi
                </small>
              </div>
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-primary btn-lg px-5"
              >
                {apiProgress ? <Spinner text="Ekleniyor..." /> : "Eğitimi Ekle"}
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
