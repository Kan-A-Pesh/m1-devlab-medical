import { RPCHandler } from "@orpc/server/fetch";
import { onError } from "@orpc/server";
import { appRouter } from "@/server/router";

const handler = new RPCHandler(appRouter, {
    interceptors: [
        onError((error) => {
            console.error("[oRPC Error]:", error);
        }),
    ],
});

async function handleRequest(request: Request) {
    const url = new URL(request.url);
    const { matched, response } = await handler.handle(request, {
        prefix: "/api/rpc",
        context: {
            headers: request.headers,
        },
    });

    if (matched) {
        return response;
    }

    return new Response(`Not found: ${url.pathname}`, { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;

