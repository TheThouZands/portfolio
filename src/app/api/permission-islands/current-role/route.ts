import { NextResponse } from "next/server";

import { getCurrentRolePermissionPayload } from "@/auth/current-role-permission.server";

export const dynamic = "force-dynamic";

export async function GET() {
  const payload = await getCurrentRolePermissionPayload();

  if (!payload.visible) {
    return NextResponse.json(payload, {
      status: 401,
    });
  }

  return NextResponse.json(payload);
}
