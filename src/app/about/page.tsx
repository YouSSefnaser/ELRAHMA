import { Metadata } from 'next';
import { AboutHero } from '@/components/about/about-hero';
// import { StorySection } from '@/components/about/story-section';
import { TeamSection } from '@/components/about/team-section';
// import { ValuesSection } from '@/components/about/values-section';
// import { AwardsSection } from '@/components/about/awards-section';

export const metadata: Metadata = {
  title: 'About Us | Cinematic Photography Studio Dubai',
  description:
    'Learn about El Rahama Photography - Dubai\'s premier cinematic photography studio. Our story, team, values, and commitment to editorial excellence.',
  other: {
    keywords: 'photography studio Dubai, about El Rahama Photography, Dubai photographers, cinematic photography team, luxury photography studio',
  },
};

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      {/* <StorySection /> */}
      <TeamSection />
      {/* <ValuesSection /> */}
      {/* <AwardsSection /> */}
    </>
  );
}
