import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from '@/components/ProjectCard';
import AgentOpticsCard from '@/components/AgentOpticsCard';
import MetalGroundCard from '@/components/MetalGroundCard';
import SectionHeader from '@/components/SectionHeader';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';
import { cn } from '@/lib/utils';

const SCROLL_STORAGE_KEY = 'portfolio_carousel_scroll';
const ACTIVE_ID_STORAGE_KEY = 'portfolio_carousel_active_id';

const projectItems = [
  { id: 'wagtail', component: <ProjectCard /> },
  { id: 'agentoptics', component: <AgentOpticsCard /> },
  { id: 'metalground', component: <MetalGroundCard /> }
];

export default function ProjectCarousel() {
  const location = useLocation();
  const scrollRef = useRef<HTMLDivElement>(null);
  const isRestoredRef = useRef(false);
  const [isRestored, setIsRestored] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);

  const checkScrollState = useCallback(() => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Calculate active slide index
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    if (children.length === 0) return;

    const containerRect = scrollRef.current.getBoundingClientRect();
    let closestIndex = 0;
    let minDistance = Infinity;

    children.forEach((child, index) => {
      const childRect = child.getBoundingClientRect();
      const distance = Math.abs(childRect.left - containerRect.left);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);

    // Save scroll position to sessionStorage once restoration has finished
    if (isRestoredRef.current) {
      try {
        sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollLeft.toString());
        const activeItem = projectItems[closestIndex];
        if (activeItem) {
          sessionStorage.setItem(ACTIVE_ID_STORAGE_KEY, activeItem.id);
        }
      } catch {
        // Ignore quota/private browsing errors
      }
    }
  }, []);

  const restoreScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const savedScroll = sessionStorage.getItem(SCROLL_STORAGE_KEY);
    const stateProjectId = (location.state as { projectId?: string } | null)?.projectId;
    const targetId = stateProjectId || sessionStorage.getItem(ACTIVE_ID_STORAGE_KEY);

    let targetPos: number | null = null;

    if (targetId) {
      const targetEl = el.querySelector<HTMLElement>(`[data-project-id="${targetId}"]`);
      if (targetEl) {
        const containerRect = el.getBoundingClientRect();
        const targetRect = targetEl.getBoundingClientRect();
        targetPos = targetRect.left - containerRect.left + el.scrollLeft;
      }
    }

    if (targetPos !== null && !isNaN(targetPos)) {
      el.scrollLeft = targetPos;
    } else if (savedScroll !== null) {
      const pos = parseFloat(savedScroll);
      if (!isNaN(pos) && pos >= 0) {
        el.scrollLeft = pos;
      }
    }

    checkScrollState();
  }, [location.state, checkScrollState]);

  useLayoutEffect(() => {
    restoreScroll();

    const rafId = requestAnimationFrame(() => {
      restoreScroll();
      isRestoredRef.current = true;
      setIsRestored(true);
    });

    const timerId = setTimeout(() => {
      restoreScroll();
      isRestoredRef.current = true;
      setIsRestored(true);
    }, 60);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
    };
  }, [restoreScroll]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScrollState, { passive: true });
    window.addEventListener('resize', checkScrollState);

    return () => {
      el.removeEventListener('scroll', checkScrollState);
      window.removeEventListener('resize', checkScrollState);
    };
  }, [checkScrollState]);

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    if (children.length === 0) return;

    const scrollAmount = children.length >= 2
      ? children[1].offsetLeft - children[0].offsetLeft
      : children[0].offsetWidth + 24;

    scrollRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth'
    });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    if (children[index]) {
      const containerRect = scrollRef.current.getBoundingClientRect();
      const childRect = children[index].getBoundingClientRect();
      const targetLeft = childRect.left - containerRect.left + scrollRef.current.scrollLeft;
      scrollRef.current.scrollTo({
        left: targetLeft,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="relative">
      {/* Header with Navigation Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 md:mb-12 gap-4">
        <SectionHeader
          label="主要プロジェクト &amp; R&amp;D"
          title="開発・研究実績"
          className="mb-0 md:mb-0"
        />

        {/* Carousel Arrow Controls */}
        <div className="flex items-center space-x-2 self-end sm:self-auto shrink-0 pb-1">
          <button
            type="button"
            onClick={() => {
              playTerminalBeep();
              scroll('left');
            }}
            disabled={!canScrollLeft}
            className={cn(
              "w-10 h-10 rounded-full border border-border/80 bg-card flex items-center justify-center text-foreground transition-all shadow-sm outline-none",
              canScrollLeft
                ? "hover:bg-secondary hover:scale-105 cursor-pointer active:scale-95"
                : "opacity-30 cursor-not-allowed"
            )}
            aria-label="前のプロジェクトへ"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={() => {
              playTerminalBeep();
              scroll('right');
            }}
            disabled={!canScrollRight}
            className={cn(
              "w-10 h-10 rounded-full border border-border/80 bg-card flex items-center justify-center text-foreground transition-all shadow-sm outline-none",
              canScrollRight
                ? "hover:bg-secondary hover:scale-105 cursor-pointer active:scale-95"
                : "opacity-30 cursor-not-allowed"
            )}
            aria-label="次のプロジェクトへ"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Horizontal Carousel Container - Scrollbar completely hidden */}
      <div
        ref={scrollRef}
        className={cn(
          "flex gap-6 md:gap-8 overflow-x-auto pt-2 pb-6 -mx-6 px-6 md:-mx-12 md:px-12 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden",
          isRestored ? "snap-x snap-mandatory" : ""
        )}
      >
        {projectItems.map((item) => (
          <div
            key={item.id}
            data-project-id={item.id}
            onClick={() => {
              playTerminalBeep();
              try {
                sessionStorage.setItem(ACTIVE_ID_STORAGE_KEY, item.id);
                if (scrollRef.current) {
                  sessionStorage.setItem(SCROLL_STORAGE_KEY, scrollRef.current.scrollLeft.toString());
                }
              } catch {
                // Ignore storage errors
              }
            }}
            className="w-[88vw] sm:w-[480px] md:w-[512px] shrink-0 snap-start flex flex-col"
          >
            {item.component}
          </div>
        ))}
      </div>

      {/* Interactive Dot Indicators below carousel */}
      <div className="flex items-center justify-center space-x-2.5 mt-4">
        {projectItems.map((item, index) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              playTerminalBeep();
              scrollToIndex(index);
            }}
            className={cn(
              "h-2 rounded-full transition-all duration-300 cursor-pointer outline-none",
              activeIndex === index
                ? "w-8 bg-foreground"
                : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
            )}
            aria-label={`プロジェクト ${index + 1} を表示`}
          />
        ))}
      </div>
    </div>
  );
}
