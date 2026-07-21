import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { canAccessClient, contextForRole, type Role } from "@/lib/auth/access";
import { getClient } from "@/lib/clients/data";
import { recordAuditEvent } from "@/lib/audit";

const roles: Role[] = ["admin", "registered_manager", "quality_lead", "finance_director", "credit_controller", "operations_director", "team_leader", "workforce_lead", "board", "auditor", "staff"];

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const cookieStore = await cookies();
  const candidate = cookieStore.get("muve_role")?.value;
  const role = roles.find((item) => item === candidate) ?? "registered_manager";
  const context = contextForRole(role);
  const client = getClient(id);

  // 404-before-403: existence and permission are deliberately indistinguishable.
  if (!client || !canAccessClient(context, id)) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await recordAuditEvent({
    actorId: context.actorId,
    eventType: "record.view",
    scope: { serviceIds: context.serviceScopes, clientIds: [id] },
    targetId: id,
    correlationId: crypto.randomUUID(),
  });
  return NextResponse.json(client);
}
