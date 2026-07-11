export interface User {
  id: string;
  display_name: string;
  promptpay_number: string;
  created_at: string;
}

export interface Bill {
  id: string;
  user_id: string;
  bill_name: string;
  owner_name: string;
  promptpay_number: string;
  memberCount: number;
  paidCount: number;
  totalAmount: number;
  created_at: string;
  deleted_at: string | null;
  closed_at: string | null;
}

export interface Member {
  id: string;
  bill_id: string;
  member_name: string;
  amount: number;
  is_paid: boolean;
  created_at: string;
}

export interface MemberQRView {
  member_name: string;
  amount: number;
  bill_name: string;
  owner_name: string;
  promptpay_number: string;
  deleted_at: string | null;
}
