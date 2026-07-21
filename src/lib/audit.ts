import { db } from "@/db/client";
import { auditEvents } from "@/db/schema";

export type AuditEvent = {
  actorId: string;
  eventType: "record.view" | "ai.query" | "export.created" | "action.updated";
  scope: { serviceIds: string[]; clientIds: string[] };
  targetId?: string;
  correlationId: string;
};

/** Audit rows are append-only: this module intentionally exposes no update or delete operation. */
export async function recordAuditEvent(event: AuditEvent) {
  if (!db) return { persisted: false, reason: "demo-mode" as const };
  await db.insert(auditEvents).values({
    ...event,
    correlationId: event.correlationId,
  });
  return { persisted: true };
}
