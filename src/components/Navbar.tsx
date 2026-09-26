import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function Navbar() {
  const location = useLocation();
  const isAgentOptics = location.pathname.includes('/project/agentoptics');
  const isWagtail = location.pathname.includes('/project/wagtail');
  const isArxivist = location.pathname.includes('/project/arxivist');
  const isMetalGroundDocs = location.pathname.includes('/project/metalground/docs') || location.pathname.includes('/metalground-docs');
  const isMetalGround = location.pathname.includes('/project/metalground') && !isMetalGroundDocs;
  const isDetail = isAgentOptics || isWagtail || isArxivist || isMetalGround || isMetalGroundDocs;
  const projectName = isAgentOptics ? 'AgentOptics' : isWagtail ? 'Cafe Wagtail' : isArxivist ? 'Project Arxivist' : (isMetalGround || isMetalGroundDocs) ? 'MetalGround' : '';

  const progressBarRef = useRef<HTMLDivElement>(null);

  // Dynamic accent color and glow shadow per project
  const progressColorClass = isArxivist
    ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]'
    : isAgentOptics
    ? 'bg-[#10B981] shadow-[0_0_8px_rgba(16,185,129,0.6)]'
    : isWagtail
    ? 'bg-primary shadow-[0_0_8px_rgba(0,113,227,0.6)]'
    : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]';

  // Hardware-accelerated reading progress bar for all project detail/doc views
  useEffect(() => {
    if (!isDetail) return;

    let rafId: number | null = null;
    const updateProgress = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0 && progressBarRef.current) {
        const progress = Math.min(1, Math.max(0, window.scrollY / totalHeight));
        progressBarRef.current.style.transform = `scaleX(${progress})`;
      }
      rafId = null;
    };

    const handleScroll = () => {
      if (rafId === null) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [location.pathname, isDetail]);

  const scrollToSection = (id: string) => {
    playTerminalBeep();
    if (id === 'projects') {
      const headerEl = document.getElementById('projects-header') || document.getElementById('projects');
      const homeEl = document.getElementById('home-container');
      if (headerEl && homeEl) {
        const relativeTop = headerEl.getBoundingClientRect().top - homeEl.getBoundingClientRect().top;
        window.scrollTo({ top: Math.max(0, relativeTop - 32), behavior: 'smooth' });
        return;
      }
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/60 transition-all">
      {/* Top Reading Progress Bar (Hardware-accelerated scaleX, zero lag) */}
      {isDetail && (
        <div
          ref={progressBarRef}
          className={`absolute top-0 left-0 right-0 h-[2.5px] origin-left pointer-events-none will-change-transform ${progressColorClass}`}
          style={{ transform: 'scaleX(0)' }}
        />
      )}
      <div className="max-w-6xl mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link
            to="/"
            className="text-lg font-bold tracking-tight text-foreground hover:opacity-80 transition-opacity outline-none"
          >
            Renji Nakamura
          </Link>
          {isDetail && (
            <>
              <ChevronRight size={14} className="text-muted-foreground/60" />
              {isMetalGroundDocs ? (
                <Link
                  to="/project/metalground"
                  onClick={() => playTerminalBeep()}
                  className="outline-none"
                >
                  <Badge variant="secondary" className="text-xs font-medium text-muted-foreground hover:text-orange-500 hover:bg-orange-500/10 transition-colors truncate max-w-[120px] sm:max-w-none cursor-pointer">
                    {projectName}
                  </Badge>
                </Link>
              ) : (
                <Badge variant="secondary" className="text-xs font-medium text-muted-foreground truncate max-w-[120px] sm:max-w-none">
                  {projectName}
                </Badge>
              )}

              {isMetalGroundDocs && (
                <>
                  <ChevronRight size={14} className="text-muted-foreground/60" />
                  <Badge variant="secondary" className="text-xs font-medium text-orange-500 bg-orange-500/10 border border-orange-500/20 truncate max-w-[140px] sm:max-w-none">
                    技術報告書 (全12章)
                  </Badge>
                </>
              )}
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 sm:space-x-8 text-sm font-medium text-muted-foreground">
          {isMetalGroundDocs ? (
            <div className="flex items-center space-x-3 sm:space-x-6">
              <Link
                to="/project/metalground"
                onClick={() => playTerminalBeep()}
                className="transition-colors font-semibold text-orange-500 hover:text-orange-500/80 text-xs sm:text-sm"
              >
                概要へ戻る
              </Link>
              <Link
                to="/"
                onClick={() => playTerminalBeep()}
                state={{ 
                  scrollTo: 'projects',
                  projectId: 'metalground'
                }}
                className="transition-colors font-medium text-muted-foreground hover:text-foreground text-xs sm:text-sm hidden sm:inline"
              >
                プロジェクト一覧
              </Link>
            </div>
          ) : isDetail ? (
            <Link
              to="/"
              onClick={() => playTerminalBeep()}
              state={{ 
                scrollTo: 'projects',
                projectId: isAgentOptics ? 'agentoptics' : isArxivist ? 'arxivist' : isMetalGround ? 'metalground' : 'wagtail'
              }}
              className={`transition-colors font-semibold ${
                isArxivist
                  ? 'text-red-500 hover:text-red-500/80'
                  : isAgentOptics
                  ? 'text-agent hover:text-agent/80'
                  : isMetalGround
                  ? 'text-orange-500 hover:text-orange-500/80'
                  : 'text-primary hover:text-primary/80'
              }`}
            >
              プロジェクト一覧へ
            </Link>
          ) : (
            <>
              <button
                type="button"
                onClick={() => scrollToSection('hero')}
                className="hover:text-foreground transition-colors hidden sm:inline cursor-pointer"
              >
                トップ
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('stack')}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                関心領域
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('projects')}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                主要プロジェクト
              </button>
              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                コンタクト
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
