import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/sign-in", "/api/health", "/api/auth/session"];

const routeRoles: Array<{ prefix: string; roles: string[] }> = [
  { prefix: "/finance", roles: ["admin", "finance_director", "credit_controller", "board"] },
  { prefix: "/workforce", roles: ["admin", "registered_manager", "operations_director", "team_leader", "workforce_lead"] },
  { prefix: "/security-audit", roles: ["admin", "quality_lead", "auditor"] },
  { prefix: "/integration-health", roles: ["admin"] },
  { prefix: "/delivery-readiness", roles: ["admin"] },
];

// Next.js 16 Proxy is the middleware-gated authentication boundary.
export function proxy(request: NextRequest) {
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) return NextResponse.next();

  const authRequired = process.env.AUTH_REQUIRED === "true";
  const expectedToken = process.env.MUVE_SESSION_TOKEN;
  const sessionToken = request.cookies.get("muve_session")?.value;
  const role = request.cookies.get("muve_role")?.value ?? "registered_manager";

  if (authRequired && (!expectedToken || sessionToken !== expectedToken)) {
    const signIn = new URL("/sign-in", request.url);
    signIn.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }

  const restriction = routeRoles.find(({ prefix }) => request.nextUrl.pathname.startsWith(prefix));
  if (authRequired && restriction && !restriction.roles.includes(role)) {
    return new NextResponse("Not found", { status: 404 });
  }

  const headers = new Headers(request.headers);
  headers.set("x-muve-role", role);
  headers.set("x-muve-scope", "rose-house,oak-view,north-supported-living");
  headers.set("x-muve-auth-mode", authRequired ? "session" : "public-demo");
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
