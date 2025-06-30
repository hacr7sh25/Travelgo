import { HeroSection } from '@/components/home/HeroSection';
import { FeaturesSection } from '@/components/home/FeaturesSection';
import { TopPlacesSection } from '@/components/home/TopPlacesSection';
import { PetrolStationsSection } from '@/components/home/PetrolStationsSection';
import { CommunitySection } from '@/components/home/CommunitySection';

export function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturesSection />
      <TopPlacesSection />
      <PetrolStationsSection />
      <CommunitySection />
    </div>
  );
}