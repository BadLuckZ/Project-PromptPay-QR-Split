import type { NextConfig } from "next";
import { ENV } from "@/lib/env";

const SUPABASE_URL = ENV.SUPABASE_URL ?? "";
const isLocalDev = ENV.NODE_ENV === "development";
const isPreview = ENV.VERCEL_ENV === "preview";
const allowVercelToolbar = isLocalDev || isPreview;

// Content Security Policy: บอก Browser ว่าเอา Resource จากไหนได้
const CSP = [
  "default-src 'self'",
  `script-src 'self' 'unsafe-inline' https://accounts.google.com${isLocalDev ? " 'unsafe-eval'" : ""}${allowVercelToolbar ? " https://vercel.live" : ""}`,
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  `font-src 'self' https://fonts.gstatic.com${allowVercelToolbar ? " https://vercel.live" : ""}`,
  "img-src 'self' data: blob: https://*.googleusercontent.com",
  `connect-src 'self' data: ${SUPABASE_URL} https://accounts.google.com${allowVercelToolbar ? " https://vercel.live wss://vercel.live wss://*.pusher.com" : ""}`,
  `frame-src 'self' https://accounts.google.com${allowVercelToolbar ? " https://vercel.live" : ""}`,
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

const nextConfig: NextConfig = {
  // Inject Header อะไรบ้าง
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: CSP },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
