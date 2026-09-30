"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SKILLS_DATA, SkillCategory, SkillItem } from "@/data/experience";
import { CheckCircle2, Compass, Layers, Search, Server, Shield, Cpu, Cloud } from "lucide-react";

export function SkillsMatrix() {
  const shouldReduceMotion = useReducedMotion();
  const [selectedCategory, setSelectedCategory] = useState<SkillCategory | "All">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [inspectedSkill, setInspectedSkill] = useState<SkillItem | null>(null);

  const categories: (SkillCategory | "All")[] = [
    "All",
    "Backend & Systems",
    "Frontend & UI",
    "Architecture & Security",
    "Cloud & DevOps",
  ];

  const filteredSkills = SKILLS_DATA.filter((skill) => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch =
      skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (skill.context && skill.context.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const usedCount = SKILLS_DATA.filter((s) => s.status === "Used in projects").length;
  const exploringCount = SKILLS_DATA.filter((s) => s.status === "Exploring").length;

  const getCategoryIcon = (category: SkillCategory) => {
    switch (category) {
      case "Backend & Systems":
        return <Server className="h-3.5 w-3.5" />;
      case "Frontend & UI":
        return <Cpu className="h-3.5 w-3.5" />;
      case "Architecture & Security":
        return <Shield className="h-3.5 w-3.5" />;
      case "Cloud & DevOps":
        return <Cloud className="h-3.5 w-3.5" />;
    }
  };

  return (
    <div className="w-full space-y-6">
      {/* Header with stats */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[var(--border-subtle)] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              // STACK ARCHITECTURE
            </span>
            <span className="rounded bg-[var(--accent)]/10 px-2 py-0.5 font-mono text-[10px] text-[var(--accent)] border border-[var(--accent)]/20">
              CAPABILITY MATRIX
            </span>
          </div>
          <h2 className="mt-1 text-2xl sm:text-3xl font-serif font-medium tracking-tight text-[var(--fg-primary)]">
            Technical Competencies
          </h2>
        </div>

        {/* Status count badges */}
        <div className="flex items-center gap-2.5 font-mono text-xs">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-emerald-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>{usedCount} Used in Projects</span>
          </div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-amber-500">
            <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
            <span>{exploringCount} Exploring</span>
          </div>
        </div>
      </div>

      {/* Controls: Category Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
                  isSelected
                    ? "bg-[var(--accent)] text-white shadow-xs font-medium"
                    : "bg-[var(--bg-surface)] text-[var(--fg-muted)] border border-[var(--border-subtle)] hover:border-[var(--fg-muted)]/40 hover:text-[var(--fg-primary)]"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Quick Search */}
        <div className="relative min-w-[200px]">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[var(--fg-muted)]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Filter matrix..."
            className="w-full rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] pl-8 pr-3 py-1.5 text-xs font-mono text-[var(--fg-primary)] placeholder-[var(--fg-muted)] focus:border-[var(--accent)] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Skills Interactive Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {filteredSkills.map((skill) => {
          const isUsed = skill.status === "Used in projects";
          const isInspected = inspectedSkill?.name === skill.name;

          return (
            <motion.div
              key={skill.name}
              layout={!shouldReduceMotion}
              initial={false}
              onClick={() => setInspectedSkill(isInspected ? null : skill)}
              className={`group relative rounded-xl border p-4 transition-all cursor-pointer ${
                isInspected
                  ? "border-[var(--accent)] bg-[var(--accent)]/10 shadow-sm"
                  : "border-[var(--border-subtle)] bg-[var(--bg-surface)] hover:border-[var(--accent)]/50 hover:bg-[var(--bg-canvas)]"
              }`}
            >
              {/* Top row: Name & Status Beacon */}
              <div className="flex items-center justify-between gap-2">
                <span className="font-mono text-sm font-semibold text-[var(--fg-primary)] group-hover:text-[var(--accent)] transition-colors">
                  {skill.name}
                </span>

                {isUsed ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-mono text-emerald-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <span>Used in projects</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 border border-amber-500/25 px-2 py-0.5 text-[10px] font-mono text-amber-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                    <span>Exploring</span>
                  </span>
                )}
              </div>

              {/* Category & Project Context */}
              <div className="mt-2.5 flex items-center justify-between text-[11px] font-mono text-[var(--fg-muted)]">
                <span className="flex items-center gap-1">
                  {getCategoryIcon(skill.category)}
                  <span>{skill.category}</span>
                </span>
                <span className="text-[10px] text-[var(--fg-muted)] group-hover:text-[var(--accent)] transition-colors">
                  {isInspected ? "Close" : "Inspect"}
                </span>
              </div>

              {/* Hover / Click Context Drawer */}
              {skill.context && (
                <div className="mt-2.5 pt-2 border-t border-[var(--border-subtle)]/60 text-xs font-sans text-[var(--fg-muted)]">
                  <span className="font-mono text-[10px] text-[var(--accent)] mr-1">Project Log:</span>
                  <span>{skill.context}</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {filteredSkills.length === 0 && (
        <div className="rounded-xl border border-dashed border-[var(--border-subtle)] p-8 text-center text-xs font-mono text-[var(--fg-muted)]">
          No skills match your filter criteria.
        </div>
      )}
    </div>
  );
}
