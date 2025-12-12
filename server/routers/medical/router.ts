import { getMedicalDashboard } from "./queries/get-dashboard";
import { listClientCompanies } from "./queries/list-client-companies";
import { getClientCompany } from "./queries/get-client-company";
import { getClientEmployee } from "./queries/get-client-employee";

export const medicalRouter = {
  getDashboard: getMedicalDashboard,
  listClientCompanies,
  getClientCompany,
  getClientEmployee,
};

