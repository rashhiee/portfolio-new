import { Suspense } from "react";
import type { Metadata } from "next";
import { ProjectsClient } from "@/components/projects/ProjectsClient";

export const metadata: Metadata = {
  title: "Projects & Architecture | Muhammed Rashid",
  description:
    "Explore full-stack platforms, distributed microservices, and high-concurrency systems engineered by Muhammed Rashid.",
};

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen w-full flex items-center justify-center bg-[var(--bg-primary)]">
          <div className="text-sm font-mono text-[var(--fg-muted)] animate-pulse">
            Loading Projects...
          </div>
        </div>
      }
    >
      <ProjectsClient />
    </Suspense>
  );
}
