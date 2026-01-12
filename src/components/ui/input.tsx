import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-9 w-full min-w-0 rounded-md border bg-white px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:ring-[3px] focus-visible:ring-[0_0_0_3px_rgba(0,102,204,0.2)]",
        "aria-invalid:ring-[0_0_0_3px_rgba(216,0,12,0.2)] aria-invalid:border-[var(--fds-red-60,#d8000c)]",
        className
      )}
      style={{
        borderColor: 'var(--fds-gray-200, #dbdbdc)',
        color: 'var(--fds-text-default, #1f2021)',
        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
        fontSize: 'var(--fds-font-size-sm, 0.875rem)',
        ...(props.style || {})
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = 'var(--fds-blue-60, #0066cc)';
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = 'var(--fds-gray-200, #dbdbdc)';
        props.onBlur?.(e);
      }}
      {...props}
    />
  )
}

export { Input }
