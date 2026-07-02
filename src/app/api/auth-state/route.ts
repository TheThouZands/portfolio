import { NextResponse } from "next/server";

import { getCurrentAuthAccount } from "@/auth/roles";
import type { AuthSessionSnapshot } from "@/auth/session-state";

export const dynamic = "force-dynamic";

export async function GET() {
  const account = await getCurrentAuthAccount();

  if (!account) {
    return NextResponse.json({
      status: "unauthenticated",
      user: null,
    } satisfies AuthSessionSnapshot);
  }

  return NextResponse.json({
    status: "authenticated",
    user: {
      id: account.id,
      name: account.name,
      role: account.role,
      username: account.username,
    },
  } satisfies AuthSessionSnapshot);
}
