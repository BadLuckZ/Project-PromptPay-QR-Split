import { headers, cookies } from "next/headers";

const ALLOWED_HOSTS = (process.env.ALLOWED_HOSTS ?? "")
  .split(",")
  .map((h) => h.trim())
  .filter(Boolean);

export async function fetch(path: string, init?: RequestInit) {
  const headersList = await headers();
  const cookieStore = await cookies();
  const host = headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");

  if (ALLOWED_HOSTS.length > 0 && (!host || !ALLOWED_HOSTS.includes(host))) {
    console.error("[fetch] rejected request with disallowed host header", host);
    throw new Error("Invalid host header");
  }

  return globalThis.fetch(`${protocol}://${host}${path}`, {
    ...init,
    headers: {
      cookie: cookieStore.toString(),
      ...init?.headers,
    },
  });
}
