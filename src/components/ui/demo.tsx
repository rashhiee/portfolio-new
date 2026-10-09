"use client";

import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { PhotoGallery } from "@/components/ui/gallery";

const WORKS: WorksWheelItem[] = [
  {
    title: "Rate Limiting",
    image: "/images/projects/ratelimiter.jpg",
    href: "#rate-limiting",
  },
  {
    title: "Event Streams",
    image: "/images/projects/taskengine.jpg",
    href: "#event-streams",
  },
  {
    title: "Theme Engine",
    image: "/images/projects/zanpad.jpg",
    href: "#theme-engine",
  },
  {
    title: "Query Tuning",
    image: "/images/projects/autospace.jpg",
    href: "#query-tuning",
  },
  {
    title: "Cloud Scale",
    image: "/images/projects/cloudshield.jpg",
    href: "#cloud-scale",
  },
  {
    title: "WebSockets",
    image: "/images/projects/devpulse.jpg",
    href: "#websockets",
  },
  {
    title: "Zero Downtime",
    image: "/images/projects/shoebox.jpg",
    href: "#zero-downtime",
  },
  {
    title: "Cache Layer",
    image: "/images/projects/paalazhi.jpg",
    href: "#cache-layer",
  },
];

export function GalleryPage() {
  return (
    <main className="overflow-hidden">
      <PhotoGallery />
    </main>
  );
}

export default function WorksWheelDemo() {
  return (
    <div className="bg-background text-foreground w-full h-screen">
      <WorksWheel items={WORKS} label="Projects" />
    </div>
  );
}
