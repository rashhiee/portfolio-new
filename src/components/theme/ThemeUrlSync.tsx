"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { useTheme } from "next-themes";

export function ThemeUrlSync() {
  const searchParams = useSearchParams();
  const { setTheme } = useTheme();

  React.useEffect(() => {
    const themeParam = searchParams.get("theme");
    if (themeParam === "light" || themeParam === "dark") {
      setTheme(themeParam);
    }
  }, [searchParams, setTheme]);

  return null;
}
