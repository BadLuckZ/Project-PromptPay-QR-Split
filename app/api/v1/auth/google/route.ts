import { NextResponse } from "next/server";
import { createClient } from "@/supabase/server";
import { ERROR_MESSAGES } from "@/lib/errors";

interface GoogleSignInBody {
  credential: string;
  nonce: string;
}

export async function POST(request: Request) {
  let body: GoogleSignInBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_BODY },
      { status: 400 },
    );
  }

  if (!body.credential || !body.nonce) {
    return NextResponse.json(
      { error: ERROR_MESSAGES.INVALID_BODY },
      { status: 400 },
    );
  }

  const supabase = await createClient();

  const { data, error: signInErr } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: body.credential,
    nonce: body.nonce,
  });

  if (signInErr || !data.user) {
    console.error("[auth.google.POST] sign-in failed", signInErr);
    return NextResponse.json(
      { error: ERROR_MESSAGES.GOOGLE_SIGN_IN_FAILED },
      { status: 401 },
    );
  }

  const { data: profile } = await supabase
    .from("users")
    .select("id")
    .eq("id", data.user.id)
    .single();

  return NextResponse.json({
    redirectTo: profile ? "/bills" : "/profile/setup",
  });
}
