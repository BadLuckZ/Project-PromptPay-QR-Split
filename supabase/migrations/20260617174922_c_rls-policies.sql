-- USERS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- อ่านได้เฉพาะ profile ของตัวเอง
DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

-- สร้าง profile ได้เฉพาะให้ตัวเอง
DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

-- แก้ profile ได้เฉพาะของตัวเอง 
DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- BILLS
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

-- อ่านได้เฉพาะบิลที่ตัวเองเป็นเจ้าของ
DROP POLICY IF EXISTS "Owners can view own bills" ON bills;
CREATE POLICY "Owners can view own bills"
ON bills FOR SELECT
USING (auth.uid() = user_id);

-- คนที่ไม่ login จะอ่านบิลที่ยังไม่ถูกลบได้ ผ่านการรู้ bill id
DROP POLICY IF EXISTS "Public can view non-deleted bills by id" ON bills;
CREATE POLICY "Public can view non-deleted bills by id"
ON bills FOR SELECT
TO anon
USING (deleted_at IS NULL);

-- สร้างบิลได้เฉพาะให้ตัวเอง
DROP POLICY IF EXISTS "Owners can insert own bills" ON bills;
CREATE POLICY "Owners can insert own bills"
ON bills FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- แก้ได้เฉพาะบิลตัวเอง
DROP POLICY IF EXISTS "Owners can update own bills" ON bills;
CREATE POLICY "Owners can update own bills"
ON bills FOR UPDATE
USING (auth.uid() = user_id);

-- MEMBERS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

-- users อ่าน member ได้เฉพาะที่อยู่ในบิลของตัวเอง
DROP POLICY IF EXISTS "Owners can view members of own bills" ON members;
CREATE POLICY "Owners can view members of own bills"
ON members FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.user_id = auth.uid()
    )
);

-- คนที่ไม่ login จะอ่าน member ของบิลที่ยังไม่ถูกลบได้ ผ่านการรู้ bill id
DROP POLICY IF EXISTS "Public can view members of non-deleted bills" ON members;
CREATE POLICY "Public can view members of non-deleted bills"
ON members FOR SELECT
TO anon
USING (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.deleted_at IS NULL
    )
);

-- users เพิ่ม member ได้เฉพาะเข้าบิลของตัวเอง
DROP POLICY IF EXISTS "Owners can insert members into own bills" ON members;
CREATE POLICY "Owners can insert members into own bills"
ON members FOR INSERT
WITH CHECK (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.user_id = auth.uid()
    )
);

-- users แก้ member ได้เฉพาะของบิลตัวเอง
DROP POLICY IF EXISTS "Owners can update members of own bills" ON members;
CREATE POLICY "Owners can update members of own bills"
ON members FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.user_id = auth.uid()
    )
);

-- users ลบ member ได้เฉพาะของบิลตัวเอง
DROP POLICY IF EXISTS "Owners can delete members of own bills" ON members;
CREATE POLICY "Owners can delete members of own bills"
ON members FOR DELETE
USING (
    EXISTS (
        SELECT 1 FROM bills
        WHERE bills.id = members.bill_id
        AND bills.user_id = auth.uid()
    )
);