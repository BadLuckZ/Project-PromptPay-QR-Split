-- get_member_payment_info ไม่ได้คืนค่า is_paid ทำให้ member ที่ถูก mark จ่ายแล้ว ยังเปิดหน้า QR Code ได้อยู่

DROP FUNCTION IF EXISTS get_member_payment_info(UUID);
CREATE FUNCTION get_member_payment_info(p_member_id UUID)
RETURNS TABLE (
  member_name VARCHAR(100),
  amount DECIMAL(10,2),
  bill_name VARCHAR(100),
  owner_name VARCHAR(100),
  promptpay_number VARCHAR(10),
  deleted_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE,
  is_paid BOOLEAN
)
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT
    m.member_name,
    m.amount,
    b.bill_name,
    b.owner_name,
    b.promptpay_number,
    b.deleted_at,
    b.closed_at,
    m.is_paid
  FROM members m
  JOIN bills b ON b.id = m.bill_id
  WHERE m.id = p_member_id;
$$;

REVOKE ALL ON FUNCTION get_member_payment_info(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_member_payment_info(UUID) TO anon, authenticated;
