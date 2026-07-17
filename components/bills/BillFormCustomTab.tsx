"use client";

import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { BillFormCard } from "@/components/bills/BillFormCard";
import { FormValues } from "./BillForm";

interface BillFormCustomTabProps {
  ownerName: string;
  total: string;
  customTotal: number;
  diff: number;
  fields: FieldArrayWithId<FormValues, "participants", "id">[];
  register: UseFormRegister<FormValues>;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export function BillFormCustomTab({
  ownerName,
  total,
  customTotal,
  diff,
  fields,
  register,
  onRemove,
  disabled = false,
}: BillFormCustomTabProps) {
  return (
    <div className="flex flex-col gap-3">
      <BillFormCard
        name={ownerName}
        isOwner
        className="py-1"
        trailing={
          <Input
            type="number"
            {...register("owner_amount")}
            placeholder="฿0"
            disabled={disabled}
            className="w-24 text-right"
          />
        }
      />

      {fields.map((f, i) => (
        <BillFormCard
          key={f.id}
          name={f.name}
          className="py-1"
          onRemove={() => onRemove(i)}
          disabled={disabled}
          trailing={
            <Input
              type="number"
              {...register(`participants.${i}.amount`)}
              placeholder="฿0"
              disabled={disabled}
              className="w-24 text-right"
            />
          }
        />
      ))}

      <div className="flex justify-between border-t border-border pt-2 text-sm">
        <span className="text-muted-foreground">รวมที่กรอก</span>
        <span className="font-medium">฿{customTotal.toLocaleString()}</span>
      </div>

      {diff !== 0 && total && (
        <p className="text-sm text-warning-foreground bg-warning border border-warning-border rounded-md px-3 py-2">
          {diff > 0
            ? `ยอดขาดอีก ฿${diff.toLocaleString()}`
            : `ยอดเกินมา ฿${Math.abs(diff).toLocaleString()}`}
        </p>
      )}
    </div>
  );
}
