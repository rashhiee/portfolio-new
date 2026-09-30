"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Mail, ChevronUp } from "lucide-react";

function GithubIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

function LinkedinIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
    </svg>
  );
}

function WhatsappIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

function InstagramIcon({ className = "size-4" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

interface SocialChannel {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  hoverBg: string;
  placeholderText: string;
}

const channels: SocialChannel[] = [
  {
    name: "GitHub",
    href: "https://github.com/rashhiee",
    icon: GithubIcon,
    color: "text-[var(--fg-primary)]",
    hoverBg: "hover:bg-[var(--border-subtle)]",
    placeholderText: "rashhiee",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/rashidpalathingal/?isSelfProfile=true",
    icon: LinkedinIcon,
    color: "text-[#0A66C2]",
    hoverBg: "hover:bg-[#0A66C2]/10",
    placeholderText: "Connect",
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/919048543681",
    icon: WhatsappIcon,
    color: "text-[#25D366]",
    hoverBg: "hover:bg-[#25D366]/10",
    placeholderText: "+91 9048543681",
  },
  {
    name: "Instagram",
    href: "https://instagram.com/mhd.rashiee",
    icon: InstagramIcon,
    color: "text-[#E4405F]",
    hoverBg: "hover:bg-[#E4405F]/10",
    placeholderText: "mhd.rashiee",
  },
  {
    name: "Email",
    href: "#",
    icon: Mail,
    color: "text-[var(--accent)]",
    hoverBg: "hover:bg-[var(--accent)]/10",
    placeholderText: "Get in touch",
  },
];

interface ContactPopoverProps {
  defaultOpen?: boolean;
}

export function ContactPopover({ defaultOpen = false }: ContactPopoverProps) {
  const [isOpen, setIsOpen] = React.useState(defaultOpen);
  const [activeTooltip, setActiveTooltip] = React.useState<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const shouldReduceMotion = useReducedMotion();

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("contact") === "open") {
        setIsOpen(true);
      }
    }
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative inline-flex items-center justify-center z-30"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => {
        setIsOpen(false);
        setActiveTooltip(null);
      }}
    >
      {/* Floating Popover Island */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.94 }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: shouldReduceMotion ? 0.05 : 0.18, ease: "easeOut" }}
            className="absolute -top-16 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center"
          >
            <div className="flex items-center gap-1.5 rounded-full border border-[var(--dock-border)] bg-[var(--bg-surface)] px-3 py-1.5 shadow-xl backdrop-blur-xl">
              {channels.map((ch) => {
                const Icon = ch.icon;
                const isHovered = activeTooltip === ch.name;

                return (
                  <div
                    key={ch.name}
                    className="relative flex items-center justify-center"
                    onMouseEnter={() => setActiveTooltip(ch.name)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Individual channel tooltip */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.9 }}
                          animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }}
                          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 2, scale: 0.92 }}
                          transition={{ duration: shouldReduceMotion ? 0.01 : 0.12 }}
                          className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 z-60"
                        >
                          <div className="flex items-center gap-1 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 text-[10px] font-mono text-[var(--fg-primary)] shadow-md whitespace-nowrap">
                            <span>{ch.name}</span>
                            <span className="text-[9px] text-[var(--accent)] font-semibold">
                              {ch.placeholderText}
                            </span>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Channel Button */}
                    <a
                      href={ch.href}
                      onClick={(e) => {
                        e.preventDefault();
                      }}
                      aria-label={`${ch.name} (${ch.placeholderText})`}
                      className={`flex size-9 items-center justify-center rounded-full transition-all duration-150 ${ch.color} ${ch.hoverBg} hover:scale-110 active:scale-95`}
                      title={`${ch.name} ${ch.placeholderText}`}
                    >
                      <Icon className="size-4.5" />
                    </a>
                  </div>
                );
              })}
            </div>
            {/* Popover bottom pointer indicator */}
            <div className="-mt-1 h-2 w-2 rotate-45 border-r border-b border-[var(--dock-border)] bg-[var(--bg-surface)]" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main "Get in touch" Pill Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-label="Get in touch - Connect via social channels"
        className="group relative inline-flex items-center gap-2.5 rounded-full border border-[var(--border-subtle)] bg-[var(--fg-primary)] px-5 py-2.5 font-mono text-sm font-medium text-[var(--bg-primary)] shadow-md transition-all duration-200 hover:scale-[1.02] hover:border-[var(--accent)] hover:shadow-lg active:translate-y-0.5 active:scale-[0.98] cursor-pointer"
      >
        <span>Get in touch</span>
        <motion.span
          animate={shouldReduceMotion ? {} : { rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex items-center justify-center text-[var(--accent)]"
        >
          <ChevronUp className="size-4" />
        </motion.span>
      </button>
    </div>
  );
}
