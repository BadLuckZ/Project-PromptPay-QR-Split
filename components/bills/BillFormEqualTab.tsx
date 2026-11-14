"use client";

import { FieldArrayWithId } from "react-hook-form";
import { BillFormCard } from "@/components/bills/BillFormCard";
import { FormValues } from "./BillForm";

interface BillFormEqualTabProps {
  ownerName: string;
  fields: FieldArrayWithId<FormValues, "participants", "id">[];
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export function BillFormEqualTab({
  ownerName,
  fields,
  onRemove,
  disabled = false,
}: BillFormEqualTabProps) {
  return (
    <ul className="flex flex-col">
      <BillFormCard name={ownerName} isOwner />
      {fields.map((f, i) => (
        <BillFormCard
          key={f.id}
          name={f.name}
          onRemove={() => onRemove(i)}
          disabled={disabled}
        />
      ))}
    </ul>
  );
}
