"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Briefcase, Layers, FlaskConical } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NavRoute {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  shortcut: string;
}

const routes: NavRoute[] = [
  { name: "Home", href: "/", icon: Home, shortcut: "1" },
  { name: "Experience", href: "/experience", icon: Briefcase, shortcut: "2" },
  { name: "Projects", href: "/projects", icon: Layers, shortcut: "3" },
  { name: "Playground", href: "/playground", icon: FlaskConical, shortcut: "4" },
];

export function FloatingDock() {
  const pathname = usePathname();
  const router = useRouter();

  // Keyboard navigation shortcuts [1] - [4]
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing inside input, textarea, or contentEditable
      const target = e.target as HTMLElement;
      if (
        target &&
        (target.tagName === "INPUT" ||
          target.tagName === "TEXTAREA" ||
          target.isContentEditable)
      ) {
        return;
      }

      if (e.key >= "1" && e.key <= "4") {
        const index = parseInt(e.key, 10) - 1;
        if (routes[index]) {
          e.preventDefault();
          if (routes[index].href !== pathname) {
            window.dispatchEvent(
              new CustomEvent("route-change-start", {
                detail: { to: routes[index].href },
              })
            );
          }
          router.push(routes[index].href);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [router]);

  return (
    <div className="fixed inset-x-0 bottom-0 z-70 pointer-events-none flex justify-center">
      <nav
        aria-label="Primary Navigation"
        className="relative flex h-14 w-fit items-center justify-center gap-1.5 sm:gap-2 overflow-visible rounded-t-4xl bg-background px-3.5 py-2 inset-shadow-sm dark:inset-shadow-white/50 inset-shadow-black/50 backdrop-blur-3xl pointer-events-auto transition-all duration-300 ease-out"
        style={{
          boxShadow:
            "inset 0 1px 1px rgba(255, 255, 255, 0.15), 0 20px 40px -15px rgba(0, 0, 0, 0.3)",
        }}
      >
        {routes.map((route) => {
          const isActive = pathname === route.href;
          const Icon = route.icon;

          return (
            <div
              key={route.href}
              className="relative group flex items-center justify-center"
            >
              {/* Tooltip */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-50 opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out flex flex-col items-center">
                <div className="rounded-full bg-background dark:bg-neutral-700 px-3 py-2 font-semibold tracking-wider text-foreground text-base shadow-lg backdrop-blur-md whitespace-nowrap font-mono">
                  {route.name}
                </div>
                <div className="-mt-1 h-2 w-2 rotate-45 bg-background dark:bg-neutral-700" />
              </div>

              {/* Navigation Link with size-10 hover:size-12 magnification */}
              <Link
                href={route.href}
                aria-label={`${route.name} (Shortcut: ${route.shortcut})`}
                aria-current={isActive ? "page" : undefined}
                className="flex size-10 hover:size-12 items-center justify-center rounded-full text-muted-foreground transition-all duration-200 ease-out hover:bg-muted/80 hover:text-foreground active:scale-95"
              >
                <Icon
                  className={`size-5 transition-transform duration-200 ease-out group-hover:scale-125 ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
              </Link>
            </div>
          );
        })}

        {/* Vertical divider */}
        <div
          aria-hidden="true"
          className="my-auto h-6 w-px shrink-0 bg-muted-foreground/30 transition-all duration-300"
        />

        {/* Theme Toggle with Tooltip */}
        <div className="relative group flex items-center justify-center">
          <div className="absolute -top-14 left-1/2 -translate-x-1/2 pointer-events-none z-50 opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out flex flex-col items-center">
            <div className="rounded-full bg-background dark:bg-neutral-700 px-3 py-2 font-semibold tracking-wider text-foreground text-base shadow-lg backdrop-blur-md whitespace-nowrap font-mono">
              Theme
            </div>
            <div className="-mt-1 h-2 w-2 rotate-45 bg-background dark:bg-neutral-700" />
          </div>
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
