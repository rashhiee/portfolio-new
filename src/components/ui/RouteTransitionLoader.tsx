"use client";

import * as React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import BouncingSquare from "@/components/ui/bouncing-square";

// Configured duration for smooth, elegant transitions (1.5s)
const TRANSITION_DURATION_MS = 1500;

export function RouteTransitionLoader() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const currentPathnameRef = React.useRef(pathname);
  const loadingStartTimeRef = React.useRef<number | null>(null);
  const finishTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  // Keep ref up to date
  React.useEffect(() => {
    currentPathnameRef.current = pathname;
  }, [pathname]);
  // When pathname changes while loading, compute remaining time to ensure smooth total duration
  React.useEffect(() => {
    if (isLoading) {
      const startTime = loadingStartTimeRef.current || Date.now();
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, TRANSITION_DURATION_MS - elapsed);

      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
      }

      finishTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
        loadingStartTimeRef.current = null;
      }, remaining);
    }

    return () => {
      if (finishTimeoutRef.current) {
        clearTimeout(finishTimeoutRef.current);
      }
    };
  }, [pathname, isLoading]);

  // Intercept internal link clicks and keyboard navigation
  React.useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      // Ignore external, hash, tel, mailto, download, modifier keys or blank targets
      if (
        href.startsWith("http://") ||
        href.startsWith("https://") ||
        href.startsWith("mailto:") ||
        href.startsWith("tel:") ||
        href.startsWith("#") ||
        target.target === "_blank" ||
        target.getAttribute("download") !== null ||
        e.ctrlKey ||
        e.metaKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      try {
        const url = new URL(href, window.location.href);
        // Only trigger when navigating to a DIFFERENT pathname
        if (
          url.origin === window.location.origin &&
          url.pathname !== currentPathnameRef.current
        ) {
          e.preventDefault();
          e.stopPropagation();

          if (finishTimeoutRef.current) {
            clearTimeout(finishTimeoutRef.current);
          }

          // 1. Immediately cover the screen so there is ZERO glimpse of the old page switching
          loadingStartTimeRef.current = Date.now();
          setIsLoading(true);

          // 2. Perform the router transition behind the solid curtain
          setTimeout(() => {
            router.push(href);
          }, 80);
        }
      } catch {}
    };

    // Custom event for programmatic navigation (e.g. keyboard shortcuts [1]-[4])
    const handleCustomRouteStart = (e: Event) => {
      const customEvent = e as CustomEvent<{ to?: string }>;
      const targetHref = customEvent.detail?.to;

      if (targetHref && targetHref !== currentPathnameRef.current) {
        if (finishTimeoutRef.current) {
          clearTimeout(finishTimeoutRef.current);
        }

        loadingStartTimeRef.current = Date.now();
        setIsLoading(true);

        setTimeout(() => {
          router.push(targetHref);
        }, 80);
      }
    };

    // Popstate for browser back/forward buttons
    const handlePopState = () => {
      loadingStartTimeRef.current = Date.now();
      setIsLoading(true);
    };

    document.addEventListener("click", handleAnchorClick, { capture: true });
    window.addEventListener("route-change-start", handleCustomRouteStart);
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("click", handleAnchorClick, { capture: true });
      window.removeEventListener("route-change-start", handleCustomRouteStart);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [router]);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="route-loader-curtain"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white dark:bg-[#090D12] pointer-events-auto select-none"
          aria-live="polite"
          aria-busy="true"
        >
          <BouncingSquare />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default RouteTransitionLoader;
