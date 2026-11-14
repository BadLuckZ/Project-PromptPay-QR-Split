"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { ChevronLeft, Loader2, LogOut } from "lucide-react";

import { broadcastLogout } from "@/lib/auth";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn, getInitials } from "@/lib/utils";
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
  const [sessionExpired, setSessionExpired] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
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
    setSubmitError(null);

    try {
      const res = await fetch("/api/v1/users/me", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (res.status === 401) {
        setSessionExpired(true);
        return;
      }

      const result = await res.json();

      if (!res.ok) {
        setSubmitError(
          result.error ?? "บันทึกข้อมูลไม่สำเร็จ กรุณาลองใหม่อีกครั้ง",
        );
        return;
      }

      toast.success("บันทึกโปรไฟล์สำเร็จ");
      router.push("/bills");
    } catch {
      setSubmitError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    }
  }

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/v1/auth/logout", { method: "POST" });
    broadcastLogout();
    router.push("/login");
  }

  return (
    <main className="flex flex-1 flex-col gap-3 px-4 py-6">
      <header className="flex items-center gap-1">
        <Link
          href="/bills"
          aria-label="ย้อนกลับ"
          className={cn(
            buttonVariants({ variant: "ghost", size: "icon" }),
            "-ms-3",
          )}
        >
          <ChevronLeft className="size-6" />
        </Link>
        <h1 className="text-xl leading-tight font-semibold">โปรไฟล์</h1>
      </header>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-1 flex-col gap-3"
      >
        <div className="flex flex-col gap-6 rounded-sm bg-surface px-6 py-6">
          <span className="flex size-18 items-center justify-center self-center rounded-full bg-primary-soft text-2xl font-semibold text-primary">
            {getInitials(displayName)}
          </span>

          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-surface-muted">
              <img src="/google-logo.svg" alt="" width={18} height={18} />
            </span>
            <p className="min-w-0 flex-1 truncate text-sm text-foreground-muted">
              {email}
            </p>
            <span className="shrink-0 text-sm font-medium text-primary">
              เชื่อมต่อแล้ว
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <Label
                htmlFor="display_name"
                className="text-xs leading-body font-normal text-foreground-muted"
              >
                ชื่อที่แสดง
              </Label>
              <Input
                id="display_name"
                variant="underline"
                {...register("display_name", { required: "กรุณากรอกชื่อ" })}
                placeholder="ชื่อ-นามสกุล"
                type="text"
                disabled={isSubmitting}
              />
              {errors.display_name && (
                <p className="pt-1 text-sm text-danger">
                  {errors.display_name.message}
                </p>
              )}
            </div>

            <div className="flex flex-col">
              <Label
                htmlFor="promptpay_number"
                className="text-xs leading-body font-normal text-foreground-muted"
              >
                เบอร์โทรศัพท์ (PromptPay)
              </Label>
              <Input
                id="promptpay_number"
                variant="underline"
                font="mono"
                {...register("promptpay_number", {
                  required: "กรุณากรอกเบอร์โทรศัพท์",
                  pattern: {
                    value: /^0\d{9}$/,
                    message:
                      "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ที่ขึ้นต้นด้วยเลข 0",
                  },
                })}
                placeholder="08x-xxx-xxxx"
                type="tel"
                disabled={isSubmitting}
              />
              {errors.promptpay_number && (
                <p className="pt-1 text-sm text-danger">
                  {errors.promptpay_number.message}
                </p>
              )}
            </div>
          </div>
        </div>

        {submitError && (
          <p role="alert" className="text-center text-sm text-danger">
            {submitError}
          </p>
        )}
        <Button
          type="submit"
          size="lg"
          disabled={isSubmitting}
          className="w-full"
        >
          {isSubmitting ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
        </Button>

        <Button
          type="button"
          variant="destructive-ghost"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="w-full"
        >
          {isLoggingOut ? <Loader2 className="animate-spin" /> : <LogOut />}
          {isLoggingOut ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
        </Button>
      </form>

      <SessionExpiredDialog open={sessionExpired} />
    </main>
  );
}
