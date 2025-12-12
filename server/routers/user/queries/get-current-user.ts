import { eq } from "drizzle-orm";
import { authenticatedProcedure } from "@/server/middleware/auth";
import { database } from "@/db";
import { employeesTable } from "@/db/schema";

export const getCurrentUser = authenticatedProcedure.handler(
    async ({ context }) => {
        const employee = await database.query.employeesTable.findFirst({
            where: eq(employeesTable.userId, context.user.id),
            with: {
                clientCompany: true,
            },
        });

        return {
            user: context.user,
            session: context.session,
            employee,
            clientCompany: employee?.clientCompany ?? null,
        };
    }
);

