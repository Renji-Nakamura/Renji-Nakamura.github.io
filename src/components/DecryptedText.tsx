import React, { useState, useEffect, useRef, useMemo } from 'react';

export const DEFAULT_GLITCH_CHARS = "_~+=[]{}*^%$#@!Xx0123456789";

interface DecryptedTextProps {
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'div';
  className?: string;
  children: React.ReactNode;
  duration?: number;
  delay?: number;
  triggerOnView?: boolean;
  chars?: string;
}

export default function DecryptedText({
  as: Component = 'span',
  className = '',
  children,
  duration = 1200,
  delay = 0,
  triggerOnView = false,
  chars = DEFAULT_GLITCH_CHARS,
}: DecryptedTextProps) {
  const containerRef = useRef<HTMLElement>(null);
  const [isStarted, setIsStarted] = useState(false);
  const [isGlitchingActive, setIsGlitchingActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return true;
    }
    return false;
  });
  // Tick counter to trigger random character regeneration during active animation
  const [, setTickCount] = useState(0);

  const rawText = useMemo(() => {
    return typeof children === 'string' ? children : String(children ?? '');
  }, [children]);

  // Tokenize string preserving whitespace delimiters
  // e.g. "Learning software" -> ["Learning", " ", "software"]
  const tokens = useMemo(() => {
    if (!rawText) return [];
    return rawText.split(/(\s+)/);
  }, [rawText]);

  const totalChars = rawText.length;

  useEffect(() => {
    if (isComplete) return;

    if (!triggerOnView) {
      setIsStarted(true);
      return;
    }

    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setIsStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsStarted(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [triggerOnView, isComplete]);

  useEffect(() => {
    if (!isStarted || isComplete || totalChars === 0) return;

    let animFrameId: number;
    let delayTimer: ReturnType<typeof setTimeout>;
    let isCancelled = false;

    const startAnimation = () => {
      setIsGlitchingActive(true);
      const startTime = performance.now();

      const tick = (now: number) => {
        if (isCancelled) return;
        const elapsed = now - startTime;
        const rawProgress = Math.min(elapsed / duration, 1.0);

        // Sine Ease In-Out with 2nd-power acceleration (MFP signature curve)
        let t = -(Math.cos(Math.PI * rawProgress) - 1) / 2;
        t = Math.pow(t, 2);

        setProgress(t);
        setTickCount((c) => c + 1);

        if (rawProgress < 1.0) {
          animFrameId = requestAnimationFrame(tick);
        } else {
          setProgress(1.0);
          setIsGlitchingActive(false);
          setIsComplete(true);
        }
      };

      animFrameId = requestAnimationFrame(tick);
    };

    if (delay > 0) {
      delayTimer = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }

    return () => {
      isCancelled = true;
      clearTimeout(delayTimer);
      cancelAnimationFrame(animFrameId);
    };
  }, [isStarted, isComplete, duration, delay, totalChars]);

  // If complete, render static clean markup
  if (isComplete) {
    return (
      <Component ref={containerRef as React.Ref<any>} className={className}>
        {children}
      </Component>
    );
  }

  // Calculate current decode boundary index and glitch wave window
  const decodeIndex = Math.floor(progress * totalChars);
  const glitchWidth = Math.max(1, Math.floor(2 * (0.5 - Math.abs(progress - 0.5)) * 4));

  let runningCharIndex = 0;

  // Helper to render an individual character slot
  const renderCharSlot = (char: string, index: number) => {
    const isDecrypted = index < decodeIndex;
    const isGlitching =
      isGlitchingActive &&
      !isDecrypted &&
      index >= decodeIndex &&
      index < decodeIndex + glitchWidth;

    if (isDecrypted) {
      return (
        <span key={index} style={{ lineHeight: 'inherit' }}>
          {char}
        </span>
      );
    }

    if (isGlitching) {
      const glitchChar = chars[Math.floor(Math.random() * chars.length)];
      return (
        <span
          key={index}
          className="inline-block relative"
          style={{ verticalAlign: 'baseline', lineHeight: 'inherit' }}
        >
          {/* Invisible target character locks the exact layout dimensions */}
          <span
            className="opacity-0 select-none pointer-events-none"
            style={{ lineHeight: 'inherit' }}
          >
            {char}
          </span>
          {/* Center-aligned cyber glitch character */}
          <span className="absolute inset-0 flex items-center justify-center select-none pointer-events-none opacity-85 font-mono">
            {glitchChar}
          </span>
        </span>
      );
    }

    // Not yet decrypted (waiting for wave or delay): holds exact slot space invisibly
    return (
      <span
        key={index}
        className="inline-block relative"
        style={{ verticalAlign: 'baseline', lineHeight: 'inherit' }}
      >
        <span
          className="opacity-0 select-none pointer-events-none"
          style={{ lineHeight: 'inherit' }}
        >
          {char}
        </span>
      </span>
    );
  };

  return (
    <Component ref={containerRef as React.Ref<any>} className={className}>
      {tokens.map((token, tokenIdx) => {
        if (!token) return null;

        // Whitespace token: render directly so browser handles natural line wrapping
        if (/^\s+$/.test(token)) {
          runningCharIndex += token.length;
          return <span key={tokenIdx}>{token}</span>;
        }

        const isCJK = /[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff\uff66-\uff9f]/.test(token);
        const charsInToken = token.split('');
        const tokenSlots = charsInToken.map((char) => {
          const charIndex = runningCharIndex++;
          return renderCharSlot(char, charIndex);
        });

        // Latin words stay unbroken; CJK characters can wrap naturally anywhere
        if (isCJK) {
          return <React.Fragment key={tokenIdx}>{tokenSlots}</React.Fragment>;
        }

        return (
          <span key={tokenIdx} className="inline-block whitespace-nowrap">
            {tokenSlots}
          </span>
        );
      })}
    </Component>
  );
}
