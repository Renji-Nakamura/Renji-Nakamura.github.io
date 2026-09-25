import { useEffect, useRef } from 'react';
import { glitchText, GlitchTextOptions } from './mfp-core';

export interface UseGlitchTextOptions extends GlitchTextOptions {
  triggerOnView?: boolean;
  threshold?: number;
  trigger?: unknown;
}

export function useGlitchText<T extends HTMLElement = HTMLElement>(
  options: UseGlitchTextOptions = {}
) {
  const ref = useRef<T>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (options.triggerOnView && typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !hasTriggeredRef.current) {
              hasTriggeredRef.current = true;
              glitchText(el, options);
              observer.disconnect();
            }
          });
        },
        { threshold: options.threshold ?? 0.2 }
      );
      observer.observe(el);
      return () => observer.disconnect();
    } else {
      const handle = glitchText(el, options);
      return () => handle.cancel();
    }
  }, [options.duration, options.delay, options.triggerOnView, options.trigger]);

  return ref;
}
