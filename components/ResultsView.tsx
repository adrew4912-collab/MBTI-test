import React from 'react';
import { MBTIScore } from '../types';
import ReactMarkdown from 'react-markdown';
import { motion } from 'framer-motion';
import { Share2, RotateCcw } from 'lucide-react';
import { PERSONALITY_REPORTS } from '../data/personalityReports';

interface ResultsViewProps {
  type: string;
  scores: MBTIScore;
  report: string;
  onRetake: () => void;
}

export const ResultsView: React.FC<ResultsViewProps> = ({ type, scores, onRetake }) => {
  
  // Synchronously find the report content
  const reportData = PERSONALITY_REPORTS.find(r => r.type === type);
  const content = reportData?.content || "## 报告生成失败\n\n未能找到对应的详细性格分析。";

  console.log(`ResultsView: Displaying report for ${type}. Found: ${!!reportData}`);

  // Prepare data for the chart
  const data = [
    { name: '能量来源', val1: scores.E, val2: scores.I, label1: '外倾 (E)', label2: '内倾 (I)' },
    { name: '信息获取', val1: scores.S, val2: scores.N, label1: '实感 (S)', label2: '直觉 (N)' },
    { name: '决策方式', val1: scores.T, val2: scores.F, label1: '理性 (T)', label2: '感性 (F)' },
    { name: '生活风格', val1: scores.J, val2: scores.P, label1: '判断 (J)', label2: '感知 (P)' },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 pb-12">
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12 pt-8"
      >
        <h2 className="text-xl text-gray-500 font-medium mb-2">你的性格类型是</h2>
        <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-600 to-purple-600 mb-6">
          {type}
        </h1>
        <div className="flex justify-center gap-4">
           <button 
             onClick={onRetake}
             className="flex items-center gap-2 px-6 py-2 rounded-full border border-gray-300 text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
           >
             <RotateCcw size={16} /> 重测
           </button>
           <button className="flex items-center gap-2 px-6 py-2 rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors shadow-lg shadow-brand-200">
             <Share2 size={16} /> 分享结果
           </button>
        </div>
      </motion.div>

      {/* Trait Breakdown Chart */}
      <motion.div 
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ delay: 0.3 }}
         className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 mb-10"
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-6 border-b pb-2">维度分析</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 px-4">
          {data.map((dim, idx) => {
             const total = dim.val1 + dim.val2;
             const p1 = Math.round((dim.val1 / total) * 100) || 0;
             const p2 = Math.round((dim.val2 / total) * 100) || 0;
             
             return (
               <div key={idx} className="flex flex-col">
                 <div className="flex justify-between items-center mb-2">
                    <span className="font-bold text-gray-700">{dim.name}</span>
                 </div>
                 
                 <div className="flex w-full items-center justify-between text-sm font-medium mb-2">
                   <span className={p1 >= p2 ? 'text-brand-600' : 'text-gray-400'}>{dim.label1} {p1}%</span>
                   <span className={p2 > p1 ? 'text-purple-600' : 'text-gray-400'}>{p2}% {dim.label2}</span>
                 </div>
                 
                 <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden flex relative">
                    <div className="h-full bg-brand-500 transition-all duration-1000" style={{ width: `${p1}%` }}></div>
                    <div className="h-full bg-purple-500 transition-all duration-1000" style={{ width: `${p2}%` }}></div>
                    {/* Divider line in middle */}
                    <div className="absolute top-0 left-1/2 w-0.5 h-full bg-white opacity-50 transform -translate-x-1/2"></div>
                 </div>
               </div>
             )
          })}
        </div>
      </motion.div>

      {/* Analysis Report */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100"
      >
        <div className="prose prose-indigo prose-lg max-w-none">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </motion.div>
    </div>
  );
};
