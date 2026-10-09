"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useMotionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { BLOG_POSTS, type BlogPost } from "@/data/blogs";

type Direction = "left" | "right";

interface CollageCardItem {
  id: number;
  order: number;
  slug: string;
  title: string;
  category: string;
  readingTime: string;
  zIndex: number;
  direction: Direction;
  src: string;
  alt: string;
  baseX: number;
  yOffset: number;
}

const COLLAGE_ITEMS: CollageCardItem[] = [
  {
    id: 1,
    order: 0,
    slug: "building-autospace",
    title: BLOG_POSTS[0]?.title ?? "Building AutoSpace: Smart Parking Platform",
    category: BLOG_POSTS[0]?.category ?? "PROJECT DEEP DIVE",
    readingTime: BLOG_POSTS[0]?.readingTime ?? "6 min read",
    zIndex: 50,
    direction: "left",
    src: "https://cdn.21st.dev/assets/mirror/57/57332c2066d3283d7c8b8fb7d1f2b4fb6fe692e6d770884ca969cf986ecb420c.jpg",
    alt: "AutoSpace smart parking microservices architecture",
    baseX: -320,
    yOffset: 15,
  },
  {
    id: 2,
    order: 1,
    slug: "designing-souqrima",
    title: BLOG_POSTS[1]?.title ?? "From Figma to Code: Building an E-commerce Platform",
    category: BLOG_POSTS[1]?.category ?? "ENGINEERING",
    readingTime: BLOG_POSTS[1]?.readingTime ?? "5 min read",
    zIndex: 40,
    direction: "left",
    src: "https://cdn.21st.dev/assets/mirror/2a/2ab6ce934d6bf8516dda60e58fad804ac2197ee86111687dae55c72b0040d161.jpg",
    alt: "Souqrima e-commerce platform Figma design to code",
    baseX: -160,
    yOffset: 32,
  },
  {
    id: 3,
    order: 2,
    slug: "building-palazhi",
    title: BLOG_POSTS[2]?.title ?? "Building a Restaurant Operating System from the Ground Up",
    category: BLOG_POSTS[2]?.category ?? "CLIENT ARCHITECTURE",
    readingTime: BLOG_POSTS[2]?.readingTime ?? "5 min read",
    zIndex: 30,
    direction: "right",
    src: "https://cdn.21st.dev/assets/mirror/05/05e8cb2f9105f8b6b5a600e3bf99a9a3f354d4a427f2fa533526cea2cb00e00c.jpg",
    alt: "Paalazhi restaurant operating system workflow",
    baseX: 0,
    yOffset: 8,
  },
  {
    id: 4,
    order: 3,
    slug: "microservices-and-performance",
    title: BLOG_POSTS[3]?.title ?? "Practical Lessons from Microservices, RabbitMQ and Redis",
    category: BLOG_POSTS[3]?.category ?? "SYSTEM DESIGN",
    readingTime: BLOG_POSTS[3]?.readingTime ?? "7 min read",
    zIndex: 20,
    direction: "right",
    src: "https://cdn.21st.dev/assets/mirror/44/44bcf2a8cafad29f508d198ab98cae0f6cf50acbc1326a36bf864f2e86f6a89e.jpg",
    alt: "Microservices performance, RabbitMQ and Redis caching",
    baseX: 160,
    yOffset: 22,
  },
  {
    id: 5,
    order: 4,
    slug: "full-stack-development-journey",
    title: BLOG_POSTS[4]?.title ?? "From Frontend Interfaces to Production-Ready Applications",
    category: BLOG_POSTS[4]?.category ?? "CAREER REFLECTIONS",
    readingTime: BLOG_POSTS[4]?.readingTime ?? "6 min read",
    zIndex: 10,
    direction: "left",
    src: "https://cdn.21st.dev/assets/mirror/8d/8d0a29816b1faeb5946abe01b3bfbf0637c4ef2aa2595d9896a738a4db137ebf.jpg",
    alt: "Full-stack development engineering journey",
    baseX: 320,
    yOffset: 44,
  },
];

export const PhotoGallery = ({
  animationDelay = 0.3,
}: {
  animationDelay?: number;
}) => {
  const [isVisible, setIsVisible] = React.useState(false);
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [windowWidth, setWindowWidth] = React.useState(1200);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);

    const visibilityTimer = setTimeout(() => {
      setIsVisible(true);
    }, animationDelay * 1000);

    const animationTimer = setTimeout(() => {
      setIsLoaded(true);
    }, (animationDelay + 0.3) * 1000);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(visibilityTimer);
      clearTimeout(animationTimer);
    };
  }, [animationDelay]);

  // Compute responsive layout variables
  // Desktop (>= 1024px): 220px card, 100% spread (baseX)
  // Tablet (640px - 1023px): 185px card, 62% spread
  // Mobile (< 640px): 150px card, 36% spread (no overflow on 375px)
  const isMobile = windowWidth < 640;
  const isTablet = windowWidth >= 640 && windowWidth < 1024;

  const cardWidth = isMobile ? 150 : isTablet ? 185 : 220;
  const cardHeight = cardWidth;
  const spreadFactor = isMobile ? 0.36 : isTablet ? 0.65 : 1.0;

  const containerVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const photoVariants = {
    hidden: () => ({
      x: 0,
      y: 0,
      scale: 0.95,
      opacity: 0,
    }),
    visible: (custom: { x: number; y: number; order: number }) => ({
      x: custom.x,
      y: custom.y,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 75,
        damping: 14,
        mass: 1,
        delay: custom.order * 0.1,
      },
    }),
  };

  return (
    <section
      aria-label="Blog Articles Gallery"
      className="pt-16 sm:pt-24 pb-20 relative w-full overflow-hidden flex flex-col items-center"
    >
      {/* Subtle Background Grid Pattern */}
      <div className="absolute inset-0 max-md:hidden top-[160px] -z-10 h-[320px] w-full bg-transparent bg-[linear-gradient(to_right,#57534e_1px,transparent_1px),linear-gradient(to_bottom,#57534e_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-20 [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] dark:bg-[linear-gradient(to_right,#a8a29e_1px,transparent_1px),linear-gradient(to_bottom,#a8a29e_1px,transparent_1px)]" />

      {/* Eyebrow */}
      <p className="my-2 text-center text-xs sm:text-sm font-light uppercase tracking-widest text-slate-500 dark:text-slate-400">
        INSIGHTS · ENGINEERING · EXPERIENCE
      </p>

      {/* Main Heading */}
      <h1 className="z-20 mx-auto max-w-2xl px-4 py-2 text-center text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
        Welcome to My <br />
        <span className="text-rose-500 inline-block mt-1">Blogs</span>
      </h1>

      {/* Overlapping Collage Canvas */}
      <div
        className="relative my-4 w-full flex items-center justify-center"
        style={{ height: `${cardHeight + 110}px` }}
      >
        <motion.div
          className="relative mx-auto flex w-full max-w-6xl justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          <motion.div
            className="relative flex w-full justify-center items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isLoaded ? "visible" : "hidden"}
          >
            <div
              className="relative flex items-center justify-center"
              style={{ width: `${cardWidth}px`, height: `${cardHeight}px` }}
            >
              {/* Render in reverse order so higher zIndex cards render correctly in DOM */}
              {[...COLLAGE_ITEMS].reverse().map((item) => {
                const computedX = Math.round(item.baseX * spreadFactor);
                const computedY = Math.round(item.yOffset * (isMobile ? 0.6 : 1));

                return (
                  <motion.div
                    key={item.id}
                    className="absolute left-0 top-0"
                    style={{ zIndex: item.zIndex }}
                    variants={photoVariants}
                    custom={{
                      x: computedX,
                      y: computedY,
                      order: item.order,
                    }}
                  >
                    <CollageCard
                      item={item}
                      width={cardWidth}
                      height={cardHeight}
                    />
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Accessible Mobile/Screen-Reader Quick List */}
      <div className="mt-8 px-4 w-full max-w-md mx-auto sm:hidden">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 text-center mb-3">
          Available Articles
        </p>
        <div className="flex flex-col gap-2">
          {COLLAGE_ITEMS.map((item) => (
            <Link
              key={item.slug}
              href={`/blogs/${item.slug}`}
              className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-white/70 dark:bg-slate-900/70 text-xs font-medium text-slate-800 dark:text-slate-200 hover:border-rose-500/50 hover:text-rose-500 transition-colors"
            >
              <span className="truncate pr-2">{item.title}</span>
              <ArrowUpRight className="size-3.5 shrink-0 text-slate-400" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const CollageCard = ({
  item,
  width,
  height,
}: {
  item: CollageCardItem;
  width: number;
  height: number;
}) => {
  const [rotation, setRotation] = React.useState<number>(0);
  const [isHovered, setIsHovered] = React.useState(false);
  const x = useMotionValue(width / 2);
  const y = useMotionValue(height / 2);

  React.useEffect(() => {
    // Subtle initial rotation
    const baseRot = (item.id % 2 === 0 ? 1 : -1) * (1.5 + (item.id % 3));
    setRotation(baseRot);
  }, [item.id]);

  function handleMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left);
    y.set(e.clientY - rect.top);
  }

  return (
    <Link
      href={`/blogs/${item.slug}`}
      aria-label={`Read article: ${item.title}`}
      title={item.title}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="group block relative select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:ring-offset-2 rounded-3xl"
      style={{
        width,
        height,
      }}
    >
      <motion.div
        whileHover={{
          scale: 1.08,
          y: -10,
          rotateZ: 0,
          zIndex: 999,
          transition: { type: "spring", stiffness: 260, damping: 20 },
        }}
        whileTap={{ scale: 0.98 }}
        animate={{ rotate: isHovered ? 0 : rotation }}
        transition={{ duration: 0.2 }}
        className="relative h-full w-full rounded-3xl overflow-hidden shadow-md group-hover:shadow-2xl group-hover:shadow-rose-500/20 transition-shadow duration-300 border border-slate-200/80 dark:border-slate-800 bg-slate-900"
      >
        {/* Collage Image */}
        <Image
          fill
          src={item.src}
          alt={item.alt}
          sizes={`${width}px`}
          priority={item.id <= 2}
          className="object-cover rounded-3xl group-hover:scale-105 transition-transform duration-500"
        />

        {/* Subtle Dark Gradient Overlay for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-40 group-hover:opacity-75 transition-opacity duration-300 rounded-3xl" />

        {/* Hover / Active Badge showing Article Title */}
        <div
          className={cn(
            "absolute inset-x-2 bottom-2 p-2.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/10 text-white transition-all duration-300 pointer-events-none",
            isHovered ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
          )}
        >
          <div className="flex items-center justify-between gap-1 mb-1">
            <span className="text-[9px] uppercase tracking-wider font-semibold text-rose-400 truncate">
              {item.category}
            </span>
            <span className="text-[9px] text-slate-300 shrink-0">
              {item.readingTime}
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-100 leading-snug line-clamp-2">
            {item.title}
          </p>
          <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-rose-300">
            <span>Read Article</span>
            <ArrowUpRight className="size-2.5" />
          </div>
        </div>

        {/* Always-Visible Subtle Corner Icon */}
        <div className="absolute top-2.5 right-2.5 size-7 rounded-full bg-slate-900/60 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/90 group-hover:bg-rose-500 group-hover:text-white transition-colors">
          <ArrowUpRight className="size-3.5" />
        </div>
      </motion.div>
    </Link>
  );
};

export default PhotoGallery;
