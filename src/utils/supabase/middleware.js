import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function updateSession(request) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

  const isDev = process.env.NODE_ENV === "development";

  const cspHeader = `
    default-src 'self';
    script-src 'self' 'nonce-${nonce}' ${
    isDev ? "'unsafe-eval'" : ""
  } https://hcaptcha.com https://*.hcaptcha.com https://vercel.live;
    style-src 'self' 'nonce-${nonce}' ${
    isDev ? "'unsafe-inline'" : ""
  } https://hcaptcha.com https://*.hcaptcha.com;
    style-src-attr 'unsafe-inline';
    img-src 'self' blob: data:;
    font-src 'self';
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'none';
    frame-src 'self' https://hcaptcha.com https://*.hcaptcha.com;
    connect-src 'self' https://hcaptcha.com https://*.hcaptcha.com https://vercel.live ${supabaseUrl};
    upgrade-insecure-requests;
`;

  const contentSecurityPolicyHeaderValue = cspHeader
    .replace(/\s{2,}/g, " ")
    .trim();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);

  requestHeaders.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;

  const publicApiRoutes = [
    "/api/login",
    "/api/logout",
    "/api/verify-certificate",
    "/api/webhooks/alchemy",
  ];

  if (path.startsWith("/api")) {
    const isPublicApiRoute = publicApiRoutes.some((route) =>
      path.startsWith(route)
    );
    if (!isPublicApiRoute && !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  if (user && request.nextUrl.pathname === "/login") {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (!user && request.nextUrl.pathname.startsWith("/dashboard")) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  supabaseResponse.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicyHeaderValue
  );

  return supabaseResponse;
}
