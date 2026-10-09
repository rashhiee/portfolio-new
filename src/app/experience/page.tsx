import { Metadata } from "next";
import { TrainWindow } from "@/components/experience/TrainWindow";
import { ExperienceTimeline } from "@/components/experience/ExperienceTimeline";
import { AestheticDesktopBackground } from "@/components/ui/AestheticDesktopBackground";

export const metadata: Metadata = {
  title: "Experience | The Journey So Far",
  description:
    "Explore my experience, professional journey, technical skills, and the projects I've worked on using modern web technologies.",
};

export default function ExperiencePage() {
  return (
    <div className="w-full flex justify-center items-start overflow-hidden relative">
      {/* Aesthetic Four-Corner Background (Desktop Light Mode Only) */}
      <AestheticDesktopBackground />

      <div className="w-full max-w-5xl relative z-10">
        <section className="w-full flex flex-col justify-center items-center py-10">
          <TrainWindow />
          <ExperienceTimeline />
        </section>
      </div>
    </div>
  );
}
