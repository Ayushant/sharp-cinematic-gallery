"use client"

import { useEffect, useCallback } from "react"

export function useKeyboardShortcut(keys: string[], callback: () => void, deps: any[] = []) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Check for Ctrl+Shift+A or Ctrl+Alt+A
    const isCtrlShiftA = event.ctrlKey && event.shiftKey && event.key === "A"
    const isCtrlAltA = event.ctrlKey && event.altKey && event.key === "A"

    if (isCtrlShiftA || isCtrlAltA) {
      event.preventDefault()
      callback()
    }
  }, deps)

  useEffect(() => {
    document.addEventListener("keydown", handleKeyPress)
    return () => {
      document.removeEventListener("keydown", handleKeyPress)
    }
  }, [handleKeyPress])
}
