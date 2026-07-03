import { motion } from 'framer-motion';
import TwistingRibbon from './ui/twisting-ribbon';
import { ArrowUpRight, Mail, MapPin, ArrowUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import FlipText from './ui/flip-text';

interface FooterProps {
  onOpenBooking: () => void;
}

export default function Footer({ onOpenBooking }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'Twitter',
      url: 'https://twitter.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      )
    },
    {
      name: 'Facebook',
      url: 'https://facebook.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" />
        </svg>
      )
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com',
      svg: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
        </svg>
      )
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#fffdf5] pt-12 relative overflow-hidden" id="contact">
      
      {/* Decorative top border line */}
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-[#ffd148]/30 to-transparent" />

      {/* CTA Card Section */}
      <div className="max-w-7xl mx-auto px-6 pb-20">
        <div className="relative w-full rounded-[40px] overflow-hidden bg-linear-to-br from-[#0f1712] via-[#090f0b] to-[#040605] px-8 py-16 md:py-20 md:px-16 flex flex-col lg:flex-row justify-between items-center gap-12 border border-[#ffd148]/15 shadow-2xl shadow-black/10">

          {/* Animated Twisting Ribbon Canvas Backdrop */}
          <div className="absolute inset-0 z-0 opacity-35 pointer-events-none">
            <TwistingRibbon
              segments={400}
              waveSpeed={0.015}
              waveAmplitude={0.7}
              twistCycles={5}
            />
          </div>

          {/* Left Text */}
          <div className="relative z-10 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffd148] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300">
                Our Promise
              </span>
            </div>
            <h3 className="text-white text-3xl md:text-4xl lg:text-[40px] font-extrabold tracking-tight mb-4 leading-tight">
              Let’s Move You From Hustle to Growth.
            </h3>
            <p className="text-slate-400 text-sm md:text-base font-semibold leading-relaxed max-w-xl">
              We do not overwhelm you with services. We focus on what truly moves your business forward: Clarity. Structure. Visibility. If you're ready to build intentionally, we’re ready to build with you.
            </p>
          </div>

          {/* Right Buttons */}
          <div className="relative z-10 flex flex-col gap-3.5 w-full md:max-w-md lg:w-80 shrink-0">
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white hover:bg-slate-100 text-slate-950 font-bold px-7 py-4 rounded-full text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer border-none text-center"
            >
              Book a Growth Consultation
              <ArrowUpRight className="w-3.5 h-3.5" />
            </motion.button>
            <motion.button
              onClick={onOpenBooking}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="bg-transparent border border-white/20 hover:border-white/40 text-white font-bold px-7 py-4 rounded-full text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer text-center"
            >
              Speak With Our Team
            </motion.button>
            <Link
              to="/community"
              className="bg-[#ffd148] hover:bg-[#ffd148]/95 text-black font-bold px-7 py-4 rounded-full text-xs shadow-lg flex items-center justify-center gap-1.5 transition-all cursor-pointer border-none text-center"
            >
              Join our free Community
            </Link>
          </div>

        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-6 border-t border-slate-900/10 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-12 mb-16">
          
          {/* Col 1: Logo & Vision */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-2 cursor-pointer group w-fit">
              <img src="/logo.svg" alt="Digitalife Ehub Logo" className="h-14 w-auto" />
              <span className="text-xl font-extrabold tracking-tight flex items-center">
                <FlipText className="text-[#3e4095]" duration={2.2} delay={0}>Digitalife</FlipText>
                <span className="w-1 inline-block">&nbsp;</span>
                <FlipText className="text-[#ffd148]" duration={2.2} delay={0.35}>Ehub</FlipText>
              </span>
            </Link>
            <p className="text-[#717b72] text-sm font-semibold leading-relaxed max-w-sm">
              Digitalife Ehub is a business development and brand management firm focused on empowering MSMEs, SMEs, and early-stage entrepreneurs to build structured, scalable, and visible enterprises.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-slate-900/5 hover:bg-slate-900 hover:text-white text-[#717b72] flex items-center justify-center transition-all duration-300 shadow-sm"
                  aria-label={social.name}
                >
                  {social.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Navigation
            </span>
            <div className="flex flex-col gap-3 font-semibold text-sm">
              {[
                { name: 'Home', to: '/#home' },
                { name: 'About Us', to: '/about' },
                { name: 'Services', to: '/services' },
                { name: 'Community', to: '/community' },
                { name: 'Trainings', to: '/community' }
              ].map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="text-[#717b72] hover:text-slate-950 transition-colors duration-200"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Col 3: Contact & Info */}
          <div className="lg:col-span-3 flex flex-col gap-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Get in touch
            </span>
            <div className="flex flex-col gap-4 font-semibold text-sm text-[#717b72]">
              <div className="flex items-start gap-2.5">
                <Mail className="w-4.5 h-4.5 text-slate-900/40 shrink-0 mt-0.5" />
                <a href="mailto:info@digitalifeehub.com" className="hover:text-slate-950 transition-colors">
                  info@digitalifeehub.com
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4.5 h-4.5 text-slate-900/40 shrink-0 mt-0.5" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Col 4: Resources */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Resources
            </span>
            <div className="flex flex-col gap-3 font-semibold text-sm">
              {[
                { name: 'Download Checklist', to: '/#checklist' },
                { name: 'Free Community', to: '/#free-community' },
                { name: 'Growth FAQs', to: '/#resources' }
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="text-[#717b72] hover:text-slate-950 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* Legal Disclaimer Subfooter */}
        <div className="border-t border-slate-900/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 text-xs font-semibold text-[#717b72]">
          <div className="flex items-center gap-2">
            <span>© Copyright {currentYear} Digitalife Ehub. All Rights Reserved.</span>
          </div>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="hover:text-slate-950 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-slate-950 transition-colors">Terms & Conditions</Link>
            <button 
              onClick={scrollToTop}
              className="w-8 h-8 rounded-full bg-slate-900/5 hover:bg-slate-900 hover:text-white flex items-center justify-center text-slate-800 transition-all duration-300 shadow-sm cursor-pointer border-none"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

    </footer>
  );
}
