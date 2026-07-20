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
    console.error("[bills.id.GET] failed to load members", membersErr);
    return NextResponse.json(
      { error: ERROR_MESSAGES.LOAD_BILL_FAILED },
      { status: 500 },
    );
  }

  return NextResponse.json({ bill, members: members ?? [] });
}

interface UpdateBillBody {
  closed: boolean;
}

// Close/reopen a bill (owner-only)
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

  let body: UpdateBillBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_BODY },
      { status: 400 },
    );
  }

  if (typeof body.closed !== "boolean") {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_CLOSED },
      { status: 400 },
    );
  }

  const { data: bill, error } = await supabase
    .from("bills")
    .update({ closed_at: body.closed ? new Date().toISOString() : null })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error || !bill) {
    if (error) console.error("[bills.id.PATCH] failed to update bill", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.BILL_NOT_FOUND },
      { status: 404 },
    );
  }

  return NextResponse.json(bill);
}

// Delete a bill (owner-only, soft delete)
export async function DELETE(_req: Request, { params }: RouteContext) {
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

  const { data: bill, error } = await supabase
    .from("bills")
    .update({ deleted_at: new Date().toISOString() })
    .eq("id", id)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error || !bill) {
    if (error) console.error("[bills.id.DELETE] failed to delete bill", error);
    return NextResponse.json(
      { error: ERROR_MESSAGES.BILL_NOT_FOUND },
      { status: 404 },
    );
  }

  return NextResponse.json(bill);
}
