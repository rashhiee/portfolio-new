"use client";

import { useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ProjectItem } from "@/data/projects";
import {
  X,
  ExternalLink,
  Server,
  Layers,
  Database,
  CheckCircle2,
  Cpu,
  Radio,
  Network,
  ShieldCheck,
} from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";

interface ProjectDetailModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const shouldReduceMotion = useReducedMotion();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (project) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={false}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        />

        {/* Modal Window */}
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          initial={false}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative z-10 w-full max-w-2xl rounded-2xl border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8 shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
        >
          {/* Top Header Strip */}
          <div className="flex items-center justify-between border-b border-[var(--border-subtle)] pb-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              <span className="font-mono text-xs font-semibold text-[var(--accent)] uppercase tracking-wider">
                {project.tag}
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-subtle)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto py-5 space-y-6 pr-1">
            {/* Title & Tagline */}
            <div className="space-y-1">
              <h2
                id="modal-title"
                className="text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[var(--fg-primary)]"
              >
                {project.title}
              </h2>
              <p className="font-mono text-xs sm:text-sm text-[var(--accent)]">
                {project.tagline}
              </p>
              <p className="text-sm leading-relaxed text-[var(--fg-muted)] font-sans pt-2">
                {project.description}
              </p>
            </div>

            {/* Architecture Classification */}
            <div className="rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-4 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--fg-muted)] font-semibold uppercase tracking-wider">
                <Network className="h-4 w-4 text-[var(--accent)]" />
                <span>Architecture Specification</span>
              </div>
              <p className="text-xs sm:text-sm font-mono text-[var(--fg-primary)] font-medium">
                {project.architecture}
              </p>

              {/* Data Layer Details */}
              {project.dataLayer && (
                <div className="pt-2 border-t border-[var(--border-subtle)]/60 space-y-1.5">
                  <div className="font-mono text-[11px] text-[var(--fg-muted)] uppercase tracking-wider">
                    Data Layer & Storage Topologies:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs font-mono text-[var(--fg-primary)]">
                    {project.dataLayer.map((layer, idx) => (
                      <div key={idx} className="flex items-center gap-1.5">
                        <Database className="h-3 w-3 text-[var(--accent)] shrink-0" />
                        <span className="truncate">{layer}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Engineering Accomplishments / Highlights */}
            <div className="space-y-2.5">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                Key Accomplishments & Implementation Details:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-[var(--fg-muted)]">
                {project.highlights.map((highlight, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Full Technology Stack */}
            <div className="space-y-2 pt-2 border-t border-[var(--border-subtle)]">
              <h4 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--fg-muted)]">
                Technologies & Protocols:
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-2.5 py-1 text-xs font-mono text-[var(--fg-primary)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons with [ADD LINK] Placeholders */}
            <div className="pt-4 border-t border-[var(--border-subtle)] flex flex-col sm:flex-row gap-3">
              {/* Live Demo Action */}
              <div className="flex-1 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3 text-xs font-mono">
                <span className="text-[var(--fg-primary)] font-medium">Live Deployment</span>
                <span className="inline-flex items-center gap-1 text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <ExternalLink className="h-3 w-3" />
                  <span>[ADD LINK]</span>
                </span>
              </div>

              {/* GitHub Repo Action */}
              <div className="flex-1 flex items-center justify-between rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-canvas)] p-3 text-xs font-mono">
                <span className="text-[var(--fg-primary)] font-medium">Source Code Repository</span>
                <span className="inline-flex items-center gap-1 text-amber-500 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                  <GithubIcon className="h-3 w-3" />
                  <span>[ADD LINK]</span>
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
