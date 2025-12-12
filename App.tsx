import React, { useState, useCallback } from 'react';
import { QUESTIONS } from './constants';
import { LandingView } from './components/LandingView';
import { QuestionCard } from './components/QuestionCard';
import { ProgressBar } from './components/ProgressBar';
import { ResultsView } from './components/ResultsView';
import { generatePersonalityReport } from './services/geminiService';
import { MBTIScore, UserResponse } from './types';
import { BrainCircuit } from 'lucide-react';

type AppState = 'LANDING' | 'QUIZ' | 'RESULT';

const App: React.FC = () => {
  const [view, setView] = useState<AppState>('LANDING');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState<UserResponse[]>([]);
  const [finalResult, setFinalResult] = useState<{
    type: string;
    scores: MBTIScore;
    report: string;
  } | null>(null);

  const questions = QUESTIONS; 

  const handleStart = () => {
    setView('QUIZ');
    setCurrentQuestionIndex(0);
    setResponses([]);
  };

  const calculateResults = useCallback((finalResponses: UserResponse[]) => {
    // Scoring Logic:
    // A -> Adds to First Letter (E, S, T, J)
    // B -> Adds to Second Letter (I, N, F, P)
    const scores: MBTIScore = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
    
    finalResponses.forEach(res => {
      const q = questions.find(q => q.id === res.questionId);
      if (!q) return;

      const answer = res.answer;

      if (q.dimension === 'EI') {
        if (answer === 'A') scores.E++;
        else scores.I++;
      } else if (q.dimension === 'SN') {
        if (answer === 'A') scores.S++;
        else scores.N++;
      } else if (q.dimension === 'TF') {
        if (answer === 'A') scores.T++;
        else scores.F++;
      } else if (q.dimension === 'JP') {
        if (answer === 'A') scores.J++;
        else scores.P++;
      }
    });

    // Determine type
    const type = [
      scores.E >= scores.I ? 'E' : 'I',
      scores.S >= scores.N ? 'S' : 'N',
      scores.T >= scores.F ? 'T' : 'F',
      scores.J >= scores.P ? 'J' : 'P'
    ].join('');

    // Load local report synchronously
    const report = generatePersonalityReport(type, scores);

    setFinalResult({ type, scores, report });
    setView('RESULT');
  }, [questions]);

  const handleAnswer = (answer: 'A' | 'B') => {
    const newResponses = [...responses, { questionId: questions[currentQuestionIndex].id, answer }];
    setResponses(newResponses);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        window.scrollTo(0, 0);
        setCurrentQuestionIndex(prev => prev + 1);
      }, 200); 
    } else {
      // Finished - Calculate immediately
      calculateResults(newResponses);
    }
  };

  const handleRetake = () => {
    setView('LANDING');
    setFinalResult(null);
    setResponses([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans transition-colors duration-500">
      
      {/* Top Navigation / Brand */}
      {view !== 'LANDING' && (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50 h-16 flex items-center px-6 justify-between">
          <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-800">
            <BrainCircuit className="text-brand-600" />
            <span>MindMirror AI</span>
          </div>
          {view === 'QUIZ' && (
            <div className="text-sm font-medium text-gray-400">
               问题 {currentQuestionIndex + 1} / {questions.length}
            </div>
          )}
        </nav>
      )}

      <main className={`w-full min-h-screen ${view !== 'LANDING' ? 'pt-24' : ''}`}>
        
        {view === 'LANDING' && <LandingView onStart={handleStart} />}

        {view === 'QUIZ' && (
          <div className="max-w-4xl mx-auto px-6 flex flex-col items-center min-h-[60vh] justify-start pt-10">
            <ProgressBar current={currentQuestionIndex} total={questions.length} />
            <div className="w-full mt-4">
              <QuestionCard 
                question={questions[currentQuestionIndex]} 
                onAnswer={handleAnswer} 
              />
            </div>
          </div>
        )}

        {view === 'RESULT' && finalResult && (
           <ResultsView 
             type={finalResult.type}
             scores={finalResult.scores}
             report={finalResult.report}
             onRetake={handleRetake}
           />
        )}

      </main>
    </div>
  );
};

export default App;
