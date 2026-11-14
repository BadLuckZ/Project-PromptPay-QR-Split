import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { BillDashboard } from "@/components/bills";
import { fetch } from "@/lib/fetch";
import { ENV } from "@/lib/env";
import { Bill, Member } from "@/types";

interface BillDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function BillDetailPage({ params }: BillDetailPageProps) {
  const { id } = await params;

  const headersList = await headers();
  const host = headersList.get("host");
  const protocol =
    headersList.get("x-forwarded-proto") ??
    (ENV.NODE_ENV === "development" ? "http" : "https");
  const origin = `${protocol}://${host}`;

  const res = await fetch(`/api/v1/bills/${id}`, { cache: "no-store" });

  if (!res.ok) {
    notFound();
  }

  const { bill, members } = (await res.json()) as {
    bill: Bill;
    members: Member[];
  };

  return <BillDashboard bill={bill} members={members} origin={origin} />;
}
