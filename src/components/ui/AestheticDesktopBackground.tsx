"use client";

import * as React from "react";
import Image from "next/image";

interface AestheticDesktopBackgroundProps {
  className?: string;
  hideTopRight?: boolean;
}

export function AestheticDesktopBackground({
  className = "",
  hideTopRight = false,
}: AestheticDesktopBackgroundProps) {
  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none hidden md:block dark:hidden bg-[#F1EADD] ${className}`}
    >
      {/* ── Master 4K Aesthetic Background (Covers canvas with high fidelity) ── */}
      <Image
        src={hideTopRight ? "/images/bg-projects-4k.webp" : "/images/bg-image1-4k.webp"}
        alt="Aesthetic canvas background"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* ── Corner Anchors (Guarantees corners stay pinned on all aspect ratios) ── */}
      {/* Top-Left: Potted Plant & Cute Cat */}
      <div className="absolute top-0 left-0 w-[24vw] max-w-[420px] aspect-[585/489] pointer-events-none">
        <Image
          src="/images/corners/corner-cat-tl.webp"
          alt=""
          fill
          priority
          sizes="24vw"
          className="object-contain object-top-left"
        />
      </div>

      {/* Top-Right: Orbiting Solar System & Sparkle Stars (Omitted when hideTopRight is true) */}
      {!hideTopRight && (
        <div className="absolute top-0 right-0 w-[24vw] max-w-[420px] aspect-[586/489] pointer-events-none">
          <Image
            src="/images/corners/corner-planets-tr.webp"
            alt=""
            fill
            priority
            sizes="24vw"
            className="object-contain object-top-right"
          />
        </div>
      )}

      {/* Bottom-Left: Vintage Radio, Music Notes & Plant */}
      <div className="absolute bottom-0 left-0 w-[26vw] max-w-[460px] aspect-[635/490] pointer-events-none">
        <Image
          src="/images/corners/corner-radio-bl.webp"
          alt=""
          fill
          priority
          sizes="26vw"
          className="object-contain object-bottom-left"
        />
      </div>

      {/* Bottom-Right: Cozy Cottage House, Flowering Tree & Moon */}
      <div className="absolute bottom-0 right-0 w-[26vw] max-w-[460px] aspect-[636/518] pointer-events-none">
        <Image
          src="/images/corners/corner-house-br.webp"
          alt=""
          fill
          priority
          sizes="26vw"
          className="object-contain object-bottom-right"
        />
      </div>
    </div>
  );
}

export default AestheticDesktopBackground;
