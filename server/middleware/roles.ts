import { ORPCError } from "@orpc/server";
import { eq } from "drizzle-orm";
import { authenticatedProcedure } from "./auth";
import { database } from "@/db";
import { employeesTable, clientCompaniesTable, medicalCompaniesTable } from "@/db/schema";

export const medicalStaffProcedure = authenticatedProcedure.use(
    async ({ context, next }) => {
        const employee = await database.query.employeesTable.findFirst({
            where: eq(employeesTable.userId, context.user.id),
            with: {
                clientCompany: true,
            },
        });

        if (!employee) {
            throw new ORPCError("FORBIDDEN", {
                message: "You are not associated with any organization",
            });
        }

        if (employee.role !== "medical_staff" && employee.role !== "admin") {
            throw new ORPCError("FORBIDDEN", {
                message: "You must be a medical staff member to access this resource",
            });
        }

        const medicalCompany = employee.clientCompany?.medicalCompanyId
            ? await database.query.medicalCompaniesTable.findFirst({
                  where: eq(medicalCompaniesTable.id, employee.clientCompany.medicalCompanyId),
              })
            : null;

        return next({
            context: {
                employee,
                medicalCompany,
            },
        });
    }
);

export const companyAdminProcedure = authenticatedProcedure.use(
    async ({ context, next }) => {
        const employee = await database.query.employeesTable.findFirst({
            where: eq(employeesTable.userId, context.user.id),
            with: {
                clientCompany: true,
            },
        });

        if (!employee) {
            throw new ORPCError("FORBIDDEN", {
                message: "You are not associated with any company",
            });
        }

        if (employee.role !== "company_admin" && employee.role !== "admin") {
            throw new ORPCError("FORBIDDEN", {
                message: "You must be a company admin to access this resource",
            });
        }

        return next({
            context: {
                employee,
                clientCompany: employee.clientCompany,
            },
        });
    }
);

export const employeeProcedure = authenticatedProcedure.use(
    async ({ context, next }) => {
        const employee = await database.query.employeesTable.findFirst({
            where: eq(employeesTable.userId, context.user.id),
            with: {
                clientCompany: true,
            },
        });

        if (!employee) {
            throw new ORPCError("FORBIDDEN", {
                message: "You are not registered as an employee",
            });
        }

        return next({
            context: {
                employee,
                clientCompany: employee.clientCompany,
            },
        });
    }
);

