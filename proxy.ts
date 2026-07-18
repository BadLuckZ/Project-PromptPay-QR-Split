import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

// Session stored for 7 days
const SOFT_SESSION_TIMEOUT_MS = 7 * 24 * 60 * 60 * 1000;

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Send cookie's keys from browser request to server
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );

          // Send **refreshed** cookie's keys from server to browser
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let authenticated = !!user;

  // Auto log out
  if (user?.last_sign_in_at) {
    const lastSignInAt = new Date(user.last_sign_in_at).getTime();
    if (Date.now() - lastSignInAt > SOFT_SESSION_TIMEOUT_MS) {
      await supabase.auth.signOut();
      authenticated = false;
    }
  }

  // let only web request go to /login
  // let API request still returns their status (not /login API status)
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");
  if (!authenticated && !isApiRoute && request.nextUrl.pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|auth|pay|fonts|.*\\.(?:svg|png|jpg|jpeg|gif|webp|woff2?|ico)$).*)",
  ],
};
