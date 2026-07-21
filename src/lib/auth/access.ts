export type Role =
  | "admin"
  | "registered_manager"
  | "quality_lead"
  | "finance_director"
  | "credit_controller"
  | "operations_director"
  | "team_leader"
  | "workforce_lead"
  | "board"
  | "auditor"
  | "staff";

export type Capability =
  | "view:today"
  | "view:clients"
  | "view:quality"
  | "view:operations"
  | "view:workforce"
  | "view:finance"
  | "view:audit"
  | "manage:actions"
  | "manage:platform"
  | "use:ai"
  | "export:evidence";

const allCapabilities: Capability[] = [
  "view:today", "view:clients", "view:quality", "view:operations", "view:workforce",
  "view:finance", "view:audit", "manage:actions", "manage:platform", "use:ai", "export:evidence",
];

const roleCapabilities: Record<Role, ReadonlySet<Capability>> = {
  admin: new Set(allCapabilities),
  registered_manager: new Set(["view:today", "view:clients", "view:quality", "view:operations", "view:workforce", "manage:actions", "use:ai", "export:evidence"]),
  quality_lead: new Set(["view:today", "view:clients", "view:quality", "view:operations", "view:audit", "manage:actions", "use:ai", "export:evidence"]),
  finance_director: new Set(["view:today", "view:finance", "use:ai", "export:evidence"]),
  credit_controller: new Set(["view:finance", "manage:actions", "use:ai"]),
  operations_director: new Set(["view:today", "view:clients", "view:operations", "view:workforce", "manage:actions", "use:ai"]),
  team_leader: new Set(["view:today", "view:clients", "view:operations", "view:workforce", "manage:actions"]),
  workforce_lead: new Set(["view:today", "view:workforce", "manage:actions", "export:evidence"]),
  board: new Set(["view:today", "view:quality", "view:finance", "use:ai", "export:evidence"]),
  auditor: new Set(["view:quality", "view:audit", "export:evidence"]),
  staff: new Set(["view:today", "view:clients"]),
};

export type AccessContext = {
  actorId: string;
  role: Role;
  organisationScopes: string[];
  serviceScopes: string[];
  clientScopes: string[];
};

export const demoAccess: AccessContext = {
  actorId: "demo-registered-manager",
  role: "registered_manager",
  organisationScopes: ["muve-demo"],
  serviceScopes: ["rose-house", "oak-view", "north-supported-living"],
  clientScopes: ["RH-014", "OV-003", "NSL-008"],
};

export function can(context: AccessContext, capability: Capability) {
  return roleCapabilities[context.role].has(capability);
}

export function canAccessClient(context: AccessContext, clientId: string) {
  return context.role === "admin" || context.clientScopes.includes(clientId);
}

export function contextForRole(role: Role): AccessContext {
  const scoped = role === "admin" || role === "registered_manager" || role === "quality_lead" || role === "operations_director" || role === "team_leader" || role === "staff";
  return {
    actorId: `demo-${role}`,
    role,
    organisationScopes: ["muve-demo"],
    serviceScopes: scoped ? demoAccess.serviceScopes : [],
    clientScopes: scoped ? demoAccess.clientScopes : [],
  };
}
