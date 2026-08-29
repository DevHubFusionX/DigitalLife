import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

interface NavbarDesktopLinksProps {
  onLinkClick: () => void;
}

export default function NavbarDesktopLinks({ onLinkClick }: NavbarDesktopLinksProps) {
  const [activeDropdown, setActiveDropdown] = useState<'resources' | null>(null);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
      {/* Services Link */}
      <Link
        to="/services"
        onClick={onLinkClick}
        className={`text-[13px] font-bold transition-all duration-300 relative py-1 uppercase tracking-wider ${
          isActive('/services') ? 'text-[#3e4095]' : 'text-slate-500 hover:text-[#3e4095]'
        }`}
      >
        Services
        {isActive('/services') && (
          <motion.span
            layoutId="activeNavLine"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd148] rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>

      {/* Community Link */}
      <Link
        to="/community"
        onClick={onLinkClick}
        className={`text-[13px] font-bold transition-all duration-300 relative py-1 uppercase tracking-wider ${
          isActive('/community') ? 'text-[#3e4095]' : 'text-slate-500 hover:text-[#3e4095]'
        }`}
      >
        Community
        {isActive('/community') && (
          <motion.span
            layoutId="activeNavLine"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd148] rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>

      {/* Resources Dropdown */}
      <div
        className="relative py-4"
        onMouseEnter={() => setActiveDropdown('resources')}
        onMouseLeave={() => setActiveDropdown(null)}
      >
        <button
          type="button"
          className="flex items-center gap-1 text-[13px] font-bold text-slate-500 hover:text-[#3e4095] transition-colors duration-200 cursor-pointer uppercase tracking-wider border-none bg-transparent"
        >
          Resources{' '}
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-200 ${
              activeDropdown === 'resources' ? 'rotate-180' : ''
            }`}
          />
        </button>

        <AnimatePresence>
          {activeDropdown === 'resources' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute top-12 left-1/2 -translate-x-1/2 w-[90vw] max-w-xl bg-[#fffdf5] border border-black/10 rounded-3xl p-5 shadow-xl z-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Links */}
                <div className="md:col-span-7 flex flex-col gap-3">
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">
                    Library &amp; Insights
                  </span>
                  <div className="flex flex-col gap-3">
                    <Link
                      to="/resources"
                      onClick={() => {
                        setActiveDropdown(null);
                        onLinkClick();
                      }}
                      className="group/item flex flex-col"
                    >
                      <span className="text-sm font-bold text-slate-900 group-hover/item:text-[#3e4095] transition-colors">
                        Resource Library
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold leading-normal">
                        Browse templates, tools &amp; models.
                      </span>
                    </Link>

                    <Link
                      to="/blog"
                      onClick={() => {
                        setActiveDropdown(null);
                        onLinkClick();
                      }}
                      className="group/item flex flex-col"
                    >
                      <span className="text-sm font-bold text-slate-900 group-hover/item:text-[#3e4095] transition-colors">
                        Growth Blog
                      </span>
                      <span className="text-[10px] text-slate-400 font-semibold leading-normal">
                        In-depth strategies and articles.
                      </span>
                    </Link>
                  </div>
                </div>

                {/* Spotlight */}
                <div className="md:col-span-5 bg-[#3e4095]/2 border border-black/5 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest mb-2 block bg-[#3e4095]/10 px-2 py-0.5 rounded-md w-fit">
                      Ecosystem
                    </span>
                    <h4 className="text-xs font-bold text-slate-950 mb-1 leading-snug">
                      MSME Community
                    </h4>
                    <p className="text-slate-400 text-[10px] font-semibold leading-relaxed">
                      Collaborate and progress with founders.
                    </p>
                  </div>
                  <Link
                    to="/community"
                    onClick={() => {
                      setActiveDropdown(null);
                      onLinkClick();
                    }}
                    className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-slate-950 hover:text-[#3e4095] mt-4 transition-colors"
                  >
                    Join Now <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* About Link */}
      <Link
        to="/about"
        onClick={onLinkClick}
        className={`text-[13px] font-bold transition-all duration-300 relative py-1 uppercase tracking-wider ${
          isActive('/about') ? 'text-[#3e4095]' : 'text-slate-500 hover:text-[#3e4095]'
        }`}
      >
        About
        {isActive('/about') && (
          <motion.span
            layoutId="activeNavLine"
            className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#ffd148] rounded-full"
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
          />
        )}
      </Link>
    </div>
  );
}
