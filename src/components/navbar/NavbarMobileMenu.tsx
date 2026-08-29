import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { openWhatsApp, WA_MESSAGES } from '../../lib/whatsapp';
import NavbarNotifications from './NavbarNotifications';

interface NavbarMobileMenuProps {
  isOpen: boolean;
  onLinkClick: () => void;
}

export default function NavbarMobileMenu({ isOpen, onLinkClick }: NavbarMobileMenuProps) {
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-[#fffdf5]/95 backdrop-blur-lg overflow-hidden border-b border-black/5"
        >
          <div className="px-6 py-4 flex flex-col gap-3">
            {/* Direct Services Link */}
            <Link
              to="/services"
              onClick={onLinkClick}
              className={`text-sm font-bold py-2 border-b border-black/5 ${
                isActive('/services') ? 'text-[#3e4095]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Services
            </Link>

            {/* Direct Community Link */}
            <Link
              to="/community"
              onClick={onLinkClick}
              className={`text-sm font-bold py-2 border-b border-black/5 ${
                isActive('/community') ? 'text-[#3e4095]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Community
            </Link>

            {/* Collapsible Resources */}
            <div>
              <button
                type="button"
                onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                className="w-full flex items-center justify-between text-sm font-bold text-slate-900 py-2 border-b border-black/5 bg-transparent border-t-0 border-x-0 cursor-pointer"
              >
                <span>Resources</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    mobileResourcesOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {mobileResourcesOpen && (
                <div className="pl-4 py-2 flex flex-col gap-2.5 mt-1 border-l-2 border-[#ffd148]">
                  <Link
                    to="/resources"
                    onClick={onLinkClick}
                    className="text-xs font-bold text-slate-600 hover:text-slate-950"
                  >
                    Resource Library
                  </Link>
                  <Link
                    to="/blog"
                    onClick={onLinkClick}
                    className="text-xs font-bold text-slate-600 hover:text-slate-950"
                  >
                    Blog &amp; Insights
                  </Link>
                  <Link
                    to="/community"
                    onClick={onLinkClick}
                    className="text-xs font-bold text-slate-600 hover:text-slate-950"
                  >
                    Community
                  </Link>
                </div>
              )}
            </div>

            {/* Direct About Link */}
            <Link
              to="/about"
              onClick={onLinkClick}
              className={`text-sm font-bold py-2 border-b border-black/5 ${
                isActive('/about') ? 'text-[#3e4095]' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              About Us
            </Link>

            <div className="flex items-center gap-3 pt-3 mt-1">
              <button
                type="button"
                onClick={() => {
                  onLinkClick();
                  openWhatsApp(WA_MESSAGES.bookDemo);
                }}
                className="w-full bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold py-3 rounded-xl text-center transition-all text-xs cursor-pointer border-none"
              >
                Book Demo
              </button>

              <NavbarNotifications mobileMode />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
