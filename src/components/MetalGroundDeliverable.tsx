import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Terminal,
  BrainCircuit,
  FileCode2,
  ArrowRight,
  Layers,
  CheckCircle2,
  BookOpen,
  Activity,
  Cpu,
  Gauge,
  ExternalLink,
  ShieldCheck,
  Zap,
  HardDriveDownload,
  GitCommit
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DecryptedText from '@/components/DecryptedText';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function MetalGroundDeliverable() {
  const [activeCodeTab, setActiveCodeTab] = useState<'coco' | 'profile' | 'roadmap'>('coco');

  const codeSnippets = {
    coco: `# Experiment 0052 — COCO val2017 全5000画像でのGround-truth精度評価
## 精度検証サマリー（「全容とシステム解析の軌跡」第9章より）
- Dataset: COCO val2017 (全5000画像 / 1200x901 固定Webcamジオメトリ)
- Original Hugging Face (PyTorch MPS): 47.97026520 AP
- MetalGround Exact 最適化版:         47.97103061 AP
- 差分 (Delta):                      +0.00076541 AP points
  └─ 事前登録された許容マージン (0.10 AP) のわずか 0.765% に収束

## 各指標の内訳
- AP50: -0.00202349  | AP75: +0.00095117  | AR small: -0.07574952
- 最大変動カテゴリ: tennis racket (+0.0933 AP), elephant (-0.0254 AP)
- 結論: 量子化・枝刈り・近似に一切妥協せず、精度劣化ゼロ（完全保存）を数学的に証明。`,

    profile: `// Stage-Level Latency Decomposition on Apple M3 (「全容とシステム解析の軌跡」第3章)
// Forward Median: 999.12 ms (PyTorch MPS Baseline) -> 476.36 ms (Exact Mode)

[階層的プロファイリング結果]
Grounding DINO encoder: 743.69 ms (全体の約74.4%) <-- 最大のボトルネック
  ├── Vision-language fusion (6層): 180.00 ms (各 29-31 ms)
  └── Deformable layer (6層):       554.00 ms (各 91-94 ms)
        └── MSDA ラッパー全体 (12個): 465.37 ms (46.6%)
              └── MSDA サンプリングコア: 408.25 ms (40.9%)
                    ├── エンコーダ側 (6個): 384.30 ms (各 63-65 ms)
                    └── デコーダ側 (6個):   23.95 ms (各 3.5-4.8 ms)

Swin / image backbone: 164.65 ms (約16.5%)
Grounding DINO decoder: 71.88 ms (約7.2%)
BERT text backbone:     11.41 ms (約1.1%)`,

    roadmap: `# MetalGround Master Roadmap: Alignment State Machine
# （「全容とシステム解析の軌跡」全12章の体系的マイルストーン）

[Phase 01: Baseline Calibration (Exp 0001〜0002)] -> COMPLETED
- CPU 2205.66 ms (0.45 FPS) / MPS 999.12 ms (1.00 FPS) ベースライン確立

[Phase 02: Profiling & Bottleneck Isolation (Exp 0003〜0005)] -> COMPLETED
- エンコーダ(74.4%)およびMSDAサンプリングコア(40.9%)を真因と特定

[Phase 03: Metal MSDA Kernel & Algebraic Specialization (Exp 0006〜0015)] -> COMPLETED
- Metal MSDA v0 (単体13.26倍高速化) & Fusion代数結合 (1.75倍高速化)

[Phase 04: Island Compilation & Synchronization Bug Fix (Exp 0016〜0042)] -> COMPLETED
- DLPackゼロコピー非同期データ競合を解明・修正。486.58 ms (2.055 FPS) 達成

[Phase 05: Swin MLP & COCO 5000 Full Proof (Exp 0043〜0052)] -> COMPLETED
- 476.36 ms (2.099 FPS) 達成。COCO 5000枚で +0.00076 AP差の完全一致を証明

[Phase 06: Native Ingress & Temporal Amortization (Exp 0053〜0054)] -> ACTIVE
- Pillow互換22-bit固定小数点GPUリサイズ (11.4倍) & ゼロコピーMTLStorageModeShared確立`
  };

  return (
    <section
      id="deliverable"
      style={{ backgroundColor: '#ffffff' }}
      className="bg-background pt-4 pb-32 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">

        {/* Section Title Header */}
        <div className="max-w-4xl mb-16">
          <motion.div
            layoutId="project-category-metalground"
            className="mb-4 inline-block"
          >
            <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
              <span>あくまでも自由研究 / AIを用いた探究 &amp; Apple Silicon Metal</span>
            </Badge>
          </motion.div>

          <motion.h2
            layoutId="project-title-metalground"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            <DecryptedText duration={1400} delay={150}>
              MetalGround: Autonomous R&amp;D Framework
            </DecryptedText>
          </motion.h2>

          <p className="text-lg text-muted-foreground font-normal leading-relaxed mb-6">
            自身の立ち位置を<strong className="text-foreground font-semibold">「AIのディレクションとプロジェクトマネジメント」に全振り</strong>し、仮説思考や検証・アルゴリズム設計といった自由研究の最もコアで美味しい部分は全て<strong className="text-foreground font-semibold">GPT-5.6-sol</strong>に委ねた新世代の研究アプローチです。
            自身は「GPTのコードをVSCodeで実行し、出力JSONやエラーログをチャット欄に返す仲介役」に徹しながら、<strong className="text-foreground font-semibold">「コンテキスト溢れによる圧縮・精度低下を防ぐために実験の都度ジャーナルをつけさせて記憶を外部ファイルに記録する仕組み」</strong>を設計して守らせ、さらに<strong className="text-foreground font-semibold">「軸ブレしないよう要所でロードマップやこれまでの流れを確認・記録させる仕組み」</strong>を徹底。82回以上の実験イテレーションを通じて、Apple M3上の Grounding DINO 推論をベースライン比2倍以上（476.36 ms / 2.099 FPS）へと高速化させました。
          </p>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3">
            <Button
              asChild
              variant="dark"
              size="lg"
              className="rounded-full hover:scale-105 transition-all shadow-sm"
            >
              <a
                href="https://renji-nakamura.github.io/metalground-docs/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2"
              >
                <BookOpen size={18} />
                <span>完全版のレポートを閲覧する</span>
                <ExternalLink size={14} className="ml-1 opacity-70" />
              </a>
            </Button>

            <div className="flex items-center space-x-2 text-xs font-mono text-muted-foreground bg-secondary px-4 py-2.5 rounded-full border border-border/60">
              <GitCommit size={14} className="text-orange-500" />
              <span>全54実験体系（Exp 0001〜0054）完走</span>
            </div>
          </div>
        </div>

        {/* Highlight Key Metrics Dashboard with MFP Decrypt */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-20">
          <Card className="p-6 rounded-2xl bg-secondary/50 border-border/60 flex flex-col justify-between">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>実証実験体系</span>
              <Activity size={16} className="text-orange-500" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono tracking-tight">
                <DecryptedText triggerOnView duration={900}>
                  54+
                </DecryptedText>
              </div>
              <p className="text-xs text-muted-foreground mt-1">全12章・約3.9万字に及ぶ解析の軌跡</p>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-secondary/50 border-border/60 flex flex-col justify-between">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>COCO 5000枚 精度検証</span>
              <HardDriveDownload size={16} className="text-emerald-500" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono tracking-tight">
                <DecryptedText triggerOnView duration={1200} delay={100}>
                  +0.0007
                </DecryptedText>
              </div>
              <p className="text-xs text-muted-foreground mt-1">47.970 → 47.971 AP（精度妥協ゼロを実証）</p>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-secondary/50 border-border/60 flex flex-col justify-between">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>M3 推論速度向上</span>
              <Zap size={16} className="text-amber-500" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono tracking-tight">
                <DecryptedText triggerOnView duration={1000} delay={200}>
                  2.10x
                </DecryptedText>
              </div>
              <p className="text-xs text-muted-foreground mt-1">MPS初期値 1.00 FPS → 2.10 FPS (476ms)</p>
            </div>
          </Card>

          <Card className="p-6 rounded-2xl bg-secondary/50 border-border/60 flex flex-col justify-between">
            <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>主要ボトルネック特定</span>
              <Gauge size={16} className="text-orange-500" />
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-extrabold text-foreground font-mono tracking-tight">
                <DecryptedText triggerOnView duration={1000} delay={300}>
                  41.3%
                </DecryptedText>
              </div>
              <p className="text-xs text-muted-foreground mt-1">推論全体の4割を占めるMSDA層を単離</p>
            </div>
          </Card>
        </div>

        {/* Section 1: Architecture of Human-AI Intermediary Collaboration */}
        <div className="mb-24">
          <div className="flex items-center space-x-2 mb-8">
            <Layers className="text-orange-500" size={20} />
            <h3 className="text-xl font-bold text-foreground">
              人間とAIの役割分担アーキテクチャ（プロキシ協調モデル）
            </h3>
          </div>

          <div className="bg-secondary p-8 md:p-12 rounded-3xl border border-border/60">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">

              {/* Layer 1: AI Direction & Project Management (Human) */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-t-4 border-t-primary border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">AIディレクション &amp; PM</span>
                    <Terminal size={18} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">自身（ディレクション・PM・仲介役）</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    自身の立ち位置を「AIのディレクションとプロジェクトマネジメント」に全振り。コンテキスト溢れによる精度低下を防ぐ「実験ジャーナル外部記録」と「ロードマップ確認」の仕組みを考えてGPTに守らせ、自身はVSCode実行と出力JSON/エラー中継の仲介役に徹した。
                  </p>
                  <div className="space-y-1.5 text-xs font-mono bg-secondary p-3 rounded-xl border border-border/40">
                    <div className="text-foreground">📝 記憶の外部ジャーナル化を考案・厳守</div>
                    <div className="text-foreground">🗺️ ロードマップ確認による軸ブレ防止</div>
                    <div className="text-foreground">⚡️ VSCode実行 &amp; 出力JSON・エラー中継</div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-primary font-medium">
                  <span>ディレクションとPMに全専念</span>
                  <ArrowRight size={12} className="ml-auto" />
                </div>
              </Card>

              {/* Layer 2: Autonomous Reasoning Core (GPT-5.6-sol) */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-t-4 border-t-orange-500 border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">仮説思考・検証の自律遂行</span>
                    <BrainCircuit size={18} className="text-orange-500" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">GPT-5.6-sol (主任研究員)</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    仮説立案、プロファイリング設計、最適化コード実装、ボトルネック特定など、自由研究の「美味しいコア部分」を全て担当。人間が敷いた記憶外部化とロードマップの枠組みの中で、思考の劣化や脱線を起こさず82回の改善サイクルを自律完遂。
                  </p>
                  <div className="space-y-1.5 text-xs font-mono bg-secondary p-3 rounded-xl border border-border/40">
                    <div className="text-foreground">🧠 課題設定 &amp; 仮説思考の自律立案</div>
                    <div className="text-foreground">🔬 最適化コード &amp; カーネルの生成</div>
                    <div className="text-foreground">📊 定量メトリクスに基づく自己判定</div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-orange-500 font-medium">
                  <span>美味しい思考・検証プロセスの完全駆動</span>
                  <ArrowRight size={12} className="ml-auto" />
                </div>
              </Card>

              {/* Layer 3: External Memory & Synchronous Log */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">外部記憶シナプス</span>
                    <FileCode2 size={18} className="text-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">システム解析の軌跡 &amp; ロードマップ</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    全12章・約2万字に及ぶ完全版技術解説文書（MetalGround: 全容とシステム解析の軌跡）と外部ジャーナル。実験ごとの詳細推論とロードマップをチャット外部に分離・永続化することで、LLM特有のコンテキスト忘却や目的の漂流（Drift）を物理的に完全遮断。
                  </p>
                  <div className="space-y-1.5 text-xs font-mono text-muted-foreground bg-secondary p-3 rounded-xl border border-border/40">
                    <div>📑 全54実験の完全解析（全12章）</div>
                    <div>🎯 COCO 5000枚の精度完全保持</div>
                    <div>🛡️ Exact Mode（近似・量子化妥協ゼロ）</div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-muted-foreground font-medium">
                  <span>記憶の外部化と科学的妥当性の担保</span>
                  <CheckCircle2 size={12} className="ml-auto text-emerald-500" />
                </div>
              </Card>

              {/* Ambient link line */}
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/60 hidden lg:block z-0 transform -translate-y-1/2"></div>
            </div>
          </div>
        </div>

        {/* Section 2: Code Viewer & Methodology Breakdown */}
        <div className="mb-24">
          <div className="flex items-center space-x-2 mb-8">
            <Cpu className="text-orange-500" size={20} />
            <h3 className="text-xl font-bold text-foreground">
              研究実証コードとプロファイリング解剖
            </h3>
          </div>

          <div className="bg-[#1D1D1F] rounded-2xl overflow-hidden shadow-apple-hover mb-6">
            <div className="bg-[#2D2D2F] px-4 py-2.5 flex items-center justify-between border-b border-[#3D3D3F]">
              <div className="flex items-center space-x-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
              </div>
              <span className="text-[11px] font-mono text-muted-foreground">
                {activeCodeTab === 'coco' && 'coco_val2017_accuracy_proof.md (Exp 0052)'}
                {activeCodeTab === 'profile' && 'stage_level_breakdown_m3.log (Exp 0003)'}
                {activeCodeTab === 'roadmap' && 'system_analysis_roadmap.md (全12章)'}
              </span>
            </div>
            <pre className="p-6 overflow-x-auto text-xs font-mono text-[#F5F5F7] leading-relaxed selection:bg-orange-500 selection:text-white">
              <code>{codeSnippets[activeCodeTab]}</code>
            </pre>
          </div>

          {/* Switcher Tabs Below the Code Window */}
          <div className="flex justify-start sm:justify-end">
            <Tabs 
              value={activeCodeTab} 
              onValueChange={(val) => {
                playTerminalBeep();
                setActiveCodeTab(val as 'coco' | 'profile' | 'roadmap');
              }}
            >
              <TabsList>
                <TabsTrigger value="coco">
                  COCO 5000枚 精度検証
                </TabsTrigger>
                <TabsTrigger value="profile">
                  レイヤ別実測プロファイル
                </TabsTrigger>
                <TabsTrigger value="roadmap">
                  ロードマップ全12章
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Section 3: R&D Report - Phase Breakdown */}
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <ShieldCheck className="text-orange-500" size={20} />
            <h3 className="text-xl font-bold text-foreground">
              研究プロセスの妥当性を担保する4つのフェーズ
            </h3>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 space-y-8">
            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">
                Phase 01: 再現性の厳格な固定とゼロ次ベースライン計測
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal mb-3">
                あてずっぽうな最適化を防ぐため、最初期に標準入力画像（SHA-256: <code className="bg-secondary px-1.5 py-0.5 rounded text-xs font-mono">f056b63a...</code>、1200x901）とプロンプト、PyTorch MPS環境を厳密に固定。PyTorch CPU（<strong className="font-semibold">0.4534 FPS</strong>）およびMPS（<strong className="font-semibold">1.0009 FPS / 999 ms</strong>）の信頼できるベースライン数値を確立しました。
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                <span>入力テンソル確定: [1, 3, 800, 1065] / テキストトークン長: 8</span>
              </div>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">
                Phase 02: ボトルネックの単離（Multimodal Encoder &amp; MSDA）
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal mb-3">
                推論全体のレイテンシをステージ単位で計測。画像I/Oやデコーダではなく、<strong className="font-semibold">推論時間の約75%（約749 ms）がマルチモーダルエンコーダに集中</strong>していることを特定。さらにそのうちの半分以上（推論全体の約<strong className="font-semibold">41.3%</strong>）が<strong className="font-semibold">Multi-Scale Deformable Attention (MSDA)</strong>のバイリニアサンプリングコアに起因することを実測データから証明しました。
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                <span>最大オペレータ・ボトルネック: MSDA Sampling Core (289.1 ms)</span>
              </div>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">
                Phase 03: 「記憶の外部ジャーナル化」と「ロードマップ管理」によるコンテキスト溢れの根絶
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal mb-3">
                LLMが長時間の自律推論で直面する最大の壁は「コンテキスト窓の溢れ・圧縮による過去の定量記憶の喪失と精度低下」です。自身がディレクションとして<strong className="font-semibold">「実験の都度ジャーナルをつけさせて記憶を外部ファイルに記録・定量化させる仕組み」</strong>を設計してGPTに守らせました。さらに長期検証で軸ブレしないよう<strong className="font-semibold">「要所でロードマップ（やること・今までの流れ）を確認させて外部ファイルに記録させる」</strong>PMを徹底。自身はVSCodeでのコード実行とエラー中継の仲介役に徹することで、自由研究の最も美味しいコア部分（仮説思考と検証）をGPTが最大限に発揮できる環境を構築しました。
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" />
                <span>完全なステート保持: 全54実験・約3.9万文字（全12章）にわたる論理的一貫性を維持</span>
              </div>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider block mb-1">
                Phase 04: Exact最適化の達成（476.36 ms / 2.099 FPS）とCOCO 5000枚での精度完全保持
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal mb-3">
                特定されたボトルネックに対してテンソル配置・代数結合・Swin MLP置換を実施し、<strong className="font-semibold">476.360 ms / 2.099 FPS</strong>（MPSベースライン比2.10倍）を達成。さらにCOCO val2017全5000枚の厳格な評価において、オリジナル47.970 APに対し<strong className="font-semibold">47.971 AP（差分わずか+0.00076 AP points）</strong>で完全な精度保持を実証しました。また、Pillow互換の22-bit固定小数点GPUリサイズカーネル（CPU比11.4倍）やMTLStorageModeSharedによる0.75 µsゼロコピーブリッジを確立。純粋なExact最適化の限界を見極めたことで、次なる「Temporal Amortization（約2 Hz推論 + 30 Hzトラッキング）」への科学的論拠を打ち立てました。
              </p>
              <div className="flex items-center space-x-2 text-xs text-muted-foreground font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500 inline-block" />
                <span>実測値: 476.360 ms / 2.099 FPS ＆ COCO 5000枚 +0.000765 AP差（精度劣化ゼロ）</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-20 bg-secondary/80 border border-border/80 rounded-3xl p-8 md:p-12 text-center max-w-3xl mx-auto">
          <Badge variant="outline" className="mb-4 bg-background">
            研究論文・システム解析レポート公開中
          </Badge>
          <h3 className="text-2xl font-bold text-foreground mb-3">
            全12章・約2万文字の完全版レポート「MetalGround 全容とシステム解析の軌跡」
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-xl mx-auto">
            当ポートフォリオでは要点と妥当性の根拠数値を端的に要約しています。AIがどのような推論・検証プロセスを経てボトルネックを絞り込み、COCO 5000枚で精度劣化ゼロ（+0.0007 AP）を証明しつつ高速化したかの全記録（全12章）は外部レポートにてご覧いただけます。
          </p>
          <Button
            asChild
            variant="dark"
            size="lg"
            className="rounded-full shadow-apple hover:scale-105 transition-all"
          >
            <a
              href="https://renji-nakamura.github.io/metalground-docs/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2"
            >
              <BookOpen size={18} />
              <span>完全版レポート（全容とシステム解析の軌跡）を見る</span>
              <ExternalLink size={14} className="ml-1 opacity-70" />
            </a>
          </Button>
        </div>

      </div>
    </section>
  );
}
