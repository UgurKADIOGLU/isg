import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Input from "../../components/InputField/InputField";
import Spinner from "../../components/Spinner";
import Alert from "../../components/Alert";
import { registerUser } from "./api";

function Index() {
  const { t } = useTranslation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    setValidationErrors((prev) => ({ ...prev, username: "" }));
  }, [username]);

  useEffect(() => {
    setValidationErrors((prev) => ({ ...prev, email: "" }));
  }, [email]);

  useEffect(() => {
    setValidationErrors((prev) => ({ ...prev, password: "" }));
  }, [password]);

  useEffect(() => {
    setValidationErrors((prev) => ({ ...prev, passwordRepeat: "" }));
  }, [passwordRepeat]);

  // const isButtonEnabled =
  // password && passwordRepeat && password === passwordRepeat && !apiProgress;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiProgress(true);
    setSuccessMessage("");
    setValidationErrors({});
    setError("");

    try {
      const response = await registerUser({
        username,
        email,
        password,
      });
      setSuccessMessage(response.message);
      // Başarı durumunda yapılacak işlemler
    } catch (error) {
      setValidationErrors(error.response?.data?.validationErrors || {});
      if (error.response?.data?.status === 502) {
        setError(error.response?.data?.message);
      }

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
                <i className="bi bi-person-add me-2"></i>
                {t("singUp")}
              </h1>
            </div>
            <div className="card-body p-4">
              <Input
                id="username"
                label={t("name")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                error={validationErrors.username}
              />
              <Input
                id="email"
                label={t("email")}
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={validationErrors.email}
              />
              <Input
                id="password"
                label={t("password")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={validationErrors.password}
              />
              <Input
                id="passwordRepeat"
                label={t("repeatPassword")}
                type="password"
                value={passwordRepeat}
                onChange={(e) => setPasswordRepeat(e.target.value)}
                error={
                  passwordRepeat && password !== passwordRepeat
                    ? t("passwordMismatch")
                    : ""
                }
              />
            </div>
            <div className="text-center card-footer bg-light py-4">
              <button
                type="submit"
                // disabled={!isButtonEnabled}
                className="btn btn-dark btn-lg px-5"
              >
                {apiProgress ? <Spinner text={t("loading")} /> : t("singUp")}
              </button>
              {successMessage && (
                <div className="mt-3">
                  <Alert message={successMessage} type="success" />
                </div>
              )}
              {error && (
                <div className="mt-3">
                  <Alert message={error} type="danger" />
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
