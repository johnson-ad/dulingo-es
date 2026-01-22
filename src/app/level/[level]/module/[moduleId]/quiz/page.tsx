'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { a0Modules } from '@/data/a0-modules';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useProgressStore } from '@/store/useProgressStore';

export default function QuizPage() {
  const params = useParams();
  const router = useRouter();
  const level = params.level as string;
  const moduleId = parseInt(params.moduleId as string);
  const { completeModule, addXP, addBadge } = useProgressStore();
  
  const module = a0Modules.find(m => m.id === moduleId);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  if (!module) return null;

  // Generate quiz questions from lessons
  const questions = module.lessons.slice(0, 10).map((lesson, index) => {
    const isTranslateToSpanish = Math.random() > 0.5;
    const correctAnswer = isTranslateToSpanish ? lesson.es : lesson.fr;
    
    // Generate wrong answers from other lessons
    const wrongAnswers = module.lessons
      .filter((_, i) => i !== index)
      .slice(0, 3)
      .map(l => isTranslateToSpanish ? l.es : l.fr);
    
    const options = [correctAnswer, ...wrongAnswers].sort(() => Math.random() - 0.5);
    
    return {
      question: isTranslateToSpanish ? lesson.fr : lesson.es,
      questionLang: isTranslateToSpanish ? 'Traduisez en espagnol' : 'Traduisez en français',
      options,
      correctAnswer,
    };
  });

  const question = questions[currentQuestion];

  const handleAnswer = (answer: string) => {
    setSelectedAnswer(answer);
    const correct = answer === question.correctAnswer;
    setIsCorrect(correct);
    setShowResult(true);
    
    if (correct) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      finishQuiz();
    }
  };

  const finishQuiz = () => {
    const percentage = (score / questions.length) * 100;
    completeModule(moduleId, percentage);
    addXP(score * 10);
    
    if (percentage === 100) {
      addBadge(`perfect-${moduleId}`);
    }
    
    setQuizCompleted(true);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPerfect = percentage === 100;
    const isPassing = percentage >= 70;

    return (
      <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
        {/* Celebration Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {isPerfect && [...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-4xl"
              initial={{ 
                top: '50%', 
                left: '50%',
                opacity: 1,
                scale: 0
              }}
              animate={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                opacity: 0,
                scale: 1,
                rotate: Math.random() * 360
              }}
              transition={{
                duration: 2,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              {['🎉', '⭐', '🏆', '✨', '🎊'][Math.floor(Math.random() * 5)]}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: "spring", damping: 15 }}
          className="w-full max-w-lg relative z-10"
        >
          <Card variant="elevated" className="text-center relative overflow-hidden border-4 border-secondary/30">
            {/* Decorative gradient overlay */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/5 to-transparent" />
            
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: 'spring', damping: 10 }}
              className="text-9xl mb-6 relative z-10"
            >
              {isPerfect ? '🏆' : isPassing ? '🎉' : '💪'}
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl font-black mb-4 gradient-text"
            >
              {isPerfect ? '¡Perfecto! 🌟' : isPassing ? '¡Muy Bien!' : '¡Ánimo!'}
            </motion.h2>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.4, type: "spring" }}
              className="mb-6"
            >
              <div className="inline-block bg-gradient-to-r from-primary via-orange to-secondary p-1 rounded-3xl shadow-2xl">
                <div className="bg-white rounded-3xl px-8 py-6">
                  <div className="text-7xl font-black gradient-text mb-2">
                    {percentage}%
                  </div>
                  <div className="text-text-light font-semibold">
                    Score obtenu
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-xl text-text-light mb-4 font-semibold"
            >
              {score} / {questions.length} réponses correctes
            </motion.p>
            
            {isPerfect && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="bg-gradient-to-r from-secondary-100 to-secondary-200 p-5 rounded-2xl mb-6 border-2 border-secondary shadow-glow-yellow"
              >
                <motion.div 
                  className="text-5xl mb-2"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  🏅
                </motion.div>
                <div className="text-lg font-black text-secondary-900">Badge Parfait débloqué !</div>
                <div className="text-sm text-secondary-800">Score parfait atteint</div>
              </motion.div>
            )}
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <Badge variant="gradient" glow className="text-lg px-6 py-2">
                ⚡ +{score * 10} XP gagnés
              </Badge>
            </motion.div>
            
            <motion.div 
              className="flex gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              {!isPassing && (
                <Button
                  onClick={() => window.location.reload()}
                  variant="outline"
                  className="flex-1"
                  size="lg"
                >
                  🔄 Réessayer
                </Button>
              )}
              <Link href={`/level/${level}`} className={!isPassing ? 'flex-1' : 'w-full'}>
                <Button className="w-full" size="lg" variant="gradient">
                  {isPassing ? '🎯 Continuer l\'aventure' : 'Retour'}
                </Button>
              </Link>
            </motion.div>
          </Card>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-primary/10 to-orange/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], x: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-10 left-10 w-80 h-80 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.3, 1], x: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity }}
        />
      </div>

      {/* Header - Enhanced */}
      <header className="bg-gradient-to-r from-primary via-orange to-secondary text-white shadow-2xl sticky top-0 z-50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-20" />
        
        <div className="container mx-auto px-4 py-5 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="text-3xl"
              >
                🎯
              </motion.div>
              <h1 className="text-xl md:text-2xl font-black drop-shadow-lg">Quiz - {module.title}</h1>
            </div>
            <motion.div
              className="glass backdrop-blur-xl px-4 py-2 rounded-full shadow-xl border-2 border-white/40"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-black drop-shadow-lg">
                {currentQuestion + 1} / {questions.length}
              </span>
            </motion.div>
          </div>
          <div className="h-4 bg-white/20 rounded-full overflow-hidden shadow-inner-lg backdrop-blur-sm">
            <motion.div
              className="h-full bg-gradient-to-r from-success via-success-light to-green-400 relative overflow-hidden shadow-lg"
              animate={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Quiz */}
      <div className="container mx-auto px-4 py-8 max-w-3xl relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <Card variant="elevated" className="mb-6 border-2 border-orange-200/50">
              <Badge variant="info" glow className="mb-4 text-sm px-4 py-2">
                {question.questionLang}
              </Badge>
              
              <h2 className="text-3xl md:text-4xl font-black text-text mb-8 leading-relaxed">
                {question.question}
              </h2>

              <div className="space-y-4">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === option;
                  const isCorrectAnswer = option === question.correctAnswer;
                  const showCorrect = showResult && isCorrectAnswer;
                  const showWrong = showResult && isSelected && !isCorrect;

                  return (
                    <motion.button
                      key={index}
                      onClick={() => !showResult && handleAnswer(option)}
                      disabled={showResult}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`w-full p-5 rounded-2xl border-3 text-left transition-all shadow-lg ${
                        showCorrect
                          ? 'border-success bg-gradient-to-r from-success-100 to-success-50 text-success-dark shadow-xl scale-105'
                          : showWrong
                          ? 'border-error bg-gradient-to-r from-error-100 to-error-50 text-error-dark'
                          : isSelected
                          ? 'border-primary bg-gradient-to-r from-primary-50 to-orange-50 shadow-premium'
                          : 'border-gray-200 hover:border-primary hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 bg-white'
                      } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer hover:shadow-xl'}`}
                      whileHover={!showResult ? { scale: 1.02, y: -2 } : {}}
                      whileTap={!showResult ? { scale: 0.98 } : {}}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-lg">{option}</span>
                        {showCorrect && (
                          <motion.span 
                            className="text-4xl"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring" }}
                          >
                            ✓
                          </motion.span>
                        )}
                        {showWrong && (
                          <motion.span 
                            className="text-4xl"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring" }}
                          >
                            ✗
                          </motion.span>
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </Card>

            {showResult && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ type: "spring" }}
              >
                <Card 
                  variant="elevated" 
                  className={`mb-6 border-3 ${
                    isCorrect 
                      ? 'bg-gradient-to-r from-success-50 to-success-100/50 border-success shadow-xl' 
                      : 'bg-gradient-to-r from-error-50 to-error-100/50 border-error'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <motion.div 
                      className="text-6xl flex-shrink-0"
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5 }}
                    >
                      {isCorrect ? '🎉' : '💡'}
                    </motion.div>
                    <div className="flex-1">
                      <div className="font-black text-2xl mb-2">
                        {isCorrect ? '¡Correcto!' : '¡Casi!'}
                      </div>
                      {!isCorrect && (
                        <div className="text-base text-text-light">
                          La bonne réponse était : <strong className="text-text">{question.correctAnswer}</strong>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>

                <Button onClick={handleNext} className="w-full" size="lg" variant="gradient">
                  <span className="flex items-center justify-center gap-2">
                    {currentQuestion === questions.length - 1 ? '🏁 Voir les résultats' : 'Question suivante'}
                    <motion.span
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    >
                      →
                    </motion.span>
                  </span>
                </Button>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
