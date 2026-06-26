import { createClient } from "@/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    await supabase.auth.exchangeCodeForSession(code);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: profile } = await supabase
        .from("users")
        .select("id")
        .eq("id", user.id)
        .single();

      if (!profile) {
        return NextResponse.redirect(`${origin}/profile/setup`);
      }
    }
  }

  return NextResponse.redirect(`${origin}/bills`);
}
