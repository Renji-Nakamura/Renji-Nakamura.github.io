import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import KitchenCarDeliverable from '../components/KitchenCarDeliverable.jsx';

export default function ProjectDetail() {
  // Ensure the page starts at the top when entering the detail view
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white min-h-screen pt-8 pb-24"
    >
      {/* Top minimal navigation container for detailed view */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 mb-2">
        <Link 
          to="/"
          className="inline-flex items-center space-x-2 text-sm font-medium text-[#86868B] hover:text-[#0071E3] transition-colors py-2 group outline-none"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>ホームに戻る</span>
        </Link>
      </div>

      {/* Shared Layout wrapper container */}
      <motion.div layoutId="project-card-wagtail" className="bg-white rounded-3xl origin-top">
        <KitchenCarDeliverable />
      </motion.div>
    </motion.div>
  );
}
