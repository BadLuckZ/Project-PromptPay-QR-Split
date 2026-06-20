-- USERS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view own profile" ON users;
CREATE POLICY "Users can view own profile"
ON users FOR SELECT
USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can insert own profile" ON users;
CREATE POLICY "Users can insert own profile"
ON users FOR INSERT
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile"
ON users FOR UPDATE
USING (auth.uid() = id);

-- BILLS
ALTER TABLE bills ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Owners can view own bills" ON bills;
CREATE POLICY "Owners can view own bills"
ON bills FOR SELECT
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view non-deleted bills by id" ON bills;
CREATE POLICY "Public can view non-deleted bills by id"
ON bills FOR SELECT
TO anon
USING (deleted_at IS NULL);

DROP POLICY IF EXISTS "Owners can insert own bills" ON bills;
CREATE POLICY "Owners can insert own bills"
ON bills FOR INSERT
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Owners can update own bills" ON bills;
CREATE POLICY "Owners can update own bills"
ON bills FOR UPDATE
USING (auth.uid() = user_id);

-- MEMBERS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;

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