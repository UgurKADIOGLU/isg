import axios from "axios";

export const createAccident = async (accidentData) => {
  const response = await axios.post("/api/accidents", accidentData);
  return response.data;
};
