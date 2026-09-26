import { useState, useEffect } from 'react';
import { REPORT_SECTIONS } from '@/data/reportData';
import { ListTree } from 'lucide-react';

export default function TableOfContents() {
  const [activeId, setActiveId] = useState<string>('section-1');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0.1,
      }
    );

    REPORT_SECTIONS.forEach((sec) => {
      const el = document.getElementById(sec.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const navbarHeight = 64;
      const y = el.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 24;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav className="p-5 rounded-2xl bg-card border border-border/80 shadow-sm" aria-label="Table of contents">
      <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-4 pb-2 border-b border-border/50">
        <ListTree size={14} className="text-orange-500" />
        <span>Contents / 目次</span>
      </div>

      <div className="space-y-1 text-xs">
        {REPORT_SECTIONS.map((sec) => {
          const isActive = activeId === sec.id;
          return (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`w-full text-left py-2 px-3 rounded-lg transition-all flex items-start space-x-2 group cursor-pointer ${
                isActive
                  ? 'bg-orange-500/10 text-orange-500 font-semibold border-l-2 border-orange-500'
                  : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
              }`}
            >
              <span className={`text-[11px] font-mono shrink-0 mt-0.5 ${isActive ? 'text-orange-500' : 'text-muted-foreground/60'}`}>
                {String(sec.number).padStart(2, '0')}.
              </span>
              <span className="line-clamp-2 leading-relaxed">
                {sec.title}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-border/60 text-[11px] text-muted-foreground">
        <p className="leading-relaxed">
          全54実験・COCO 5000枚の完全実測データに基づく学術的技術報告書
        </p>
      </div>
    </nav>
  );
}
