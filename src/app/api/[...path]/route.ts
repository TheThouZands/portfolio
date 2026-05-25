// app/api/[...path]/route.ts

const BACKEND_ORIGIN = "http://ec2-3-12-186-10.us-east-2.compute.amazonaws.com:3000";

async function proxy(
    request: Request,
    context: { params: Promise<{ path: string[] }> }
) {
    const { path } = await context.params;

    const incomingUrl = new URL(request.url);
    const targetUrl = new URL(`${BACKEND_ORIGIN}/${path.join("/")}`);
    targetUrl.search = incomingUrl.search;

    console.log("Proxying request:", {
        method: request.method,
        from: incomingUrl.toString(),
        to: targetUrl.toString(),
    });

    try {
        const headers = new Headers(request.headers);
        headers.delete("host");

        const response = await fetch(targetUrl, {
            method: request.method,
            headers,
            body: ["GET", "HEAD"].includes(request.method)
                ? undefined
                : request.body,
            redirect: "manual",
            // @ts-expect-error required by Node fetch for streamed request bodies
            duplex: "half",
        });

        console.log("Backend response:", {
            status: response.status,
            statusText: response.statusText,
        });

        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers,
        });
    } catch (error) {
        console.error("Proxy failed:", error);

        return Response.json(
            {
                error: "Proxy failed",
                message: error instanceof Error ? error.message : String(error),
                target: targetUrl.toString(),
            },
            { status: 502 }
        );
    }
}

export {
    proxy as GET,
    proxy as POST,
    proxy as PUT,
    proxy as PATCH,
    proxy as DELETE,
    proxy as OPTIONS,
    proxy as HEAD,
};
