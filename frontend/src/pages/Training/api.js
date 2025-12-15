import axios from "axios";

export const createTraining = async (trainingData) => {
  const response = await axios.post("/api/trainings", trainingData);
  return response.data;
};

export const getEmployees = async () => {
  const response = await axios.get("/employees");
  return response.data;
};
