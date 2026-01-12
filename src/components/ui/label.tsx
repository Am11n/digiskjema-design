import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"

import { cn } from "@/lib/utils"

function Label({
  className,
  ...props
}: React.ComponentProps<typeof LabelPrimitive.Root>) {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        "flex items-center gap-2 leading-none select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      style={{
        fontSize: 'var(--fds-font-size-sm, 0.875rem)',
        fontWeight: 'var(--fds-font-weight-medium, 500)',
        color: 'var(--fds-text-default, #1f2021)',
        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
        ...props.style
      }}
      {...props}
    />
  )
}

export { Label }
