"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillFormEqualTab } from "@/components/bills/BillFormEqualTab";
import { BillFormCustomTab } from "@/components/bills/BillFormCustomTab";
import { BillFormAction } from "@/components/bills/BillFormAction";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";

const SPLIT_TABS = [
  { value: "equal", label: "หารเท่ากัน" },
  { value: "custom", label: "กำหนดเอง" },
] as const;

type SplitTab = (typeof SPLIT_TABS)[number]["value"];

export type FormValues = {
  bill_name: string;
  total: string;
  owner_amount: string;
  participants: { name: string; amount: string }[];
};

interface BillFormProps {
  ownerName: string;
}

export function BillForm({ ownerName }: BillFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<SplitTab>("equal");
  const [newParticipantName, setNewParticipantName] = useState("");
  const [participantNameError, setParticipantNameError] = useState<
    string | null
  >(null);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sessionExpired, setSessionExpired] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues: {
      bill_name: "",
      total: "",
      owner_amount: "",
      participants: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "participants",
  });

  const billName = watch("bill_name");
  const total = watch("total");
  const ownerAmount = watch("owner_amount");
  const participants = watch("participants");

  const totalNumber = Number(total) || 0;
  const totalCount = fields.length + 1;
  const perPerson = totalCount > 0 ? Math.floor(totalNumber / totalCount) : 0;

  const customTotal =
    (Number(ownerAmount) || 0) +
    participants.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const diff = totalNumber - customTotal;

  function addParticipant() {
    const name = newParticipantName.trim();
    if (!name) return;

    const isDuplicate = [ownerName, ...participants.map((p) => p.name)].some(
      (existing) => existing.trim().toLowerCase() === name.toLowerCase(),
    );
    if (isDuplicate) {
      setParticipantNameError("มีชื่อนี้ในบิลแล้ว กรุณาใช้ชื่ออื่น");
      return;
    }

    setParticipantNameError(null);
    append({ name, amount: "" });
    setNewParticipantName("");
  }

  const canSubmit =
    billName.trim() !== "" &&
    totalNumber > 0 &&
    (tab === "equal" || diff === 0);

  async function onSubmit(values: FormValues) {
    setSubmitting(true);
    setSubmitError(null);

    const members = values.participants.map((p) => ({
      member_name: p.name,
      amount: tab === "equal" ? perPerson : Number(p.amount) || 0,
    }));

    const res = await fetch("/api/v1/bills", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bill_name: values.bill_name, members }),
    });

    setSubmitting(false);

    if (res.status === 401) {
      setSessionExpired(true);
      return;
    }

    const data = await res.json();

    if (!res.ok) {
      setSubmitError(data.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่");
      return;
    }

    router.push("/bills");
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="p-4 flex flex-col gap-4 flex-1">
        {/* Bill Name */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="bill-name">ชื่อ Bill</Label>
          <Input
            id="bill-name"
            {...register("bill_name", { required: "กรุณากรอกชื่อ Bill" })}
            placeholder="กรุณากรอกชื่อ Bill"
            disabled={submitting}
            aria-invalid={!!errors.bill_name}
          />
          {errors.bill_name && (
            <p className="text-xs text-destructive">
              {errors.bill_name.message}
            </p>
          )}
        </div>

        {/* Bill Price */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="total">ยอดรวมทั้งหมด (฿)</Label>
          <Input
            id="total"
            type="number"
            {...register("total", {
              required: "กรุณากรอกยอดรวมมากกว่า 0",
              validate: (v) => Number(v) > 0 || "กรุณากรอกยอดรวมมากกว่า 0",
            })}
            placeholder="0.00"
            disabled={submitting}
            aria-invalid={!!errors.total}
          />
          {errors.total && (
            <p className="text-xs text-destructive">{errors.total.message}</p>
          )}
        </div>

        {/* New Participant */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-2">
            <Input
              value={newParticipantName}
              onChange={(e) => {
                setNewParticipantName(e.target.value);
                setParticipantNameError(null);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addParticipant();
                }
              }}
              placeholder="ชื่อผู้เข้าร่วม"
              disabled={submitting}
              aria-invalid={!!participantNameError}
            />
            <Button
              type="button"
              variant="outline"
              size="icon"
              disabled={submitting || newParticipantName.trim() === ""}
              onClick={addParticipant}
            >
              <Plus size={16} />
            </Button>
          </div>
          {participantNameError && (
            <p className="text-xs text-destructive">{participantNameError}</p>
          )}
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {SPLIT_TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              disabled={submitting}
              className={cn(
                "flex-1 -mb-px border-b-2 pb-2.5 text-sm font-medium cursor-pointer disabled:pointer-events-none disabled:opacity-60",
                tab === t.value
                  ? "border-primary text-primary"
                  : "border-transparent text-muted-foreground",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Content based on Tab */}
        {tab === "equal" ? (
          <BillFormEqualTab
            ownerName={ownerName}
            perPerson={perPerson}
            totalCount={totalCount}
            fields={fields}
            onRemove={remove}
            disabled={submitting}
          />
        ) : (
          <BillFormCustomTab
            ownerName={ownerName}
            total={total}
            customTotal={customTotal}
            diff={diff}
            fields={fields}
            register={register}
            onRemove={remove}
            disabled={submitting}
          />
        )}
      </div>

      <BillFormAction
        canSubmit={canSubmit}
        billName={billName}
        totalCount={totalCount}
        totalNumber={totalNumber}
        submitting={submitting}
        submitError={submitError}
        onConfirm={handleSubmit(onSubmit)}
      />

      <SessionExpiredDialog open={sessionExpired} />
    </div>
  );
}
