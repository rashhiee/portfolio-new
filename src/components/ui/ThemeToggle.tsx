"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { triggerThemeTransition } from "./ThemeTransitionLoader";

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { resolvedTheme } = useTheme();
  const [isAnimating, setIsAnimating] = React.useState(false);

  const mounted = React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isAnimating) return;

    setIsAnimating(true);
    const nextTheme = isDark ? "light" : "dark";
    triggerThemeTransition(nextTheme);

    setTimeout(() => {
      setIsAnimating(false);
    }, 1500);
  };

  return (
    <button
      type="button"
      id="theme-toggle-btn"
      onClick={toggleTheme}
      disabled={isAnimating}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative flex size-10 hover:size-12 items-center cursor-pointer justify-center rounded-full text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/80 hover:text-foreground active:scale-95 disabled:pointer-events-none ${className}`}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <div
        className={`size-5 flex items-center justify-center transition-transform duration-300 ${
          isAnimating ? "scale-90 rotate-45" : ""
        }`}
      >
        {mounted && !isDark ? (
          <Moon className="size-5 text-foreground transition-transform duration-200 ease-out group-hover:scale-125" />
        ) : (
          <Sun className="size-5 text-foreground transition-transform duration-200 ease-out group-hover:scale-125" />
        )}
      </div>
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
