import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { Topbar } from "@/components/Topbar";
import { BillDashboard } from "@/components/bills";
import { fetch } from "@/lib/fetch";
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

  const [res, profileRes] = await Promise.all([
    fetch(`/api/v1/bills/${id}`, { cache: "no-store" }),
    fetch("/api/v1/users/me", { cache: "no-store" }),
  ]);

  if (!res.ok) {
    notFound();
  }

  const { bill, members } = (await res.json()) as {
    bill: Bill;
    members: Member[];
  };

  const profile: User | null = profileRes.ok ? await profileRes.json() : null;

  return (
    <div className="flex flex-col flex-1">
      <Topbar
        title={bill.bill_name}
        subtitle={bill.closed_at ? "ปิดแล้ว" : "เปิดอยู่"}
        backHref="/bills"
        profileName={profile?.display_name}
      />
      <BillDashboard bill={bill} members={members} origin={origin} />
    </div>
  );
}
