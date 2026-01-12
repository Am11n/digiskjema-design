import * as React from "react"

import { cn } from "@/lib/utils"

function Card({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-white text-[var(--fds-text-default,#1f2021)] flex flex-col gap-6 rounded-xl border border-[var(--fds-gray-200,#dbdbdc)] py-6 shadow-sm",
        className
      )}
      style={{
        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
        ...props.style
      }}
      {...props}
    />
  )
}

function CardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-header"
      className={cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-2 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      )}
      {...props}
    />
  )
}

function CardTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-title"
      className={cn("leading-none", className)}
      style={{
        fontWeight: 'var(--fds-font-weight-bold, 700)',
        fontSize: 'var(--fds-font-size-lg, 1.125rem)',
        color: 'var(--fds-text-default, #1f2021)',
        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
        ...props.style
      }}
      {...props}
    />
  )
}

function CardDescription({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-description"
      className={cn("text-sm", className)}
      style={{
        color: 'var(--fds-text-subtle, #717274)',
        fontSize: 'var(--fds-font-size-sm, 0.875rem)',
        fontFamily: 'var(--fds-font-family, system-ui, sans-serif)',
        ...props.style
      }}
      {...props}
    />
  )
}

function CardAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-action"
      className={cn(
        "col-start-2 row-span-2 row-start-1 self-start justify-self-end",
        className
      )}
      {...props}
    />
  )
}

function CardContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-content"
      className={cn("px-6", className)}
      {...props}
    />
  )
}

function CardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card-footer"
      className={cn("flex items-center px-6 [.border-t]:pt-6", className)}
      {...props}
    />
  )
}

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardAction,
  CardDescription,
  CardContent,
}
