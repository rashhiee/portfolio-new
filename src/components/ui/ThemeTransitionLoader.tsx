"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export type ThemeTarget = "light" | "dark";

type TransitionListener = (targetTheme: ThemeTarget) => void;
const transitionListeners = new Set<TransitionListener>();

// Global dispatch helper to trigger the 1.5-second organic center-opening loader
export function triggerThemeTransition(targetTheme: ThemeTarget) {
  transitionListeners.forEach((listener) => listener(targetTheme));
}

// Exact organic aperture path traced from the Mastak reference
const ORGANIC_PATH =
  "M 101.40,0.00 C 101.17,12.62 102.10,23.35 100.00,36.60 C 97.90,49.85 96.50,65.63 88.81,79.51 C 81.12,93.40 68.76,113.17 53.85,119.90 C 38.93,126.63 16.32,122.64 -0.70,119.90 C -17.72,117.17 -35.66,112.33 -48.25,103.50 C -60.84,94.66 -69.00,78.67 -76.22,66.89 C -83.45,55.11 -87.65,43.96 -91.61,32.82 C -95.57,21.67 -98.37,11.78 -100.00,0.00 C -101.63,-11.78 -102.10,-23.56 -101.40,-37.86 C -100.70,-52.17 -103.26,-71.73 -95.80,-85.83 C -88.34,-99.92 -72.49,-115.06 -56.64,-122.43 C -40.79,-129.79 -17.95,-133.16 -0.70,-130.00 C 16.55,-126.84 33.10,-112.75 46.85,-103.50 C 60.61,-94.24 72.73,-85.19 81.82,-74.47 C 90.91,-63.74 98.14,-51.54 101.40,-39.13 C 104.66,-26.72 101.63,-12.62 101.40,0.00 Z";

export function ThemeTransitionLoader() {
  const { setTheme } = useTheme();
  const [isActive, setIsActive] = React.useState(false);
  const [targetTheme, setTargetTheme] = React.useState<ThemeTarget>("dark");
  const [isFadingOut, setIsFadingOut] = React.useState(false);

  const isRunningRef = React.useRef(false);

  React.useEffect(() => {
    const onTrigger = (nextTheme: ThemeTarget) => {
      if (isRunningRef.current) return;

      isRunningRef.current = true;
      setTargetTheme(nextTheme);
      setIsActive(true);
      setIsFadingOut(false);

      // At 1050ms: The organic shape has continuously expanded to fully cover the screen.
      // Seamlessly flip the underlying DOM classes so there is zero flicker.
      const switchTimer = setTimeout(() => {
        if (nextTheme === "dark") {
          document.documentElement.classList.remove("light");
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
          document.documentElement.classList.add("light");
        }
        document.documentElement.style.colorScheme = nextTheme;
        setTheme(nextTheme);
        setIsFadingOut(true);
      }, 1050);

      // At exactly 1500ms (1.5s): Complete transition and release lock
      const finishTimer = setTimeout(() => {
        setIsActive(false);
        setIsFadingOut(false);
        isRunningRef.current = false;
      }, 1500);
    };

    transitionListeners.add(onTrigger);
    return () => {
      transitionListeners.delete(onTrigger);
    };
  }, [setTheme]);

  const isTargetDark = targetTheme === "dark";

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          id="theme-transition-container"
          initial={{ opacity: 1 }}
          animate={{ opacity: isFadingOut ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.42, ease: "easeOut" }}
          className="fixed inset-0 z-[99999] pointer-events-none select-none overflow-hidden flex items-center justify-center"
          aria-hidden="true"
        >
          {/* Continuous, unbroken expansion directly over the live screen (NO solid backdrop) */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 0.85, 28] }}
            transition={{
              duration: 1.15,
              times: [0, 0.38, 1],
              ease: "easeInOut",
            }}
            className="relative flex items-center justify-center origin-center"
          >
            <svg
              viewBox="-115 -145 230 290"
              className="w-[200px] h-[255px] sm:w-[240px] sm:h-[305px] overflow-visible drop-shadow-[0_0_30px_rgba(0,0,0,0.15)]"
            >
              <path
                d={ORGANIC_PATH}
                fill={isTargetDark ? "#090D12" : "#FFFFFF"}
              />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default ThemeTransitionLoader;
