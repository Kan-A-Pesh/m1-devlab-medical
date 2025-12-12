import { listMedicalCompanies } from "./queries/list-medical-companies";
import { getMedicalCompany } from "./queries/get-medical-company";
import { createMedicalCompany } from "./mutations/create-medical-company";

export const medicalCompanyRouter = {
  list: listMedicalCompanies,
  get: getMedicalCompany,
  create: createMedicalCompany,
};

