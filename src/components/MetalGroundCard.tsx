import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Cpu, FileDigit, Bot, BrainCircuit } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function MetalGroundCard() {
  return (
    <Link to="/project/metalground" className="block group cursor-pointer outline-none h-full">
      <motion.div
        layoutId="project-card-metalground"
        style={{ backgroundColor: '#ffffff' }}
        className="bg-card border border-border/60 rounded-3xl p-8 md:p-10 shadow-apple hover:shadow-apple-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]"
      >
        {/* Top Header */}
        <div className="flex justify-between items-start relative z-10 min-h-[110px]">
          <div>
            <motion.div
              layoutId="project-category-metalground"
              className="mb-4 inline-block"
            >
              <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                <span>あくまでも自由研究 / AIを用いた探究</span>
              </Badge>
            </motion.div>
            <motion.h3
              layoutId="project-title-metalground"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-orange-500 transition-colors"
            >
              MetalGround
            </motion.h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">「AIディレクション &amp; PM」に全振りした研究</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shrink-0">
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Abstract Minimalist Visual Preview representing MetalGround */}
        <div
          style={{ backgroundColor: '#F5F5F7' }}
          className="my-6 h-[140px] px-6 bg-secondary rounded-2xl border border-border/40 flex flex-col items-center justify-center relative overflow-hidden z-10"
        >
          {/* Subtle grid pattern / graphical nodes */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-muted-foreground">
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border border-border/40">
              <Bot size={20} className="text-[#10B981] mb-1" />
              <span className="text-[10px] font-mono">GPT-5.6-sol</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-border"></div>
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border-t-2 border-orange-500">
              <FileDigit size={20} className="text-orange-500 mb-1" />
              <span className="text-[10px] font-mono">External Memory</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-border"></div>
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border border-border/40">
              <Cpu size={20} className="text-[#F59E0B] mb-1" />
              <span className="text-[10px] font-mono">M3 Infer</span>
            </div>
          </div>
          <div className="absolute bottom-2 text-[9px] tracking-widest text-muted-foreground/60 uppercase font-mono flex items-center space-x-1">
            <BrainCircuit size={10} className="text-orange-500" />
            <span>AI Direction &amp; PM</span>
          </div>
        </div>

        {/* Bottom Subtext */}
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground leading-relaxed font-normal line-clamp-2">
            仮説思考検証などの美味しい部分は全てGPTに委ね、自身はVSCode実行の仲介役と「記憶の外部化＆ロードマップ管理」に全振り。全54実験・COCO 5000枚で精度劣化ゼロ（+0.0007 AP）を保ちつつ2.099 FPSを達成。
          </p>
          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-orange-500 font-medium">
            <span>R&amp;Dレポートを見る</span>
            <span>詳細確認 →</span>
          </div>
        </div>

        {/* Subtle hover gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      </motion.div>
    </Link>
  );
}
