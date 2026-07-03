import React from "react";
import { cn } from "../../lib/utils";

export interface AuroraHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The main title text to display with the glass displacement effect. */
  title?: string;
  subtitle?: string;
  variant?: 'light' | 'dark';
  children?: React.ReactNode;
}

export function AuroraHero({
  title = "Resource Library",
  subtitle,
  variant = 'dark',
  className,
  children,
  ...props
}: AuroraHeroProps) {

  const isDark = variant === 'dark';

  // Safely URL-encoded SVG string for the fluted glass effect
  const filterImageHref = "data:image/svg+xml," + encodeURIComponent(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1' color-interpolation-filters='sRGB'>
      <g>
        <rect width='1' height='1' fill='black' />
        <rect width='1' height='1' fill='url(#red)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#green)' style='mix-blend-mode:screen' />
        <rect width='1' height='1' fill='url(#yellow)' style='mix-blend-mode:screen' />
      </g>
      <defs>
        <radialGradient id='yellow' cx='0' cy='0' r='1' >
          <stop stop-color='yellow' />
          <stop stop-color='yellow' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='green' cx='1' cy='0' r='1' >
          <stop stop-color='green' />
          <stop stop-color='green' offset='1' stop-opacity='0' />
        </radialGradient>
        <radialGradient id='red' cx='0' cy='1' r='1' >
          <stop stop-color='red' />
          <stop stop-color='red' offset='1' stop-opacity='0' />
        </radialGradient>
      </defs>
    </svg>
  `);

  return (
    <section
      className={cn(
        "aurora-hero-wrapper w-full relative overflow-hidden flex flex-col justify-center", 
        isDark ? "min-h-[400px] py-20 bg-[#0a2321] text-[#fffdf5]" : "min-h-[300px] h-[360px] sm:h-[420px] bg-[#fffdf5] text-slate-900",
        className
      )}
      {...props}
    >
      <style>{`
        .aurora-hero-wrapper {
          --stripe-color: ${isDark ? '#0a2321' : '#fffdf5'};
          --bg-filter: blur(8px) opacity(${isDark ? '35%' : '50%'}) saturate(160%);
          background: var(--stripe-color);
          font-family: inherit;
        }
        @keyframes smoothBg {
          from { background-position: 50% 50%, 50% 50%; }
          to { background-position: 350% 50%, 350% 50%; }
        }
        .aurora-hero-bg {
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0;
          --stripes: repeating-linear-gradient(
            100deg, 
            var(--stripe-color) 0%, 
            var(--stripe-color) 7%, 
            transparent 10%, 
            transparent 12%, 
            var(--stripe-color) 16%
          );
          --rainbow: repeating-linear-gradient(
            100deg, 
            #3e4095 10%, 
            #ffd148 15%, 
            #3e4095 20%, 
            #abc4b2 25%, 
            #3e4095 30%
          );
          background-image: var(--stripes), var(--rainbow);
          background-size: 300%, 200%;
          background-position: 50% 50%, 50% 50%;
          filter: var(--bg-filter);
          mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
          -webkit-mask-image: radial-gradient(ellipse at 100% 0%, black 40%, transparent 70%);
        }
        .aurora-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background-image: var(--stripes), var(--rainbow);
          background-size: 200%, 100%;
          animation: smoothBg 60s linear infinite;
          background-attachment: fixed;
          mix-blend-mode: difference;
        }
        .aurora-content {
          position: relative;
          z-index: 20;
          width: 100%;
          display: flex;
          place-content: center;
          flex-flow: column;
          gap: 16px;
          padding: 0 24px;
        }
        .h1-scalingSize {
          font-size: clamp(2.5rem, 6vw, 4rem);
          position: relative;
          isolation: isolate;
          font-weight: 900;
          letter-spacing: -0.03em;
        }
        .h1-scalingSize::before {
          content: attr(data-text);
          position: absolute;
          inset: 0;
          background: ${isDark ? 'white' : 'black'};
          text-shadow: 0 0 1px ${isDark ? '#ffffff' : '#000000'};
          background-clip: text;
          -webkit-text-fill-color: transparent;
          background-color: ${isDark ? 'white' : 'black'};
          -webkit-mask: linear-gradient(#000 0 0) luminance;
          mask: linear-gradient(#000 0 0) luminance, alpha;
          backdrop-filter: blur(19px) brightness(12.5);
          -webkit-text-stroke: 1px ${isDark ? 'white' : 'black'};
          display: flex;
          z-index: 1;
          pointer-events: none;
        }
      `}</style>

      <div className="aurora-hero-bg"></div>

      <div className="aurora-content max-w-7xl mx-auto w-full">
        {children ? (
          children
        ) : (
          <>
            <h1 className="h1-scalingSize text-left" data-text={title}>{title}</h1>
            {subtitle && (
              <p className={cn(
                "text-sm md:text-base font-semibold max-w-2xl leading-relaxed text-left",
                isDark ? "text-slate-300" : "text-slate-600"
              )}>
                {subtitle}
              </p>
            )}
          </>
        )}
      </div>

      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        colorInterpolationFilters="sRGB"
        style={{ position: "absolute", opacity: 0, height: 0, width: 0, pointerEvents: "none" }}
        aria-hidden="true"
        focusable="false"
      >
        <filter id="fluted" primitiveUnits="objectBoundingBox">
          <feImage
            x="0"
            y="0"
            result="image_0"
            crossOrigin="anonymous"
            href={filterImageHref}
            preserveAspectRatio="none meet"
            width=".03"
            height="1"
          />
          <feTile in="image_0" result="tile_0" />
          <feGaussianBlur stdDeviation=".0001" edgeMode="none" in="tile_0" result="bar_smoothness" x="0" y="0" />
          <feDisplacementMap scale=".08" xChannelSelector="R" yChannelSelector="G" in="SourceGraphic" in2="bar_smoothness" result="displacement_0" />
        </filter>
      </svg>
    </section>
  );
}

export default AuroraHero;
