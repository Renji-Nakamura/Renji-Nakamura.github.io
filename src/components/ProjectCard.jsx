import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Layers, Smartphone, Sparkles } from 'lucide-react';

export default function ProjectCard() {
  return (
    <Link to="/project/wagtail" className="block group cursor-pointer outline-none">
      <motion.div 
        layoutId="project-card-wagtail"
        className="bg-white border border-[#E3E3E8]/60 rounded-3xl p-8 md:p-10 shadow-apple hover:shadow-apple-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[380px]"
      >
        {/* Top Header */}
        <div className="flex justify-between items-start relative z-10">
          <div>
            <motion.div 
              layoutId="project-category-wagtail"
              className="inline-flex items-center space-x-2 bg-[#F5F5F7] px-3 py-1 rounded-full text-xs font-semibold text-[#1D1D1F] mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3]"></span>
              <span>1年次主要開発プロジェクト</span>
            </motion.div>
            <motion.h3 
              layoutId="project-title-wagtail"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors"
            >
              Cafe Wagtail 経営管理システム
            </motion.h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-300 shrink-0">
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Abstract Minimalist Visual Preview representing the Kitchen Car app */}
        <div className="my-6 py-8 px-6 bg-[#F5F5F7] rounded-2xl border border-[#E3E3E8]/40 flex flex-col items-center justify-center relative overflow-hidden z-10">
          {/* Subtle grid pattern / graphical nodes */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-[#86868B]">
            <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-sm border border-[#E3E3E8]/40">
              <Smartphone size={20} className="text-[#1D1D1F] mb-1" />
              <span className="text-[10px] font-mono">POS Edge</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-[#D2D2D7]"></div>
            <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-sm border-t-2 border-[#0071E3]">
              <Layers size={20} className="text-[#0071E3] mb-1" />
              <span className="text-[10px] font-mono">Serverless DB</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-[#D2D2D7]"></div>
            <div className="flex flex-col items-center bg-white p-3 rounded-xl shadow-sm border border-[#E3E3E8]/40">
              <Sparkles size={20} className="text-amber-500 mb-1" />
              <span className="text-[10px] font-mono">Gemini AI</span>
            </div>
          </div>
          <div className="absolute bottom-2 text-[9px] tracking-widest text-[#86868B]/60 uppercase font-mono">
            System Topology Snapshot
          </div>
        </div>

        {/* Bottom Subtext */}
        <div className="relative z-10">
          <p className="text-sm text-[#86868B] leading-relaxed font-normal line-clamp-2">
            リアルタイムPOS売上ストリーム、在庫レシピ即時連動、Gemini需要予測、LINE公式アカウント即時配信Webhookを統合した完全サーバレスSPA。
          </p>
          <div className="mt-6 pt-4 border-t border-[#F5F5F7] flex items-center justify-between text-xs text-[#0071E3] font-medium">
            <span>システムアーキテクチャの詳細を見る</span>
            <span>シームレス展開 →</span>
          </div>
        </div>

        {/* Subtle hover gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-[#0071E3]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      </motion.div>
    </Link>
  );
}
