"use client";

interface GalaxyDecorationsProps {
  className?: string;
}

export default function GalaxyDecorations({ className = "" }: GalaxyDecorationsProps) {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {/* Constellation lines */}
      <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <linearGradient id="constellation-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.6" />
            <stop offset="50%" stopColor="#e94560" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#533483" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        
        {/* Constellation pattern */}
        <line x1="10" y1="20" x2="25" y2="35" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="25" y1="35" x2="40" y2="15" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="40" y1="15" x2="60" y2="30" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="60" y1="30" x2="80" y2="45" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="80" y1="45" x2="90" y2="70" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        
        <line x1="15" y1="60" x2="30" y2="75" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="30" y1="75" x2="50" y2="85" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="50" y1="85" x2="70" y2="80" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        <line x1="70" y1="80" x2="85" y2="60" stroke="url(#constellation-gradient)" strokeWidth="0.1" />
        
        {/* Constellation stars */}
        <circle cx="10" cy="20" r="0.3" fill="#00d4ff" opacity="0.8" />
        <circle cx="25" cy="35" r="0.4" fill="#e94560" opacity="0.8" />
        <circle cx="40" cy="15" r="0.3" fill="#ffd700" opacity="0.8" />
        <circle cx="60" cy="30" r="0.5" fill="#00d4ff" opacity="0.8" />
        <circle cx="80" cy="45" r="0.3" fill="#533483" opacity="0.8" />
        <circle cx="90" cy="70" r="0.4" fill="#e94560" opacity="0.8" />
        <circle cx="15" cy="60" r="0.3" fill="#ffd700" opacity="0.8" />
        <circle cx="30" cy="75" r="0.4" fill="#00d4ff" opacity="0.8" />
        <circle cx="50" cy="85" r="0.3" fill="#533483" opacity="0.8" />
        <circle cx="70" cy="80" r="0.4" fill="#e94560" opacity="0.8" />
        <circle cx="85" cy="60" r="0.3" fill="#ffd700" opacity="0.8" />
      </svg>

      {/* Floating geometric shapes */}
      <div className="absolute top-1/4 right-1/4 w-8 h-8 border border-galaxy-cyan/30 rotate-45 floating opacity-60"></div>
      <div className="absolute top-3/4 left-1/4 w-6 h-6 bg-gradient-to-br from-galaxy-purple/20 to-galaxy-pink/20 rounded-full floating opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 right-1/3 w-4 h-4 border-2 border-galaxy-gold/40 rotate-12 floating opacity-50" style={{ animationDelay: '4s' }}></div>
      
      {/* Energy rings */}
      <div className="absolute top-1/3 left-1/3 w-16 h-16 border border-galaxy-cyan/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
      <div className="absolute bottom-1/3 right-1/3 w-12 h-12 border border-galaxy-purple/20 rounded-full animate-spin" style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
    </div>
  );
}
