"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EXPERIENCES, ExperienceItem } from "@/data/experience";
import { Terminal, Cpu, Radio, Activity, CheckCircle2, ChevronRight, Layers } from "lucide-react";

export function ExperienceHero() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string>(EXPERIENCES[0].id);

  const activeExp = EXPERIENCES.find((e) => e.id === selectedId) || EXPERIENCES[0];
  const activeIndex = EXPERIENCES.findIndex((e) => e.id === selectedId);

  const scrollToTimelineItem = (id: string) => {
    const el = document.getElementById(`timeline-${id}`);
    if (el) {
      el.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "center" });
    }
  };

  return (
    <div className="w-full rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-7 shadow-sm transition-colors relative overflow-hidden">
      {/* Background circuit grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]"
        style={{
          backgroundImage: `radial-gradient(var(--fg-muted) 1px, transparent 1px)`,
          backgroundSize: "20px 20px",
        }}
      />

      {/* Top telemetry bar */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-[var(--border-subtle)]">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/25">
            <Cpu className="h-4 w-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-semibold tracking-wider uppercase text-[var(--fg-primary)]">
                Systems Telemetry Console
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-[var(--accent)]/10 px-2 py-0.5 text-[10px] font-mono text-[var(--accent)] border border-[var(--accent)]/20">
                BUS ACTIVE
              </span>
            </div>
            <p className="text-[11px] font-mono text-[var(--fg-muted)]">
              Interactive node selector • Select channel to inspect telemetry
            </p>
          </div>
        </div>

        {/* Global system specs */}
        <div className="flex items-center gap-4 text-xs font-mono text-[var(--fg-muted)]">
          <div className="hidden sm:flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>4 System Milestones</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-[var(--accent)]" />
            <span>Uptime: Continuous</span>
          </div>
        </div>
      </div>

      {/* Hardware-style channel switcher buttons */}
      <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-5 pb-5">
        {EXPERIENCES.map((exp, idx) => {
          const isSelected = exp.id === selectedId;
          return (
            <button
              key={exp.id}
              onClick={() => setSelectedId(exp.id)}
              className={`group relative flex flex-col items-start rounded-xl border p-3 text-left transition-all cursor-pointer ${
                isSelected
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-sm"
                  : "border-[var(--border-subtle)] bg-[var(--bg-canvas)]/50 hover:border-[var(--fg-muted)]/40 hover:bg-[var(--bg-canvas)]"
              }`}
            >
              {/* Top channel label & LED */}
              <div className="flex w-full items-center justify-between pb-1.5">
                <span className="font-mono text-[10px] font-bold tracking-widest text-[var(--fg-muted)]">
                  CH-0{idx + 1}
                </span>
                <span
                  className={`h-2 w-2 rounded-full transition-all ${
                    isSelected
                      ? "bg-[var(--accent)] shadow-[0_0_8px_var(--accent)]"
                      : "bg-[var(--border-subtle)] group-hover:bg-[var(--fg-muted)]/50"
                  }`}
                />
              </div>

              {/* Company / Milestone Title */}
              <div className="font-medium text-xs sm:text-sm text-[var(--fg-primary)] line-clamp-1">
                {exp.companyOrType}
              </div>

              {/* Status / Period */}
              <div className="mt-1 font-mono text-[10px] text-[var(--fg-muted)] line-clamp-1">
                {exp.isCurrent ? "● Active Production" : exp.period.split("–")[0].trim()}
              </div>

              {/* Bottom active indicator bar */}
              {isSelected && (
                <motion.div
                  layoutId="activeHeroBar"
                  className="absolute bottom-0 left-2 right-2 h-0.5 bg-[var(--accent)] rounded-full"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Live Selected Node Inspector Deck */}
      <div className="relative z-10 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 sm:p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[var(--border-subtle)]/60">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-[var(--accent)] font-semibold">
                BUS CHANNEL // 0{activeIndex + 1}
              </span>
              <span className="text-xs text-[var(--fg-muted)] font-mono">•</span>
              <span className="text-xs text-[var(--fg-muted)] font-mono">{activeExp.period}</span>
              {activeExp.isCurrent && (
                <span className="inline-flex items-center gap-1 rounded bg-emerald-500/15 px-1.5 py-0.5 text-[10px] font-mono text-emerald-500 font-medium">
                  LIVE
                </span>
              )}
            </div>
            <h3 className="text-base sm:text-lg font-serif font-medium text-[var(--fg-primary)] flex items-center gap-2">
              <span>{activeExp.companyOrType}</span>
              <span className="text-sm font-sans font-normal text-[var(--fg-muted)]">
                — {activeExp.role}
              </span>
            </h3>
          </div>

          <button
            onClick={() => scrollToTimelineItem(activeExp.id)}
            className="self-start md:self-auto inline-flex items-center gap-1.5 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3 py-1.5 text-xs font-mono text-[var(--fg-primary)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors cursor-pointer"
          >
            <span>Inspect Circuit Trace</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

        {/* Node Specs & System Readout */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4">
          {activeExp.systemSpecs?.map((spec, i) => (
            <div
              key={i}
              className="flex flex-col rounded-lg border border-[var(--border-subtle)]/70 bg-[var(--bg-surface)]/60 p-2.5"
            >
              <span className="font-mono text-[10px] uppercase tracking-wider text-[var(--fg-muted)]">
                {spec.label}
              </span>
              <span className="mt-0.5 font-mono text-xs font-medium text-[var(--fg-primary)] truncate">
                {spec.value}
              </span>
            </div>
          ))}
        </div>

        {/* Core Architecture Highlights */}
        <div className="mt-3.5 flex flex-wrap gap-1.5 items-center">
          <span className="text-[11px] font-mono text-[var(--fg-muted)] mr-1">Active Technologies:</span>
          {activeExp.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-2 py-0.5 text-[11px] font-mono text-[var(--fg-muted)]"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
