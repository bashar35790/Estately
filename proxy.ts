import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authClient } from "@/app/lib/auth-client";

/**
 * Middleware function to protect dashboard routes.
 * Redirects unauthenticated users to the login page.
 */
export async function proxy(request: NextRequest) {
  // Better Auth provides a fetch call to determine the session in middleware
  const { data: session } = await authClient.getSession({
    fetchOptions: {
      headers: request.headers,
    },
  });

  if (!session) {
    // Prevent infinite redirect if the user is already on the login page (not strictly needed for this matcher)
    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  return NextResponse.next();
}

/**
 * Configuration for the middleware matcher.
 * Protects all routes starting with /dashboard.
 */
export const config = {
  matcher: ["/dashboard/:path*"],
};
