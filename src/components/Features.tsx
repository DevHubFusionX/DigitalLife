import { useState, useRef } from 'react';
import { Play, X, Plus, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import teamCollaborationImg from '../assets/team_collaboration.png';
import SharedTooltipAvatars from './SharedTooltipAvatars';
import { openWhatsApp, WA_MESSAGES } from '../lib/whatsapp';

export default function Features() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHoveringTeam, setIsHoveringTeam] = useState(false);
  const teamCardRef = useRef<HTMLDivElement>(null);
  const cardRectRef = useRef<DOMRect | null>(null);

  const avatarItems = [
    { id: '1', name: 'Chinelo Okafor' },
    { id: '2', name: 'Babajide Alao' },
    { id: '3', name: 'Amina Bello' },
    { id: '4', name: 'Emeka Nwachukwu' }
  ];

  const handleMouseEnter = () => {
    if (window.innerWidth < 768) return;
    setIsHoveringTeam(true);
    if (teamCardRef.current) {
      cardRectRef.current = teamCardRef.current.getBoundingClientRect();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (window.innerWidth < 768) return;
    if (!cardRectRef.current) return;
    setMousePosition({
      x: e.clientX - cardRectRef.current.left,
      y: e.clientY - cardRectRef.current.top
    });
  };

  const steps = [
    { title: '01. Clarity', desc: 'Know exactly what you offer, who you serve, and how you grow.' },
    { title: '02. Structure', desc: 'Move from informal operations to organized systems that scale.' },
    { title: '03. Visibility', desc: 'Position your brand to attract opportunities, customers, and partnerships. Because when clarity meets structure, visibility follows.' }
  ];

  return (
    <section className="py-24 bg-[#fffdf5]" id="agency">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-16">
          <div className="md:col-span-6">
            <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight max-w-lg">
              Why Digitalife Ehub?
            </h2>
          </div>
          <div className="md:col-span-6 md:pl-6">
            <div className="flex flex-col gap-4">
              <p className="text-lg font-bold text-slate-800">
                Because we don’t just advise — we build with you.
              </p>
              <p className="text-[#717b72] text-sm md:text-base leading-relaxed font-medium">
                We understand the realities of growing businesses: limited resources, ambition mixed with uncertainty. Our approach is practical, strategic, and tailored. No fluff. Just structured growth support that works.
              </p>
            </div>
          </div>
        </div>

        {/* Content Bento Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left Card: You Don’t Need More Motivation. */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-4 bg-linear-to-br from-[#0c1411] via-[#080d0a] to-[#040605] text-white rounded-4xl p-8 md:p-10 flex flex-col justify-between min-h-95 relative overflow-hidden shadow-lg border border-white/5 group"
          >
            {/* Subtle background glow */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#ffd148]/15 rounded-full blur-[60px] pointer-events-none" />

            <div>
              <span className="text-[#ffd148] text-xs font-bold uppercase tracking-wider mb-3 block">Real Growth</span>
              <h3 className="text-2xl md:text-3xl font-extrabold text-white mb-4 leading-tight">
                You Don’t Need More Motivation.
              </h3>
              <p className="text-slate-400 text-xs md:text-sm font-semibold leading-relaxed">
                You need Clarity, Strategy, Structure, and Visibility to scale.
              </p>
            </div>

            {/* Tooltip Avatars */}
            <div className="flex items-center gap-2 mt-8">
              <SharedTooltipAvatars items={avatarItems} className="py-0" />
              <div className="w-12 h-12 rounded-full border-2 border-[#0c1411] bg-white/10 backdrop-blur-md flex items-center justify-center text-white cursor-pointer hover:bg-[#ffd148] hover:text-black hover:border-transparent transition-all duration-300 shadow-md shrink-0">
                <Plus className="w-5 h-5" />
              </div>
            </div>
          </motion.div>

          {/* Right Card: How We Work Play Card */}
          <motion.div
            ref={teamCardRef}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setIsHoveringTeam(false)}
            onClick={() => setIsModalOpen(true)}
            className="lg:col-span-8 relative h-95 rounded-4xl overflow-hidden shadow-lg group cursor-pointer"
          >
            {/* Background Image */}
            <img
              src={teamCollaborationImg}
              alt="Team collaborating"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 brightness-[0.75] group-hover:brightness-[0.7] ease-out"
            />

            {/* Custom Mouse-Following Play Cursor */}
            {isHoveringTeam && (
              <motion.div
                className="absolute z-20 hidden md:flex items-center justify-center w-16 h-16 bg-[#ffd148] text-black rounded-full pointer-events-none shadow-xl border-4 border-[#fffdf5]/30"
                style={{
                  left: mousePosition.x - 32,
                  top: mousePosition.y - 32,
                  position: 'absolute'
                }}
                layoutId="play-cursor"
                transition={{ type: 'spring', stiffness: 250, damping: 20 }}
              >
                <Play className="w-6 h-6 fill-current text-slate-950 ml-1" />
              </motion.div>
            )}

            {/* Mobile Fallback Play Icon */}
            <div className="md:hidden absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-16 h-16 bg-[#ffd148] text-black rounded-full flex items-center justify-center shadow-lg border-2 border-white">
              <Play className="w-6 h-6 fill-current text-slate-950 ml-1" />
            </div>

            {/* Overlaid Title */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none p-4">
              <h3 className="text-white text-xl md:text-[32px] font-extrabold tracking-wider md:tracking-[0.2em] text-center select-none uppercase">
                What We Help You Achieve
              </h3>
            </div>
          </motion.div>

        </div>
      </div>

      {/* Elegant Popup Modal showing "How We Work" */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-slate-950/75 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="relative w-full max-w-3xl bg-[#fffdf5] border border-black/5 rounded-4xl p-6 md:p-10 shadow-2xl z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5 text-slate-700 hover:text-slate-950 transition-colors cursor-pointer"
              >
                <X className="w-6 h-6" />
              </button>

              <div className="mb-6 pr-8">
                <span className="text-[#ffd148] text-xs font-bold uppercase tracking-wider">Your Growth Pillars</span>
                <h3 className="text-xl md:text-3xl font-extrabold text-slate-900 mt-1">
                  What We Help You Achieve
                </h3>
              </div>

              {/* Steps grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                {steps.map((step, idx) => (
                  <div key={idx} className="bg-white/60 border border-black/5 p-5 rounded-2xl flex flex-col gap-2 hover:border-[#ffd148]/30 hover:bg-white transition-all">
                    <h4 className="font-bold text-slate-950 flex items-center gap-1.5 text-sm md:text-base">
                      <ChevronRight className="w-4 h-4 text-[#ffd148] shrink-0" /> {step.title}
                    </h4>
                    <p className="text-xs md:text-sm text-[#717b72] leading-relaxed font-semibold">
                      {step.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-black/5 flex flex-col sm:flex-row gap-3 justify-end">
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    navigate('/resources');
                  }}
                  className="border border-slate-900 text-slate-900 font-semibold px-6 py-2.5 rounded-full text-xs md:text-sm hover:bg-slate-900 hover:text-white transition-all cursor-pointer bg-transparent w-full sm:w-auto text-center animate-pulse"
                >
                  Download free Structure checklist
                </button>
                <button
                  onClick={() => {
                    setIsModalOpen(false);
                    openWhatsApp(WA_MESSAGES.getStarted);
                  }}
                  className="bg-slate-950 hover:bg-slate-800 text-white font-semibold px-6 py-2.5 rounded-full text-xs md:text-sm transition-all cursor-pointer w-full sm:w-auto text-center"
                >
                  Start My Growth Journey
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
