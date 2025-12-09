import axios from "axios";
export const createPeriodicCheck = async (periodicCheckData) => {
  const response = await axios.post("/periodic-checks", periodicCheckData);
  return response.data;
};
