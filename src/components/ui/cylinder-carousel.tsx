import React from "react";
import { cn } from "../../lib/utils";

export interface CarouselImage {
  src: string;
  alt?: string;
}

export interface CylinderCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  images?: CarouselImage[];
  items?: React.ReactNode[];
  containerClassName?: string;
  cardClassName?: string;
  animationDuration?: number; // in seconds
  cardWidth?: number; // in pixels
  radiusMultiplier?: number; // custom scale to control the width/radius of the cylinder
}

export const CylinderCarousel = React.forwardRef<HTMLDivElement, CylinderCarouselProps>(
  (
    { images = [], items = [], className, containerClassName, cardClassName, animationDuration = 32, cardWidth = 250, radiusMultiplier = 0.95, ...props },
    ref
  ) => {
    // Determine number of faces
    const N = items.length > 0 ? items.length : images.length;
    
    // CSS variables for 3D positioning
    const customStyle = {
      "--n": N,
      "--w": `${cardWidth}px`,
      "--ba": `calc(1turn / var(--n))`,
      "--anim-dur": `${animationDuration}s`,
    } as React.CSSProperties;

    return (
      <div
        ref={ref}
        className={cn(
          "w-full h-full min-h-125 grid place-items-center overflow-hidden",
          className
        )}
        style={{
          perspective: "150em",
          maskImage: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
          WebkitMaskImage: "linear-gradient(90deg, transparent, #000 20% 80%, transparent)",
        }}
        {...props}
      >
        <div
          className={cn(
            "grid place-items-center transform-3d",
            containerClassName
          )}
          style={{
            ...customStyle,
            animation: "ry var(--anim-dur) linear infinite",
          }}
        >
          {/* Inline style block to define keyframe without global tailwind edits */}
          <style>
            {`
              @keyframes ry {
                to {
                  transform: rotateY(1turn);
                }
              }
            `}
          </style>

          {items.length > 0
            ? items.map((item, i) => (
                <div
                  key={i}
                  className={cn(
                    "[grid-area:1/1] rounded-2xl backface-hidden select-none",
                    cardClassName
                  )}
                  style={{
                    width: "var(--w)",
                    "--i": i,
                    transform: `rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * ${radiusMultiplier} * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))`,
                  } as React.CSSProperties}
                >
                  {item}
                </div>
              ))
            : images.map((img, i) => (
                <img
                  key={i}
                  src={img.src}
                  alt={img.alt || `Carousel image ${i}`}
                  className={cn(
                    "[grid-area:1/1] object-cover rounded-2xl backface-hidden select-none",
                    cardClassName
                  )}
                  style={{
                    width: "var(--w)",
                    aspectRatio: "7/10",
                    "--i": i,
                    transform: `rotateY(calc(var(--i) * var(--ba))) translateZ(calc(-1 * ${radiusMultiplier} * (0.5 * var(--w) + 0.5em) / tan(0.5 * var(--ba))))`,
                  } as React.CSSProperties}
                />
              ))}
        </div>
      </div>
    );
  }
);

CylinderCarousel.displayName = "CylinderCarousel";
