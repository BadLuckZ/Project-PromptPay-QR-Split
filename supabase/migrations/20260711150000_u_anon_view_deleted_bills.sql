-- FIX: ต้องให้ anon อ่าน row ได้แม้ deleted_at ไม่ null
-- เพื่อให้ participant เปิดลิงก์ QR ได้อยู่ แต่จะเห็น "บิลนี้ถูกลบแล้ว"

-- BILLS
DROP POLICY IF EXISTS "Public can view non-deleted bills by id" ON bills;
CREATE POLICY "Public can view bills by id"
ON bills FOR SELECT
TO anon
USING (true);

-- MEMBERS
DROP POLICY IF EXISTS "Public can view members of non-deleted bills" ON members;
CREATE POLICY "Public can view members of bills"
ON members FOR SELECT
TO anon
USING (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
    )
);
