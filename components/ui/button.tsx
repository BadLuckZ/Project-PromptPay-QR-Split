import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex min-h-(--target-min) min-w-(--target-min) shrink-0 cursor-pointer items-center justify-center rounded-md text-sm font-medium whitespace-nowrap transition-colors duration-(--duration-fast) ease-(--ease) select-none active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:cursor-default disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-active",
        soft: "bg-primary-soft text-primary hover:bg-surface-muted-hover aria-expanded:bg-surface-muted-hover",
        outline:
          "bg-primary-soft text-primary hover:bg-surface-muted-hover aria-expanded:bg-surface-muted-hover",
        secondary:
          "bg-primary-soft text-primary hover:bg-surface-muted-hover aria-expanded:bg-surface-muted-hover",
        ghost:
          "bg-transparent text-foreground hover:bg-surface-muted-hover aria-expanded:bg-surface-muted-hover",
        destructive:
          "bg-danger-soft text-danger-soft-foreground hover:text-danger",
        "destructive-ghost":
          "bg-transparent text-danger hover:bg-danger-soft",
        link: "text-primary underline-offset-4 hover:text-primary-hover hover:underline",
      },
      size: {
        default: "h-11 gap-2 px-4",
        xs: "h-11 gap-1 px-2 text-xs",
        sm: "h-11 gap-1 px-3",
        lg: "h-12 gap-2 px-6 text-base",
        icon: "size-11",
        "icon-xs": "size-11",
        "icon-sm": "size-11",
        "icon-lg": "size-12",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
