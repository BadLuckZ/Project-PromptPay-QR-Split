"use client";

import type { MouseEvent } from "react";
import { Download } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SaveQRButtonProps {
  qrCodeDataUrl: string;
  fileName: string;
}

export function SaveQRButton({ qrCodeDataUrl, fileName }: SaveQRButtonProps) {
  const handleSave = async (event: MouseEvent<HTMLAnchorElement>) => {
    if (typeof navigator === "undefined" || !navigator.share || !navigator.canShare) return;

    try {
      const res = await fetch(qrCodeDataUrl);
      const blob = await res.blob();
      const file = new File([blob], fileName, { type: blob.type });

      if (!navigator.canShare({ files: [file] })) return;

      event.preventDefault();
      await navigator.share({ files: [file] });
    } catch {
      // share unsupported/blocked or user cancelled, fall back to <a download>
    }
  };

  return (
    <a
      href={qrCodeDataUrl}
      download={fileName}
      onClick={handleSave}
      className={cn(buttonVariants({ size: "lg" }), "w-full")}
    >
      <Download className="size-5" />
      บันทึก QR
    </a>
  );
}
