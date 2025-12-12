import React from 'react';
import { Question } from '../types';
import { motion } from 'framer-motion';

interface QuestionCardProps {
  question: Question;
  onAnswer: (value: 'A' | 'B') => void;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, onAnswer }) => {
  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl w-full mx-auto border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-gray-800 text-center mb-10 leading-relaxed">
        {question.text}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => onAnswer('A')}
          className="group relative flex flex-col items-center justify-center p-8 h-full rounded-xl border-2 border-gray-100 hover:border-brand-500 hover:bg-brand-50 transition-all duration-300 text-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center group-hover:bg-brand-500 group-hover:text-white transition-colors">
            A
          </div>
          <span className="text-lg text-gray-700 font-medium group-hover:text-brand-700">
            {question.optionA}
          </span>
        </button>

        <button
          onClick={() => onAnswer('B')}
          className="group relative flex flex-col items-center justify-center p-8 h-full rounded-xl border-2 border-gray-100 hover:border-purple-500 hover:bg-purple-50 transition-all duration-300 text-center gap-4"
        >
          <div className="w-10 h-10 rounded-full bg-gray-100 text-gray-500 font-bold flex items-center justify-center group-hover:bg-purple-500 group-hover:text-white transition-colors">
            B
          </div>
          <span className="text-lg text-gray-700 font-medium group-hover:text-purple-700">
            {question.optionB}
          </span>
        </button>
      </div>
    </motion.div>
  );
};
