import { Bill } from "@/types";

export function BillCard({ bill }: { bill: Bill }) {
  return (
    <div>
      <p>{bill.bill_name}</p>
      <p>{bill.promptpay_number}</p>
      <hr />
    </div>
  );
}
