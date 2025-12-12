import React from 'react';
import { ArrowRight, BrainCircuit, Sparkles, Target, Info } from 'lucide-react';

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-50">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-brand-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-10 right-10 w-64 h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-64 h-64 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="text-center max-w-4xl z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white shadow-sm border border-gray-100 text-sm font-medium text-brand-600 mb-8">
          <Sparkles size={16} />
          <span>AI 驱动的深度人格解析</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
          探索你的 <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600">真实自我</span>
        </h1>
        
        <p className="text-xl text-gray-600 mb-8 leading-relaxed max-w-2xl mx-auto">
          MindMirror AI 结合经典心理学理论与先进生成式 AI，
          为你提供最详尽的职业与情感洞察。
        </p>

        {/* Instructions Box */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-6 md:p-8 text-left border border-gray-200 shadow-sm max-w-3xl mx-auto mb-10">
          <div className="flex items-center gap-2 mb-4 text-brand-700 font-semibold">
             <Info size={20} />
             <span>测试前请阅读 (注意事项)</span>
          </div>
          <ul className="space-y-3 text-sm md:text-base text-gray-600 list-disc list-inside">
            <li><strong>长期常态：</strong>答题时请以“长期自然状态”为准，避免受当下情绪、压力或特定场景影响。</li>
            <li><strong>诚实作答：</strong>无需追求“理想自我”，MBTI 是自我认知工具，而非能力评判标准。</li>
            <li><strong>直觉优先：</strong>若某题纠结（建议不超过5题），请优先选择第一反应的选项，过度思考可能降低准确性。</li>
            <li><strong>专业量表：</strong>本题库基于中国 MBTI-G 量表修订，信效度符合心理测量学标准，适用于自我探索与规划。</li>
          </ul>
        </div>

        <button 
          onClick={onStart}
          className="group relative inline-flex items-center justify-center px-10 py-5 text-xl font-bold text-white transition-all duration-200 bg-brand-600 font-pj rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-600 hover:bg-brand-700 hover:shadow-xl hover:-translate-y-1"
        >
          开始测试
          <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 w-full max-w-5xl">
        {[
          { icon: BrainCircuit, title: "深度分析", desc: "超越简单的四个字母，提供 AI 驱动的深度见解。" },
          { icon: Target, title: "职业指南", desc: "根据你的认知风格量身定制的可行建议。" },
          { icon: Sparkles, title: "关系建议", desc: "深入理解相容性与沟通模式。" }
        ].map((feature, idx) => (
          <div key={idx} className="bg-white/60 backdrop-blur-sm p-6 rounded-xl border border-white/50 shadow-sm text-center">
             <feature.icon className="w-10 h-10 mx-auto text-brand-600 mb-4" />
             <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
             <p className="text-gray-600 text-sm">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
