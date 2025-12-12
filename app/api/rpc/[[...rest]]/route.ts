import { RPCHandler } from "@orpc/server/fetch";
import { appRouter } from "@/server/router";

const handler = new RPCHandler(appRouter);

async function handleRequest(request: Request) {
    const url = new URL(request.url);
    const { response } = await handler.handle(request, {
        prefix: "/api/rpc",
        context: {
            headers: request.headers,
        },
    });

    return response ?? new Response(`Not found: ${url.pathname}`, { status: 404 });
}

export const GET = handleRequest;
export const POST = handleRequest;

