"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const SelectContext = React.createContext(null)

export const Select = React.forwardRef(({ children, value, defaultValue, onValueChange, ...props }, ref) => {
  const [selectedValue, setSelectedValue] = React.useState(value || defaultValue || "")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value)
    }
  }, [value])

  const handleValueChange = React.useCallback(
    (newValue) => {
      setSelectedValue(newValue)
      onValueChange?.(newValue)
      setOpen(false)
    },
    [onValueChange],
  )

  return (
    <SelectContext.Provider value={{ value: selectedValue, onValueChange: handleValueChange, open, setOpen }}>
      <div ref={ref} className="relative" {...props}>
        {children}
      </div>
    </SelectContext.Provider>
  )
})

Select.displayName = "Select"

export const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectTrigger must be used within a Select component")
  }

  const { open, setOpen } = context

  return (
    <button
      ref={ref}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      onClick={() => setOpen(!open)}
      type="button"
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  )
})

SelectTrigger.displayName = "SelectTrigger"

export const SelectValue = React.forwardRef(({ className, placeholder, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectValue must be used within a Select component")
  }

  const { value } = context

  return (
    <span ref={ref} className={cn("block truncate", className)} {...props}>
      {value || placeholder}
    </span>
  )
})

SelectValue.displayName = "SelectValue"

export const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectContent must be used within a Select component")
  }

  const { open } = context

  if (!open) return null

  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80",
        "left-0 top-full mt-1 w-full",
        className,
      )}
      {...props}
    >
      <div className="p-1">{children}</div>
    </div>
  )
})

SelectContent.displayName = "SelectContent"

export const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) {
    throw new Error("SelectItem must be used within a Select component")
  }

  const { value: selectedValue, onValueChange } = context

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        selectedValue === value && "bg-accent text-accent-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {selectedValue === value && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        )}
      </span>
      <span className="truncate">{children}</span>
    </div>
  )
})

SelectItem.displayName = "SelectItem"
