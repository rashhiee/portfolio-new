import type { Metadata } from "next";
import { PhotoGallery } from "@/components/ui/gallery";
import { AestheticDesktopBackground } from "@/components/ui/AestheticDesktopBackground";

export const metadata: Metadata = {
  title: "Engineering Insights & Articles | Muhammed Rashid",
  description:
    "Technical deep dives into microservices, high-concurrency systems, full-stack architecture, and production deployments by Muhammed Rashid.",
};

export default function BlogsPage() {
  return (
    <main className="w-full min-h-screen overflow-hidden pb-20 font-sans relative">
      {/* Aesthetic Four-Corner Background (Desktop Light Mode Only) */}
      <AestheticDesktopBackground />

      <div className="relative z-10 w-full">
        <PhotoGallery />
      </div>
    </main>
  );
}
