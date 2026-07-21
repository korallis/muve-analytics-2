import { NextResponse, type NextRequest } from "next/server";

const publicPaths = ["/sign-in", "/api/health"];

// Next.js 16 Proxy is the middleware-gated authentication boundary.
export function proxy(request: NextRequest) {
  if (publicPaths.some((path) => request.nextUrl.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const authRequired = process.env.AUTH_REQUIRED === "true";
  const expectedToken = process.env.MUVE_SESSION_TOKEN;
  const sessionToken = request.cookies.get("muve_session")?.value;

  if (authRequired && (!expectedToken || sessionToken !== expectedToken)) {
    const signIn = new URL("/sign-in", request.url);
    signIn.searchParams.set("callbackUrl", request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }

  const headers = new Headers(request.headers);
  headers.set("x-muve-role", "registered_manager");
  headers.set("x-muve-scope", "rose-house,oak-view,north-supported-living");
  headers.set("x-muve-auth-mode", authRequired ? "session" : "public-demo");
  return NextResponse.next({ request: { headers } });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
