import { getMyCompany } from "./queries/get-my-company";
import { createCompany } from "./mutations/create-company";
import { updateCompany } from "./mutations/update-company";

export const clientCompanyRouter = {
  getMyCompany,
  create: createCompany,
  update: updateCompany,
};

