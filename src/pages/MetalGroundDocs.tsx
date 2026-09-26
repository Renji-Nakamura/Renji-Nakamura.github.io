import { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowUp, Github } from 'lucide-react';
import ReportHeader from '@/components/metalground/ReportHeader';
import SectionCard from '@/components/metalground/SectionCard';
import TableOfContents from '@/components/metalground/TableOfContents';
import { REPORT_SECTIONS } from '@/data/reportData';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function MetalGroundDocs() {
  // Ensure page starts at top upon navigation
  useLayoutEffect(() => {
    try {
      sessionStorage.setItem('portfolio_carousel_active_id', 'metalground');
    } catch {
      // Ignore storage errors
    }
    const html = document.documentElement;
    const prevScrollBehavior = html.style.scrollBehavior;
    html.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);
    requestAnimationFrame(() => {
      html.style.scrollBehavior = prevScrollBehavior;
    });
  }, []);

  const scrollToTop = () => {
    playTerminalBeep();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="bg-background text-foreground min-h-screen pt-4 pb-20 selection:bg-orange-500 selection:text-white relative"
    >
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        {/* Top Minimal Breadcrumb Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 mb-2 border-b border-border/40 text-sm">
          <div className="flex items-center space-x-3">
            <Link
              to="/project/metalground"
              onClick={() => playTerminalBeep()}
              className="inline-flex items-center space-x-2 text-muted-foreground hover:text-orange-500 transition-colors font-medium group outline-none"
            >
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              <span>MetalGround プロジェクト概要へ戻る</span>
            </Link>
          </div>

          <div className="flex items-center space-x-6 text-xs text-muted-foreground font-mono">
            <a
              href="https://github.com/Renji-Nakamura"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1.5 hover:text-foreground transition-colors"
            >
              <Github size={14} />
              <span>GitHub</span>
            </a>
            <span className="hidden sm:inline">全12章・54実験体系</span>
          </div>
        </div>

        {/* Executive Hero & Metadata Header */}
        <ReportHeader />

        {/* 2-Column Academic Paper Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 pt-8 pb-16 items-start">
          {/* Main Article Stream (All 12 Sections) */}
          <div className="flex-1 min-w-0">
            {REPORT_SECTIONS.map((sec) => (
              <SectionCard key={sec.id} section={sec} />
            ))}

            {/* End of Document Footnote */}
            <div className="pt-16 pb-8 text-center text-xs text-muted-foreground">
              <p className="font-mono mb-2">--- END OF TECHNICAL REPORT ---</p>
              <p>Citation: Nakamura, R. (2026). MetalGround: Exact Inference Optimization on Apple Silicon.</p>

              <div className="mt-8 flex justify-center gap-4">
                <Link
                  to="/project/metalground"
                  onClick={() => playTerminalBeep()}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border/60 transition-all"
                >
                  <ArrowLeft size={14} />
                  <span>MetalGround 概要ページへ戻る</span>
                </Link>
                <button
                  type="button"
                  onClick={scrollToTop}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-secondary hover:bg-secondary/80 text-foreground text-xs font-medium border border-border/60 transition-all cursor-pointer"
                >
                  <ArrowUp size={14} />
                  <span>ページ先頭へ</span>
                </button>
              </div>
            </div>
          </div>

          {/* Sticky Table of Contents Sidebar (Desktop) */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-24 self-start">
            <TableOfContents />
          </aside>
        </div>
      </div>
    </motion.div>
  );
}
