import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { ERROR_MESSAGES } from "@/lib/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

// Get bill detail (owner-only)
export async function GET(_req: Request, { params }: RouteContext) {
  const { id } = await params;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.UNAUTHORIZED },
      { status: 401 },
    );
  }

  const { data: bill, error: billErr } = await supabase
    .from("bills")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (billErr || !bill) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.BILL_NOT_FOUND },
      { status: 404 },
    );
  }

  const { data: members, error: membersErr } = await supabase
    .from("members")
    .select("*")
    .eq("bill_id", id)
    .order("created_at", { ascending: true });

  if (membersErr) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.LOAD_BILL_FAILED },
      { status: 500 },
    );
  }

  return NextResponse.json({ bill, members: members ?? [] });
}
