import { Bill } from "@/types";

interface BillCardProps {
  bill: Bill;
}

export function BillCard({ bill }: BillCardProps) {
  return (
    <div>
      <p>{bill.bill_name}</p>
      <p>{bill.promptpay_number}</p>
      <hr />
    </div>
  );
}
