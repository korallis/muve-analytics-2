export type Role = "admin" | "registered_manager" | "quality_lead" | "finance" | "staff";
export type Capability = "view:quality" | "view:finance" | "manage:actions" | "use:ai" | "export:evidence";

const roleCapabilities: Record<Role, ReadonlySet<Capability>> = {
  admin: new Set(["view:quality", "view:finance", "manage:actions", "use:ai", "export:evidence"]),
  registered_manager: new Set(["view:quality", "manage:actions", "use:ai", "export:evidence"]),
  quality_lead: new Set(["view:quality", "manage:actions", "use:ai", "export:evidence"]),
  finance: new Set(["view:finance", "use:ai"]),
  staff: new Set(["view:quality"]),
};

export type AccessContext = {
  actorId: string;
  role: Role;
  serviceScopes: string[];
  clientScopes: string[];
};

export const demoAccess: AccessContext = {
  actorId: "demo-registered-manager",
  role: "registered_manager",
  serviceScopes: ["rose-house", "oak-view", "north-supported-living"],
  clientScopes: ["RH-014", "OV-003", "NSL-008"],
};

export function can(context: AccessContext, capability: Capability) {
  return roleCapabilities[context.role].has(capability);
}

export function canAccessClient(context: AccessContext, clientId: string) {
  return context.role === "admin" || context.clientScopes.includes(clientId);
}
