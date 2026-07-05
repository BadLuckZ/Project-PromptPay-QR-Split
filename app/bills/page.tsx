import { headers, cookies } from "next/headers";
import { BillList } from "@/components/bills";
import { Topbar } from "@/components/Topbar";
import { Bill } from "@/types";

export default async function BillsPage() {
  async function getBills(): Promise<Bill[]> {
    const headersList = await headers();
    const cookieStore = await cookies();
    const host = headersList.get("host");
    const protocol =
      headersList.get("x-forwarded-proto") ??
      (process.env.NODE_ENV === "development" ? "http" : "https");

    const res = await fetch(`${protocol}://${host}/api/v1/bills`, {
      headers: { cookie: cookieStore.toString() },
      cache: "no-store",
    });

    if (!res.ok) return [];
    return res.json();
  }

  const bills = await getBills();

  return (
    <div className="flex flex-col flex-1">
      <Topbar title="Bill ของฉัน" subtitle={`${bills.length} รายการ`} />
      <BillList bills={bills} />
    </div>
  );
}
