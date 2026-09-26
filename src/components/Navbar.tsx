import { Link, useLocation } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function Navbar() {
  const location = useLocation();
  const isAgentOptics = location.pathname.includes('/project/agentoptics');
  const isWagtail = location.pathname.includes('/project/wagtail');
  const isMetalGround = location.pathname.includes('/project/metalground');
  const isDetail = isAgentOptics || isWagtail || isMetalGround;
  const projectName = isAgentOptics ? 'AgentOptics' : isWagtail ? 'Cafe Wagtail' : isMetalGround ? 'MetalGround' : '';

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
              <Badge variant="secondary" className="text-xs font-medium text-muted-foreground truncate max-w-[120px] sm:max-w-none">
                {projectName}
              </Badge>
            </>
          )}
        </div>

        <div className="flex items-center space-x-4 sm:space-x-8 text-sm font-medium text-muted-foreground">
          {isDetail ? (
            <Link
              to="/"
              onClick={() => playTerminalBeep()}
              state={{ 
                scrollTo: 'projects',
                projectId: isAgentOptics ? 'agentoptics' : isMetalGround ? 'metalground' : 'wagtail'
              }}
              className={`transition-colors font-semibold ${
                isAgentOptics
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
