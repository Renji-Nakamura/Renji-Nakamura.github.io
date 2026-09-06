import React from 'react';

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center bg-white px-6 py-24 text-center">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Subtle premium label */}
        <span className="text-xs font-semibold tracking-widest text-[#86868B] uppercase mb-6 tracking-[0.2em]">
          CS Student & Software Developer
        </span>
        
        {/* Main striking headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-[#1D1D1F] max-w-3xl leading-[1.1] mb-8">
          Learning software logic and exploring real-world AI implementation.
        </h1>
        
        {/* Light body subtext */}
        <p className="text-lg sm:text-xl text-[#86868B] font-normal max-w-2xl leading-relaxed mb-16">
          Based in Morioka, Iwate. Computer Science student exploring convolutional neural networks and solid code design.
        </p>
      </div>

      {/* Floating ambient bottom spacer/indicator */}
      <div className="absolute bottom-12 text-[#D2D2D7] animate-pulse hidden sm:block">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#86868B]/40 to-transparent mx-auto"></div>
      </div>
    </section>
  );
}
