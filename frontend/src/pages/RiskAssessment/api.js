import axios from "axios";

export const createRiskAssessment = async (riskAssessmentData) => {
  const response = await axios.post(
    "/api/risk-assessments",
    riskAssessmentData
  );
  return response.data;
};
