import React from "react";
import { cn } from "../../lib/utils";

export interface KineticTextLoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  text?: string;
}

export function KineticTextLoader({
  className,
  text = "digital life",
  ...props
}: KineticTextLoaderProps) {
  const letters = text.split("");

  return (
    <div
      className={cn("relative flex items-center justify-center font-light", className)}
      style={{ fontFamily: "'Roboto', sans-serif" }}
      {...props}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700;900&display=swap');
        
        @keyframes ktl-dotMove-digital-life {
          0%, 100% { transform: translate(-148px, -18px); }
          50% { transform: translate(128px, -18px); }
        }
        @keyframes ktl-letterStretch {
          0%, 100% { transform: scale(1, 0.35); transform-origin: 100% 75%; }
          8%, 28% { transform: scale(1, 1.4); transform-origin: 100% 67%; }
          37% { transform: scale(1, 0.875); transform-origin: 100% 75%; }
          46% { transform: scale(1, 1.03); transform-origin: 100% 75%; }
          50%, 97% { transform: scale(1); transform-origin: 100% 75%; }
        }
        @keyframes ktl-l-bounce {
          0%, 45%, 70%, 100% { transform: scaleY(1.1); }
          49% { transform: scaleY(0.3); }
          50% { transform: scaleY(0.15); }
          53% { transform: scaleY(0.6); }
          60% { transform: scaleY(1.25); }
          68% { transform: scaleY(1.02); }
        }
      `}</style>
      
      <div className="relative scale-75 md:scale-90 lg:scale-100 flex flex-col items-center">
        {/* The moving dot wrapper to bounce and slide across the text */}
        <div className="absolute top-7 left-[50%] w-0 h-0 flex items-center justify-center">
          <div
            className="w-1.75 h-1.75 bg-[#ffd148] rounded-full shadow-[0_0_12px_#ffd148]"
            style={{
              animation: "ktl-dotMove-digital-life 3s cubic-bezier(0.4, 0, 0.2, 1) infinite"
            }}
          />
        </div>
        
        <p className="relative m-0 whitespace-nowrap text-[3.5rem] font-bold text-slate-100 uppercase tracking-[12px]" aria-label={text}>
          {letters.map((char, index) => {
            // Space handling
            if (char === " ") {
              return <span key={index} className="inline-block w-6" />;
            }

            // Let's bounce the 'L' (index 8 in "digital life")
            if (index === 8 && char.toLowerCase() === 'l') {
              return (
                <span
                  key={index}
                  className="inline-block relative transform origin-[50%_75%] text-slate-100"
                  style={{ animation: "ktl-l-bounce 1.5s cubic-bezier(0.25, 0.25, 0.75, 0.75) infinite" }}
                >
                  {char}
                </span>
              );
            }
            
            // Let's stretch the 'I' (index 1 and index 9 in "digital life")
            if ((index === 1 || index === 9) && char.toLowerCase() === 'i') {
              return (
                <span
                  key={index}
                  className="inline-block relative transform origin-[50%_75%] text-slate-300"
                  style={{ animation: "ktl-letterStretch 3s cubic-bezier(0.25, 0.23, 0.73, 0.75) infinite" }}
                >
                  {/* Render dotless I for the lowercase 'i' effect, or regular 'I' for uppercase */}
                  {char === 'i' ? 'ı' : 'I'}
                </span>
              );
            }

            return (
              <span key={index} className="inline-block relative text-slate-100">
                {char}
              </span>
            );
          })}
        </p>
      </div>
    </div>
  );
}

export default KineticTextLoader;
