import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authSession = request.cookies.get("auth_session")?.value;

  if (authSession && !request.nextUrl.pathname.startsWith("/dashboard")) {
    return Response.redirect(new URL("/dashboard", request.url));
  }

  if (!authSession && !request.nextUrl.pathname.startsWith("/login")) {
    return Response.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
