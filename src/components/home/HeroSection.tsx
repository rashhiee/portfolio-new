"use client";

import * as React from "react";
import Image from "next/image";

function WhatsappIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
    </svg>
  );
}

function LinkedinIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 448 512"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" />
    </svg>
  );
}

function InstagramIcon({ className = "size-5" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function GithubIcon({ className = "size-6" }: { className?: string }) {
  return (
    <svg
      stroke="currentColor"
      fill="currentColor"
      strokeWidth="0"
      viewBox="0 0 24 24"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M12 2A10 10 0 0 0 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.87 1.52 2.34 1.07 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z" />
    </svg>
  );
}

interface HeroSectionProps {
  defaultContactOpen?: boolean;
}

export function HeroSection({ defaultContactOpen = false }: HeroSectionProps) {
  const [isContactOpen, setIsContactOpen] = React.useState(defaultContactOpen);
  const contactContainerRef = React.useRef<HTMLDivElement | null>(null);

  // Close popover when clicking anywhere else outside
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent | TouchEvent) => {
      if (
        contactContainerRef.current &&
        !contactContainerRef.current.contains(e.target as Node)
      ) {
        setIsContactOpen(false);
      }
    };

    if (isContactOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("touchstart", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("touchstart", handleOutsideClick);
    };
  }, [isContactOpen]);

  return (
    <section className="relative w-full h-dvh flex items-center justify-center overflow-hidden">
      {/* ── Background Illustration (Pure Images: Light & Dark Mode) ──── */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        {/* Light Mode Pure Image */}
        <Image
          src="/computerfield2.webp"
          alt="Developer working on laptop on hillside sketch"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hero-image-light dark:hidden select-none"
        />

        {/* Dark Mode Pure Image */}
        <Image
          src="/darkmodecomputer1.webp"
          alt="Developer working on laptop on hillside dark mode"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center hero-image-dark hidden dark:block select-none"
        />
      </div>

      {/* ── Content Layer (Top-Left Aligned with Generous Margins) ──────── */}
      <div className="relative z-10 w-full h-full pointer-events-none flex flex-col justify-start">
        <div className="pt-16 sm:pt-20 md:pt-24 lg:pt-28 pl-6 sm:pl-12 md:pl-20 lg:pl-28 max-w-2xl space-y-4">
          {/* Heading + Clean Outlined Badge with Black Text in Light Mode */}
          <div className="flex items-center flex-wrap gap-3">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal tracking-tight text-neutral-900 dark:text-neutral-100">
              Full Stack Developer
            </h1>
            <span className="font-sans text-xs font-medium border border-black/80 dark:border-neutral-500 rounded-full px-3 py-0.5 text-black dark:text-neutral-200 select-none">
              Open to work
            </span>
          </div>

          {/* Bio Text */}
          <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-300 leading-relaxed max-w-xl font-sans">
            Hey, I&apos;m{" "}
            <span className="font-handwriting italic text-xl text-neutral-900 dark:text-neutral-100">
              Rashid
            </span>
            . I design and build interfaces where creativity meets serious engineering.
            From clean interfaces to scalable backend workflows, I care about how it looks, feels, and works.
          </p>

          {/* Action Row: "Let's Talk" Button + GitHub Icon */}
          <div className="pointer-events-auto flex items-center gap-3.5 pt-2">
            {/* "Let's Talk" Pill Button (Click to toggle popover, click outside to close) */}
            <div
              ref={contactContainerRef}
              className="relative inline-block"
            >
              <button
                type="button"
                onClick={() => setIsContactOpen((prev) => !prev)}
                aria-expanded={isContactOpen}
                aria-label="Let's Talk - Contact channels"
                className="px-4 py-2 bg-black text-white dark:bg-white dark:text-black rounded-full font-mono text-xs sm:text-sm tracking-wider cursor-pointer shadow-sm hover:opacity-90 active:scale-95 transition-all"
              >
                Let&apos;s Talk
              </button>

              {/* Popover (Remains open on click, closes when clicking anywhere else) */}
              <div
                className={`absolute -top-14 left-1/2 -translate-x-1/2 z-50 transition-all duration-200 ease-out flex flex-col items-center ${
                  isContactOpen
                    ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                    : "opacity-0 translate-y-2 scale-90 pointer-events-none"
                }`}
              >
                <div className="rounded-full bg-white dark:bg-neutral-900 px-4 py-2 font-semibold tracking-wider text-base shadow-2xl backdrop-blur-md whitespace-nowrap font-mono border border-neutral-200 dark:border-neutral-700">
                  <div className="flex gap-4 items-center text-xl">
                    {/* LinkedIn */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A66C2] hover:scale-115 transition-transform duration-200 ease-out flex items-center"
                      href="https://www.linkedin.com/in/rashidpalathingal/?isSelfProfile=true"
                      aria-label="LinkedIn"
                    >
                      <LinkedinIcon className="size-5" />
                    </a>

                    {/* WhatsApp */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#25D366] hover:scale-115 transition-transform duration-200 ease-out flex items-center"
                      href="https://wa.me/919048543681"
                      aria-label="WhatsApp (+91 9048543681)"
                    >
                      <WhatsappIcon className="size-5" />
                    </a>

                    {/* Instagram */}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#E4405F] hover:scale-115 transition-transform duration-200 ease-out flex items-center"
                      href="https://instagram.com/mhd.rashiee"
                      aria-label="Instagram (mhd.rashiee)"
                    >
                      <InstagramIcon className="size-5" />
                    </a>
                  </div>
                </div>
                <div className="-mt-1 h-2 w-2 rotate-45 bg-white dark:bg-neutral-900 border-r border-b border-neutral-200 dark:border-neutral-700" />
              </div>
            </div>

            {/* Standalone GitHub Icon with Full Dark Tooltip */}
            <div className="relative group flex items-center justify-center">
              <a
                target="_blank"
                rel="noopener noreferrer"
                className="text-black dark:text-white hover:opacity-70 active:scale-95 transition-opacity flex items-center justify-center cursor-pointer"
                href="https://github.com/rashhiee"
                aria-label="GitHub (rashhiee)"
              >
                <GithubIcon className="size-6 sm:size-7" />
              </a>

              {/* Solid Full Dark Tooltip with Crisp White Text */}
              <div className="absolute -top-11 left-1/2 -translate-x-1/2 pointer-events-none z-50 opacity-0 translate-y-2 scale-90 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 transition-all duration-200 ease-out flex flex-col items-center">
                <div className="rounded-full bg-black text-white px-2.5 py-1 text-xs font-mono font-medium shadow-xl border border-neutral-800 whitespace-nowrap">
                  Github
                </div>
                <div className="-mt-1 h-1.5 w-1.5 rotate-45 bg-black" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
