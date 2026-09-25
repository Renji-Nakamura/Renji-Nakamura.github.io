import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Sparkles, Code, FileText, ArrowRight, Layers, CheckCircle2, Github, Activity, Eye, PlayCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DecryptedText from '@/components/DecryptedText';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function AgentOpticsDeliverable() {
  const [activeCodeTab, setActiveCodeTab] = useState<'timeboxing' | 'realtime' | 'tasktree'>('timeboxing');

  const codeSnippets = {
    timeboxing: `// Time-Boxing: Vercelの60秒タイムアウトを回避する自律的離脱アルゴリズム
export async function POST(req: Request) {
  const startTime = Date.now();
  
  // スクレイピング処理のループ
  for (const source of dataSources) {
    for (const article of articles) {
      // 実行開始から35秒を超過した場合、強制終了を防ぐためループを自発的に脱出
      if (Date.now() - startTime > 35000) {
        console.warn('Time-box limit reached. Breaking loop safely.');
        break;
      }
      
      // AIを用いた重い要約処理の実行（Gemini 2.5 Flash）
      const summary = await callGeminiAPI(article.content);
      await saveArticle(summary);
    }
  }
  
  // タイムボックス離脱後、消費トークンを記録しエージェントをオフライン化
  await cleanupAgentStates();
  return NextResponse.json({ status: 'success' });
}`,

    realtime: `// Supabase Realtime: WebSocketを用いたフロントエンドの動的UI更新
useEffect(() => {
  // agentsテーブルの変更イベントをWebSocketでリアルタイム購読
  const channel = supabase
    .channel('public:agents')
    .on(
      'postgres_changes',
      { event: '*', schema: 'public', table: 'agents' },
      (payload) => {
        // バックエンドでのエージェント状態（online/offline）の変更を即座にUIへ反映
        setAgents((currentAgents) => {
          const index = currentAgents.findIndex(a => a.id === payload.new.id);
          if (index !== -1) {
            const newAgents = [...currentAgents];
            newAgents[index] = payload.new as Agent;
            return newAgents;
          }
          return [payload.new as Agent, ...currentAgents];
        });
      }
    )
    .subscribe();

  return () => { supabase.removeChannel(channel); };
}, [supabase]);`,

    tasktree: `// 階層化タスクツリー: parent_idを用いたエージェントの動的生成と同期
const getOrCreateAgent = async (name: string, model: string, parentId: string | null = null) => {
  // 親ID（parent_id）をキーとして、DB内の既存エージェントを検索
  let query = supabase.from('agents').select('*').eq('name', name);
  if (parentId) query = query.eq('parent_id', parentId);
  else query = query.is('parent_id', null);
  
  let { data: agent } = await query.single();

  if (!agent) {
    // 存在しない場合は新規作成（親子関係を持つ階層構造として登録）
    const payload: any = { name, model, status: 'online' };
    if (parentId) payload.parent_id = parentId;
    
    const { data: newAgent } = await supabase.from('agents')
      .insert([payload]).select().single();
    agent = newAgent;
  } else {
    // 既存の場合はステータスをonlineに更新
    await supabase.from('agents').update({ status: 'online' }).eq('id', agent.id);
  }
  return agent;
};`
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
            layoutId="project-category-agentoptics"
            className="mb-4 inline-block"
          >
            <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-agent inline-block" />
              <span>AI駆動開発 / 自律型エージェント</span>
            </Badge>
          </motion.div>
          <motion.h2 
            layoutId="project-title-agentoptics"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            <DecryptedText duration={1300} delay={150}>
              AgentOptics
            </DecryptedText>
          </motion.h2>
          <p className="text-lg text-muted-foreground font-normal leading-relaxed mb-8">
            自律型AIエージェントの動作やAPIコストをリアルタイムで監視・可視化する「オブザーバビリティ・プラットフォーム」。Vercelのサーバーレス環境特有の制限（タイムアウト）を自律的に回避する堅牢な実行ロジックを備え、技術記事を自動収集・要約する「ナレッジ・キュレーションエージェント」を第一弾の実証モデルとして内包しています。
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
                href="#" 
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
              <Layers className="text-agent" size={20} />
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
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">クライアント層</span>
                    <Eye size={18} className="text-[#3B82F6]" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Next.js Dashboard</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    バックエンドでのAIの推論プロセスを「Task Tree」として階層的にリアルタイム可視化。トークン消費量と推定コストを瞬時に監視。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-secondary px-3 py-2 rounded-lg text-[11px] font-mono text-foreground flex items-center justify-between">
                      <span>Supabase Realtime (WebSocket)</span>
                      <Activity size={12} className="text-[#3B82F6]" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-[#3B82F6] font-medium">
                  <span>UIの動的更新</span>
                  <ArrowRight size={12} className="ml-auto" />
                </div>
              </Card>

              {/* Layer 2: Cloud Database Automation */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-t-4 border-t-agent border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-agent uppercase tracking-wider">API・ロジック層</span>
                    <Server size={18} className="text-agent" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Serverless API Routes</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    インフラ保守ゼロ。Vercel上で高速動作するAPIルーターと、タイムアウトを回避する「タイムボクシング機構」の中枢。
                  </p>
                  <div className="space-y-1 text-xs font-mono text-muted-foreground">
                    <div className="p-1">⚙️ route: <span className="text-foreground font-bold">/api/scrape</span></div>
                    <div className="p-1">⚙️ logic: <span className="text-foreground font-bold">Time-Boxing (35s)</span></div>
                    <div className="p-1">⚙️ logic: <span className="text-foreground font-bold">Task Tree Manager</span></div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>Vercel Serverless Functions</span>
                  <PlayCircle size={12} className="text-foreground" />
                </div>
              </Card>

              {/* Layer 3: External Interop Services */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">永続化・外部API層</span>
                    <Database size={18} className="text-[#F59E0B]" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Supabase & Gemini API</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    pgvector対応のPostgreSQLで状態とログを永続化し、Gemini APIによる高速な要約処理を実行。
                  </p>
                  <div className="space-y-2">
                    <div className="border border-border p-2 rounded-lg flex items-center space-x-2">
                      <Database size={14} className="text-[#F59E0B] shrink-0" />
                      <div className="text-[11px]">
                        <span className="font-bold text-foreground block">PostgreSQL</span>
                        <span className="text-muted-foreground">agents, event_logs テーブル</span>
                      </div>
                    </div>
                    <div className="border border-border p-2 rounded-lg flex items-center space-x-2">
                      <Sparkles size={14} className="text-amber-500 shrink-0" />
                      <div className="text-[11px]">
                        <span className="font-bold text-foreground block">Gemini 2.5 Flash</span>
                        <span className="text-muted-foreground">LLM推論とトークン計測</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-[#F59E0B] font-medium">
                  <span>状態とナレッジの永続化</span>
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
            <Code className="text-agent" size={20} />
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
                {activeCodeTab === 'timeboxing' && 'src/app/api/scrape/route.ts'}
                {activeCodeTab === 'realtime' && 'src/components/Dashboard.tsx'}
                {activeCodeTab === 'tasktree' && 'src/sdk/agents.ts'}
              </span>
            </div>
            <pre className="p-6 overflow-x-auto text-xs font-mono text-[#F5F5F7] leading-relaxed selection:bg-agent selection:text-white">
              <code>{codeSnippets[activeCodeTab]}</code>
            </pre>
          </div>

          {/* Switcher Tabs Below the Code Window */}
          <div className="flex justify-start sm:justify-end">
            <Tabs 
              value={activeCodeTab} 
              onValueChange={(val) => {
                playTerminalBeep();
                setActiveCodeTab(val as 'timeboxing' | 'realtime' | 'tasktree');
              }}
            >
              <TabsList>
                <TabsTrigger value="timeboxing">
                  タイムボクシング機構
                </TabsTrigger>
                <TabsTrigger value="realtime">
                  リアルタイム購読
                </TabsTrigger>
                <TabsTrigger value="tasktree">
                  階層化エージェント
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Mandatory Area 3: System Logic Summary */}
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <FileText className="text-agent" size={20} />
            <h3 className="text-xl font-bold text-foreground">
              実装戦略の全体像とフェーズ解説
            </h3>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 space-y-8">
            <div>
              <span className="text-xs font-bold text-agent uppercase tracking-wider block mb-1">
                Phase 01: リアルタイム・オブザーバビリティの実現
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                バックエンドで動くAIモデルの状態（スクレイピング中、要約中など）をブラックボックス化させず、フロントエンドでリアルタイムに可視化します。バックエンドが処理を進行するたびにSupabaseへ細かく状態を保存し、フロントエンドがWebSocket経由でそれを購読してUIをアニメーション付きで即座に更新します。
              </p>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-agent uppercase tracking-wider block mb-1">
                Phase 02: インフラ管理ゼロへの完全移行
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                初期のPythonバックグラウンドワーカーを完全に廃止し、Next.js API Routes (Serverless) だけで完結させるインフラ保守ゼロのアーキテクチャへとリファクタリング。これによりVercelのインフラ上で高速に動作し、かつランニングコストを最小限に抑える設計を実現しました。
              </p>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-agent uppercase tracking-wider block mb-1">
                Phase 03: 堅牢なタイムアウト回避アルゴリズム
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                Vercel特有の「60秒強制タイムアウト」によるデータ欠損を防ぐため、バックエンド内部で実行開始からの時間を計測。35秒を超過した時点で自発的に処理を切り上げて安全に終了（オフライン化・ログ保存）する回避アルゴリズム（タイムボクシング機構）を構築し、エラーのない安定稼働を実現しています。
              </p>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-agent uppercase tracking-wider block mb-1">
                Phase 04: 階層化タスクツリーのデータモデリング
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                データベース上でエージェントに親子関係（parent_id）を持たせ、単一のタスクを「Knowledge Gatherer」→「RSS Scraper」→「Gemini Summarizer」のように孫請け構造に細分化。これにより、UI上の「タスクツリー」を動的かつ視覚的に美しく表現することが可能になりました。
              </p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);
}
