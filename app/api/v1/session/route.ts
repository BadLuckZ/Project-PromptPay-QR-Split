import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { ERROR_MESSAGES } from "@/lib/errors";

// Lightweight Auth check
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

  return NextResponse.json({ ok: true });
}
