import { headers } from "next/headers";
import { NextResponse } from "next/server";

import { auth } from "@/auth/server";
import type { AuthSessionSnapshot } from "@/auth/session-state";

export const dynamic = "force-dynamic";

export async function GET() {
  const currentSession = await auth.api.getSession({
    headers: await headers(),
    query: {
      disableCookieCache: true,
    },
  });

  if (!currentSession) {
    return NextResponse.json({
      status: "unauthenticated",
      user: null,
    } satisfies AuthSessionSnapshot);
  }

  return NextResponse.json({
    status: "authenticated",
    user: {
      id: currentSession.user.id,
      name: currentSession.user.name,
      username: currentSession.user.name,
    },
  } satisfies AuthSessionSnapshot);
}
