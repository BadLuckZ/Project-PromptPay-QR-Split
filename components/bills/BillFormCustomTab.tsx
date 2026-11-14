"use client";

import { FieldArrayWithId, UseFormRegister } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { BillFormCard } from "@/components/bills/BillFormCard";
import { FormValues } from "./BillForm";

interface BillFormCustomTabProps {
  ownerName: string;
  fields: FieldArrayWithId<FormValues, "participants", "id">[];
  register: UseFormRegister<FormValues>;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export function BillFormCustomTab({
  ownerName,
  fields,
  register,
  onRemove,
  disabled = false,
}: BillFormCustomTabProps) {
  return (
    <ul className="flex flex-col">
      <BillFormCard
        name={ownerName}
        isOwner
        trailing={
          <AmountInput
            label={`ยอดของ ${ownerName}`}
            disabled={disabled}
            {...register("owner_amount")}
          />
        }
      />
      {fields.map((f, i) => (
        <BillFormCard
          key={f.id}
          name={f.name}
          onRemove={() => onRemove(i)}
          disabled={disabled}
          trailing={
            <AmountInput
              label={`ยอดของ ${f.name}`}
              disabled={disabled}
              {...register(`participants.${i}.amount`)}
            />
          }
        />
      ))}
    </ul>
  );
}

function AmountInput({
  label,
  ...props
}: React.ComponentProps<typeof Input> & { label: string }) {
  return (
    <span className="flex items-center gap-1">
      <span aria-hidden="true" className="font-mono text-foreground-muted">
        ฿
      </span>
      <Input
        type="number"
        variant="underline"
        font="mono"
        aria-label={label}
        className="w-20 text-right text-base"
        {...props}
      />
    </span>
  );
}
