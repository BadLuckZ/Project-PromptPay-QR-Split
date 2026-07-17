"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { useState } from "react";
import { Topbar } from "@/components/Topbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";
import { getInitials } from "@/lib/utils";

type FormValues = {
  display_name: string;
  promptpay_number: string;
};

interface ProfileSetupFormProps {
  email: string;
}

export function ProfileSetupForm({ email }: ProfileSetupFormProps) {
  const router = useRouter();
  const [sessionExpired, setSessionExpired] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const displayName = watch("display_name", "");

  async function onSubmit(data: FormValues) {
    const res = await fetch("/api/v1/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.status === 401) {
      setSessionExpired(true);
      return;
    }

    if (res.ok) {
      router.push("/bills");
    }
  }

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Topbar title="ตั้งค่าโปรไฟล์" />

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

        <div className="mt-auto pt-8 pb-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="h-12 w-full rounded-xl text-base"
          >
            {isSubmitting ? "กำลังบันทึก..." : "บันทึกโปรไฟล์"}
          </Button>
        </div>
      </form>

      <SessionExpiredDialog open={sessionExpired} />
    </div>
  );
}
