import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="th" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
