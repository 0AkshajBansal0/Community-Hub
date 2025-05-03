"use client"

import React from "react"
import { cn } from "@/lib/utils"

const TabsContext = React.createContext(null)

export const Tabs = React.forwardRef(({ className, defaultValue, value, onValueChange, ...props }, ref) => {
  const [tabValue, setTabValue] = React.useState(value || defaultValue)

  const handleValueChange = React.useCallback(
    (newValue) => {
      setTabValue(newValue)
      onValueChange?.(newValue)
    },
    [onValueChange],
  )

  return (
    <TabsContext.Provider value={{ value: tabValue, onValueChange: handleValueChange }}>
      <div ref={ref} className={cn("w-full", className)} {...props} />
    </TabsContext.Provider>
  )
})

Tabs.displayName = "Tabs"

export const TabsList = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        className,
      )}
      {...props}
    />
  )
})

TabsList.displayName = "TabsList"

export const TabsTrigger = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsTrigger must be used within a Tabs component")
  }

  const { value: selectedValue, onValueChange } = context

  return (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        selectedValue === value ? "bg-background text-foreground shadow-sm" : "hover:bg-muted hover:text-foreground",
        className,
      )}
      onClick={() => onValueChange(value)}
      data-state={selectedValue === value ? "active" : "inactive"}
      {...props}
    />
  )
})

TabsTrigger.displayName = "TabsTrigger"

export const TabsContent = React.forwardRef(({ className, value, ...props }, ref) => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error("TabsContent must be used within a Tabs component")
  }

  const { value: selectedValue } = context

  return (
    <div
      ref={ref}
      className={cn(
        "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        selectedValue === value ? "block" : "hidden",
        className,
      )}
      data-state={selectedValue === value ? "active" : "inactive"}
      {...props}
    />
  )
})

TabsContent.displayName = "TabsContent"
