import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Check, MessageCircle } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';

export default function WhatsappSticky() {
  const [isOpen, setIsOpen] = useState(false);

  const whatsappUrl = getWhatsAppUrl();

  // Spring transition variants for the chat window (Cushioned "bed/spring" effect)
  const chatVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.85, 
      y: 40,
      x: 20,
      originX: 1,
      originY: 1
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      x: 0,
      transition: {
        type: 'spring' as const,
        damping: 14,
        stiffness: 110
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 30,
      x: 15,
      transition: {
        duration: 0.2
      }
    }
  };

  // Breathing floating variant for the main button
  const buttonVariants = {
    idle: {
      y: [0, -8, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut" as const
      }
    },
    hover: {
      scale: 1.1,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 12
      }
    },
    tap: {
      scale: 0.95
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Testimonial/Support Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={chatVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-80 md:w-90 bg-white border border-black/10 rounded-3xl shadow-2xl overflow-hidden mb-4"
          >
            {/* Header portion */}
            <div className="bg-[#075e54] text-white p-5 relative">
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute right-4 top-4 text-white/80 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
                    alt="Precious Okonji"
                    className="w-12 h-12 rounded-full object-cover border border-white/20"
                  />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 border-2 border-white rounded-full animate-pulse" />
                </div>
                
                <div className="flex flex-col">
                  <span className="text-sm font-extrabold tracking-wide">Precious Okonji</span>
                  <span className="text-[10px] text-white/70 font-semibold uppercase tracking-wider">
                    Growth & SOP Strategist
                  </span>
                </div>
              </div>
            </div>

            {/* Conversation Area */}
            <div className="p-5 bg-[#efeae2] min-h-40 flex flex-col gap-4">
              {/* Automated bubble message */}
              <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-xs max-w-[85%] self-start relative">
                <p className="text-slate-800 text-xs md:text-sm font-semibold leading-relaxed">
                  Hi there! 👋 How can we help you structure or scale your enterprise today?
                </p>
                <span className="absolute -left-2 top-0 w-2.5 h-2.5 bg-white [clip-path:polygon(100%_0,0_0,100%_100%)]" />
                <div className="flex justify-end items-center gap-1 mt-1 text-[9px] text-[#717b72] font-semibold">
                  <span>Just now</span>
                  <Check className="w-3 h-3 text-[#34b7f1]" />
                </div>
              </div>
            </div>

            {/* Quick Action footer link */}
            <div className="p-4 bg-white border-t border-black/5">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3 bg-[#25d366] hover:bg-[#20ba5a] text-white font-extrabold text-sm rounded-2xl transition-colors shadow-sm cursor-pointer"
              >
                <Send className="w-4 h-4 fill-white" /> Start Whatsapp Chat
              </a>
              <p className="text-center text-[10px] text-[#717b72] font-bold uppercase tracking-wider mt-2.5">
                Response Time: Under 10 minutes
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Button (FAB) */}
      <motion.button
        variants={buttonVariants}
        initial="idle"
        animate="idle"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-14 h-14 bg-[#25d366] text-white rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl cursor-pointer"
      >
        {/* Pulsing Ripple Effect */}
        <span className="absolute inset-0 rounded-full bg-[#25d366]/40 animate-ping opacity-75 pointer-events-none" style={{ animationDuration: '2s' }} />
        <span className="absolute -inset-2 rounded-full bg-[#25d366]/20 animate-ping opacity-50 pointer-events-none" style={{ animationDuration: '3.5s' }} />

        {/* Lucide Message Circle Icon */}
        <MessageCircle className="w-7 h-7 fill-white/10" />
      </motion.button>
      
    </div>
  );
}
