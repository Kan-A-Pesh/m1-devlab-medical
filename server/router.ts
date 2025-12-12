import { userRouter } from "./routers/user/router";

export const appRouter = {
    user: userRouter,
};

export type AppRouter = typeof appRouter;

