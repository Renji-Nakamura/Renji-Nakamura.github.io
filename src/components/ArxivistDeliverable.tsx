import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  GitCompare,
  Server,
  Code,
  FileText,
  ArrowRight,
  Layers,
  CheckCircle2,
  Github,
  Activity,
  ShieldCheck,
  Search
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DecryptedText from '@/components/DecryptedText';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function ArxivistDeliverable() {
  const [activeCodeTab, setActiveCodeTab] = useState<'matching' | 'ratelimit' | 'cohort'>('matching');

  const codeSnippets = {
    matching: `# Matching v5.2 Decision Policy: 'Precision > Recall' 判定コア
# 偽陽性（FPR）を物理的にゼロに抑え込み、単なる言及・引用を実装と誤判定させない
class MatchingDecisionPolicy:
    def decide(
        self,
        relation_type: RelationType,
        confidence_score: float,
        evidences: List[Dict[str, Any]],
        context_signals: Dict[str, Any],
    ) -> Tuple[VerificationStatus, str]:
        # 1. 論文コレクション、教材リスト、エージェントツールは即座に除外（PENDING/UNKNOWN）
        if context_signals.get("is_collection_or_tool", False):
            return VerificationStatus.PENDING, "pending_collection_or_tool"

        # 2. 実装候補（Implementation Candidates）の厳格判定
        if relation_type in IMPLEMENTATION_RELATIONS:
            if relation_type == RelationType.OFFICIAL:
                has_official = context_signals.get("has_official_claim", False)
                is_author_match = context_signals.get("is_author_match", False)
                is_identity = context_signals.get("is_repo_identity_match", False)
                
                # 信頼度85%以上 かつ (公式明記 OR 著者一致かつリポジトリ主題合致)
                if confidence_score >= 0.85 and (has_official or (is_author_match and is_identity)):
                    return VerificationStatus.CONFIRMED, "auto_verified_strong_evidence"
                return VerificationStatus.PENDING, "pending_weak_official_evidence"

            if relation_type in (RelationType.REPRODUCTION, RelationType.UNOFFICIAL_IMPLEMENTATION):
                is_identity = context_signals.get("is_repo_identity_match", False)
                has_repro = context_signals.get("has_reproduction_claim", False)
                if confidence_score >= 0.85 and (is_identity or has_repro):
                    return VerificationStatus.CONFIRMED, "auto_verified_implementation_evidence"
                return VerificationStatus.PENDING, "pending_weak_implementation_evidence"

        # 3. Citation Only / Benchmark / Unknown は絶対にConfirmed実装に昇格させない
        return VerificationStatus.PENDING, "pending_unresolved_relation"`,

    ratelimit: `# GitHub Search API (30 req/min) 厳格トークンバケット遅延制御
# ＆ Semantic Scholar S2 によるハイブリッド外部ID直接紐付け
class GitHubRateLimitPolicy:
    def __init__(self, search_min_delay: float = 2.0):
        self.search_min_delay = search_min_delay  # 30req/min制限を物理的に破らない安全マージン
        self.last_search_time = 0.0

    def wait_for_search_slot(self):
        elapsed = time.time() - self.last_search_time
        if elapsed < self.search_min_delay:
            sleep_duration = self.search_min_delay - elapsed
            time.sleep(sleep_duration)
        self.last_search_time = time.time()

# クローラーは GitHub Search API だけに頼らず、
# Semantic Scholar Graph API の externalIds から直接 GitHub URL を取得して
# 検索クォータ消費を90%以上抑制するハイブリッド探索パイプラインを形成`,

    cohort: `# Right-Censoring（打ち切りバイアス）を完全排除したコホート実装率算出
# 直近公開されたばかりの論文を含めると実装率が不当に下がる統計的歪みを防ぐ
def compute_implementation_rates(
    db: Session,
    as_of: Optional[date] = None,
    cohort_days: List[int] = [30, 90, 180]
) -> List[CohortRateItem]:
    # Section 13.2: N日以前に投稿された論文のみを適格母数（EligiblePapers）とする
    # EligiblePapers(N, as_of) = { p | p.first_submitted_at <= as_of - N days }
    for n_days in cohort_days:
        cutoff_date = as_of - timedelta(days=n_days)
        eligible_query = select(func.count(Paper.id)).where(Paper.first_submitted_at <= cutoff_date)
        eligible_papers = db.scalar(eligible_query)

        # 実装タイムラグがN日以内に達成された論文数を計量
        # lag = (repo.created_at_gh - paper.first_submitted_at) <= N days
        # ※ 事前公開コードによる負のタイムラグ（Negative Lag）も代数的に正しく保持
        rate = implemented_papers / eligible_papers if eligible_papers > 0 else None`
  };

  return (
    <section 
      id="deliverable" 
      style={{ backgroundColor: '#ffffff' }}
      className="bg-background pt-4 pb-32 transition-colors"
    >
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        
        {/* Section Title Header */}
        <div className="max-w-3xl mb-20">
          <motion.div 
            layoutId="project-category-arxivist"
            className="mb-4 inline-block"
          >
            <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 inline-block animate-pulse" />
              <span>学術データ基盤 / OSS照合システム</span>
            </Badge>
          </motion.div>
          
          <motion.h2 
            layoutId="project-title-arxivist"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            <DecryptedText duration={1300} delay={150}>
              Project Arxivist
            </DecryptedText>
          </motion.h2>
          
          <p className="text-lg text-muted-foreground font-normal leading-relaxed mb-8">
            「この論文の理論は面白いが、実際に動くコードはあるのか？」。arXiv上のCS論文とGitHub上のOSS実装を自動探索・照合するデータ基盤プラットフォーム。GitHub Search API（30 req/min）やarXiv APIの厳格なレート制限下で、偽陽性ゼロ（Precision 100.0% / FPR 0.0%）を保証する判定エンジン、分散クローラー、および統計的バイアスを排除したコホート計量ダッシュボードを設計・本番検証しました。
          </p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center"
          >
            <Button
              asChild
              variant="dark"
              size="lg"
              className="rounded-full hover:scale-105 transition-all shadow-sm"
            >
              <a 
                href="https://github.com/Renji-Nakamura/Arxivist" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center space-x-2"
              >
                <Github size={18} />
                <span>GitHubリポジトリでソースコードを見る</span>
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Mandatory Areas Container with smooth entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.12 }}
        >
          {/* Mandatory Area 1: Architectural Diagram & System Preview */}
          <div className="mb-24">
            <div className="flex items-center space-x-2 mb-8">
              <Layers className="text-red-500" size={20} />
              <h3 className="text-xl font-bold text-foreground">
                システム構成とアーキテクチャマップ
              </h3>
            </div>

            {/* Interactive Topology Container */}
            <div className="bg-secondary p-8 md:p-12 rounded-3xl border border-border/60">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
                
                {/* Layer 1: Data Ingestion & State */}
                <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-border/60">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">収集・探索層</span>
                      <Search size={18} className="text-red-500" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">分散クローラー ＆ レート制御</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      GitHub Actions Cronで安全巡回。GitHub Search API（30 req/min）とSemantic Scholar S2 externalIdを併用し、クォータ消費を90%抑えるハイブリッド探索パイプライン。
                    </p>
                    <div className="space-y-2">
                      <div className="bg-secondary px-3 py-2 rounded-lg text-[11px] font-mono text-foreground flex items-center justify-between">
                        <span>Token Bucket (30 req/min)</span>
                        <Activity size={12} className="text-red-500" />
                      </div>
                      <div className="bg-secondary px-3 py-2 rounded-lg text-[11px] font-mono text-foreground flex items-center justify-between">
                        <span>arXiv API ＆ S2 Graph API</span>
                        <Database size={12} className="text-red-500" />
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-red-500 font-medium">
                    <span>API制限の物理的保護</span>
                    <ArrowRight size={12} className="ml-auto" />
                  </div>
                </Card>

                {/* Layer 2: Cloud Database Automation */}
                <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-t-4 border-t-red-500 border-border/60">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">判定・照合層</span>
                      <GitCompare size={18} className="text-red-500" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Matching Decision Policy v5.2</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      単なる引用やツール言及を排除し「真の実装」のみを抽出。リポジトリの主題合致を検証するEntity Identity判定により偽陽性ゼロを実現。
                    </p>
                    <div className="space-y-1 text-xs font-mono text-muted-foreground">
                      <div className="p-1">🎯 policy: <span className="text-foreground font-bold">Precision &gt; Recall (FPR 0.0%)</span></div>
                      <div className="p-1">🛡️ filter: <span className="text-foreground font-bold">Entity Identity &amp; BibTeX</span></div>
                      <div className="p-1">🔬 eval: <span className="text-foreground font-bold">Holdout 156ペア完全検証</span></div>
                    </div>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                    <span>Precision 100.0% 達成</span>
                    <ShieldCheck size={12} className="text-red-500" />
                  </div>
                </Card>

                {/* Layer 3: External Interop Services */}
                <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-border/60">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">永続化・計量層</span>
                      <Server size={18} className="text-[#3B82F6]" />
                    </div>
                    <h4 className="font-bold text-foreground mb-2">Neon PostgreSQL ＆ FastAPI</h4>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                      N+1クエリ解消により集計速度を90秒から20ミリ秒へ4,500倍高速化。直近公開の打ち切りバイアスを排除した30/90/180日コホート計量を実装。
                    </p>
                    <div className="space-y-2">
                      <div className="border border-border p-2 rounded-lg flex items-center space-x-2">
                        <Database size={14} className="text-[#3B82F6] shrink-0" />
                        <div className="text-[11px]">
                          <span className="font-bold text-foreground block">PostgreSQL (Neon)</span>
                          <span className="text-muted-foreground">N+1クエリ解消（90s → 20ms）</span>
                        </div>
                      </div>
                      <div className="border border-border p-2 rounded-lg flex items-center space-x-2">
                        <Activity size={14} className="text-emerald-500 shrink-0" />
                        <div className="text-[11px]">
                          <span className="font-bold text-foreground block">Cohort Implementation Rate</span>
                          <span className="text-muted-foreground">Right-Censoring Free 計量数理</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-emerald-500 font-medium">
                    <span>全230テスト完走 (CI合格)</span>
                    <CheckCircle2 size={12} className="ml-auto" />
                  </div>
                </Card>

                {/* Background ambient linking paths for larger screens */}
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border/60 hidden lg:block z-0 transform -translate-y-1/2"></div>
              </div>
            </div>
          </div>

          {/* Mandatory Area 2: Source Code Breakdown */}
          <div className="mb-24">
            <div className="flex items-center space-x-2 mb-8">
              <Code className="text-red-500" size={20} />
              <h3 className="text-xl font-bold text-foreground">
                ソースコードとロジック構造の解剖
              </h3>
            </div>

            {/* Code Viewer Floating Wrapper */}
            <div className="bg-[#1D1D1F] rounded-2xl overflow-hidden shadow-apple-hover mb-6">
              <div className="bg-[#2D2D2F] px-4 py-2.5 flex items-center justify-between border-b border-[#3D3D3F]">
                <div className="flex items-center space-x-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]"></div>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">
                  {activeCodeTab === 'matching' && 'crawler/src/matching/engine.py'}
                  {activeCodeTab === 'ratelimit' && 'crawler/src/github/rate_limiter.py'}
                  {activeCodeTab === 'cohort' && 'backend/app/analytics/cohort.py'}
                </span>
              </div>
              <pre className="p-6 overflow-x-auto text-xs font-mono text-[#F5F5F7] leading-relaxed selection:bg-red-500 selection:text-white">
                <code>{codeSnippets[activeCodeTab]}</code>
              </pre>
            </div>

            {/* Switcher Tabs Below the Code Window */}
            <div className="flex justify-start sm:justify-end">
              <Tabs 
                value={activeCodeTab} 
                onValueChange={(val) => {
                  playTerminalBeep();
                  setActiveCodeTab(val as 'matching' | 'ratelimit' | 'cohort');
                }}
              >
                <TabsList>
                  <TabsTrigger value="matching">
                    偽陽性ゼロ判定コア (v5.2)
                  </TabsTrigger>
                  <TabsTrigger value="ratelimit">
                    30req/min レート制御
                  </TabsTrigger>
                  <TabsTrigger value="cohort">
                    コホート計量数理
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>

          {/* Mandatory Area 3: System Logic Summary */}
          <div>
            <div className="flex items-center space-x-2 mb-8">
              <FileText className="text-red-500" size={20} />
              <h3 className="text-xl font-bold text-foreground">
                データフローと実装戦略の全体像
              </h3>
            </div>

            <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 space-y-8">
              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                  Phase 01: 構想とAPI調査 — PwCの統合発見とSemantic Scholarへの即時転換
                </span>
                <p className="text-sm text-foreground leading-relaxed font-normal">
                  当初はPapers with Code (PwC) APIを主軸にする計画でしたが、調査過程でPwCがHugging Faceに統合されAPI提供が不安定化していることを早期に検知。即座にアーキテクチャを見直し、Semantic Scholar Graph API（externalIds）を直接引き当ててクォータ消費を90%以上抑制する堅牢なハイブリッド探索パイプラインへ再設計しました。
                </p>
              </div>

              <Separator />

              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                  Phase 02: AI多軸レビュー — RenderスリープとAPI制限の特定、クローラー完全分離
                </span>
                <p className="text-sm text-foreground leading-relaxed font-normal">
                  Gemini 3.1 ProおよびGPTによる多角的なアーキテクチャ検証を実施。Render無料枠の750時間制限（自己Pingによる枯渇リスク）やGitHub Search APIの30 req/min制限を物理的に回避するため、Webコンテナ内の常駐スケジューラを完全廃止。クローラーをGitHub Actions Cronへと完全分離し、49KBに及ぶ要件定義v5を確定・凍結（Freeze）しました。
                </p>
              </div>

              <Separator />

              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                  Phase 03: 偽陽性ゼロ（FPR 0.0%）の達成 — PMC-LLaMA誤検知克服とホールドアウト検証
                </span>
                <p className="text-sm text-foreground leading-relaxed font-normal">
                  初期アルゴリズムでは「LLaMA論文」に対して派生下流モデルである「PMC-LLaMA」が公式実装として誤判定される課題に直面。リポジトリの主題が論文そのものかを判定する「Entity Identity」と「BibTeX Precedence」を導入し、完全隔離されたFresh Holdout 12論文（156ペア）においてPrecision 100.0%（7/7正解）、False Positive 0件（0/149）を実証しました。
                </p>
              </div>

              <Separator />

              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                  Phase 04: N+1クエリ解消とコホート計量数理 — 90秒から20ミリ秒への最適化
                </span>
                <p className="text-sm text-foreground leading-relaxed font-normal">
                  FastAPIバックエンドにおいて、27カテゴリ×各指標の集計で発生していた243クエリのN+1問題を単一SQL集計へと最適化し、レスポンス時間を90秒から20ミリ秒へ4,500倍高速化。さらに「直近公開されたばかりの論文」を含めると実装率が不当に低く算出される時間経過バイアス（Right-Censoring）を数理的に排除し、事前公開コードによる負のタイムラグ（Negative Lag）も正しく保持するコホート分析エンジンを確立しました。
                </p>
              </div>

              <Separator />

              <div>
                <span className="text-xs font-bold text-red-500 uppercase tracking-wider block mb-1">
                  Phase 05: 本番稼働とarXiv 429到達 — 安全停止プロトコルとデータ破壊ゼロの保証
                </span>
                <p className="text-sm text-foreground leading-relaxed font-normal">
                  Neon（PostgreSQL）＋Render（FastAPI）＋Vercel（React）＋GitHub Actions Cronの本番環境を構築。直近24ヶ月分の超大規模バックフィル実行時にarXiv側からHTTP 429制限が返された際、週次7日間の安全セグメント分割とロールバック機構により、データ破壊・不整合ゼロで即座に安全待機させる運用プロトコルを確立。全230テスト（Crawler 139 / Backend 61 / Frontend 30）のCI通過を達成しました。
                </p>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
