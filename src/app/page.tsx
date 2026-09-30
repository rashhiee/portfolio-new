import { HeroSection } from "@/components/home/HeroSection";

interface HomePageProps {
  searchParams?: Promise<{ contact?: string }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const resolvedParams = searchParams ? await searchParams : undefined;
  const isContactOpen = resolvedParams?.contact === "open";

  return <HeroSection defaultContactOpen={isContactOpen} />;
}
