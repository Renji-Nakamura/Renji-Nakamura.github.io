import { REPORT_META } from '@/data/reportData';
import DecryptedText from '@/components/DecryptedText';
import { Cpu, Zap, Target, GitCommit, ShieldCheck } from 'lucide-react';

export default function ReportHeader() {
  return (
    <div className="py-12 md:py-16 border-b border-border/80">
      {/* Category Tag */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-500 border border-orange-500/20">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block animate-pulse" />
          <span>Apple Silicon Systems &amp; Low-Level ML Research</span>
        </span>
        <span className="text-xs text-muted-foreground font-mono">
          Document Version 1.0 (Canonical Reference)
        </span>
      </div>

      {/* Main Title with Decrypted Animation */}
      <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-[1.15] mb-4">
        <DecryptedText duration={1300}>
          MetalGround: Systems &amp; Inference Optimization
        </DecryptedText>
      </h1>

      <p className="text-xl sm:text-2xl font-bold text-muted-foreground tracking-tight mb-8">
        {REPORT_META.title}
      </p>

      {/* Paper Metadata Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <div className="bg-card p-5 rounded-2xl border border-border/70 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
            <Cpu size={14} className="text-orange-500" />
            <span>Target Hardware</span>
          </div>
          <div className="text-sm font-bold text-foreground font-mono">
            {REPORT_META.targetHardware}
          </div>
          <p className="text-xs text-muted-foreground mt-1">Apple Silicon M3 Architecture</p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border/70 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
            <Zap size={14} className="text-orange-500" />
            <span>End-to-End Speedup</span>
          </div>
          <div className="text-sm font-bold text-foreground font-mono">
            {REPORT_META.speedup}
          </div>
          <p className="text-xs text-muted-foreground mt-1">999.12 ms → 476.36 ms (2.099 FPS)</p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border/70 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
            <Target size={14} className="text-[#10B981]" />
            <span>Accuracy Impact</span>
          </div>
          <div className="text-sm font-bold text-foreground font-mono text-[#10B981]">
            +0.00076 AP on COCO
          </div>
          <p className="text-xs text-muted-foreground mt-1">COCO 5000 Val ゼロ近似・完全同等</p>
        </div>

        <div className="bg-card p-5 rounded-2xl border border-border/70 shadow-sm">
          <div className="flex items-center space-x-2 text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-1.5">
            <GitCommit size={14} className="text-primary" />
            <span>Empirical Protocol</span>
          </div>
          <div className="text-sm font-bold text-foreground font-mono">
            {REPORT_META.totalExperiments} Experiments Logged
          </div>
          <p className="text-xs text-muted-foreground mt-1">事前登録・ペア検証・監査完備</p>
        </div>
      </div>

      {/* Author Bar & Executive Abstract */}
      <div className="p-6 rounded-2xl bg-secondary/80 border border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-border/60 gap-3 mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-foreground text-background font-bold flex items-center justify-center text-sm">
              RN
            </div>
            <div>
              <div className="font-bold text-sm text-foreground">{REPORT_META.author}</div>
              <div className="text-xs text-muted-foreground">{REPORT_META.affiliation}</div>
            </div>
          </div>
          <div className="inline-flex items-center space-x-2 text-xs font-medium text-muted-foreground font-mono">
            <ShieldCheck size={14} className="text-[#10B981]" />
            <span>Peer-grade Empirical Reproducibility</span>
          </div>
        </div>

        <div>
          <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Abstract / 概要
          </h2>
          <p className="text-sm text-foreground/90 leading-relaxed font-normal">
            本ドキュメントは、16GBユニファイドメモリのApple M3チップ搭載MacBook Proにおいて、
            最先端オープンボキャブラリ物体検出モデル「Grounding DINO Tiny（1.72億パラメータ）」を、
            量子化や重み刈り込みといった<strong>精度を落とす近似（Approximation）に一切頼らず</strong>、
            モデル計算構造とランタイムのApple Silicon特化のみによって <strong>2.08倍の推論高速化（999.12ms → 476.36ms）</strong> を達成した
            全54回に及ぶ実験プロトコルとシステム解析の全容を記録した公式技術報告書です。
          </p>
        </div>
      </div>
    </div>
  );
}
