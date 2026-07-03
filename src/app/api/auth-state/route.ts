import { NextResponse } from "next/server";

import { getCurrentAuthSessionSnapshot } from "@/auth/session-state.server";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json(await getCurrentAuthSessionSnapshot());
}
