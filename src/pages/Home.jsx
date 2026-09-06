import React from 'react';
import Hero from '../components/Hero.jsx';
import Interests from '../components/Interests.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import AgentOpticsCard from '../components/AgentOpticsCard.jsx';
import { motion } from 'framer-motion';

export default function Home() {
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
      <section id="projects" className="bg-white py-32 transition-colors">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="max-w-3xl mb-16">
            <h2 className="text-xs font-semibold tracking-widest text-[#86868B] uppercase mb-3 tracking-[0.2em]">
              主要プロジェクト
            </h2>
            <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
              システム開発実績
            </p>
          </div>

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
