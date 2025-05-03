"use client"

import React from "react"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"

const DialogContext = React.createContext(null)

export const Dialog = React.forwardRef(({ children, open, onOpenChange, ...props }, ref) => {
  return (
    <DialogContext.Provider value={{ open, onOpenChange }}>
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50">
          <div ref={ref} className="relative" {...props}>
            {children}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  )
})

Dialog.displayName = "Dialog"

export const DialogTrigger = React.forwardRef(({ children, asChild = false, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("DialogTrigger must be used within a Dialog component")
  }

  const { onOpenChange } = context
  const Comp = asChild ? React.Fragment : "button"

  return (
    <Comp ref={ref} onClick={() => onOpenChange?.(true)} {...props}>
      {children}
    </Comp>
  )
})

DialogTrigger.displayName = "DialogTrigger"

export const DialogContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const context = React.useContext(DialogContext)
  if (!context) {
    throw new Error("DialogContent must be used within a Dialog component")
  }

  const { onOpenChange } = context

  return (
    <div
      ref={ref}
      className={cn(
        "fixed z-50 grid w-full max-w-lg scale-100 gap-4 border bg-background p-6 shadow-lg sm:rounded-lg md:w-full",
        className,
      )}
      {...props}
    >
      {children}
      <button
        className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        onClick={() => onOpenChange?.(false)}
      >
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </button>
    </div>
  )
})

DialogContent.displayName = "DialogContent"

export const DialogHeader = React.forwardRef(({ className, ...props }, ref) => {
  return <div ref={ref} className={cn("flex flex-col space-y-1.5 text-center sm:text-left", className)} {...props} />
})

DialogHeader.displayName = "DialogHeader"

export const DialogTitle = React.forwardRef(({ className, ...props }, ref) => {
  return <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight", className)} {...props} />
})

DialogTitle.displayName = "DialogTitle"
