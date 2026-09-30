"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PROJECTS, ProjectItem } from "@/data/projects";
import { BlueprintCard } from "@/components/projects/BlueprintCard";
import { ServerBladeCard } from "@/components/projects/ServerBladeCard";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";
import { TagFilter } from "@/components/projects/TagFilter";
import { Info, Server, Cpu } from "lucide-react";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const [activeTag, setActiveTag] = useState("All");
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(() => {
    const projId = searchParams.get("project");
    return projId ? PROJECTS.find((p) => p.id === projId) || null : null;
  });

  // Keep in sync if searchParams change dynamically
  useEffect(() => {
    const projId = searchParams.get("project");
    if (projId) {
      const match = PROJECTS.find((p) => p.id === projId);
      if (match) setSelectedProject(match);
    }
  }, [searchParams]);

  // Derive all unique filter tags
  const tags = useMemo(() => {
    const curated = [
      "All",
      "Microservices",
      "Next.js",
      "React",
      "Node.js",
      "PostgreSQL",
      "MongoDB",
      "Redis",
      "RabbitMQ",
      "AWS EC2",
      "Stripe",
    ];
    return curated;
  }, []);

  // Compute counts per tag
  const projectCounts = useMemo(() => {
    const counts: Record<string, number> = { All: PROJECTS.length };
    tags.forEach((tag) => {
      if (tag === "All") return;
      counts[tag] = PROJECTS.filter((p) =>
        p.techStack.some((t) => t.toLowerCase() === tag.toLowerCase())
      ).length;
    });
    return counts;
  }, [tags]);

  // Filter projects by active tag
  const filteredProjects = useMemo(() => {
    if (activeTag === "All") return PROJECTS;
    return PROJECTS.filter((p) =>
      p.techStack.some((t) => t.toLowerCase() === activeTag.toLowerCase())
    );
  }, [activeTag]);

  const featuredProject = filteredProjects.find((p) => p.isFeatured);
  const otherProjects = filteredProjects.filter((p) => !p.isFeatured);

  return (
    <div className="w-full max-w-4xl px-4 sm:px-6 py-12 sm:py-16 space-y-12">
      {/* Page Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-3.5 py-1 text-xs font-mono text-[var(--fg-muted)] shadow-xs">
          <span>ROUTE [3] • ARCHITECTURAL SYSTEMS</span>
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl sm:text-5xl font-serif font-medium tracking-tight text-[var(--fg-primary)]">
            Systems & Projects
          </h1>
          <p className="max-w-2xl text-sm sm:text-base text-[var(--fg-muted)] leading-relaxed font-sans">
            Engineered full-stack platforms, distributed microservices, and responsive client
            applications. Every project includes genuine system specs, database decisions, and
            deployment topology.
          </p>
        </div>

        {/* Verification status notice */}
        <div className="inline-flex items-center gap-2 rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)]/70 px-3 py-1.5 text-xs font-mono text-[var(--fg-muted)]">
          <Info className="h-3.5 w-3.5 text-[var(--accent)]" />
          <span>Verified Systems Only • Links marked [ADD LINK] • Zero fabricated metrics</span>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-[var(--fg-muted)]">
          <span className="uppercase tracking-wider font-semibold text-[var(--fg-primary)]">
            Filter by Technology / Topology:
          </span>
          <span>{filteredProjects.length} Systems Active</span>
        </div>
        <TagFilter
          tags={tags}
          activeTag={activeTag}
          onSelectTag={setActiveTag}
          projectCounts={projectCounts}
        />
      </div>

      {/* Featured Microservices Blueprint Card */}
      {featuredProject && (
        <section aria-label="Featured Architecture" className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-600 dark:text-cyan-400 font-bold uppercase tracking-wider">
            <Cpu className="h-4 w-4" />
            <span>PRIMARY BLUEPRINT // DISTRIBUTED TOPOLOGY</span>
          </div>
          <BlueprintCard
            project={featuredProject}
            onOpenDetails={(p) => setSelectedProject(p)}
          />
        </section>
      )}

      {/* Server Blade Rackmount Cards Grid */}
      {otherProjects.length > 0 && (
        <section aria-label="Production Systems" className="space-y-4">
          <div className="flex items-center justify-between text-xs font-mono border-b border-[var(--border-subtle)] pb-2.5">
            <div className="flex items-center gap-2 text-[var(--fg-muted)] font-bold uppercase tracking-wider">
              <Server className="h-4 w-4 text-[var(--accent)]" />
              <span>SERVER BLADES // PRODUCTION & EDGE ({otherProjects.length})</span>
            </div>
            <span className="text-[var(--fg-muted)]">Rack Slots 01–0{otherProjects.length}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {otherProjects.map((project, idx) => (
              <ServerBladeCard
                key={project.id}
                project={project}
                slotIndex={idx + 1}
                onOpenDetails={(p) => setSelectedProject(p)}
              />
            ))}
          </div>
        </section>
      )}

      {/* Empty Filter State */}
      {filteredProjects.length === 0 && (
        <div className="rounded-2xl border border-dashed border-[var(--border-subtle)] bg-[var(--bg-surface)] p-12 text-center space-y-3">
          <p className="text-sm font-mono text-[var(--fg-muted)]">
            No projects found matching the &ldquo;{activeTag}&rdquo; filter.
          </p>
          <button
            onClick={() => setActiveTag("All")}
            className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-canvas)] px-3 py-1.5 text-xs font-mono text-[var(--accent)] hover:border-[var(--accent)] transition-colors cursor-pointer"
          >
            Reset Filter to All
          </button>
        </div>
      )}

      {/* Modal Inspector for Deep-Dives */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      {/* Footer Notes */}
      <div className="pt-8 border-t border-[var(--border-subtle)] text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-[var(--fg-muted)]">
        <div>
          <span>Muhammed Rashid • Systems & Engineering Blueprints</span>
        </div>
        <div className="text-[11px] text-[var(--fg-muted)]">
          Live links & GitHub repositories marked [ADD LINK] pending final domain mapping.
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense fallback={null}>
      <ProjectsContent />
    </Suspense>
  );
}
