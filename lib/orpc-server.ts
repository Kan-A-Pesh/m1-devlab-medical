import "server-only";

import type { RouterClient } from "@orpc/server";
import type { AppRouter } from "@/server/router";
import { headers } from "next/headers";
import { createRouterClient } from "@orpc/server";
import { appRouter } from "@/server/router";

declare global {
    var $orpcClient: RouterClient<AppRouter> | undefined;
}

globalThis.$orpcClient = createRouterClient(appRouter, {
    context: async () => ({
        headers: await headers(),
    }),
});

