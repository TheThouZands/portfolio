const workspaceUuid = "cc82cf57-71f8-4966-9ea5-adbe4483cf6b";

export const dynamic = "force-dynamic";

export function GET() {
  if (process.env.NODE_ENV !== "development") {
    return new Response(null, { status: 404 });
  }

  return Response.json(
    {
      workspace: {
        root: process.env.CHROME_DEVTOOLS_WORKSPACE_ROOT ?? process.cwd(),
        uuid: process.env.CHROME_DEVTOOLS_WORKSPACE_UUID ?? workspaceUuid,
      },
    },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
