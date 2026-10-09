"use client";

// A portfolio index built as a wheel you turn.
import * as React from "react";
import { cn } from "@/lib/utils";

export interface WorksWheelItem {
  /** Project/article name. Shown beside the front card and in the index. */
  title: string;
  /** Cover art. Any src an <img> takes. */
  image: string;
  /** Where the card links to. Omit for a wheel that only browses. */
  href?: string;
  /** Optional metadata */
  id?: string;
  description?: string;
  category?: string;
  date?: string;
  readTime?: string;
}

export interface WorksWheelProps extends Omit<
  React.ComponentPropsWithoutRef<"section">,
  "children"
> {
  items: WorksWheelItem[];
  /** Sits in the middle of the ring. @default undefined */
  label?: string;
  /** Label on the card's hover affordance. Omit to drop it. @default undefined */
  action?: string;
  /** Optional callback fired when an item is clicked */
  onItemSelect?: (item: WorksWheelItem, index: number) => void;
}

/* Geometry.
   - Initial ring: sized to fit 100% inside one screen without overflowing edges or bottom dock.
   - Drum scroll: scales up to full prominent card size one by one on turn. */
const CARD_H = 0.48; // front card height, of the stage
const CARD_MAX_W = 0.42; // front card max width, of the stage
const CARD_RATIO = 1.46; // card width / height
const STEP = 38; // degrees between cards on the drum
const DRUM = 2.18; // drum radius, in card heights
const LENS = 2.8; // perspective distance
const BOW = 1.76;
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v: number, lo: number, hi: number) =>
  Math.min(hi, Math.max(lo, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

type Stage = { w: number; h: number };

const rad = (deg: number) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the front. */
const bowAt = (drumDeg: number, bow: number) =>
  -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: ring to drum */
function place(
  ringDeg: number,
  drumDeg: number,
  ringR: number,
  drumR: number,
  bow: number,
  m: number,
) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

export function WorksWheel({
  items,
  label,
  action,
  onItemSelect,
  className,
  ...props
}: WorksWheelProps) {
  const stageRef = React.useRef<HTMLDivElement>(null);
  const wheelRef = React.useRef<HTMLDivElement>(null);
  const cardRefs = React.useRef<(HTMLElement | null)[]>([]);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const titleRef = React.useRef<HTMLDivElement>(null);

  const turn = React.useRef(0);
  const target = React.useRef(0);
  const [active, setActive] = React.useState(0);
  const [stage, setStage] = React.useState<Stage>({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const isMobile = w > 0 && w < 640;
    const maxWFactor = isMobile ? 0.65 : CARD_MAX_W;
    const cardW = Math.min(h * CARD_H * CARD_RATIO, w * maxWFactor);
    const cardH = cardW / CARD_RATIO;
    const drumR = cardH * DRUM;

    // A larger initial ring circle that frames the center label beautifully while fitting in the screen
    const ringRatio = isMobile ? 0.31 : 0.34;
    const maxRingRadius = Math.min(h * ringRatio, w * (isMobile ? 0.34 : 0.33));
    const ringR = Math.max(115, maxRingRadius);
    const arcCardW = (2 * Math.PI * ringR) / (count || 1);
    // Scales cards in the initial ring so they form an expansive, harmonious closed loop
    const ringScale = clamp((arcCardW * 0.82) / (cardW || 1), 0.18, 0.48);

    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * BOW,
      depth: cardH * LENS,
    };
  }, [stage, count]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * STEP;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild as HTMLElement | null;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced]);

  const to = React.useCallback(
    (next: number) => {
      target.current = clamp(next, 0, last + 1);
    },
    [last],
  );

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const onWheel = (event: WheelEvent) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > 0 && next < last + 1) event.preventDefault();
      to(next);
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(Math.round(target.current)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last]);

  const drag = React.useRef<number | null>(null);
  const dragDistance = React.useRef(0);
  const settling = React.useRef(0);

  return (
    <section
      aria-label="Works Index"
      className={cn(
        "bg-transparent text-foreground relative h-full min-h-[24rem] w-full overflow-hidden select-none font-sans",
        className,
      )}
      style={{ fontFamily: '"Inter Tight", sans-serif', fontOpticalSizing: "auto" }}
      {...props}
    >
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label="Works Wheel"
        aria-activedescendant={`works-wheel-${active}`}
        className="focus-visible:outline-foreground absolute inset-0 cursor-grab touch-pan-x outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 active:cursor-grabbing"
        style={{ perspective: `${metrics.depth}px` }}
        onPointerDown={(event) => {
          drag.current = event.clientY;
          dragDistance.current = 0;
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          if (drag.current === null) return;
          const delta = drag.current - event.clientY;
          dragDistance.current += Math.abs(delta);
          to(target.current + delta / DRAG_UNITS);
          drag.current = event.clientY;
        }}
        onPointerUp={() => {
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        }}
      >
        <div
          ref={wheelRef}
          className="absolute top-1/2 left-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = (item.href && !onItemSelect ? "a" : "div") as "a";
            return (
              <React.Fragment key={item.title}>
                <Tag
                  id={`works-wheel-${i}`}
                  role="option"
                  aria-selected={i === active}
                  href={item.href && !onItemSelect ? item.href : undefined}
                  onClick={(e) => {
                    if (dragDistance.current > 10) return;
                    if (onItemSelect) {
                      e.preventDefault();
                      if (active === i && turn.current >= 0.8) {
                        onItemSelect(item, i);
                      } else {
                        to(i + 1);
                      }
                    }
                  }}
                  ref={(node: HTMLElement | null) => {
                    cardRefs.current[i] = node;
                  }}
                  className="group absolute [backface-visibility:hidden] cursor-pointer"
                  style={{
                    width: metrics.cardW,
                    height: metrics.cardH,
                    marginLeft: -metrics.cardW / 2,
                    marginTop: -metrics.cardH / 2,
                  }}
                >
                  {/* Clean card container without text overlay or gradient */}
                  <span className="relative block size-full overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 shadow-[0_20px_45px_-12px_rgba(0,0,0,0.35)] dark:shadow-[0_25px_60px_rgba(0,0,0,0.6)] bg-neutral-900">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover select-none"
                    />
                  </span>
                </Tag>
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Center label in the initial ring (fades out smoothly on scroll) */}
      {label && (
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight text-3xl sm:text-5xl md:text-6xl font-medium text-foreground select-none"
          style={{ fontFamily: '"Inter Tight", sans-serif', fontOpticalSizing: "auto" }}
        >
          {label}
        </div>
      )}

      {/* Left side: single-line short blog/project name in Inter Tight font */}
      <div
        ref={titleRef}
        className="pointer-events-none absolute top-1/2 left-[5%] sm:left-[8%] md:left-[10%] -translate-y-1/2 tracking-tight opacity-0 font-medium text-2xl sm:text-4xl md:text-5xl text-foreground select-none whitespace-nowrap"
        style={{ fontFamily: '"Inter Tight", sans-serif', fontOpticalSizing: "auto" }}
      >
        {items[active]?.title}
      </div>

      {/* Right corner: vertical list of short titles in Inter Tight font */}
      <ol
        className="absolute top-[8%] sm:top-[12%] right-[3%] sm:right-[4%] text-right text-xs sm:text-sm space-y-1 sm:space-y-1.5 max-h-[80vh] overflow-y-auto no-scrollbar z-10 select-none"
        style={{ fontFamily: '"Inter Tight", sans-serif', fontOpticalSizing: "auto" }}
      >
        {items.map((item, i) => (
          <li key={item.title}>
            <button
              type="button"
              onClick={() => to(i + 1)}
              className={cn(
                "cursor-pointer transition-colors outline-none block text-right ml-auto",
                i === active
                  ? "text-foreground font-semibold dark:text-white"
                  : "text-neutral-500 hover:text-neutral-900 dark:text-neutral-500 dark:hover:text-neutral-300",
              )}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ol>
    </section>
  );
}

export default WorksWheel;
