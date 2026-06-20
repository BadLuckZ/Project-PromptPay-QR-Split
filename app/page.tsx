import { SUPABASE } from "@/lib/supabase";

export default async function Home() {
  const { data, error } = await SUPABASE.from("bills").select("*");
  console.log("data:", data, "error:", error);

  return <h1 className="text-2xl font-bold text-primary">Hello World!</h1>;
}
