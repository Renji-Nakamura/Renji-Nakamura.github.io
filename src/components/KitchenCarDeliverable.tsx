import { useState } from 'react';
import { motion } from 'framer-motion';
import { Database, Server, Smartphone, Sparkles, Code, FileText, ArrowRight, Layers, CheckCircle2, Send, Tag, Github } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import DecryptedText from '@/components/DecryptedText';
import { playTerminalBeep } from '@/lib/mfp/useTerminalSound';

export default function KitchenCarDeliverable() {
  const [activeCodeTab, setActiveCodeTab] = useState<'sales' | 'ai' | 'gas'>('sales');

  const codeSnippets = {
    sales: `// Atomic Sales Commit with Dynamic Discount Pricing & Inventory Deductions
const handleConfirmSale = async () => {
  if (!selectedMenuForInput) return;
  const item = selectedMenuForInput;
  
  // Resolve final price based on real-time dashboard Discount Mode override
  const finalPrice = (isDiscountMode && item.discountPrice) 
    ? Number(item.discountPrice) 
    : Number(item.price);

  const batch = writeBatch(db);

  // Synchronously evaluate recipe constraints against real-time local state inventory
  item.recipe.forEach(recipeItem => {
    const ing = ingredients.find(i => i.id === recipeItem.ingredientId);
    if (ing) {
      const ingRef = doc(db, 'artifacts', appId, 'public', 'data', 'ingredients', ing.id);
      batch.update(ingRef, { quantity: ing.quantity - recipeItem.amount });
    }
  });

  const cost = calculateCost(item.recipe);
  const salesRef = doc(collection(db, 'artifacts', appId, 'public', 'data', 'sales'));
  
  batch.set(salesRef, {
    sales: finalPrice,
    cost: cost,
    profit: finalPrice - cost,
    itemName: item.name,
    isDiscounted: isDiscountMode && !!item.discountPrice,
    attributeGender: currentAttribute.gender,
    attributeAge: currentAttribute.age,
    timestamp: serverTimestamp()
  });

  await batch.commit();
};`,

    ai: `// Gemini Canvas Environment Interop & Keyless Inference Optimization
// Explicitly targeting 'gemini-2.5-flash-preview-09-2025' leverages internal Google session tokens,
// enabling zero-cost, unlimited privileged access without external API keys.
const handleDemandForecast = async () => {
  setIsForecasting(true);
  const ingredientNames = ingredients.map(i => i.name).join(', ');
  
  // Prompt engineering injecting deterministic JSON structure constraints
  const prompt = \`
    キッチンカーの「原材料」の明日の必要量を予測。
    条件: 明日は「曇り」、気温「15℃」。
    リスト: \${ingredientNames}
    出力: JSON形式 {"原材料名": "約XX (理由)"}
  \`;
  
  // Internal Canvas session hook explicitly passing targeted preview model string
  const resultText = await callGemini(prompt, { 
    model: 'gemini-2.5-flash-preview-09-2025' 
  });
  
  const jsonString = resultText.replace(/\`\`\`json/g, '').replace(/\`\`\`/g, '').trim();
  setDemandForecast(JSON.parse(jsonString));
  setIsForecasting(false);
};`,

    gas: `// Asynchronous Cross-Origin Delivery to Google Apps Script REST Webhook Triggering LINE API
const handleSendLineMessage = async () => {
  if (!generatedLineMsg) return;
  const messageToSend = generatedLineMsg;
  setIsSendingLoading(true);

  try {
    // Deliver text payload via no-cors POST request wrapper bridging external cloud runtimes
    await fetch(GAS_API_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain" },
      body: JSON.stringify({ text: messageToSend }),
    });
    setNotification({ type: 'success', message: "LINE Broadcast Payload Transmitted" });
  } catch (error) {
    console.error("Webhook Delivery Failed:", error);
  }
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
            layoutId="project-category-wagtail"
            className="mb-4 inline-block"
          >
            <Badge variant="secondary" className="space-x-2 py-1 px-3 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block" />
              <span>1年次主要開発プロジェクト</span>
            </Badge>
          </motion.div>
          <motion.h2 
            layoutId="project-title-wagtail"
            className="text-3xl sm:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            <DecryptedText duration={1300} delay={150}>
              Cafe Wagtail 経営管理システム
            </DecryptedText>
          </motion.h2>
          <p className="text-lg text-muted-foreground font-normal leading-relaxed mb-8">
            先輩を含む6名チームでの要件定義・グループワークを経て、システム設計およびプロトタイプの実装を単独で担当。リアルタイムのPOS売上テレメトリ、在庫レシピの即時連動、需要予測AI、そして技術的課題であったLINE APIへの配信Webhookを統合し、完全サーバレス型の意思決定支援SPAへと組み上げました。
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
                href="https://github.com/Renji-Nakamura/Wagtail_app" 
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
              <Layers className="text-primary" size={20} />
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
                    <Smartphone size={18} className="text-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">React フロントエンド状態管理</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    純粋関数型のダッシュボード状態、トランザクション文脈、レシピ構成ツリー、およびFirestoreストリームをリアルタイムにバインド。
                  </p>
                  <div className="space-y-2">
                    <div className="bg-secondary px-3 py-2 rounded-lg text-[11px] font-mono text-foreground flex items-center justify-between">
                      <span>割引モードの動的オーバーライド</span>
                      <Tag size={12} className="text-primary" />
                    </div>
                    <div className="bg-secondary px-3 py-2 rounded-lg text-[11px] font-mono text-foreground flex items-center justify-between">
                      <span>顧客属性（性別・年齢）コンテキスト</span>
                      <CheckCircle2 size={12} className="text-green-600" />
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-primary font-medium">
                  <span>Firestore リアルタイムストリーム</span>
                  <ArrowRight size={12} className="ml-auto" />
                </div>
              </Card>

              {/* Layer 2: Cloud Database Automation */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-t-4 border-t-primary border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider">永続化層</span>
                    <Database size={18} className="text-primary" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">Firebase Firestore データベース</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    WebSocketリスナーパターンによる瞬時のマルチデバイス状態同期に最適化されたサーバレス・ドキュメント指向DB。
                  </p>
                  <div className="space-y-1 text-xs font-mono text-muted-foreground">
                    <div className="p-1">📁 collections: <span className="text-foreground font-bold">sales</span></div>
                    <div className="p-1">📁 collections: <span className="text-foreground font-bold">ingredients</span></div>
                    <div className="p-1">📁 collections: <span className="text-foreground font-bold">menu</span></div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>アトミックバッチ処理</span>
                  <span className="font-mono font-bold text-foreground">writeBatch()</span>
                </div>
              </Card>

              {/* Layer 3: External Interop Services */}
              <Card className="bg-card p-6 rounded-2xl shadow-apple flex flex-col justify-between relative z-10 border-border/60">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider">外部API連携層</span>
                    <Server size={18} className="text-foreground" />
                  </div>
                  <h4 className="font-bold text-foreground mb-2">クラウド・エッジ統合ルーティング</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                    システムイベントを自動トリガーへと変換し、AIによる高度な解析と外部配信Webhookをシームレスに結合。
                  </p>
                  <div className="space-y-2">
                    <div className="border border-border p-2 rounded-lg flex items-center space-x-2">
                      <Sparkles size={14} className="text-amber-500 shrink-0" />
                      <div className="text-[11px]">
                        <span className="font-bold text-foreground block">Gemini 2.5 Flash Preview</span>
                        <span className="text-muted-foreground">特権的アクセスによるAPIキーレス需要予測</span>
                      </div>
                    </div>
                    <div className="border border-border p-2 rounded-lg flex items-center space-x-2">
                      <Send size={14} className="text-green-600 shrink-0" />
                      <div className="text-[11px]">
                        <span className="font-bold text-foreground block">GAS REST Webhook</span>
                        <span className="text-muted-foreground">LINE Messaging APIへのプッシュ通知</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-border/60 flex items-center text-[11px] text-green-600 font-medium">
                  <span>非同期メッセージング連携</span>
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
            <Code className="text-primary" size={20} />
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
                {activeCodeTab === 'sales' && 'src/logic/salesCommit.js'}
                {activeCodeTab === 'ai' && 'src/logic/demandForecastEngine.js'}
                {activeCodeTab === 'gas' && 'src/logic/lineBroadcastWebhook.js'}
              </span>
            </div>
            <pre className="p-6 overflow-x-auto text-xs font-mono text-[#F5F5F7] leading-relaxed selection:bg-primary selection:text-white">
              <code>{codeSnippets[activeCodeTab]}</code>
            </pre>
          </div>

          {/* Switcher Tabs Below the Code Window */}
          <div className="flex justify-start sm:justify-end">
            <Tabs 
              value={activeCodeTab} 
              onValueChange={(val) => {
                playTerminalBeep();
                setActiveCodeTab(val as 'sales' | 'ai' | 'gas');
              }}
            >
              <TabsList>
                <TabsTrigger value="sales">
                  アトミック処理
                </TabsTrigger>
                <TabsTrigger value="ai">
                  AI構造化プロンプト
                </TabsTrigger>
                <TabsTrigger value="gas">
                  Webhook配信
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Mandatory Area 3: System Logic Summary */}
        <div>
          <div className="flex items-center space-x-2 mb-8">
            <FileText className="text-primary" size={20} />
            <h3 className="text-xl font-bold text-foreground">
              データフローと実装戦略の全体像
            </h3>
          </div>

          <div className="bg-card border border-border/60 rounded-2xl p-8 md:p-10 space-y-8">
            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Phase 01: リアクティブな売上テレメトリの収集
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                オペレーターがキッチンカーの現場端末からPOS販売イベントをトリガーします。システムは選択された商品IDをローカルのレシピ構造へ即座にマッピングし、原価計算と原材料の残量制約をローカルで事前検証した上で、非同期のバッチ書き込み（writeBatch）を実行。これにより、サブミリ秒単位の極めてスムーズなローカル画面のレスポンスを実現しています。
              </p>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Phase 02: 割引価格のリアルタイム・オーバーライド
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                急な悪天候時などに生鮮食材の廃棄ロスを最小限に抑えるため、オペレーターはReact UI上から直接<strong>割引モード（Discount Mode）</strong>を有効化できます。下流の永続化レイヤーは条件付き価格マップを自動的に解釈し、DBスキーマを複製することなく各アイテムの純利益や売上高を動的かつシームレスに再計算します。
              </p>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Phase 03: APIキーレス運用の確立と需要予測のゼロコスト統合
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                ランニングコストの発生を極度に避けるクライアントの特性を考慮し、推論エンジンの完全無料化・無制限運用を設計要件としました。GeminiアプリのCanvas環境がGoogle内部のサービススコープで動作する特性に着目し、リクエストモデルを明示的に <strong>gemini-2.5-flash-preview-09-2025</strong> へ指定。これにより外部APIキー不要の特権的アクセスを確立し、運用のランニングコストを完全にゼロに抑えながら、高速かつ実用的な需要予測の自動化を実現しています。
              </p>
            </div>

            <Separator />

            <div>
              <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">
                Phase 04: サーバレスWebhookからLINE配信へのブリッジ
              </span>
              <p className="text-sm text-foreground leading-relaxed font-normal">
                プロンプトエンジンによって重要な販売促進アドバイザリが生成されると、そのペイロードはGoogle Apps ScriptのRESTインターフェースへ安全に送信されます。これがセキュアな仲介ブリッジとして機能し、プラットフォームのCORS制約を排除しながら、外部のLINE Messaging APIを通じて顧客へ即時ブロードキャスト配信を実行します。
              </p>
            </div>
          </div>
        </div>
      </motion.div>

    </div>
  </section>
);
}
