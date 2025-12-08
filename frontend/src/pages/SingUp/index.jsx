import React, { useState } from "react";
import axios from "axios";
import InputField from "../../components/InputField/InputField";

function Index() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const isButtonEnabled =
    password && passwordRepeat && password === passwordRepeat;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/users/user", {
        username,
        email,
        password,
      });
      console.log("Başarılı:", response.data.message);
      // Başarı durumunda yapılacak işlemler
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      // Hata durumunda yapılacak işlemler
    }
  };

  return (
    <>
      <div className="container">
        <div className="col-lg-6 offset-lg-3">
          <form className="card" onSubmit={handleSubmit}>
            <div className="text-center card-header">
              <h1>Kayıt Ol</h1>
            </div>
            <div className="card-body">
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
            <div className="text-center card-footer">
              <button
                type="submit"
                disabled={!isButtonEnabled}
                className="btn btn-primary"
              >
                Kayıt Ol
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Index;
