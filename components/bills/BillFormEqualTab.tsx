"use client";

import { FieldArrayWithId } from "react-hook-form";
import { BillFormCard } from "@/components/bills/BillFormCard";
import { FormValues } from "./BillForm";

interface BillFormEqualTabProps {
  ownerName: string;
  perPerson: number;
  totalCount: number;
  fields: FieldArrayWithId<FormValues, "participants", "id">[];
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export function BillFormEqualTab({
  ownerName,
  perPerson,
  totalCount,
  fields,
  onRemove,
  disabled = false,
}: BillFormEqualTabProps) {
  const meta = `฿${perPerson.toLocaleString()}`;

  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-primary-tint bg-success p-4">
        <p className="text-xs text-success-foreground mb-1">
          คนละเท่ากัน ({totalCount} คน)
        </p>
        <p className="text-2xl font-medium text-success-foreground">
          ฿{perPerson.toLocaleString()}
        </p>
      </div>

      <BillFormCard
        name={ownerName}
        isOwner
        meta={meta}
        className="border-b border-border py-2.5"
      />

      {fields.map((f, i) => (
        <BillFormCard
          key={f.id}
          name={f.name}
          accentIndex={i}
          meta={meta}
          onRemove={() => onRemove(i)}
          disabled={disabled}
          className="border-b border-border py-2.5"
        />
      ))}
    </div>
  );
}
