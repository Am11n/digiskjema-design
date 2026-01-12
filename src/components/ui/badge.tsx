import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:ring-[3px] transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--fds-blue-60,#0066cc)] text-white [a&]:hover:bg-[var(--fds-blue-70,#00315d)]",
        secondary:
          "border-transparent bg-[var(--fds-gray-300,#c0c1c2)] text-[var(--fds-text-default,#1f2021)] [a&]:hover:bg-[var(--fds-gray-200,#dbdbdc)]",
        destructive:
          "border-transparent bg-[var(--fds-red-60,#d8000c)] text-white [a&]:hover:bg-[var(--fds-red-70,#a20009)] focus-visible:ring-[0_0_0_3px_rgba(216,0,12,0.2)]",
        outline:
          "text-[var(--fds-text-default,#1f2021)] border-[var(--fds-gray-200,#dbdbdc)] [a&]:hover:bg-[var(--fds-gray-100,#f7f7f7)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "span"

  return (
    <Comp
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      style={{
        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
        fontSize: 'var(--fds-font-size-xs, 0.75rem)',
        fontWeight: 'var(--fds-font-weight-bold, 700)',
        ...props.style
      }}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
