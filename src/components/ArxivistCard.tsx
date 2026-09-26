import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Database, GitCompare, GitFork } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import DecryptedText from '@/components/DecryptedText';

export default function ArxivistCard() {
  return (
    <Link to="/project/arxivist" className="block group cursor-pointer outline-none h-full">
      <motion.div
        layoutId="project-card-arxivist"
        style={{ backgroundColor: '#ffffff' }}
        className="bg-card border border-border/60 rounded-3xl p-8 md:p-10 shadow-apple hover:shadow-apple-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]"
      >
        {/* Top Header */}
        <div className="flex justify-between items-start relative z-10 min-h-[110px]">
          <div>
            <motion.div
              layoutId="project-category-arxivist"
              className="mb-4 inline-block"
            >
              <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
                <span>2年次: データ設計 / 分散クローリング &amp; API統制</span>
              </Badge>
            </motion.div>
            <motion.h3
              layoutId="project-title-arxivist"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-red-500 transition-colors"
            >
              <DecryptedText triggerOnView duration={900}>
                Project Arxivist
              </DecryptedText>
            </motion.h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">論文とOSS実装の追跡・計量プラットフォーム</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-red-500 group-hover:text-white transition-all duration-300 shrink-0">
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Abstract Minimalist Visual Preview representing Arxivist */}
        <div
          style={{ backgroundColor: '#F5F5F7' }}
          className="my-6 h-[140px] px-6 bg-secondary rounded-2xl border border-border/40 flex flex-col items-center justify-center relative overflow-hidden z-10"
        >
          {/* Subtle grid pattern / graphical nodes */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-muted-foreground">
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border border-border/40">
              <Database size={20} className="text-[#3B82F6] mb-1" />
              <span className="text-[10px] font-mono">arXiv CS</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-border"></div>
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border-t-2 border-red-500">
              <GitCompare size={20} className="text-red-500 mb-1" />
              <span className="text-[10px] font-mono">Precision 100%</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-border"></div>
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border border-border/40">
              <GitFork size={20} className="text-[#10B981] mb-1" />
              <span className="text-[10px] font-mono">GitHub OSS</span>
            </div>
          </div>
          <div className="absolute bottom-2 text-[9px] tracking-widest text-muted-foreground/60 uppercase font-mono flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block" />
            <span>arXiv-to-GitHub Observatory</span>
          </div>
        </div>

        {/* Bottom Subtext */}
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground leading-relaxed font-normal line-clamp-2">
            論文がOSS実装として実社会に降りてくる速度と受容実態を可視化。GitHub API（30 req/min）やarXiv APIの厳格な制約下で、偽陽性ゼロ（FPR 0.0%）の判定エンジンと全230テスト・本番パイプラインを構築。
          </p>
          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-red-500 font-medium">
            <span>システム設計 &amp; 検証レポートを見る</span>
            <span>詳細確認 →</span>
          </div>
        </div>

        {/* Subtle hover gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      </motion.div>
    </Link>
  );
}
