import React from 'react';
import Link from 'next/link';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  className?: string;
}

export function Logo({ size = 'md', showTagline = false, className = '' }: LogoProps) {
  const sizes = {
    sm: { icon: 26, text: 'text-lg', dot: 'w-1.5 h-1.5' },
    md: { icon: 34, text: 'text-2xl', dot: 'w-2 h-2' },
    lg: { icon: 44, text: 'text-3xl', dot: 'w-2.5 h-2.5' },
  };

  const current = sizes[size];

  return (
    <Link href="/" className={`inline-flex items-center gap-3 group focus:outline-none ${className}`}>
      {/* Custom Abstract Brand Symbol: Interlocking Geometric Core */}
      <div className="relative flex items-center justify-center">
        <svg
          width={current.icon}
          height={current.icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-500 group-hover:scale-105"
        >
          <defs>
            <linearGradient id="vendora-electric" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#4F8CFF" />
              <stop offset="100%" stopColor="#1C4EB8" />
            </linearGradient>
            <linearGradient id="vendora-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F5DF87" />
              <stop offset="50%" stopColor="#D4AF37" />
              <stop offset="100%" stopColor="#9D7D1E" />
            </linearGradient>
            <filter id="core-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Outer faceted geometric shield / node */}
          <path
            d="M24 4L42 14V34L24 44L6 34V14L24 4Z"
            stroke="url(#vendora-electric)"
            strokeWidth="1.75"
            strokeLinejoin="round"
            className="opacity-70 group-hover:opacity-100 transition-opacity"
          />

          {/* Golden interconnected diagonal chevron ('V') */}
          <path
            d="M14 18L24 33L34 18"
            stroke="url(#vendora-gold)"
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#core-glow)"
          />

          {/* Center luminous nexus node */}
          <circle cx="24" cy="24" r="3.5" fill="#4F8CFF" filter="url(#core-glow)" />
          <circle cx="24" cy="24" r="1.5" fill="#FFFFFF" />

          {/* Peripheral connection nodes */}
          <circle cx="24" cy="4" r="2" fill="#D4AF37" />
          <circle cx="42" cy="14" r="2" fill="#4F8CFF" />
          <circle cx="42" cy="34" r="2" fill="#D4AF37" />
          <circle cx="24" cy="44" r="2" fill="#4F8CFF" />
          <circle cx="6" cy="34" r="2" fill="#D4AF37" />
          <circle cx="6" cy="14" r="2" fill="#4F8CFF" />
        </svg>

        {/* Ambient background glow */}
        <div className="absolute inset-0 bg-electric/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1">
          <span className={`font-semibold tracking-[0.16em] uppercase text-white ${current.text} font-sans`}>
            VENDORA
          </span>
          <span className={`${current.dot} rounded-full bg-gold shadow-[0_0_8px_#D4AF37]`}></span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-widest uppercase text-slate-textMuted font-mono">
            Raw Materials & Builder Supply OS
          </span>
        )}
      </div>
    </Link>
  );
}
