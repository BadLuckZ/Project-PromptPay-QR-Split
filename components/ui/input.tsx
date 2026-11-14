import * as React from "react"
import { Input as InputPrimitive } from "@base-ui/react/input"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const inputVariants = cva(
  "h-11 w-full min-w-0 text-foreground transition-colors duration-(--duration-fast) ease-(--ease) placeholder:text-foreground-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger",
  {
    variants: {
      variant: {
        default: "rounded-md border-2 border-input bg-surface px-3 text-base",
        underline:
          "[appearance:textfield] rounded-none border-0 border-b-2 border-foreground bg-transparent px-0 text-lg focus-visible:border-ring focus-visible:bg-surface-muted focus-visible:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Input({
  className,
  type,
  variant,
  ...props
}: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(inputVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Input, inputVariants }
