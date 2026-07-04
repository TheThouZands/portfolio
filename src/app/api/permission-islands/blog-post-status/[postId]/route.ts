import { NextResponse } from "next/server";

import { getBlogPostStatusPermissionPayload } from "@/auth/blog-post-status-permission.server";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{
    postId: string;
  }>;
};

export async function GET(_request: Request, { params }: RouteContext) {
  const { postId: postIdParam } = await params;
  const postId = Number.parseInt(postIdParam, 10);

  if (!Number.isSafeInteger(postId) || postId <= 0) {
    return NextResponse.json(
      {
        visible: false,
      },
      {
        status: 404,
      },
    );
  }

  const payload = await getBlogPostStatusPermissionPayload(postId);

  if (!payload.visible) {
    return NextResponse.json(payload, {
      status: 403,
    });
  }

  return NextResponse.json(payload);
}
