import { ORPCError, os } from "@orpc/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const publicProcedure = os.$context<{
    headers: Headers;
}>();

export const authenticatedProcedure = publicProcedure.use(
    async ({ context, next }) => {
        const session = await auth.api.getSession({
            headers: context.headers,
        });

        if (!session?.user) {
            throw new ORPCError("UNAUTHORIZED", {
                message: "You must be logged in to perform this action",
            });
        }

        return next({
            context: {
                user: session.user,
                session: session.session,
            },
        });
    }
);

