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
        showAvatar={false}
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
          showAvatar={false}
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
    <span className="ms-auto flex shrink-0 items-center gap-1">
      <span aria-hidden="true" className="text-foreground-muted">
        ฿
      </span>
      <Input
        type="number"
        variant="underline"
        aria-label={label}
        className="w-20 text-right text-base tabular-nums"
        {...props}
      />
    </span>
  );
}
