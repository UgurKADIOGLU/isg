import axios from "axios";

export const registerUser = async (userData) => {
  const response = await axios.post("/api/users", userData, {
    headers: {
      "Accept-Language": "en",
    },
  });
  return response.data;
};
