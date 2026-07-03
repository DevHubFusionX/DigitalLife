import { useState, useEffect } from 'react';
import { Menu, X, Bell, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import FlipText from './ui/flip-text';

interface NavbarProps {
  onOpenBooking: () => void;
}

export default function Navbar({ onOpenBooking }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'services' | 'resources' | null>(null);
  const [mobileResourcesOpen, setMobileResourcesOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const location = useLocation();

  // Smart navbar state
  const [visible, setVisible] = useState(true);
  const [scrolled, setScrolled] = useState(false);

  const notifications = [
    {
      id: 1,
      title: "New Playbook Released",
      description: "Standard Operating Procedures (SOP) Template is now available for download.",
      time: "2 hours ago",
      tag: "Resources"
    },
    {
      id: 2,
      title: "Operations Cohort Launching",
      description: "Seat reservations are open for the August Cohort. Applications close soon.",
      time: "1 day ago",
      tag: "Cohort"
    },
    {
      id: 3,
      title: "Slack Peer Exchange Live",
      description: "Join 1,200+ founders discussing strategy and scaling.",
      time: "3 days ago",
      tag: "Community"
    }
  ];

  useEffect(() => {
    let lastScrollPos = window.scrollY;
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollPos = window.scrollY;
          
          // Determine if navbar is scrolled past threshold (50px)
          const shouldBeScrolled = currentScrollPos > 50;
          setScrolled((prev) => prev !== shouldBeScrolled ? shouldBeScrolled : prev);

          // Smart hide on scroll down, show on scroll up
          // Always show at the top of the page (within 100px)
          if (currentScrollPos < 100) {
            setVisible(true);
          } else {
            const isScrollingUp = lastScrollPos > currentScrollPos;
            // Don't hide if mobile menu is open
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

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const handleLinkClick = () => {
    setActiveDropdown(null);
    setIsOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -90 }}
      transition={{ duration: 0.3, ease: 'easeInOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#fffdf5]/98 md:bg-[#fffdf5]/85 md:backdrop-blur-xl border-b border-black/5 shadow-sm py-2' 
          : 'bg-[#fffdf5]/98 md:bg-[#fffdf5]/95 md:backdrop-blur-md border-b border-black/5 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Logo and Brand Name */}
        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-2 cursor-pointer group">
          <img src="/logo.svg" alt="Digitalife Ehub Logo" className="h-10 w-auto transition-transform duration-300 group-hover:scale-105" />
          <span className="text-xl font-extrabold tracking-tight flex items-center">
            <FlipText className="text-[#3e4095]" duration={2.2} delay={0}>Digitalife</FlipText>
            <span className="w-1 inline-block">&nbsp;</span>
            <FlipText className="text-[#ffd148]" duration={2.2} delay={0.35}>Ehub</FlipText>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8 ml-auto mr-8">
          
          {/* Services Link */}
          <Link
            to="/services"
            onClick={handleLinkClick}
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

          {/* Trainings & Community Link */}
          <Link
            to="/community"
            onClick={handleLinkClick}
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
            <button className="flex items-center gap-1 text-[13px] font-bold text-slate-500 hover:text-[#3e4095] transition-colors duration-200 cursor-pointer uppercase tracking-wider">
              Resources <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${activeDropdown === 'resources' ? 'rotate-180' : ''}`} />
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
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Library & Insights</span>
                      <div className="flex flex-col gap-3">
                        
                        <Link to="/resources" onClick={handleLinkClick} className="group/item flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover/item:text-[#3e4095] transition-colors">Resource Library</span>
                          <span className="text-[10px] text-slate-400 font-semibold leading-normal">Browse templates, tools & models.</span>
                        </Link>

                        <Link to="/blog" onClick={handleLinkClick} className="group/item flex flex-col">
                          <span className="text-sm font-bold text-slate-900 group-hover/item:text-[#3e4095] transition-colors">Growth Blog</span>
                          <span className="text-[10px] text-slate-400 font-semibold leading-normal">In-depth strategies and articles.</span>
                        </Link>

                      </div>
                    </div>

                    {/* Spotlight */}
                    <div className="md:col-span-5 bg-[#3e4095]/2 border border-black/5 rounded-2xl p-4 flex flex-col justify-between">
                      <div>
                        <span className="text-[9px] font-black text-[#ffd148] uppercase tracking-widest mb-2 block bg-[#3e4095]/10 px-2 py-0.5 rounded-md w-fit">Ecosystem</span>
                        <h4 className="text-xs font-bold text-slate-950 mb-1 leading-snug"> MSME Community</h4>
                        <p className="text-slate-400 text-[10px] font-semibold leading-relaxed">
                          Collaborate and progress with founders.
                        </p>
                      </div>
                      <Link 
                        to="/community" 
                        onClick={handleLinkClick}
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
            onClick={handleLinkClick}
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

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3 relative">
          <motion.button
            onClick={onOpenBooking}
            whileHover={{ scale: 1.02, backgroundColor: '#3e4095', color: '#ffffff', borderColor: '#3e4095' }}
            whileTap={{ scale: 0.98 }}
            className="border border-[#3e4095] text-[#3e4095] font-bold px-5 py-2.5 rounded-xl text-xs transition-all cursor-pointer bg-transparent"
          >
            Book Demo
          </motion.button>
          
          <div className="relative">
            <motion.button
              onClick={() => {
                setIsNotificationsOpen(!isNotificationsOpen);
                setHasUnread(false);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-slate-800 transition-all cursor-pointer relative"
            >
              <Bell className="h-4 w-4" />
              {hasUnread && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border border-slate-900 animate-pulse" />
              )}
            </motion.button>

            {/* Notifications Dropdown */}
            {isNotificationsOpen && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setIsNotificationsOpen(false)} 
                />
                <div className="absolute right-0 mt-3 w-80 bg-white border border-black/10 rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-3">
                  <div className="flex justify-between items-center pb-2 border-b border-black/5">
                    <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Updates & Announcements</span>
                    <button 
                      onClick={() => setHasUnread(false)} 
                      className="text-[9px] font-bold text-[#3e4095] hover:underline cursor-pointer"
                    >
                      Clear
                    </button>
                  </div>
                  <div className="flex flex-col gap-3">
                    {notifications.map((item) => (
                      <div key={item.id} className="flex flex-col gap-1 text-left">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-extrabold text-[#3e4095] uppercase tracking-wider">
                            {item.tag}
                          </span>
                          <span className="text-[8px] text-[#717b72] font-semibold">{item.time}</span>
                        </div>
                        <h4 className="text-xs font-bold text-slate-900 leading-tight">{item.title}</h4>
                        <p className="text-[10px] text-[#717b72] leading-normal font-semibold">
                          {item.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-slate-950 transition-colors duration-300 cursor-pointer"
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
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
                onClick={handleLinkClick}
                className={`text-sm font-bold py-2 border-b border-black/5 ${
                  isActive('/services') ? 'text-[#3e4095]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Services
              </Link>

              {/* Direct Trainings & Community Link */}
              <Link
                to="/community"
                onClick={handleLinkClick}
                className={`text-sm font-bold py-2 border-b border-black/5 ${
                  isActive('/community') ? 'text-[#3e4095]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Community
              </Link>

              {/* Collapsible Resources */}
              <div>
                <button 
                  onClick={() => setMobileResourcesOpen(!mobileResourcesOpen)}
                  className="w-full flex items-center justify-between text-sm font-bold text-slate-900 py-2 border-b border-black/5"
                >
                  <span>Resources</span>
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileResourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {mobileResourcesOpen && (
                  <div className="pl-4 py-2 flex flex-col gap-2.5 mt-1 border-l-2 border-[#ffd148]">
                    <Link to="/resources" onClick={handleLinkClick} className="text-xs font-bold text-slate-600 hover:text-slate-950">Resource Library</Link>
                    <Link to="/blog" onClick={handleLinkClick} className="text-xs font-bold text-slate-600 hover:text-slate-950">Blog & Insights</Link>
                    <Link to="/community" onClick={handleLinkClick} className="text-xs font-bold text-slate-600 hover:text-slate-950"> Community</Link>
                  </div>
                )}
              </div>

              {/* Direct About Link */}
              <Link
                to="/about"
                onClick={handleLinkClick}
                className={`text-sm font-bold py-2 border-b border-black/5 ${
                  isActive('/about') ? 'text-[#3e4095]' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                About Us
              </Link>

              <div className="flex items-center gap-3 pt-3 mt-1">
                <button
                  onClick={() => {
                    handleLinkClick();
                    onOpenBooking();
                  }}
                  className="w-full bg-[#3e4095] hover:bg-[#2e3075] text-white font-bold py-3 rounded-xl text-center transition-all text-xs cursor-pointer border-none"
                >
                  Book Demo
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => {
                      setIsNotificationsOpen(!isNotificationsOpen);
                      setHasUnread(false);
                    }}
                    className="w-12 h-12 rounded-xl bg-slate-900 text-white flex items-center justify-center cursor-pointer relative"
                  >
                    <Bell className="h-5 w-5" />
                    {hasUnread && (
                      <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-slate-900 animate-pulse" />
                    )}
                  </button>

                  {isNotificationsOpen && (
                    <>
                      <div 
                        className="fixed inset-0 z-40" 
                        onClick={() => setIsNotificationsOpen(false)} 
                      />
                      <div className="absolute right-0 bottom-14 w-72 bg-white border border-black/10 rounded-2xl shadow-xl p-4 z-50 flex flex-col gap-3">
                        <div className="flex justify-between items-center pb-2 border-b border-black/5">
                          <span className="text-[10px] font-bold text-slate-800 uppercase tracking-wider">Announcements</span>
                        </div>
                        <div className="flex flex-col gap-3 text-left max-h-60 overflow-y-auto">
                          {notifications.map((item) => (
                            <div key={item.id} className="flex flex-col gap-1 border-b border-black/5 pb-2 last:border-0 last:pb-0">
                              <div className="flex items-center justify-between">
                                <span className="text-[9px] font-extrabold text-[#3e4095] uppercase tracking-wider">
                                  {item.tag}
                                </span>
                                <span className="text-[8px] text-[#717b72] font-semibold">{item.time}</span>
                              </div>
                              <h4 className="text-xs font-bold text-slate-900">{item.title}</h4>
                              <p className="text-[10px] text-[#717b72] leading-normal font-semibold">
                                {item.description}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
