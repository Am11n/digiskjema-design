import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-[3px] focus-visible:ring-[0_0_0_3px_rgba(0,102,204,0.2)]",
  {
    variants: {
      variant: {
        default: "bg-[var(--fds-blue-60,#0066cc)] text-white hover:bg-[var(--fds-blue-70,#00315d)] border border-[var(--fds-blue-60,#0066cc)]",
        destructive:
          "bg-[var(--fds-red-60,#d8000c)] text-white hover:bg-[var(--fds-red-70,#a20009)] border border-[var(--fds-red-60,#d8000c)] focus-visible:ring-[0_0_0_3px_rgba(216,0,12,0.2)]",
        outline:
          "border border-[var(--fds-blue-60,#0066cc)] bg-white text-[var(--fds-blue-60,#0066cc)] hover:bg-[var(--fds-blue-50,#e7f3fa)] shadow-sm",
        secondary:
          "bg-[var(--fds-gray-100,#f7f7f7)] text-[var(--fds-text-default,#1f2021)] hover:bg-[var(--fds-gray-200,#dbdbdc)]",
        ghost:
          "hover:bg-[var(--fds-gray-100,#f7f7f7)] text-[var(--fds-text-default,#1f2021)]",
        link: "text-[var(--fds-blue-60,#0066cc)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
