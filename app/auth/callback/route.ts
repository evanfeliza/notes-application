import { NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  const supabase = createClient()
  const { data } = await supabase.auth.getUser()
  const requestUrl = new URL(request.url);
  const origin = requestUrl.origin;
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }


  return NextResponse.redirect(`${origin}/protected/${data?.user?.id}`);
}
