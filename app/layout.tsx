import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionWatcher } from "@/components/SessionWatcher";

export const metadata: Metadata = {
  title: "PromptPay QR Split",
  description: "PromptPay QR Split",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={cn(
        "h-full antialiased",
        "font-sans",
        "mx-auto max-w-md bg-black/90",
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SessionWatcher />
      </body>
    </html>
  );
}
