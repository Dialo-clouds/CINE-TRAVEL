import { AppSidebar } from "@/components/layout/app-sidebar";
import { HeroTitle } from "@/components/ui/hero-title";
import { GlassSurface } from "@/components/ui/glass-surface";
import { CineScoreBadge } from "@/components/ui/cinescore-badge";
import { GoldenButton } from "@/components/ui/golden-button";
import { MapPin, Thermometer, Sun, Mountain, Users, Clock, Star, Plus } from "lucide-react";

const destinationData: Record<string, any> = {
  patagonia: {
    name: "PATAGONIA", location: "CHILE / ARGENTINA", cinescore: 94,
    description: "Patagonia is not a destination; it is a confrontation with scale. The Fitz Roy massif rises from the steppe like a cathedral built for giants. Glaciers calve into milky turquoise lakes. The wind is a constant companion.",
    stats: [
      { icon: Sun, label: "BEST SEASON", value: "OCT-MAR" },
      { icon: Thermometer, label: "AVG TEMP", value: "12°C" },
      { icon: Clock, label: "GOLDEN HOUR", value: "06:45" },
      { icon: Mountain, label: "ELEVATION", value: "1,200M" },
      { icon: Users, label: "CROWD INDEX", value: "LOW" },
    ],
    experiences: [
      { title: "Glacier Ice Trekking", description: "Navigate ancient ice with crampons and axes.", duration: "6 HOURS", difficulty: "MODERATE", eco: true },
      { title: "Dawn Photography", description: "Capture the Fitz Roy massif at first light.", duration: "4 HOURS", difficulty: "EASY", eco: false },
      { title: "Steppe Night Camping", description: "Sleep under the Southern Cross.", duration: "12 HOURS", difficulty: "CHALLENGING", eco: true },
    ],
    accommodations: [
      { name: "REFUGIO POINCENOT", type: "MOUNTAIN REFUGE", score: 91, price: "$120/night" },
      { name: "ECO LODGE PERITO", type: "GLACIER LODGE", score: 95, price: "$350/night" },
    ],
  },
};

export default async function DestinationPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = destinationData[slug] || destinationData.patagonia;

  return (
    <div className="flex h-screen bg-deep-midnight">
      <AppSidebar />
      <main className="flex-1 overflow-y-auto">
        <div className="relative h-[60vh] bg-gradient-to-br from-cosmic-navy via-deep-midnight to-cosmic-navy flex items-end">
          <div className="absolute inset-0 bg-radial-gradient from-aurora-blue/5 via-transparent to-transparent" />
          <div className="relative z-10 w-full max-w-6xl mx-auto px-8 pb-12">
            <CineScoreBadge score={data.cinescore} className="mb-4" />
            <HeroTitle size="hero-md">{data.name}</HeroTitle>
            <div className="mt-2 flex items-center gap-2">
              <MapPin className="h-4 w-4 text-aurora-blue" />
              <span className="cinematic-caption text-aurora-blue">{data.location}</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-8 py-8">
          <div className="mb-8 flex gap-3 overflow-x-auto pb-2">
            {data.stats.map((stat: any) => (
              <GlassSurface key={stat.label} padding="sm" className="flex items-center gap-3 whitespace-nowrap">
                <stat.icon className="h-4 w-4 text-aurora-blue" />
                <div>
                  <p className="text-[8px] font-space-grotesk uppercase tracking-[0.2em] text-arctic-white/50">{stat.label}</p>
                  <p className="text-data font-semibold text-arctic-white">{stat.value}</p>
                </div>
              </GlassSurface>
            ))}
          </div>

          <div className="mb-10">
            <p className="cinematic-caption mb-3">The Expedition</p>
            <p className="text-body-lg text-arctic-white/70 leading-relaxed max-w-3xl">{data.description}</p>
          </div>

          <div className="mb-10">
            <p className="cinematic-caption mb-4">Curated Experiences</p>
            <div className="space-y-3">
              {data.experiences.map((exp: any) => (
                <GlassSurface key={exp.title} padding="lg" className="flex items-center gap-4">
                  <Star className="h-5 w-5 text-golden-sand shrink-0" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-space-grotesk text-heading-4 text-arctic-white">{exp.title}</h3>
                      {exp.eco && <span className="rounded-chip border border-emerald-expedition/50 bg-emerald-expedition/10 px-2 py-0.5 text-[8px] font-space-grotesk uppercase tracking-wider text-emerald-expedition">ECO</span>}
                    </div>
                    <p className="mt-1 text-body-sm text-arctic-white/50">{exp.description}</p>
                    <div className="mt-2 flex gap-4 text-caption text-arctic-white/30">
                      <span>{exp.duration}</span>
                      <span>{exp.difficulty}</span>
                    </div>
                  </div>
                </GlassSurface>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <p className="cinematic-caption mb-4">Accommodations</p>
            <div className="grid gap-4 sm:grid-cols-2">
              {data.accommodations.map((acc: any) => (
                <GlassSurface key={acc.name} hover padding="lg">
                  <CineScoreBadge score={acc.score} className="mb-3" />
                  <h3 className="font-space-grotesk text-heading-4 text-arctic-white">{acc.name}</h3>
                  <p className="mt-1 text-body-sm text-arctic-white/50">{acc.type}</p>
                  <p className="mt-2 text-data font-semibold text-golden-sand">{acc.price}</p>
                </GlassSurface>
              ))}
            </div>
          </div>

          <div className="sticky bottom-4 mt-8">
            <GlassSurface padding="lg" className="flex items-center justify-between">
              <p className="text-body text-arctic-white/70">Ready to explore {data.name}?</p>
              <GoldenButton icon={<Plus className="h-4 w-4" />}>Add to Storyboard</GoldenButton>
            </GlassSurface>
          </div>
        </div>
      </main>
    </div>
  );
}
