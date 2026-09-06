import React from 'react';
import { Sparkles, Network, Database } from 'lucide-react';

export default function Interests() {
  const stacks = [
    {
      icon: Sparkles,
      title: "画像認識と深層学習",
      description: "CNNを中心としたアルゴリズムの探求",
      details: "畳み込みニューラルネットワーク（CNN）の基礎を学び、画像認識モデルの構造や推論メカニズムについての理解を深めています。"
    },
    {
      icon: Network,
      title: "AIの社会実装",
      description: "実社会の課題解決を見据えた技術応用",
      details: "開発したAI技術が実際のワークフローや社会システムにどのように組み込まれ、実用的な価値を生み出すのかに強い関心を持っています。"
    },
    {
      icon: Database,
      title: "理論と実践の接続",
      description: "実データに基づくモデル検証と改善",
      details: "学習した理論と実際のデータとの間に生じるギャップに目を向け、継続的な検証とコード設計を通じてより確かなロジックを構築することを目指しています。"
    }
  ];

  return (
    <section id="stack" className="bg-[#F5F5F7] py-32 border-y border-[#E3E3E8]/60 transition-colors">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <div className="max-w-3xl mb-20">
          <h2 className="text-xs font-semibold tracking-widest text-[#86868B] uppercase mb-3 tracking-[0.2em]">
            現在の学習・探求テーマ
          </h2>
          <p className="text-3xl sm:text-4xl font-bold tracking-tight text-[#1D1D1F]">
            主な関心領域
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {stacks.map((stack, idx) => {
            const IconComponent = stack.icon;
            return (
              <div 
                key={idx} 
                className="bg-white p-10 rounded-2xl shadow-apple hover:shadow-apple-hover transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  {/* Floating Minimal Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-[#F5F5F7] flex items-center justify-center text-[#1D1D1F] mb-8 group-hover:bg-[#0071E3] group-hover:text-white transition-all duration-300">
                    <IconComponent size={22} strokeWidth={1.8} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#1D1D1F] mb-3">
                    {stack.title}
                  </h3>
                  
                  <p className="text-sm font-semibold text-[#0071E3] mb-4">
                    {stack.description}
                  </p>
                  
                  <p className="text-sm text-[#86868B] leading-relaxed font-normal">
                    {stack.details}
                  </p>
                </div>

                <div className="pt-8 mt-8 border-t border-[#F5F5F7]">
                  <span className="text-[11px] font-medium tracking-wider text-[#D2D2D7] uppercase">
                    関心領域 0{idx + 1}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
