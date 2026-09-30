"use client";

import { motion } from "framer-motion";

interface TagFilterProps {
  tags: string[];
  activeTag: string;
  onSelectTag: (tag: string) => void;
  projectCounts: Record<string, number>;
}

export function TagFilter({ tags, activeTag, onSelectTag, projectCounts }: TagFilterProps) {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {tags.map((tag) => {
        const isSelected = activeTag === tag;
        const count = projectCounts[tag] || 0;

        return (
          <button
            key={tag}
            onClick={() => onSelectTag(tag)}
            className={`group relative flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
              isSelected
                ? "border-[var(--accent)] bg-[var(--accent)] text-white shadow-xs font-medium"
                : "border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--fg-muted)] hover:border-[var(--fg-muted)]/40 hover:text-[var(--fg-primary)]"
            }`}
          >
            <span>{tag}</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                isSelected
                  ? "bg-white/20 text-white"
                  : "bg-[var(--bg-canvas)] text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)]"
              }`}
            >
              {count}
            </span>
          </button>
        );
      })}
    </div>
  );
}
