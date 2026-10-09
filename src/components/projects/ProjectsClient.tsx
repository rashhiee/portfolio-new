"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { PROJECTS, type ProjectItem } from "@/data/projects";
import { ProjectDetailModal } from "@/components/projects/ProjectDetailModal";

import { AestheticDesktopBackground } from "@/components/ui/AestheticDesktopBackground";

export function ProjectsClient() {
  const searchParams = useSearchParams();

  // Find initial active project if requested via URL
  const [selectedProject, setSelectedProject] = React.useState<ProjectItem | null>(() => {
    const projId = searchParams.get("project");
    if (!projId) return null;
    return PROJECTS.find((p) => p.id === projId) || null;
  });

  // Sync with searchParams if they change dynamically
  React.useEffect(() => {
    const projId = searchParams.get("project");
    if (projId) {
      const match = PROJECTS.find((p) => p.id === projId);
      if (match) setSelectedProject(match);
    } else {
      setSelectedProject(null);
    }
  }, [searchParams]);

  const wheelItems: WorksWheelItem[] = React.useMemo(() => {
    return PROJECTS.map((proj) => ({
      id: proj.id,
      title: proj.title,
      image: proj.image,
      description: proj.tagline,
      href: `#${proj.id}`,
    }));
  }, []);

  const handleSelectProject = (item: WorksWheelItem) => {
    const matched = PROJECTS.find(
      (p) => p.id === item.id || p.title === item.title
    );
    if (matched) {
      setSelectedProject(matched);
      const newUrl = `/projects?project=${matched.id}`;
      window.history.replaceState({ ...window.history.state, as: newUrl, url: newUrl }, "", newUrl);
    }
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    window.history.replaceState(
      { ...window.history.state, as: "/projects", url: "/projects" },
      "",
      "/projects"
    );
  };

  return (
    <div className="relative w-full h-[calc(100dvh-3.5rem)] sm:h-screen flex flex-col justify-center overflow-hidden bg-transparent dark:bg-[var(--bg-primary)] select-none">
      {/* Aesthetic Background with right-side solar image removed on Projects */}
      <AestheticDesktopBackground hideTopRight={true} />

      {/* 3D Wheel Stage */}
      <div className="relative z-10 flex-1 w-full min-h-0">
        <WorksWheel
          items={wheelItems}
          label=" works"
          onItemSelect={handleSelectProject}
          className="h-full w-full bg-transparent"
        />
      </div>

      {/* Bottom clearance for floating dock */}
      <div className="h-14 sm:h-16 shrink-0 pointer-events-none" />

      {/* Project Detail Modal */}
      <ProjectDetailModal project={selectedProject} onClose={handleCloseModal} />
    </div>
  );
}
