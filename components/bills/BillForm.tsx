"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, TriangleAlert } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BillFormEqualTab } from "@/components/bills/BillFormEqualTab";
import { BillFormCustomTab } from "@/components/bills/BillFormCustomTab";
import { BillFormAction } from "@/components/bills/BillFormAction";
import { SessionExpiredDialog } from "@/components/SessionExpiredDialog";
import { LeaderRow, ReceiptCard } from "@/components/receipt";
import { MAX_BILL_PEOPLE } from "@/lib/bill";

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
  const isFull = totalCount >= MAX_BILL_PEOPLE;
  const perPerson = totalCount > 0 ? Math.floor(totalNumber / totalCount) : 0;

  const customTotal =
    (Number(ownerAmount) || 0) +
    participants.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
  const diff = totalNumber - customTotal;

  function addParticipant() {
    const name = newParticipantName.trim();
    if (!name || isFull) return;

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

    try {
      const res = await fetch("/api/v1/bills", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bill_name: values.bill_name, members }),
      });

      if (res.status === 401) {
        setSessionExpired(true);
        return;
      }

      const data = await res.json();

      if (!res.ok) {
        setSubmitError(data.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่");
        return;
      }

      toast.success("สร้างบิลสำเร็จ");
      router.push("/bills");
    } catch {
      setSubmitError("เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-6 rounded-sm bg-surface px-6 py-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col">
            <Label
              htmlFor="bill-name"
              className="text-xs leading-body font-normal text-foreground-muted"
            >
              ชื่อ Bill
            </Label>
            <Input
              id="bill-name"
              variant="underline"
              {...register("bill_name", { required: "กรุณากรอกชื่อ Bill" })}
              placeholder="กรุณากรอกชื่อ Bill"
              disabled={submitting}
              aria-invalid={!!errors.bill_name}
            />
            {errors.bill_name && (
              <p className="pt-1 text-sm text-danger">
                {errors.bill_name.message}
              </p>
            )}
          </div>

          <div
            role="group"
            aria-label="วิธีหารบิล"
            className="flex gap-1 rounded-md bg-surface-muted p-1"
          >
            {SPLIT_TABS.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setTab(t.value)}
                disabled={submitting}
                aria-pressed={tab === t.value}
                className={cn(
                  "min-h-(--target-min) flex-1 cursor-pointer rounded-md px-3 text-sm whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-50",
                  tab === t.value
                    ? "bg-primary font-medium text-primary-foreground"
                    : "text-foreground-muted hover:text-foreground",
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="flex flex-col">
            <Label
              htmlFor="total"
              className="text-xs leading-body font-normal text-foreground-muted"
            >
              ยอดรวมทั้งหมด (฿)
            </Label>
            <Input
              id="total"
              type="number"
              variant="underline"
              className="text-xl font-medium tabular-nums"
              {...register("total", {
                required: "กรุณากรอกยอดรวมมากกว่า 0",
                validate: (v) => Number(v) > 0 || "กรุณากรอกยอดรวมมากกว่า 0",
              })}
              placeholder="0.00"
              disabled={submitting}
              aria-invalid={!!errors.total}
            />
            {errors.total && (
              <p className="pt-1 text-sm text-danger">{errors.total.message}</p>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-sm font-medium">ผู้เข้าร่วม {totalCount} คน</p>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <Input
                variant="underline"
                className="text-base"
                aria-label="ชื่อผู้เข้าร่วม"
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
                disabled={submitting || isFull}
                aria-invalid={!!participantNameError}
                aria-describedby={isFull ? "participants-full" : undefined}
              />
              <Button
                type="button"
                variant="soft"
                disabled={
                  submitting || isFull || newParticipantName.trim() === ""
                }
                onClick={addParticipant}
              >
                <Plus />
                เพิ่ม
              </Button>
            </div>
            {participantNameError && (
              <p className="pt-1 text-sm text-danger">
                {participantNameError}
              </p>
            )}
            {isFull && (
              <p
                id="participants-full"
                className="pt-1 text-sm text-foreground-muted"
              >
                ครบ {MAX_BILL_PEOPLE} คนแล้ว (รวมเจ้าของบิล)
              </p>
            )}
          </div>

          {tab === "equal" ? (
            <BillFormEqualTab
              ownerName={ownerName}
              fields={fields}
              onRemove={remove}
              disabled={submitting}
            />
          ) : (
            <BillFormCustomTab
              ownerName={ownerName}
              fields={fields}
              register={register}
              onRemove={remove}
              disabled={submitting}
            />
          )}
        </div>
      </div>

      <div className="sticky bottom-0 -mx-4 flex flex-col gap-3 bg-surface-muted px-4 pt-3 pb-4">
        <ReceiptCard>
          <dl>
            {tab === "equal" ? (
              <LeaderRow
                label={`คนละเท่ากัน (${totalCount} คน)`}
                valueClassName="font-mono text-xl tabular-nums"
              >
                ฿{perPerson.toLocaleString("th-TH")}
              </LeaderRow>
            ) : (
              <LeaderRow
                label="รวม"
                valueClassName="font-mono text-xl tabular-nums"
              >
                ฿{customTotal.toLocaleString("th-TH")}
              </LeaderRow>
            )}
          </dl>
          {tab === "custom" && diff !== 0 && total && (
            <p
              role="alert"
              className="flex items-center gap-2 rounded-md bg-warning-soft px-3 py-2 text-sm font-medium text-warning-soft-foreground"
            >
              <TriangleAlert className="size-4 shrink-0" aria-hidden="true" />
              {diff > 0
                ? `ยอดขาดอีก ฿${diff.toLocaleString()}`
                : `ยอดเกินมา ฿${Math.abs(diff).toLocaleString()}`}
            </p>
          )}
        </ReceiptCard>

        <BillFormAction
          canSubmit={canSubmit}
          billName={billName}
          totalCount={totalCount}
          totalNumber={totalNumber}
          submitting={submitting}
          submitError={submitError}
          onConfirm={handleSubmit(onSubmit)}
        />
      </div>

      <SessionExpiredDialog open={sessionExpired} />
    </div>
  );
}
