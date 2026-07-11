"use client";

import { useForm } from "react-hook-form";
import { createClient } from "@/supabase/client";
import { useRouter } from "next/navigation";
import { User } from "@/types";

type FormValues = {
  display_name: string;
  promptpay_number: string;
};

interface ProfileFormProps {
  profile: User;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      display_name: profile.display_name,
      promptpay_number: profile.promptpay_number,
    },
  });

  async function onSubmit(data: FormValues) {
    const res = await fetch("/api/v1/users/me", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.refresh();
    }
  }

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-2">
        <input
          {...register("display_name", { required: "กรุณากรอกชื่อ" })}
          placeholder="ชื่อที่แสดง"
          type="text"
          className="border rounded-full w-fit"
        />
        {errors.display_name && (
          <p className="text-red-500">{errors.display_name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <input
          {...register("promptpay_number", {
            required: "กรุณากรอกเบอร์",
            pattern: {
              value: /^0\d{9}$/,
              message: "เบอร์โทรต้องเป็นตัวเลข 10 หลัก ที่ขึ้นต้นด้วยเลข 0",
            },
          })}
          className="border rounded-full w-fit"
          placeholder="เบอร์ PromptPay"
          type="tel"
        />
        {errors.promptpay_number && (
          <p className="text-red-500">{errors.promptpay_number.message}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <button
          className="cursor-pointer border rounded-xl px-4 py-2"
          onClick={handleSubmit(onSubmit)}
        >
          บันทึก
        </button>
        <button
          className="cursor-pointer border rounded-xl px-4 py-2"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}
