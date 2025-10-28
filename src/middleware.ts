import { NextResponse, NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");
  const pathname = request.nextUrl.pathname;

  // Unauthenticated → redirect to login (only if not already on "/")
  if (!token && pathname !== "/") {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Authenticated → redirect to dashboard (only if on "/")
  if (token && pathname === "/") {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
