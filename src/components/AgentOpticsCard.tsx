import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Server, Eye, Database, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AgentOpticsCard() {
  return (
    <Link to="/project/agentoptics" className="block group cursor-pointer outline-none h-full">
      <motion.div
        layoutId="project-card-agentoptics"
        style={{ backgroundColor: '#ffffff' }}
        className="bg-card border border-border/60 rounded-3xl p-8 md:p-10 shadow-apple hover:shadow-apple-hover transition-all duration-300 relative overflow-hidden flex flex-col justify-between h-full min-h-[420px]"
      >
        {/* Top Header */}
        <div className="flex justify-between items-start relative z-10 min-h-[110px]">
          <div>
            <motion.div
              layoutId="project-category-agentoptics"
              className="mb-4 inline-block"
            >
              <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
                <span className="w-1.5 h-1.5 rounded-full bg-agent inline-block" />
                <span>2年次AI駆動開発 / 自律型エージェント</span>
              </Badge>
            </motion.div>
            <motion.h3
              layoutId="project-title-agentoptics"
              className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground group-hover:text-agent transition-colors"
            >
              AgentOptics
            </motion.h3>
            <p className="text-sm text-muted-foreground font-medium mt-1">エージェント監視プラットフォーム</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:bg-agent group-hover:text-white transition-all duration-300 shrink-0">
            <ArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </div>
        </div>

        {/* Abstract Minimalist Visual Preview representing AgentOptics */}
        <div 
          style={{ backgroundColor: '#F5F5F7' }}
          className="my-6 h-[140px] px-6 bg-secondary rounded-2xl border border-border/40 flex flex-col items-center justify-center relative overflow-hidden z-10"
        >
          {/* Subtle grid pattern / graphical nodes */}
          <div className="flex items-center space-x-3 sm:space-x-6 text-muted-foreground">
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border border-border/40">
              <Eye size={20} className="text-[#3B82F6] mb-1" />
              <span className="text-[10px] font-mono">Live UI</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-border"></div>
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border-t-2 border-agent">
              <Server size={20} className="text-agent mb-1" />
              <span className="text-[10px] font-mono">Serverless</span>
            </div>
            <div className="h-px w-4 sm:w-8 bg-border"></div>
            <div className="flex flex-col items-center bg-card p-3 rounded-xl shadow-sm border border-border/40">
              <Database size={20} className="text-[#F59E0B] mb-1" />
              <span className="text-[10px] font-mono">Realtime DB</span>
            </div>
          </div>
          <div className="absolute bottom-2 text-[9px] tracking-widest text-muted-foreground/60 uppercase font-mono flex items-center space-x-1">
            <Activity size={10} className="text-agent" />
            <span>Observability Topology</span>
          </div>
        </div>

        {/* Bottom Subtext */}
        <div className="relative z-10">
          <p className="text-sm text-muted-foreground leading-relaxed font-normal line-clamp-2">
            自律型AIエージェントの動作やコストを監視。Vercelタイムアウトを回避する自律的タイムボクシング機構とWebSocketによるリアルタイムUI更新を統合。
          </p>
          <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs text-agent font-medium">
            <span>システムアーキテクチャの詳細を見る</span>
            <span>シームレス展開 →</span>
          </div>
        </div>

        {/* Subtle hover gradient wash */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-agent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
      </motion.div>
    </Link>
  );
}
