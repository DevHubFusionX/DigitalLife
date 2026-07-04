import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../lib/utils";

export interface AvatarItem {
  id: string;
  name: string;
  image?: string;
}

export interface SharedTooltipAvatarsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: AvatarItem[];
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
};

const getAvatarGradient = (idx: number) => {
  const gradients = [
    'from-rose-500 to-orange-500 text-white',
    'from-teal-500 to-emerald-600 text-white',
    'from-blue-500 to-indigo-600 text-white',
    'from-purple-500 to-pink-600 text-white',
    'from-amber-500 to-red-600 text-white',
  ];
  return gradients[idx % gradients.length];
};

export function SharedTooltipAvatars({ 
  items, 
  className, 
  ...props 
}: SharedTooltipAvatarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ left: 0, top: 0 });
  const [activeName, setActiveName] = useState("");
  
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const avatarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleMouseEnter = (index: number) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    const avatar = avatarRefs.current[index];
    if (avatar) {
      const left = avatar.offsetLeft + avatar.offsetWidth / 2;
      const top = avatar.offsetTop;

      setTooltipPos({ left, top });
      setActiveName(items[index].name);
      setHoveredIndex(index);
    }
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setHoveredIndex(null);
    }, 150);
  };

  return (
    <div 
      className={cn("relative flex items-center justify-start py-4", className)} 
      {...props}
    >
      <AnimatePresence>
        {hoveredIndex !== null && (
          <motion.div
            initial={{ opacity: 0, x: "-50%", y: "-80%", scale: 0.95, left: tooltipPos.left, top: tooltipPos.top - 12 }}
            animate={{ 
              opacity: 1, 
              x: "-50%", 
              y: "-100%", 
              scale: 1,
              left: tooltipPos.left,
              top: tooltipPos.top - 12
            }}
            exit={{ opacity: 0, x: "-50%", y: "-80%", scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="absolute z-50 px-3.5 py-1.5 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl rounded-xl text-sm font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-neutral-200/50 dark:border-neutral-800/50 pointer-events-none"
            role="tooltip"
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={activeName}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="inline-block"
              >
                {activeName || " "}
              </motion.span>
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Stack */}
      <div className="flex items-center -space-x-3">
        {items.map((item, index) => (
          <div
            key={item.id}
            ref={(el) => { avatarRefs.current[index] = el; }}
            className="relative transition-transform duration-300 ease-out hover:-translate-y-2 hover:z-10 cursor-pointer"
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
            onFocus={() => handleMouseEnter(index)}
            onBlur={handleMouseLeave}
            tabIndex={0}
            role="listitem"
          >
            {item.image ? (
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 rounded-full object-cover border-[3px] border-[#0c1411] shadow-sm hover:shadow-xl transition-all duration-300"
              />
            ) : (
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center font-extrabold text-[11px] tracking-wider border-[3px] border-[#0c1411] shadow-sm hover:shadow-xl transition-all duration-300 bg-gradient-to-br ${getAvatarGradient(index)}`}
              >
                {getInitials(item.name)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SharedTooltipAvatars;
