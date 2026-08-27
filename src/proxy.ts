import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

/**
 * Next.js RBAC Routing Proxy & Middleware Handler
 */
export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  // Protect dashboard routes if unauthenticated (can be customized/uncommented when auth enforcement is enabled)
  /*
  if (!token && (pathname.startsWith("/supplier") || pathname.startsWith("/service") || pathname.startsWith("/admin"))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", encodeURIComponent(pathname));
    return NextResponse.redirect(loginUrl);
  }
  */

  return NextResponse.next();
}

export const config = {
  matcher: ["/supplier/:path*", "/service/:path*", "/admin/:path*"],
};

export default proxy;
