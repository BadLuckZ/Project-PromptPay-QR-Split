import { Button } from "@/components/ui";
import { SUPABASE } from "@/lib/supabase";
import { PlusCircle } from "lucide-react";
import generatePayload from "promptpay-qr";
import QRCode from "qrcode";

export default async function Home() {
  const { data, error } = await SUPABASE.from("bills").select("*");
  const payload = generatePayload("0937255851", { amount: 100 });
  const qrDataUrl = await QRCode.toDataURL(payload, {
    color: {
      dark: "#0d9488",
      light: "#ccfbf1",
    },
    width: 200,
    margin: 2,
  });
  console.log("data:", data, "error:", error);

  return (
    <div>
      <h1 className="text-2xl font-bold text-primary">Hello World!</h1>
      <Button>
        <PlusCircle size={16} />
        <span>สร้าง Bill</span>
      </Button>

      <div>
        <p className="text-primary">0937255851 100</p>
        <img
          src={qrDataUrl}
          alt="QR Code"
          width={200}
          height={200}
          color="primary"
        />
      </div>
    </div>
  );
}
