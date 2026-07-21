import { NextResponse } from "next/server";
import { z } from "zod";

const roleSchema = z.enum([
  "admin", "registered_manager", "quality_lead", "finance_director", "credit_controller",
  "operations_director", "team_leader", "workforce_lead", "board", "auditor", "staff",
]);
const requestSchema = z.object({ role: roleSchema });

export async function POST(request: Request) {
  const parsed = requestSchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "Invalid role" }, { status: 400 });

  const response = NextResponse.json({ signedIn: true, role: parsed.data.role });
  response.cookies.set("muve_session", process.env.MUVE_SESSION_TOKEN ?? "fixture-session", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  response.cookies.set("muve_role", parsed.data.role, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60,
  });
  return response;
}
