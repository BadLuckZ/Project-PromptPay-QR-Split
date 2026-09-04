# PromptPay QR Split

เว็บแอปหารบิลจ่ายผ่าน PromptPay QR สร้างขึ้นแก้ปัญหาเวลากินข้าวกับเพื่อนแล้วมีธุระต้องรีบไปก่อนใครกินเสร็จ - ไม่ต้องรอคิดเลขหารหรือรอโอนทีละคน สร้างบิล ใส่รายการ+คนที่ร่วมจ่าย ระบบคิดยอดแต่ละคนให้ แล้วแจกลิงก์/QR ให้ตัดจ่ายเองได้เลยแม้คนสร้างบิลไม่อยู่ตรงนั้นแล้ว

## Stack

- Next.js 16 (App Router) + React 19 + TypeScript
- Supabase (Auth + DB, server-side via `@supabase/ssr`)
- `promptpay-qr` + `qrcode` - gen payload/QR ตาม spec PromptPay
- react-hook-form, Tailwind v4, shadcn/base-ui

## Docs

- [Supabase Auth + Next.js App Router](https://supabase.com/docs/guides/auth/server-side/nextjs)
- [Supabase Auth Providers - Google](https://supabase.com/docs/guides/auth/social-login/auth-google)
- [Next.js Proxy (formerly Middleware)](https://nextjs.org/docs/app/building-your-application/routing/middleware)
- [react-hook-form](https://react-hook-form.com)
- [promptpay-qr](https://apiref.page/package/promptpay-qr@0.5.0)
