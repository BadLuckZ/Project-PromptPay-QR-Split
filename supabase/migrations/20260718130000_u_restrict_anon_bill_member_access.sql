-- anon เดิม อ่าน bills/members ได้ทั้งตาราง ไม่ได้ถูกจำกัดแค่ id เพราะ USING(TRUE)

-- FIX: ไม่ให้ anon SELECT ตรงบนตาราง แล้วใช้ SECURITY DEFINER)
-- ที่รับ member id เดียว คืนแค่ row เดียวเท่านั้น

DROP POLICY IF EXISTS "Public can view bills by id" ON bills;
DROP POLICY IF EXISTS "Public can view members of bills" ON members;

CREATE OR REPLACE FUNCTION get_member_payment_info(p_member_id UUID)
RETURNS TABLE (
  member_name VARCHAR(100),
  amount DECIMAL(10,2),
  bill_name VARCHAR(100),
  owner_name VARCHAR(100),
  promptpay_number VARCHAR(10),
  deleted_at TIMESTAMP WITH TIME ZONE,
  closed_at TIMESTAMP WITH TIME ZONE
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
    b.closed_at
  FROM members m
  JOIN bills b ON b.id = m.bill_id
  WHERE m.id = p_member_id;
$$;

REVOKE ALL ON FUNCTION get_member_payment_info(UUID) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION get_member_payment_info(UUID) TO anon, authenticated;
