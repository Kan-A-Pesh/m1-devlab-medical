import { listEmployees } from "./queries/list-employees";
import { getEmployee } from "./queries/get-employee";
import { getMyProfile } from "./queries/get-my-profile";
import { createEmployee } from "./mutations/create-employee";
import { updateEmployee } from "./mutations/update-employee";
import { deleteEmployee } from "./mutations/delete-employee";

export const employeeRouter = {
  list: listEmployees,
  get: getEmployee,
  getMyProfile,
  create: createEmployee,
  update: updateEmployee,
  delete: deleteEmployee,
};

