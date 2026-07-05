import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";

interface Member {
  member_name: string;
  amount: number;
}

interface CreateBillBody {
  bill_name: string;
  members: Member[];
}

export async function POST(req: Request) {
  const supabase = await createClient();

  // User Validation
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json({ error: "กรุณาเข้าสู่ระบบ" }, { status: 401 });
  }

  const { data: profile, error: profileErr } = await supabase
    .from("users")
    .select("display_name, promptpay_number")
    .eq("id", user.id)
    .single();
  if (profileErr || !profile) {
    return NextResponse.json(
      { error: "ไม่พบข้อมูลผู้ใช้ กรุณาตั้งค่าโปรไฟล์" },
      { status: 401 },
    );
  }

  // Bill Validation
  let body: CreateBillBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "รูปแบบข้อมูลไม่ถูกต้อง" },
      { status: 400 },
    );
  }

  const billName = body.bill_name?.trim();
  const members = Array.isArray(body.members) ? body.members : [];
  if (!billName) {
    return NextResponse.json({ error: "กรุณากรอกชื่อบิล" }, { status: 400 });
  }

  if (members.length === 0) {
    return NextResponse.json(
      { error: "ต้องมีผู้เข้าร่วมอย่างน้อย 1 คน" },
      { status: 400 },
    );
  }

  for (const m of members) {
    const name = m.member_name?.trim();
    const amount = Number(m.amount);
    if (!name) {
      return NextResponse.json(
        { error: "มีผู้เข้าร่วมที่ยังไม่มีชื่อ" },
        { status: 400 },
      );
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return NextResponse.json(
        { error: `ยอดของ "${name}" ไม่ถูกต้อง` },
        { status: 400 },
      );
    }
  }

  // Insert bill
  const { data: bill, error: billErr } = await supabase
    .from("bills")
    .insert({
      user_id: user.id,
      bill_name: billName,
      owner_name: profile.display_name,
      promptpay_number: profile.promptpay_number,
    })
    .select("id")
    .single();

  if (billErr || !bill) {
    return NextResponse.json({ error: "สร้างบิลไม่สำเร็จ" }, { status: 500 });
  }

  // Insert members
  const rows = members.map((m) => ({
    bill_id: bill.id,
    member_name: m.member_name.trim(),
    amount: Math.round(Number(m.amount) * 100) / 100,
    is_paid: false,
  }));

  const { error: memErr } = await supabase.from("members").insert(rows);
  if (memErr) {
    await supabase.from("bills").delete().eq("id", bill.id);
    return NextResponse.json(
      { error: "บันทึกผู้เข้าร่วมไม่สำเร็จ" },
      { status: 500 },
    );
  }

  return NextResponse.json({ id: bill.id }, { status: 201 });
}
