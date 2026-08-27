import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';
import { usePageSEO } from '../hooks/usePageSEO';

export default function Home() {
  usePageSEO({
    title: 'Digitalife Ehub | Business Structure Consultant & MSME Growth Framework',
    description:
      'Digitalife Ehub offers business development support, MSME growth frameworks, and operational systems design to guide founders from hustle to structured growth.',
    keywords:
      'business structure consultant, business development support, MSME growth framework, moving from hustle to structured growth, small business development services, structured business growth, corporate structure for MSMEs, SME scaling strategy, business clarity development, operational systems design',
  });

  return (
    <>
      <Hero />
      <Features />
      <About />
      <Testimonials />
      <FAQ />
    </>
  );
}
