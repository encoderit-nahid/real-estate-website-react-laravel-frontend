// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.JWT_SECRET });

  const publicPaths = [
    "/",
    "/advertise",
    "/broker",
    "/search-real-estate",
    "/other-information",
    "/registration",
    "/reset-password",
    "/auth/facebook/callback",
    "/auth/google/callback",
    "/user-loading",
  ];

  const requestPath = req.nextUrl.pathname;
  console.log({ requestPath });
  const isPublicPath =
    publicPaths.includes(requestPath) ||
    requestPath.startsWith("/property-view");

  console.log({ isPublicPath });

  if (isPublicPath || token) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/api/auth/signin", req.url));
}

export const config = {
  matcher: [
    "/((?!api/auth|_next/static|_next/image|favicon.ico|advertise|broker|search-real-estate|other-information|registration|reset-password|auth/facebook/callback|auth/google/callback).*)",
  ],
};
