import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { ERROR_MESSAGES } from "@/lib/errors";

interface RouteContext {
  params: Promise<{ id: string }>;
}

interface UpdateMemberBody {
  is_paid: boolean;
}

// Update a member's paid status (owner-only, enforced by RLS)
export async function PATCH(req: Request, { params }: RouteContext) {
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

  let body: UpdateMemberBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_BODY },
      { status: 400 },
    );
  }

  if (typeof body.is_paid !== "boolean") {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_IS_PAID },
      { status: 400 },
    );
  }

  const { data: existing, error: fetchErr } = await supabase
    .from("members")
    .select("id, bill:bills(closed_at)")
    .eq("id", id)
    .single();

  if (fetchErr || !existing) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.MEMBER_NOT_FOUND },
      { status: 404 },
    );
  }

  const bill = Array.isArray(existing.bill) ? existing.bill[0] : existing.bill;
  if (bill?.closed_at) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.BILL_CLOSED },
      { status: 400 },
    );
  }

  const { data: member, error } = await supabase
    .from("members")
    .update({ is_paid: body.is_paid })
    .eq("id", id)
    .select()
    .single();

  if (error || !member) {
    if (error) console.error("[members.id.PATCH] failed to update member", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.MEMBER_NOT_FOUND },
      { status: 404 },
    );
  }

  return NextResponse.json(member);
}
