import { openWhatsApp } from '../lib/whatsapp';
import { usePageSEO } from '../hooks/usePageSEO';

import CommunityHero from '../components/community/CommunityHero';
import WhoWeAreSection from '../components/community/WhoWeAreSection';
import OriginProblemSection from '../components/community/OriginProblemSection';
import CohortProgramsSection from '../components/community/CohortProgramsSection';
import CommunityApplySection from '../components/community/CommunityApplySection';

export default function CommunityPage() {
  usePageSEO({
    title: 'Visibility Clan · VClan | Digitalife Ehub',
    description:
      'The premier business growth ecosystem for African builders. Find clarity, implement operational structure, and scale brand visibility.',
    keywords:
      'Visibility Clan, VClan, African business community, MSME cohort, startup growth ecosystem, business mentorship Nigeria',
  });

  const handleApplyClick = () => {
    openWhatsApp('Hi Digitalife Ehub, I would like to apply for the next VClan cohort program.');
  };

  const handleCardClick = (title: string, program: string) => {
    openWhatsApp(
      `Hi Digitalife Ehub, I would like to apply for the "${program}" cohort program for ${title}.`
    );
  };

  const handleExploreProgramsClick = () => {
    document.getElementById('programs')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#fffdf5]">
      {/* 1. Hero */}
      <CommunityHero onExploreProgramsClick={handleExploreProgramsClick} />

      {/* 2. Who We Are */}
      <WhoWeAreSection />

      {/* 3. The Problem & Origin */}
      <OriginProblemSection />

      {/* 4. Cohort Programs */}
      <CohortProgramsSection onCardClick={handleCardClick} />

      {/* 5. Apply Section */}
      <CommunityApplySection onApplyClick={handleApplyClick} />
    </div>
  );
}
