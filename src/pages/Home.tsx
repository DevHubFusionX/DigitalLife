import { useEffect } from 'react';
import Hero from '../components/Hero';
import Features from '../components/Features';
import About from '../components/About';
import Testimonials from '../components/Testimonials';
import FAQ from '../components/FAQ';

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "Digitalife Ehub | Business Structure Consultant & MSME Growth Framework";
    
    // Update meta description
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Digitalife Ehub offers business development support, MSME growth frameworks, and operational systems design to guide founders from hustle to structured growth.');

    // Update meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', 'business structure consultant, business development support, MSME growth framework, moving from hustle to structured growth, small business development services, structured business growth, corporate structure for MSMEs, SME scaling strategy, business clarity development, operational systems design');
  }, []);

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
