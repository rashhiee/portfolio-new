"use client";

import { motion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import {
  Server,
  Layers,
  ExternalLink,
  Maximize2,
  CheckCircle2,
  Cpu,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ServerBladeCardProps {
  project: ProjectItem;
  slotIndex: number;
  onOpenDetails: (project: ProjectItem) => void;
}

export function ServerBladeCard({ project, slotIndex, onOpenDetails }: ServerBladeCardProps) {
  return (
    <div className="group relative rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 sm:p-6 shadow-xs hover:border-[var(--accent)]/50 transition-all hover:shadow-md flex flex-col justify-between overflow-hidden">
      {/* Subtle rackmount screw corner accents */}
      <div className="pointer-events-none absolute top-3 left-3 text-[10px] font-mono text-[var(--border-subtle)] select-none">
        ✛
      </div>
      <div className="pointer-events-none absolute top-3 right-3 text-[10px] font-mono text-[var(--border-subtle)] select-none">
        ✛
      </div>
      <div className="pointer-events-none absolute bottom-3 left-3 text-[10px] font-mono text-[var(--border-subtle)] select-none">
        ✛
      </div>
      <div className="pointer-events-none absolute bottom-3 right-3 text-[10px] font-mono text-[var(--border-subtle)] select-none">
        ✛
      </div>

      <div className="space-y-4">
        {/* Top Blade Silkscreen & Status Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[var(--border-subtle)]/70 pb-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-[var(--accent)]" />
            <span className="font-bold uppercase tracking-wider text-[var(--fg-muted)]">
              BLADE SLOT 0{slotIndex} // {project.tag}
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* GitHub Placeholder */}
            <span
              className="inline-flex items-center gap-1 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]"
              title="GitHub link placeholder"
            >
              <span>GitHub</span>
              <span className="text-[10px] text-amber-500 font-bold">[ADD LINK]</span>
            </span>

            {/* Live Demo Placeholder */}
            <span
              className="inline-flex items-center gap-1 rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] px-2 py-0.5 text-[11px] text-[var(--fg-muted)]"
              title="Live link placeholder"
            >
              <span>Live</span>
              <span className="text-[10px] text-amber-500 font-bold">[ADD LINK]</span>
            </span>
          </div>
        </div>

        {/* Title & Tagline */}
        <div className="space-y-1">
          <h3 className="text-xl sm:text-2xl font-serif font-medium text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <p className="font-mono text-xs text-[var(--accent)] font-medium">
            {project.tagline}
          </p>
          <p className="pt-1 text-sm text-[var(--fg-muted)] leading-relaxed font-sans line-clamp-3">
            {project.description}
          </p>
        </div>

        {/* System Specs Chips */}
        {project.systemMetrics && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 rounded-xl border border-[var(--border-subtle)]/60 bg-[var(--bg-canvas)]/60 p-2.5">
            {project.systemMetrics.map((metric, i) => (
              <div key={i} className="space-y-0.5">
                <div className="font-mono text-[10px] uppercase text-[var(--fg-muted)] tracking-wider">
                  {metric.label}
                </div>
                <div className="font-mono text-xs font-medium text-[var(--fg-primary)] truncate">
                  {metric.value}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Highlights */}
        <div className="space-y-1.5 pt-1">
          <div className="font-mono text-[11px] uppercase tracking-wider text-[var(--fg-muted)]">
            Architecture Highlights:
          </div>
          <ul className="space-y-1 text-xs text-[var(--fg-muted)]">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="flex items-start gap-1.5 line-clamp-2">
                <span className="font-mono text-[var(--accent)] font-bold">›</span>
                <span>{h}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Footer: Tech stack & Details CTA */}
      <div className="pt-4 mt-4 border-t border-[var(--border-subtle)]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex flex-wrap gap-1">
          {project.techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] px-2 py-0.5 text-[10px] font-mono text-[var(--fg-muted)]"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 5 && (
            <span className="rounded bg-[var(--bg-canvas)] border border-[var(--border-subtle)] px-1.5 py-0.5 text-[10px] font-mono text-[var(--fg-muted)]">
              +{project.techStack.length - 5}
            </span>
          )}
        </div>

        <button
          onClick={() => onOpenDetails(project)}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-[var(--fg-primary)] hover:text-[var(--accent)] transition-colors self-end sm:self-auto cursor-pointer"
        >
          <span>Inspect Blade</span>
          <Maximize2 className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
