import { useState, useEffect } from "react";
import KineticTextLoader from "./ui/kinetic-text-loader";

interface SessionLoaderProps {
  children: React.ReactNode;
}

export default function SessionLoader({ children }: SessionLoaderProps) {
  const [showLoader, setShowLoader] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Check if the user has already loaded the site in this session
    const hasLoaded = sessionStorage.getItem("digitalife_loaded");

    if (hasLoaded) {
      setShowLoader(false);
      return;
    }

    // If it's the first load, show the loader for 2.6 seconds, then fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for the fade-out animation to complete (400ms)
      const fadeTimer = setTimeout(() => {
        sessionStorage.setItem("digitalife_loaded", "true");
        setShowLoader(false);
      }, 400);

      return () => clearTimeout(fadeTimer);
    }, 2600);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) {
    return <>{children}</>;
  }

  return (
    <div
      className={`fixed inset-0 z-9999 flex flex-col items-center justify-center bg-slate-950 transition-all duration-500 ease-in-out ${
        isFadingOut ? "opacity-0 scale-95 pointer-events-none" : "opacity-100 scale-100"
      }`}
    >
      {/* Premium background mesh glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,64,149,0.18)_0%,transparent_65%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,209,72,0.04)_0%,transparent_50%)] pointer-events-none" />

      {/* Main Loader Container */}
      <div className="relative flex flex-col items-center gap-6 select-none">
        {/* Glowing aura behind loader */}
        <div className="absolute -inset-10 rounded-full bg-[#3e4095]/10 blur-3xl animate-pulse duration-3000 pointer-events-none" />
        
        {/* Kinetic Loader */}
        <KineticTextLoader text="digital life" className="relative z-10" />

        {/* Small subtitle with subtle fade-in */}
        <div className="text-[10px] uppercase font-bold tracking-[8px] text-slate-500/80 mt-4 animate-pulse">
          Scaling Operations & Systems
        </div>
      </div>

      {/* Decorative corners for a high-tech/premium branding feel */}
      <div className="absolute top-8 left-8 w-6 h-6 border-t border-l border-white/10" />
      <div className="absolute top-8 right-8 w-6 h-6 border-t border-r border-white/10" />
      <div className="absolute bottom-8 left-8 w-6 h-6 border-b border-l border-white/10" />
      <div className="absolute bottom-8 right-8 w-6 h-6 border-b border-r border-white/10" />
    </div>
  );
}
