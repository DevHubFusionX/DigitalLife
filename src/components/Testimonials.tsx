import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  avatar: string;
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      quote: '“Digitalife Ehub is a game-changer for MSMEs. Their hands-on business development support helped us build a clean operational structure and gain complete clarity on our growth roadmap in just 8 weeks.”',
      author: 'Marc Manara',
      role: 'Founding Partner',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      quote: '“The structure and systems they designed for us eliminated our operational chaos completely. Highly recommend!”',
      author: 'Logan Kilpatrick',
      role: 'CEO, ScaleUp',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      quote: '“I am thoroughly impressed by the transformation in our brand visibility since working with them. They helped us transition from an informal hustle into a visible, structured enterprise.”',
      author: 'Yazen Altimimi',
      role: 'Founder, Zain Retail',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      quote: '“Their social media management and content strategy are not just about noise—they positioned our brand to communicate authority and convert visibility into real revenue.”',
      author: 'Martin Terskin',
      role: 'Director, OfferMarket',
      avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      quote: '“Their MSME formalization support and SOP development saved us countless hours of confusion. We now have clear direction and organized operations.”',
      author: 'Theresa Webb',
      role: 'Operations Manager',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&h=120&q=80'
    },
    {
      quote: '“Digitalife Ehub doesn’t just advise—they build with you. Their practical training equipped our team with frameworks we could implement immediately.”',
      author: 'Dianne Russell',
      role: 'Co-founder, GreenGrow',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&h=120&q=80'
    }
  ];

  const stats = [
    {
      stat: '100%',
      label: 'Practical & Tailored Support',
      gradient: 'warm'
    },
    {
      stat: '6-10',
      label: 'Weeks to structure operations',
      gradient: 'cool'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-advance showcase every 6 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, testimonials.length]);

  return (
    <section className="py-24 bg-[#fffdf5] overflow-hidden" id="testimonials">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header Tag and Text */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/5 border border-slate-900/10 mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ffd148]" />
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-800">
              Our Impact
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-3">
            Impact Measured in Transformation
          </h2>
          <p className="text-[#717b72] text-sm md:text-base font-semibold">
            When businesses grow with structure, communities grow with them.
          </p>
        </div>

        {/* Custom Split Showcase Layout */}
        <div 
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-5xl mx-auto mb-20"
        >
          {/* Left Side: Founders List */}
          <div className="lg:col-span-4 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-x-visible pb-4 lg:pb-0 scrollbar-none snap-x snap-mandatory shrink-0">
            {testimonials.map((testimonial, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveIndex(idx);
                    setIsPaused(true); // Stop auto-rotation once user manually interacts
                  }}
                  className={`flex items-center gap-4 p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer snap-start shrink-0 lg:shrink w-72 lg:w-full ${
                    isActive 
                      ? 'bg-white border-black/15 shadow-md shadow-slate-900/5 scale-102' 
                      : 'bg-transparent border-transparent hover:bg-white/50 hover:border-black/5'
                  }`}
                >
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className={`w-12 h-12 rounded-xl object-cover border transition-transform duration-300 ${
                      isActive ? 'border-[#3e4095] scale-105' : 'border-black/10'
                    }`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span className={`text-sm font-bold truncate transition-colors duration-300 ${
                      isActive ? 'text-[#3e4095]' : 'text-slate-800'
                    }`}>
                      {testimonial.author}
                    </span>
                    <span className="text-[11px] font-bold text-[#717b72] truncate">
                      {testimonial.role}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Showcase Quote Card */}
          <div className="lg:col-span-8 flex">
            <div className="w-full bg-white border border-black/10 rounded-4xl p-8 md:p-12 shadow-sm flex flex-col justify-between relative overflow-hidden">
              <Quote className="absolute right-8 top-8 w-24 h-24 text-slate-100/50 -rotate-12 pointer-events-none" />
              
              <div className="relative z-10 flex-1 flex flex-col justify-center min-h-60">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="flex flex-col gap-6"
                  >
                    <p className="text-lg md:text-2xl font-bold text-slate-900 leading-relaxed font-mulish">
                      {testimonials[activeIndex].quote}
                    </p>
                    
                    <div className="flex items-center gap-4 mt-2">
                      <img
                        src={testimonials[activeIndex].avatar}
                        alt={testimonials[activeIndex].author}
                        className="w-10 h-10 rounded-full object-cover border border-black/10 lg:hidden"
                      />
                      <div>
                        <h4 className="text-sm font-extrabold text-slate-950 uppercase tracking-wider">
                          {testimonials[activeIndex].author}
                        </h4>
                        <p className="text-xs font-bold text-[#717b72]">
                          {testimonials[activeIndex].role}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress Indicator Bar */}
              <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden mt-8">
                <motion.div
                  key={activeIndex}
                  initial={{ width: '0%' }}
                  animate={isPaused ? { width: '0%' } : { width: '100%' }}
                  transition={isPaused ? { duration: 0 } : { duration: 6, ease: 'linear' }}
                  className="bg-[#3e4095] h-full"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto pt-12 border-t border-black/10">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="bg-white border border-black/10 rounded-3xl overflow-hidden shadow-xs flex items-center p-6 gap-6 hover:shadow-md transition-all duration-300"
            >
              {/* Graphic Banner left block */}
              <div className="h-16 w-16 rounded-2xl relative overflow-hidden bg-slate-950 shrink-0">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <filter id="blur-filter-stat" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="8" />
                    </filter>
                  </defs>
                  {item.gradient === 'warm' ? (
                    <>
                      <rect width="100" height="100" fill="#f43f5e" />
                      <circle cx="20" cy="20" r="45" fill="#fb923c" filter="url(#blur-filter-stat)" />
                      <circle cx="80" cy="80" r="45" fill="#facc15" filter="url(#blur-filter-stat)" />
                    </>
                  ) : (
                    <>
                      <rect width="100" height="100" fill="#06b6d4" />
                      <circle cx="20" cy="20" r="45" fill="#0284c7" filter="url(#blur-filter-stat)" />
                      <circle cx="80" cy="80" r="45" fill="#10b981" filter="url(#blur-filter-stat)" />
                    </>
                  )}
                </svg>
              </div>
              
              {/* Stat text content */}
              <div className="flex-1 flex flex-col justify-center">
                <span className="text-3xl font-extrabold text-slate-900 leading-none mb-1">
                  {item.stat}
                </span>
                <span className="text-[11px] font-bold text-[#717b72] uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
