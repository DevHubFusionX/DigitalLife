import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import FlipText from './ui/flip-text';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

import NavbarDesktopLinks from './navbar/NavbarDesktopLinks';
import NavbarNotifications from './navbar/NavbarNotifications';
import NavbarMobileMenu from './navbar/NavbarMobileMenu';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let lastScrollPos = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;

          // Determine if navbar is scrolled past threshold (50px)
          const shouldBeScrolled = currentScrollPos > 50;
          setScrolled((prev) => (prev !== shouldBeScrolled ? shouldBeScrolled : prev));

          // Smart hide on scroll down, show on scroll up
          // Always show at the top of the page (within 100px)
          if (currentScrollPos < 100) {
            setVisible(true);
          } else {
            const isScrollingUp = lastScrollPos > currentScrollPos;
            if (isOpen) {
              setVisible(true);
            } else {
              setVisible(isScrollingUp);
            }
          }

          lastScrollPos = currentScrollPos;
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isOpen]);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -90 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#fffdf5]/98 md:bg-[#fffdf5]/85 md:backdrop-blur-xl border-b border-black/5 shadow-xs py-2'
          : 'bg-[#fffdf5]/98 md:bg-[#fffdf5]/95 md:backdrop-blur-md border-b border-black/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo and Brand Name */}
        <Link
          to="/"
          onClick={handleLinkClick}
          className="flex items-center gap-2 cursor-pointer group no-underline"
        >
          <img
            src="/logo.svg"
            alt="Digitalife Ehub Logo"
            className="h-10 w-auto transition-transform duration-300 group-hover:scale-105"
          />
          <span className="text-xl font-extrabold tracking-tight flex items-center">
            <FlipText className="text-[#3e4095]" duration={2.2} delay={0}>
              Digitalife
            </FlipText>
            <span className="w-1 inline-block">&nbsp;</span>
            <FlipText className="text-[#ffd148]" duration={2.2} delay={0.35}>
              Ehub
            </FlipText>
          </span>
        </Link>

        {/* Desktop Links (Services, Community, Resources dropdown, About) */}
        <NavbarDesktopLinks onLinkClick={handleLinkClick} />

        {/* Desktop CTAs (Book Demo + Notifications) */}
        <div className="hidden md:flex items-center gap-3 relative">
          <motion.button
            type="button"
            onClick={() => openWhatsApp(WA_MESSAGES.bookDemo)}
            whileHover={{
              scale: 1.02,
              backgroundColor: '#3e4095',
              color: '#ffffff',
              borderColor: '#3e4095',
            }}
            whileTap={{ scale: 0.98 }}
            className="border border-[#3e4095] text-[#3e4095] font-bold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer bg-transparent"
          >
            Book Demo
          </motion.button>

          <NavbarNotifications />
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors duration-300 cursor-pointer border-none bg-transparent"
          aria-label="Toggle Navigation Menu"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <NavbarMobileMenu isOpen={isOpen} onLinkClick={handleLinkClick} />
    </motion.nav>
  );
}
