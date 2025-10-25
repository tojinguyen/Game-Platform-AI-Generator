"use client";

import { useEffect, useState } from "react";

interface GalaxyBackgroundProps {
  children: React.ReactNode;
  className?: string;
}

export default function GalaxyBackground({ children, className = "" }: GalaxyBackgroundProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`relative min-h-screen ${className}`}>
      {/* Animated nebula clouds */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-galaxy-purple/20 via-galaxy-pink/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-gradient-radial from-galaxy-cyan/20 via-galaxy-gold/10 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-radial from-galaxy-pink/15 via-galaxy-purple/5 to-transparent rounded-full blur-2xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Floating particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-galaxy-cyan rounded-full opacity-60 floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 4}s`,
            }}
          />
        ))}
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`purple-${i}`}
            className="absolute w-0.5 h-0.5 bg-galaxy-purple rounded-full opacity-40 floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 6}s`,
            }}
          />
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={`gold-${i}`}
            className="absolute w-1.5 h-1.5 bg-galaxy-gold rounded-full opacity-50 floating"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${8 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting stars */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={`shooting-${i}`}
            className="absolute w-0.5 h-0.5 bg-white rounded-full opacity-80"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `shooting-star ${3 + Math.random() * 2}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>

      <style jsx>{`
        @keyframes shooting-star {
          0% {
            transform: translateX(0) translateY(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateX(100px) translateY(100px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}
