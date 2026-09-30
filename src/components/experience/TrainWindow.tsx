"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValue, useDragControls, animate } from "framer-motion";
import { useTheme } from "next-themes";

export function TrainWindow() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const [containerHeight, setContainerHeight] = React.useState(0);
  const [isShutterOpen, setIsShutterOpen] = React.useState(false);
  const [hasInteracted, setHasInteracted] = React.useState(false);
  const y = useMotionValue(0);
  const dragControls = useDragControls();

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;
  // Shutter can slide between fully closed (0) and fully open (-(containerHeight - 30))
  const maxUpY = -(containerHeight > 30 ? containerHeight - 30 : 210);

  React.useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver(() => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (rect && rect.height > 0) {
        setContainerHeight(rect.height);
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const animateShutter = React.useCallback(
    (targetY: number) => {
      animate(y, targetY, {
        type: "tween",
        ease: [0.32, 0.72, 0, 1],
        duration: 0.45,
      });
    },
    [y]
  );

  const playAudio = (src: string) => {
    try {
      const audio = new Audio(src);
      audio.volume = 0.4;
      audio.play().catch(() => {});
    } catch {}
  };

  const openShutter = React.useCallback(() => {
    setIsShutterOpen(true);
    animateShutter(maxUpY);
    playAudio("/images/experience/shutter-sound.m4a");
  }, [maxUpY, animateShutter]);

  const closeShutter = React.useCallback(() => {
    setIsShutterOpen(false);
    animateShutter(0);
    playAudio("/images/experience/shutter-sound.m4a");
  }, [animateShutter]);

  // Smooth auto-open on initial load
  React.useEffect(() => {
    if (containerHeight > 0 && !hasInteracted) {
      const timer = setTimeout(() => {
        openShutter();
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [containerHeight, hasInteracted, openShutter]);

  const handleDragStart = () => {
    if (!hasInteracted) {
      setHasInteracted(true);
    }
  };

  return (
    <div className="relative w-60 h-45 md:w-75 md:h-60 select-none">
      {/* 1. Train Scenery Video (Switches between Day and Night based on theme) */}
      <div className="absolute inset-0 overflow-hidden rounded-[5rem] m-1 z-0">
        <video
          key={isDark ? "night" : "day"}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source
            src={
              isDark
                ? "/images/experience/train-video-night.webm"
                : "/images/experience/train-video-day.webm"
            }
            type="video/webm"
          />
        </video>
      </div>

      {/* 2. Window Inner Frame */}
      <div className="absolute inset-0 overflow-hidden rounded-[3rem] z-1 pointer-events-none">
        <Image
          src="/images/experience/window-inner-frame.webp"
          alt="window-inner-frame"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-fill scale-90 brightness-100 dark:brightness-30 select-none"
          priority
        />
      </div>

      {/* 3. Draggable / Pullable Shutter with spring animation */}
      <div className="absolute inset-0 overflow-hidden m-2.5 md:m-4 rounded-2xl z-2">
        <div ref={containerRef} className="absolute inset-0 overflow-hidden">
          <motion.div
            style={{ y }}
            drag="y"
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: maxUpY, bottom: 0 }}
            dragElastic={0}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDragEnd={(_, info) => {
              if (!containerHeight) return;
              const currentY = y.get();
              const velY = info.velocity.y;
              const threshold = 0.4 * (containerHeight - 30);
              if (isShutterOpen) {
                if (currentY - maxUpY >= threshold || velY > 700) {
                  closeShutter();
                } else {
                  openShutter();
                }
              } else {
                if (Math.abs(currentY) >= threshold || velY < -700) {
                  openShutter();
                } else {
                  closeShutter();
                }
              }
            }}
            className="absolute inset-0 h-full w-full flex justify-center items-center rounded-4xl select-none"
          >
            <Image
              src="/images/experience/window-shutter.webp"
              alt="window-shutter"
              fill
              sizes="(max-width: 768px) 100vw, 300px"
              draggable={false}
              className="pointer-events-none absolute inset-0 h-full w-full object-fill select-none brightness-100 dark:brightness-30"
            />
            {/* Grab / Click Handle at bottom of shutter */}
            <div
              onPointerDown={(e) => {
                handleDragStart();
                dragControls.start(e);
              }}
              onClick={() => {
                if (isShutterOpen) closeShutter();
                else openShutter();
              }}
              className="absolute bottom-1 rounded-b-[6rem] w-[90%] h-6 cursor-grab active:cursor-grabbing touch-none select-none"
              style={{ touchAction: "none" }}
              aria-label="Toggle train window shutter"
            />
          </motion.div>
        </div>
      </div>

      {/* 4. Window Outer Frame */}
      <div className="absolute inset-0 overflow-hidden rounded-[3rem] z-3 pointer-events-none">
        <Image
          src="/images/experience/window-outer-frame.webp"
          alt="window-outer-frame"
          fill
          sizes="(max-width: 768px) 100vw, 300px"
          className="object-fill brightness-100 dark:brightness-30 select-none"
          priority
        />
      </div>
    </div>
  );
}
