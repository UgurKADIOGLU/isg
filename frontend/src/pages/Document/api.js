import axios from "axios";

export const createDocument = async (documentData) => {
  const response = await axios.post("/api/documents", documentData);
  return response.data;
};
