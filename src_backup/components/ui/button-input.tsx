import * as React from "react"
import { cn } from "@/lib/utils"

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost" }>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "bg-white text-black hover:bg-gray-200 h-11 px-6",
        variant === "outline" && "border border-white/10 bg-transparent hover:bg-white/5 h-11 px-6",
        variant === "ghost" && "hover:bg-white/5 h-11 px-6",
        className
      )}
      {...props}
    />
  )
)
Button.displayName = "Button"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "flex h-11 w-full rounded-lg bg-transparent px-4 py-2 text-sm placeholder:text-gray-500 focus:outline-none focus:ring-1 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
)
Input.displayName = "Input"

const Label = React.forwardRef<HTMLLabelElement, React.LabelHTMLAttributes<HTMLLabelElement>>(
  ({ className, ...props }, ref) => (
    <label ref={ref} className={cn("text-sm font-medium leading-none", className)} {...props} />
  )
)
Label.displayName = "Label"

const Separator = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn("h-px w-full", className)} {...props} />
  )
)
Separator.displayName = "Separator"

export { Button, Input, Label, Separator }
