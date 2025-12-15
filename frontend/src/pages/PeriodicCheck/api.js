import axios from "axios";
export const createPeriodicCheck = async (periodicCheckData) => {
  const response = await axios.post("/api/periodic-checks", periodicCheckData);
  return response.data;
};
