import type { Metadata } from "next";
import { Anuphan } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SessionWatcher } from "@/components/SessionWatcher";
import { Toaster } from "@/components/ui/sonner";

const anuphan = Anuphan({
  weight: ["400", "500", "600"],
  style: ["normal"],
  variable: "--font-anuphan",
});

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
      data-theme="light"
      style={{ colorScheme: "light" }}
      className={cn(
        "h-full antialiased",
        anuphan.variable,
        "mx-auto max-w-md bg-foreground",
      )}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <SessionWatcher />
        <Toaster />
      </body>
    </html>
  );
}
