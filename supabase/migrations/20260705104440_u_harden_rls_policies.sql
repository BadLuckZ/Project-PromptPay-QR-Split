-- Fix: เพิ่ม WITH CHECK ใน UPDATE Policy — กัน user แก้ user_id/owner ของ row ไปเป็นของคนอื่น

-- USERS
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- BILLS
DROP POLICY IF EXISTS "Owners can update own bills" ON bills;
CREATE POLICY "Owners can update own bills"
ON bills FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- MEMBERS
DROP POLICY IF EXISTS "Owners can update members of own bills" ON members;
CREATE POLICY "Owners can update members of own bills"
ON members FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.user_id = auth.uid()
    )
)
WITH CHECK (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.user_id = auth.uid()
    )
);
