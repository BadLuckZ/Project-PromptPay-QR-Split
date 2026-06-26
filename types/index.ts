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
  created_at: string;
  deleted_at: string | null;
}
