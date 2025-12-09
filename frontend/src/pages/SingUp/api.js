import axios from "axios";

export const registerUser = async (userData) => {
  const response = await axios.post("/api/users/user", userData);
  return response.data;
};
