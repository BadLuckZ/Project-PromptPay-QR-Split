"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

const AVATAR_COLORS = [
  "bg-warning text-warning-foreground",
  "bg-success text-success-foreground",
];

const SPLIT_TABS = [
  { value: "equal", label: "หารเท่ากัน" },
  { value: "custom", label: "กำหนดเอง" },
] as const;

type SplitTab = (typeof SPLIT_TABS)[number]["value"];

type FormValues = {
  bill_name: string;
  total: string;
  owner_amount: string;
  participants: { name: string; amount: string }[];
};

interface BillFormProps {
  ownerName: string;
}

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  return parts.length > 1 ? parts[0][0] + parts[1][0] : name.slice(0, 2);
}

export function BillForm({ ownerName }: BillFormProps) {
  const router = useRouter();
  const [tab, setTab] = useState<SplitTab>("equal");
  const [newParticipantName, setNewParticipantName] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

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

    const data = await res.json();
    setSubmitting(false);

    if (!res.ok) {
      setSubmitError(data.error ?? "เกิดข้อผิดพลาด กรุณาลองใหม่");
      return;
    }

    setShowConfirm(false);
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
            aria-invalid={!!errors.total}
          />
          {errors.total && (
            <p className="text-xs text-destructive">{errors.total.message}</p>
          )}
        </div>

        {/* New Participant */}
        <div className="flex items-center gap-2">
          <Input
            value={newParticipantName}
            onChange={(e) => setNewParticipantName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addParticipant();
              }
            }}
            placeholder="ชื่อผู้เข้าร่วม"
          />
          <Button
            type="button"
            variant="outline"
            size="icon"
            disabled={newParticipantName.trim() === ""}
            onClick={addParticipant}
          >
            <Plus size={16} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-border">
          {SPLIT_TABS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => setTab(t.value)}
              className={cn(
                "flex-1 -mb-px border-b-2 pb-2.5 text-sm font-medium cursor-pointer",
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
          <div className="flex flex-col gap-3">
            <div className="rounded-lg border border-primary-tint bg-success p-4">
              <p className="text-xs text-success-foreground mb-1">
                คนละเท่ากัน ({totalCount} คน)
              </p>
              <p className="text-2xl font-medium text-success-foreground">
                ฿{perPerson.toLocaleString()}
              </p>
            </div>

            <div className="flex items-center gap-2.5 border-b border-border py-2.5">
              <Avatar>
                <AvatarFallback className="bg-success text-success-foreground">
                  {getInitials(ownerName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <p className="text-sm font-medium">{ownerName} (ตัวเอง)</p>
                <p className="text-xs text-muted-foreground">
                  ฿{perPerson.toLocaleString()}
                </p>
              </div>
            </div>

            {fields.map((f, i) => (
              <div
                key={f.id}
                className="flex items-center gap-2.5 border-b border-border py-2.5"
              >
                <Avatar>
                  <AvatarFallback
                    className={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  >
                    {getInitials(f.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">{f.name}</p>
                  <p className="text-xs text-muted-foreground">
                    ฿{perPerson.toLocaleString()}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-destructive p-1 cursor-pointer"
                  aria-label="ลบผู้เข้าร่วม"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2.5 py-1">
              <Avatar>
                <AvatarFallback className="bg-success text-success-foreground">
                  {getInitials(ownerName)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-sm font-medium">
                {ownerName} (ตัวเอง)
              </div>
              <Input
                type="number"
                {...register("owner_amount")}
                placeholder="฿0"
                className="w-24 text-right"
              />
            </div>

            {fields.map((f, i) => (
              <div key={f.id} className="flex items-center gap-2.5 py-1">
                <Avatar>
                  <AvatarFallback
                    className={AVATAR_COLORS[i % AVATAR_COLORS.length]}
                  >
                    {getInitials(f.name)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-sm">{f.name}</div>
                <Input
                  type="number"
                  {...register(`participants.${i}.amount`)}
                  placeholder="฿0"
                  className="w-24 text-right"
                />
                <button
                  type="button"
                  onClick={() => remove(i)}
                  className="text-destructive p-1 cursor-pointer"
                  aria-label="ลบผู้เข้าร่วม"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            ))}

            <div className="flex justify-between border-t border-border pt-2 text-sm">
              <span className="text-muted-foreground">รวมที่กรอก</span>
              <span className="font-medium">
                ฿{customTotal.toLocaleString()}
              </span>
            </div>

            {diff !== 0 && total && (
              <p className="text-sm text-warning-foreground bg-warning border border-warning-border rounded-md px-3 py-2">
                {diff > 0
                  ? `ยอดขาดอีก ฿${diff.toLocaleString()}`
                  : `ยอดเกินมา ฿${Math.abs(diff).toLocaleString()}`}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Button */}
      <div className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={!canSubmit}
          onClick={() => setShowConfirm(true)}
        >
          สร้าง Bill
        </Button>
      </div>

      {/* Modal */}
      <AlertDialog open={showConfirm} onOpenChange={setShowConfirm}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการสร้าง bill</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{billName || "Bill ใหม่"}&quot; {totalCount} คน รวม ฿
              {totalNumber.toLocaleString()}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {submitError && (
            <p className="text-sm text-destructive">{submitError}</p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel disabled={submitting}>แก้ไข</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmit(onSubmit)}
              disabled={submitting}
            >
              {submitting ? "กำลังสร้าง..." : "สร้าง Bill"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
