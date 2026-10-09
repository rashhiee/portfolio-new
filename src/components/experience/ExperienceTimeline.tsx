"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { MdOutlineTrain } from "react-icons/md";
import { BsFolder } from "react-icons/bs";
import { IoBookSharp } from "react-icons/io5";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiShadcnui,
  SiNodedotjs,
  SiExpress,
  SiRabbitmq,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiPrisma,
  SiDocker,
  SiNginx,
  SiVercel,
  SiCloudflare,
  SiLinux,
  SiFigma,
  SiShopify,
  SiPostman,
  SiSwagger,
  SiStripe,
  SiGooglemaps,
  SiGit,
  SiSocketdotio,
} from "react-icons/si";
import { FaReact, FaAws } from "react-icons/fa";
import { Layers, Database, Cloud, Code2, GraduationCap, ShieldCheck, Key } from "lucide-react";

interface ExperienceItem {
  title: string;
  timeline: string;
  company: string;
  avatarType: "image" | "badge";
  avatarContent?: string;
  avatarBg?: string;
  avatarBorder?: string;
  avatarColor?: string;
  description: string;
  project?: {
    link: string;
    show: boolean;
  };
}

const EXPERIENCES: ExperienceItem[] = [
  {
    title: "Full Stack Developer Intern",
    timeline: "Jul 2026 – Present",
    company: "CK Creatives",
    avatarType: "badge",
    avatarContent: "CK",
    avatarBg: "bg-emerald-950/80 dark:bg-emerald-900/60",
    avatarBorder: "border-emerald-500/40",
    avatarColor: "text-emerald-400 dark:text-emerald-300",
    description:
      "Building Thynck-OS, the company's internal WhatsApp-integrated CRM automation product for sales workflows. Owning end-to-end design and development of Souqrima, an e-commerce platform — led database architecture and Figma UI design, now building out the codebase. Delivered a client website for DefensePly International LLP from a brand kit, and built custom Shopify storefront/theme solutions for client engagements.",
    project: {
      link: "/projects#souqrima",
      show: true,
    },
  },
  {
    title: "Full Stack Developer (Freelance)",
    timeline: "Mar 2026 – Jul 2026",
    company: "Self-employed",
    avatarType: "image",
    avatarContent: "/images/experience/profile-logo.webp",
    description:
      "Designed and built Paalazhi, a full-stack restaurant operating system independently for a client — covering real-time table ordering, backend business logic, menu/inventory workflows, and deployment. Managed the project end-to-end as sole developer, from requirements through delivery.",
    project: {
      link: "/projects#paalazhi",
      show: true,
    },
  },
  {
    title: "MERN Stack Developer Intern",
    timeline: "Jul 2025 – Mar 2026",
    company: "MERN Stack Systems & Microservices",
    avatarType: "badge",
    avatarContent: "MERN",
    avatarBg: "bg-cyan-950/80 dark:bg-cyan-900/60",
    avatarBorder: "border-cyan-500/40",
    avatarColor: "text-cyan-400 dark:text-cyan-300",
    description:
      "Built production-ready REST APIs processing 1,000+ requests/day with input validation, JWT authentication, and robust error handling. Implemented microservices architecture with RabbitMQ message queuing for async task processing and event-driven workflows. Developed comprehensive RBAC systems supporting Admin, Owner, Manager, and Valet roles with granular permissions. Optimized PostgreSQL queries and implemented Redis caching, reducing API response time by 40%. Designed geospatial search APIs with proximity filtering (20km radius) and integrated Stripe payments and Google Maps.",
    project: {
      link: "/projects#autospace",
      show: true,
    },
  },
];

interface SkillItem {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  explore?: boolean;
}

interface SkillCategory {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  skills: SkillItem[];
}

const SKILL_CATEGORIES: SkillCategory[] = [
  {
    name: "Languages & Frontend",
    icon: Code2,
    skills: [
      { name: "TypeScript", icon: SiTypescript },
      { name: "JavaScript", icon: SiJavascript },
      { name: "Next.js (App Router)", icon: SiNextdotjs },
      { name: "React.js", icon: FaReact },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Shadcn UI", icon: SiShadcnui },
      { name: "Responsive Design", icon: Layers },
    ],
  },
  {
    name: "Backend & Architecture",
    icon: ShieldCheck,
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "Express.js", icon: SiExpress },
      { name: "REST APIs", icon: Code2 },
      { name: "Microservices", icon: Layers, explore: true },
      { name: "RabbitMQ", icon: SiRabbitmq, explore: true },
      { name: "WebSockets", icon: SiSocketdotio },
      { name: "JWT & Refresh Tokens", icon: Key },
      { name: "OAuth 2.0 & RBAC", icon: ShieldCheck },
    ],
  },
  {
    name: "Databases & Caching",
    icon: Database,
    skills: [
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Redis", icon: SiRedis, explore: true },
      { name: "Prisma ORM", icon: SiPrisma },
      { name: "SQL", icon: Database },
    ],
  },
  {
    name: "DevOps, Cloud & Tools",
    icon: Cloud,
    skills: [
      { name: "AWS (EC2, S3)", icon: FaAws, explore: true },
      { name: "Docker", icon: SiDocker },
      { name: "Nginx", icon: SiNginx },
      { name: "Vercel", icon: SiVercel },
      { name: "Cloudflare", icon: SiCloudflare },
      { name: "Linux", icon: SiLinux },
      { name: "Figma", icon: SiFigma },
      { name: "Shopify", icon: SiShopify },
      { name: "Git & GitHub", icon: SiGit },
      { name: "Postman", icon: SiPostman },
      { name: "Swagger", icon: SiSwagger },
      { name: "Stripe API", icon: SiStripe },
      { name: "Google Maps API", icon: SiGooglemaps },
    ],
  },
];

interface EducationItem {
  degree: string;
  timeline: string;
  institution: string;
  badgeText: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  coursework?: string;
  description: string;
}

const EDUCATION_ITEMS: EducationItem[] = [
  {
    degree: "Bachelor of Computer Application (BCA)",
    timeline: "Jun 2022 – Mar 2025",
    institution: "University of Calicut",
    badgeText: "UOC",
    badgeBg: "bg-amber-950/80 dark:bg-amber-900/60",
    badgeColor: "text-amber-300 dark:text-amber-200",
    badgeBorder: "border-amber-500/40",
    coursework: "Data Structures, DBMS, Web Technologies, System Design",
    description:
      "Graduated with foundational technical expertise in Data Structures, Relational Database Management Systems, Web Application Architecture, and System Design.",
  },
  {
    degree: "Higher Secondary Education (Computer Science)",
    timeline: "2020 – 2022",
    institution: "Kerala Higher Secondary Board",
    badgeText: "83%",
    badgeBg: "bg-blue-950/80 dark:bg-blue-900/60",
    badgeColor: "text-blue-300 dark:text-blue-200",
    badgeBorder: "border-blue-500/40",
    description:
      "Graduated with 83% distinction with specialized coursework in Computer Science, Mathematics, and core software programming principles.",
  },
];

export function ExperienceTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 65%", "end 80%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 45,
    damping: 20,
    restDelta: 0.001,
  });

  const dotY = useTransform(smoothProgress, (val) => `${Math.min(100, Math.max(0, val * 100))}%`);

  return (
    <div className="w-full flex flex-col items-center">
      {/* ── Section Title & Subtitle ────────────────────────────────────────── */}
      <div className="space-y-3 text-center w-fit px-6 sm:px-10 relative pt-8 pb-10">
        <h2 className="text-2xl sm:text-3xl tracking-tighter font-mono font-semibold tracking-tight text-foreground">
          The Journey So Far
        </h2>
        <p className="font-medium text-sm md:text-base text-foreground/80 leading-relaxed max-w-xl mx-auto">
          Full stack engineering across internships, freelance products, and production systems.
          Building, architecting, and picking up new skills at every stop.
        </p>
      </div>

      {/* ── Main Timeline Grid ──────────────────────────────────────────────── */}
      <div
        ref={containerRef}
        className="relative grid grid-cols-[auto_1fr] w-full max-w-3xl px-4 sm:px-6 gap-6 sm:gap-10 pt-8 pb-24"
      >
        {/* Left Column: Interactive Railway Track */}
        <div className="relative pointer-events-none w-5 sm:w-6 flex justify-center">
          {/* Dashed vertical railroad track line */}
          <div className="absolute inset-x-0 top-0 bottom-0 left-1/2 -translate-x-1/2 border-l-2 border-dashed border-foreground/20" />

          {/* Train icon at the top of the track */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-foreground/90">
            <MdOutlineTrain className="size-6" />
          </div>

          {/* Solid line smoothly growing down with scroll */}
          <motion.div
            style={{ scaleY: smoothProgress, originY: 0 }}
            className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-0.5 bg-foreground/75 rounded-full"
          />

          {/* Indicator dot traveling down the track with scroll */}
          <motion.div
            style={{ top: dotY }}
            className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-foreground/80 ring-4 ring-background z-10"
          />

          {/* Terminal station dot at the bottom of the railroad line */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground/80 z-10" />
        </div>

        {/* Right Column: Experience Items + Skills + Education */}
        <div className="w-full flex flex-col gap-10 md:gap-14">
          {/* 1. Job Experience Milestones */}
          {EXPERIENCES.map((item, idx) => (
            <div key={idx} className="space-y-3.5">
              {/* Header: Title and Timeline Date */}
              <div className="flex items-center justify-between flex-wrap gap-2">
                <p className="font-mono text-lg font-semibold tracking-wider text-foreground">
                  {item.title}
                </p>
                <p className="text-xs font-mono text-muted-foreground">
                  {item.timeline}
                </p>
              </div>

              {/* Company Logo + Name */}
              <div className="flex items-center gap-3">
                {item.avatarType === "image" && item.avatarContent ? (
                  <div className="w-8 h-8 rounded-full relative overflow-hidden bg-foreground/5 border border-foreground/10 shrink-0">
                    <Image
                      src={item.avatarContent}
                      alt={item.company}
                      fill
                      sizes="32px"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-xs shrink-0 border ${item.avatarBg} ${item.avatarBorder} ${item.avatarColor}`}
                  >
                    {item.avatarContent}
                  </div>
                )}
                <p className="font-medium text-sm text-foreground/80 font-sans">
                  {item.company}
                </p>
              </div>

              {/* Description */}
              <p className="leading-relaxed text-sm text-muted-foreground font-sans">
                {item.description}
              </p>

              {/* "View projects" link */}
              {item.project && item.project.show && (
                <div className="flex justify-end pt-2">
                  <Link
                    href={item.project.link}
                    className="relative space-y-1 w-fit text-sm font-medium group text-foreground"
                  >
                    <div className="flex items-center gap-2">
                      <BsFolder className="size-4" />
                      <span>View projects</span>
                    </div>
                    <div className="w-0 group-hover:w-full transition-all duration-200 h-0.5 bg-foreground" />
                  </Link>
                </div>
              )}
            </div>
          ))}

          {/* 2. Skills & Competencies Section */}
          <div className="space-y-6 w-full pt-2">
            {/* Skills Title + "Learning & Exploring" Legend */}
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <h3 className="font-mono text-xl font-semibold tracking-wider text-foreground">
                Skills
              </h3>
              <div className="flex gap-2 items-center text-xs md:text-sm text-muted-foreground font-sans">
                <IoBookSharp className="size-3 text-foreground/70" />
                <span>Learning &amp; Exploring</span>
              </div>
            </div>

            {/* Categorized Pills */}
            <div className="grid grid-cols-1 gap-6 w-full">
              {SKILL_CATEGORIES.map((category) => {
                const CatIcon = category.icon;
                return (
                  <div key={category.name} className="p-1 space-y-3.5">
                    {/* Category Label */}
                    <div className="flex items-center gap-2.5 text-foreground">
                      <CatIcon className="size-4 text-muted-foreground" />
                      <h4 className="text-sm text-foreground/80 font-medium">
                        {category.name}
                      </h4>
                    </div>

                    {/* Skill Badges */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {category.skills.map((skill) => {
                        const Icon = skill.icon;
                        return (
                          <div
                            key={skill.name}
                            className="inline-flex cursor-default relative items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full text-xs border border-foreground/40 hover:bg-foreground/5 hover:border-foreground/20 text-foreground/90 transition-colors bg-background/50 select-none"
                          >
                            {/* Learning & Exploring Pin Badge */}
                            {skill.explore && (
                              <div className="absolute -top-1.5 right-1 z-1 text-foreground/80">
                                <IoBookSharp className="size-2.5" />
                              </div>
                            )}
                            <Icon className="size-4 sm:size-5 text-foreground/95 shrink-0" />
                            <span>{skill.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Education Section */}
          <div className="space-y-6 w-full pt-2">
            <div className="flex items-center gap-2 text-foreground">
              <GraduationCap className="size-5 text-muted-foreground" />
              <h3 className="font-mono text-xl font-semibold tracking-wider">
                Education
              </h3>
            </div>

            <div className="space-y-6">
              {EDUCATION_ITEMS.map((edu, idx) => (
                <div key={idx} className="space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="font-mono text-base sm:text-lg font-semibold tracking-wider text-foreground">
                      {edu.degree}
                    </p>
                    <p className="text-xs font-mono text-muted-foreground">
                      {edu.timeline}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-mono font-bold text-[11px] shrink-0 border ${edu.badgeBg} ${edu.badgeBorder} ${edu.badgeColor}`}
                    >
                      {edu.badgeText}
                    </div>
                    <div>
                      <p className="font-medium text-sm text-foreground/80 font-sans">
                        {edu.institution}
                      </p>
                      {edu.coursework && (
                        <p className="text-xs text-muted-foreground font-mono">
                          Coursework: {edu.coursework}
                        </p>
                      )}
                    </div>
                  </div>

                  <p className="leading-relaxed text-sm text-muted-foreground font-sans">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
