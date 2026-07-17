"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import { createClient } from "@/supabase/client";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials } from "@/lib/utils";
import { User } from "@/types";

type FormValues = {
  display_name: string;
  promptpay_number: string;
};

interface ProfileFormProps {
  profile: User;
  email: string;
}

export function ProfileForm({ profile, email }: ProfileFormProps) {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      display_name: profile.display_name,
      promptpay_number: profile.promptpay_number,
    },
  });

  const displayName = watch("display_name", "");

  async function onSubmit(data: FormValues) {
    const res = await fetch("/api/v1/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/bills");
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Topbar title="โปรไฟล์" backHref="/bills" />

      <div className="flex flex-col items-center pt-6">
        <Avatar size="lg" className="size-16! bg-card">
          <AvatarFallback className="bg-primary-tint text-2xl font-medium text-primary-dark">
            {getInitials(displayName)}
          </AvatarFallback>
        </Avatar>
        <p className="mt-2 text-xs text-muted-foreground">
          Avatar จากชื่อที่ตั้ง
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-5 px-4 pt-8"
      >
        <div className="flex items-center gap-3 rounded-2xl bg-secondary px-3 py-3">
          <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-card">
            <img src="/google-logo.svg" alt="" width={18} height={18} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm text-secondary-foreground/80">
              {email}
            </p>
          </div>
          <span className="shrink-0 rounded-full bg-card px-2.5 py-1 text-xs text-primary">
            เชื่อมต่อแล้ว
          </span>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="display_name">ชื่อที่แสดง</Label>
          <Input
            id="display_name"
            {...register("display_name", { required: "กรุณากรอกชื่อ" })}
            placeholder="ชื่อ-นามสกุล"
            type="text"
            disabled={isSubmitting}
            className="rounded-lg"
          />
          {errors.display_name && (
            <p className="text-xs text-destructive">
              {errors.display_name.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="promptpay_number">เบอร์โทรศัพท์ (PromptPay)</Label>
          <Input
            id="promptpay_number"
            {...register("promptpay_number", {
              required: "กรุณากรอกเบอร์โทรศัพท์",
              pattern: {
                value: /^0\d{9}$/,
                message: "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ที่ขึ้นต้นด้วยเลข 0",
              },
            })}
            placeholder="08x-xxx-xxxx"
            type="tel"
            disabled={isSubmitting}
            className="rounded-lg"
          />
          {errors.promptpay_number && (
            <p className="text-xs text-destructive">
              {errors.promptpay_number.message}
            </p>
          )}
        </div>

        <div className="mt-auto flex flex-col items-center gap-3 pt-8 pb-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base"
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
          </Button>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-muted-foreground hover:text-destructive disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isLoggingOut ? (
              <span className="size-3.5 animate-spin rounded-full border-2 border-muted-foreground/30 border-t-muted-foreground" />
            ) : (
              <LogOut size={14} />
            )}
            {isLoggingOut ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
          </button>
        </div>
      </form>
    </div>
  );
}
