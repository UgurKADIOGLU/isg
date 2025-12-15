import React, { useState } from "react";
import InputField from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { registerUser } from "./api";

function Index() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const isButtonEnabled =
    password && passwordRepeat && password === passwordRepeat && !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");

    try {
      const response = await registerUser({
        username,
        email,
        password,
      });
      setSuccessMessage(response.message);
      // Başarı durumunda yapılacak işlemler
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      // Hata durumunda yapılacak işlemler
    } finally {
      setApiProgress(false);
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-6 offset-lg-3">
          <form className="card shadow-lg border-0" onSubmit={handleSubmit}>
            <div className="text-center card-header bg-dark text-white py-4">
              <h1 className="mb-0">
                <i className="bi bi-person-add me-2"></i>Kayıt Ol
              </h1>
            </div>
            <div className="card-body p-4">
              <InputField
                id="username"
                label="İsim"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <InputField
                id="email"
                label="E-posta"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                id="password"
                label="Şifre"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <InputField
                id="passwordRepeat"
                label="Şifreyi Tekrarlayınız"
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-dark btn-lg px-5"
              >
                {apiProgress ? <Spinner text="Yükleniyor..." /> : "Kayıt Ol"}
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
