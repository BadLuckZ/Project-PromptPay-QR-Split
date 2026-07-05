"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

type FormValues = {
  display_name: string;
  promptpay_number: string;
};

interface ProfileSetupFormProps {}

export function ProfileSetupForm({}: ProfileSetupFormProps) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

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
          placeholder="เบอร์ PromptPay"
          type="tel"
          className="border rounded-full w-fit"
        />
        {errors.promptpay_number && (
          <p className="text-red-500">{errors.promptpay_number.message}</p>
        )}
      </div>

      <button
        className="cursor-pointer border rounded-xl px-4 py-2"
        onClick={handleSubmit(onSubmit)}
      >
        บันทึก
      </button>
    </div>
  );
}
