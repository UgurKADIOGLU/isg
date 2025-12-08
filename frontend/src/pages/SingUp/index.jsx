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
      const response = await axios.post(
        "http://localhost:8080/api/users/user",
        {
          username,
          email,
          password,
        }
      );
      console.log("Başarılı:", response.data);
      // Başarı durumunda yapılacak işlemler
    } catch (error) {
      console.error("Hata:", error.response?.data || error.message);
      // Hata durumunda yapılacak işlemler
    }
  };

  return (
    <>
      <h1>Kayıt Ol</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={!isButtonEnabled}>
          Kayıt Ol
        </button>
      </form>
    </>
  );
}

export default Index;
