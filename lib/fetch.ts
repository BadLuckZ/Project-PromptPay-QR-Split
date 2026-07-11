import { headers, cookies } from "next/headers";

export async function fetch(path: string, init?: RequestInit) {
  const headersList = await headers();
  const cookieStore = await cookies();
  const host = headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");

  return globalThis.fetch(`${protocol}://${host}${path}`, {
    ...init,
    headers: {
      cookie: cookieStore.toString(),
      ...init?.headers,
    },
  });
}
