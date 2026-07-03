import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Open the first item by default matching the screenshot

  const faqData: FAQItem[] = [
    {
      question: 'Why is business structure and operational systems setup important?',
      answer: 'Structure reduces operational chaos. Moving from informal hustle to organized systems enables your business to build roles, delegate work, and scale faster and more sustainably.'
    },
    {
      question: 'What does the Free Growth Clarity Session cover?',
      answer: 'In our session, we refine your business vision and map out an actionable growth roadmap. We help you know exactly what you offer, who you serve, and how you grow.'
    },
    {
      question: 'Who does Digitalife Ehub support?',
      answer: 'We proudly support MSMEs, SMEs, early-stage entrepreneurs, informal businesses ready to formalize, and NGOs/enterprise development programs looking to establish structured operations.'
    },
    {
      question: 'How long does the business development program take?',
      answer: 'We help you gain clarity, boost your visibility, and build a strong operational structure in 6–10 weeks with our hands-on business development support.'
    }
  ];

  return (
    <section className="py-24 bg-[#fffdf5]" id="resources">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        
        {/* Left Column: Heading and CTAs */}
        <div className="lg:col-span-5 flex flex-col justify-start" id="community">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
            Business Growth FAQs
          </h2>
          <p className="text-[#717b72] text-sm md:text-base leading-relaxed mb-8 font-medium max-w-md">
            We are dedicated to providing clarity, strategy, and structure to empower MSMEs and early-stage entrepreneurs to build sustainable businesses.
          </p>
          <div className="flex items-center gap-6">
            <button className="border border-slate-900 text-slate-900 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-slate-900 hover:text-white transition-all cursor-pointer bg-transparent">
              More Questions
            </button>
            <a 
              href="#contact" 
              className="text-slate-900 font-bold text-sm underline underline-offset-4 hover:text-slate-700 transition-colors"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Right Column: Dynamic Accordion */}
        <div className="lg:col-span-7 border-t border-slate-900/10">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className="border-b border-slate-900/10"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full py-6 md:py-8 flex items-center justify-between text-left gap-6 cursor-pointer group"
                >
                  <span className="text-base md:text-lg font-bold text-slate-900 group-hover:text-[#ffd148] transition-colors duration-200">
                    {item.question}
                  </span>
                  <div className="shrink-0 w-6 h-6 flex items-center justify-center text-slate-900">
                    {isOpen ? (
                      <Minus className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Plus className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <div className="pb-8 pr-12 text-sm text-[#717b72] font-semibold leading-relaxed">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
