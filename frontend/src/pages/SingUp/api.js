import axios from "axios";
import i18next from "i18next";

export const registerUser = async (userData) => {
  const response = await axios.post("/api/users", userData, {
    headers: {
      "Accept-Language": i18next.language,
    },
  });
  return response.data;
};
