import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";
import { ERROR_MESSAGES } from "@/lib/errors";

// Get User Profile
export async function GET() {
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

  const { data: profile, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  if (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.LOAD_PROFILE_FAILED },
      { status: 500 },
    );
  }

  return NextResponse.json(profile);
}

// Update User Profile
export async function PATCH(request: Request) {
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

  let body: { display_name: string; promptpay_number: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_BODY },
      { status: 400 },
    );
  }

  const displayName = body.display_name?.trim();
  if (!displayName) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.DISPLAY_NAME_REQUIRED },
      { status: 400 },
    );
  }
  if (displayName.length > 100) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.DISPLAY_NAME_TOO_LONG },
      { status: 400 },
    );
  }

  if (!/^0\d{9}$/.test(body.promptpay_number ?? "")) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.PROMPTPAY_NUMBER_INVALID },
      { status: 400 },
    );
  }

  const { data, error } = await supabase
    .from("users")
    .upsert({
      id: user.id,
      display_name: displayName,
      promptpay_number: body.promptpay_number,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.SAVE_PROFILE_FAILED },
      { status: 500 },
    );
  }

  return NextResponse.json(data);
}
