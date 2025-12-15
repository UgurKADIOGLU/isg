import axios from "axios";

export const createEmployee = async (employeeData) => {
  const response = await axios.post("/api/employees", employeeData);
  return response.data;
};
