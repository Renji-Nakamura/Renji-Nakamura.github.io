import { useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import KitchenCarDeliverable from '@/components/KitchenCarDeliverable';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function ProjectDetail() {
  // Ensure the page starts at the top when entering the detail view
  useLayoutEffect(() => {
    try {
      sessionStorage.setItem('portfolio_carousel_active_id', 'wagtail');
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 30,
        pointerEvents: 'none'
      }}
      transition={{ duration: 0.25 }}
      className="bg-background min-h-screen pt-8 pb-24"
    >
      {/* Top minimal navigation container for detailed view */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-2">
        <Link 
          to="/"
          onClick={() => playTerminalBeep()}
          state={{ scrollTo: 'projects', projectId: 'wagtail' }}
          className="inline-flex items-center space-x-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-2 group outline-none"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>プロジェクト一覧へ戻る</span>
        </Link>
      </div>

      {/* Shared Layout wrapper container */}
      <motion.div 
        layoutId="project-card-wagtail" 
        className="bg-card rounded-3xl origin-top overflow-hidden"
        style={{ backgroundColor: '#ffffff' }}
      >
        <KitchenCarDeliverable />
      </motion.div>
    </motion.div>
  );
}
