import { useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Hero from '@/components/Hero';
import Interests from '@/components/Interests';
import ProjectCard from '@/components/ProjectCard';
import AgentOpticsCard from '@/components/AgentOpticsCard';
import SectionHeader from '@/components/SectionHeader';
import { motion } from 'framer-motion';

export default function Home() {
  const location = useLocation();

  useLayoutEffect(() => {
    const state = location.state as { scrollTo?: string } | null;
    const scrollToId = state?.scrollTo;
    if (scrollToId) {
      const element = document.getElementById(scrollToId);
      if (element) {
        // html の scroll-behavior: smooth によるアニメーション中のスクロールズレを防止
        const html = document.documentElement;
        const prevScrollBehavior = html.style.scrollBehavior;
        html.style.scrollBehavior = 'auto';
        
        const navbarHeight = 64;
        const y = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo(0, y);

        // 次のフレームで元の設定を復元
        requestAnimationFrame(() => {
          html.style.scrollBehavior = prevScrollBehavior;
        });
      }
    }
  }, [location.state]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Interests />
      
      {/* Projects Section */}
      <section id="projects" className="bg-background py-28 md:py-32 transition-colors">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <SectionHeader
            label="主要プロジェクト"
            title="システム開発実績"
          />

          {/* Project Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
            <ProjectCard />
            <AgentOpticsCard />
          </div>
        </div>
      </section>
    </motion.div>
  );
}
