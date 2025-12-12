"use client";

import type { RouterClient } from "@orpc/server";
import type { AppRouter } from "@/server/router";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";

declare global {
    var $orpcClient: RouterClient<AppRouter> | undefined;
}

const link = new RPCLink({
    url: () => {
        if (typeof window === "undefined") {
            throw new Error("RPCLink is not allowed on the server side.");
        }
        return `${window.location.origin}/api/rpc`;
    },
});

export const orpcClient: RouterClient<AppRouter> =
    globalThis.$orpcClient ?? createORPCClient(link);

export const orpc = createTanstackQueryUtils(orpcClient);

