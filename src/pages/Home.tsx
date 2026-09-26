import { useRef, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import Interests from '@/components/Interests';
import ProjectCarousel from '@/components/ProjectCarousel';
import { motion } from 'framer-motion';

export default function Home() {
  const location = useLocation();
  const homeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const state = location.state as { scrollTo?: string; projectId?: string } | null;
    const scrollToId = state?.scrollTo;
    if (scrollToId) {
      const performScroll = () => {
        const homeEl = homeRef.current;
        const targetEl =
          scrollToId === 'projects'
            ? document.getElementById('projects-header') || document.getElementById('projects')
            : document.getElementById(scrollToId);

        if (targetEl && homeEl) {
          const html = document.documentElement;
          const prevScrollBehavior = html.style.scrollBehavior;
          html.style.scrollBehavior = 'auto';

          // Homeコンポーネントを基準とした相対位置を計算
          // これにより、詳細画面のアンマウント中（AnimatePresence）でも別要素の高さに引きずられず、
          // 「主要プロジェクト & R&D / 開発・研究実績」がウインドウ上部に来る正しい絶対位置を算出する
          const homeRect = homeEl.getBoundingClientRect();
          const targetRect = targetEl.getBoundingClientRect();
          const relativeTop = targetRect.top - homeRect.top;

          // 開いているブラウザのウインドウの上に「主要プロジェクト & R&D / 開発・研究実績」が来る位置
          // 上部に適度な余白（約32px）を設けてタイトルとカードが美しく収まるように調整
          const topMargin = scrollToId === 'projects' ? 32 : 64;
          const targetY = Math.max(0, relativeTop - topMargin);
          window.scrollTo(0, targetY);

          requestAnimationFrame(() => {
            html.style.scrollBehavior = prevScrollBehavior;
          });
        }
      };

      performScroll();

      // DOMレイアウト確定・トランジション完了後にも確実に同期
      const rafId = requestAnimationFrame(performScroll);
      const timerId = setTimeout(performScroll, 50);

      return () => {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
      };
    }
  }, [location.state]);

  return (
    <motion.div
      ref={homeRef}
      id="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Interests />
      
      {/* Projects Section */}
      <section id="projects" className="bg-background py-28 md:py-32 transition-colors overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <ProjectCarousel />
        </div>
      </section>
    </motion.div>
  );
}
