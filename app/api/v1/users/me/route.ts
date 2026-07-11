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

  const body = await request.json();

  const { data, error } = await supabase
    .from("users")
    .upsert({
      id: user.id,
      display_name: body.display_name,
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
