"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EXPERIENCES, ExperienceItem } from "@/data/experience";
import {
  Calendar,
  Briefcase,
  GraduationCap,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Code2,
  Terminal,
} from "lucide-react";

export function CircuitTimeline() {
  const shouldReduceMotion = useReducedMotion();

  const getIcon = (type: ExperienceItem["type"]) => {
    switch (type) {
      case "education":
        return <GraduationCap className="h-4 w-4" />;
      case "internship":
        return <Sparkles className="h-4 w-4" />;
      case "freelance":
        return <Code2 className="h-4 w-4" />;
      case "apprenticeship":
      default:
        return <Briefcase className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full space-y-8">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              // CHRONOLOGICAL BUS
            </span>
            <span className="rounded bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] text-[var(--accent)] border border-[var(--accent)]/20">
              PCB TRACE TOPOLOGY
            </span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[var(--fg-primary)]">
            Engineering Milestones
          </h2>
        </div>
        <div className="font-mono text-xs text-[var(--fg-muted)]">
          <span className="text-[var(--accent)]">4 Nodes</span> • Verified Timeline
        </div>
      </div>

      {/* Main PCB Circuit Track Container */}
      <div className="relative pl-6 sm:pl-10">
        {/* Continuous PCB Circuit Bus Track Line */}
        <div
          className="absolute left-[11px] sm:left-[19px] top-4 bottom-4 w-[2px] bg-gradient-to-b from-[var(--accent)] via-[var(--accent)]/50 to-[var(--border-subtle)]"
          aria-hidden="true"
        >
          {/* Subtle copper trace glow */}
          <div className="absolute inset-0 bg-[var(--accent)]/20 blur-[2px]" />
        </div>

        {/* Milestone Nodes */}
        <div className="space-y-10 sm:space-y-12">
          {EXPERIENCES.map((exp, idx) => {
            const isFirst = idx === 0;
            return (
              <motion.div
                key={exp.id}
                id={`timeline-${exp.id}`}
                initial={false}
                className="relative group scroll-mt-24"
              >
                {/* Circuit Via / Solder Pad Node on Bus */}
                <div
                  className={`absolute -left-[24px] sm:-left-[36px] top-6 flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full border-2 bg-[var(--bg-canvas)] transition-all ${
                    exp.isCurrent
                      ? "border-[var(--accent)] shadow-[0_0_12px_var(--accent)] text-[var(--accent)]"
                      : "border-[var(--border-subtle)] group-hover:border-[var(--accent)] text-[var(--fg-muted)] group-hover:text-[var(--accent)]"
                  }`}
                >
                  {/* Concentric Via Ring */}
                  <div
                    className={`h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full ${
                      exp.isCurrent
                        ? "bg-[var(--accent)]"
                        : "bg-[var(--border-subtle)] group-hover:bg-[var(--accent)]"
                    }`}
                  />
                </div>

                {/* Horizontal Trace Connector (Bridge to Card) */}
                <div
                  className="absolute -left-[6px] sm:-left-[8px] top-9 sm:top-10 w-6 sm:w-8 h-[2px] bg-[var(--accent)]/40 group-hover:bg-[var(--accent)] transition-colors"
                  aria-hidden="true"
                />

                {/* Integrated Circuit (IC) Chip Card */}
                <div className="rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs hover:border-[var(--accent)]/60 transition-all hover:shadow-md relative overflow-hidden">
                  {/* IC Chip Silkscreen / Header Pin Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-[var(--border-subtle)]/70 text-xs font-mono text-[var(--fg-muted)]">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1.5 text-[var(--accent)] font-semibold">
                        {getIcon(exp.type)}
                        <span className="uppercase tracking-wider">
                          IC-0{idx + 1} // {exp.type}
                        </span>
                      </div>
                      <span className="text-[var(--border-subtle)]">•</span>
                      <span className="text-[11px] text-[var(--fg-muted)]">
                        PAD-L{idx + 1}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {exp.isCurrent ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 px-2.5 py-0.5 text-[11px] font-mono font-medium text-emerald-500">
                          ACTIVE NODE (PRESENT)
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-mono text-[var(--fg-muted)]">
                          <CheckCircle2 className="h-3 w-3 text-[var(--accent)]" />
                          VERIFIED LOG
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Company & Role Details */}
                  <div className="space-y-1.5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-lg sm:text-xl font-serif font-medium text-[var(--fg-primary)] tracking-tight">
                        {exp.companyOrType}
                      </h3>

                      {/* Period Badge */}
                      <div className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--fg-muted)] bg-[var(--bg-canvas)] border border-[var(--border-subtle)] rounded-md px-2 py-1">
                        <Calendar className="h-3 w-3 text-[var(--accent)]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    {/* Role Title with Confirmation Tag */}
                    <div className="flex flex-wrap items-center gap-2 pt-0.5">
                      <h4 className="font-sans text-sm sm:text-base font-semibold text-[var(--fg-primary)]">
                        {exp.role}
                      </h4>
                      {!exp.roleConfirmed && (
                        <span
                          title="Exact job title to be confirmed by Muhammed Rashid before final deployment"
                          className="inline-flex items-center gap-1 rounded bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 text-[10px] font-mono text-amber-500 font-medium cursor-help"
                        >
                          <AlertCircle className="h-2.5 w-2.5" />
                          <span>[Confirm title]</span>
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="mt-3.5 text-sm sm:text-[14.5px] leading-relaxed text-[var(--fg-muted)] font-sans">
                    {exp.description}
                  </p>

                  {/* System Architecture Specifications */}
                  {exp.systemSpecs && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-2.5 rounded-xl border border-[var(--border-subtle)]/70 bg-[var(--bg-canvas)]/60 p-3">
                      {exp.systemSpecs.map((spec, sIdx) => (
                        <div key={sIdx} className="space-y-0.5">
                          <div className="font-mono text-[10px] uppercase text-[var(--fg-muted)] tracking-wider">
                            {spec.label}
                          </div>
                          <div className="font-mono text-xs font-medium text-[var(--fg-primary)] truncate">
                            {spec.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Highlights Bullet Points */}
                  <div className="mt-4 space-y-2">
                    <div className="font-mono text-[11px] font-medium uppercase tracking-wider text-[var(--fg-muted)]">
                      Key Deliverables & Responsibilities:
                    </div>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[var(--fg-muted)]">
                      {exp.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2">
                          <span className="font-mono text-[var(--accent)] font-bold mt-0.5">
                            ›
                          </span>
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies Pin Array */}
                  <div className="mt-5 pt-4 border-t border-[var(--border-subtle)]/60 flex flex-wrap items-center gap-1.5">
                    <span className="font-mono text-[11px] text-[var(--fg-muted)] mr-1">
                      IC Bus Pins:
                    </span>
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-2.5 py-1 font-mono text-[11px] text-[var(--fg-primary)] hover:border-[var(--accent)]/50 transition-colors"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
