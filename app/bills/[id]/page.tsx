import { cookies, headers } from "next/headers";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/Topbar";
import { BillDashboard } from "@/components/bills";
import { fetch as fetchWithCookies } from "@/lib/fetch";
import { Bill, Member, User } from "@/types";

interface BillDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (process.env.NODE_ENV === "development" ? "http" : "https");
  const origin = `${protocol}://${host}`;

  const cookieStore = await cookies();
  const res = await fetch(`${origin}/api/v1/bills/${id}`, {
    headers: { cookie: cookieStore.toString() },
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  const { bill, members } = (await res.json()) as {
    bill: Bill;
    members: Member[];
  };

  const profileRes = await fetchWithCookies("/api/v1/users/me", {
    cache: "no-store",
  });
  const profile: User | null = profileRes.ok ? await profileRes.json() : null;

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title={bill.bill_name}
        backHref="/bills"
        profileName={profile?.display_name}
      />
      <BillDashboard bill={bill} members={members} origin={origin} />
    </div>
  );
}
