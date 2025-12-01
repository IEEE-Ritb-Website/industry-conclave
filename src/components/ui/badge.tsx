import * as React from "react"
import { cn } from "@/lib/utils"

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
}

const badgeVariants = {
  default: "border-transparent bg-blue-600 text-white hover:bg-blue-700",
  secondary: "border-transparent bg-gray-800 text-gray-300 hover:bg-gray-700",
  destructive: "border-transparent bg-red-600 text-white hover:bg-red-700",
  outline: "text-gray-300 border-gray-600 hover:bg-gray-800",
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <div 
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        badgeVariants[variant],
        className
      )} 
      {...props} 
    />
  )
}