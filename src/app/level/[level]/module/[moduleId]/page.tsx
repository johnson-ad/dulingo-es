'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { a0Modules } from '@/data/a0-modules';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/store/useProgressStore';

export default function ModulePage() {
  const params = useParams();
  const router = useRouter();
  const level = params.level as string;
  const moduleId = parseInt(params.moduleId as string);
  const [currentLesson, setCurrentLesson] = useState(0);
  const [audioSpeed, setAudioSpeed] = useState(0.8); // Vitesse par défaut: 0.8x (lent)
  
  const module = a0Modules.find(m => m.id === moduleId);
  
  if (!module) {
    return (
      <main className="min-h-screen flex items-center justify-center p-4">
        <Card>
          <h2 className="text-2xl font-bold mb-4">Module introuvable</h2>
          <Link href={`/level/${level}`}>
            <Button>Retour aux modules</Button>
          </Link>
        </Card>
      </main>
    );
  }

  const lesson = module.lessons[currentLesson];
  const progress = ((currentLesson + 1) / module.lessons.length) * 100;

  const handleNext = () => {
    if (currentLesson < module.lessons.length - 1) {
      setCurrentLesson(prev => prev + 1);
    } else {
      router.push(`/level/${level}/module/${moduleId}/quiz`);
    }
  };

  const handlePrevious = () => {
    if (currentLesson > 0) {
      setCurrentLesson(prev => prev - 1);
    }
  };

  const playAudio = (text: string, lang: 'fr' | 'es') => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'fr' ? 'fr-FR' : 'es-ES';
      utterance.rate = audioSpeed;
      speechSynthesis.speak(utterance);
    }
  };

  const speedOptions = [
    { value: 0.5, label: '0.5x (Très lent)' },
    { value: 0.75, label: '0.75x (Lent)' },
    { value: 1, label: '1x (Normal)' },
    { value: 1.25, label: '1.25x (Rapide)' },
    { value: 1.5, label: '1.5x (Très rapide)' }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 relative overflow-hidden">
      {/* Decoration Background - Enhanced */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-primary/20 to-orange/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 30, repeat: Infinity }}
        />
        <motion.div 
          className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-secondary/20 to-primary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 35, repeat: Infinity }}
        />
        <div className="absolute top-1/3 left-1/3 w-64 h-64 bg-gradient-to-br from-orange/10 to-transparent rounded-full blur-2xl" />
      </div>

      {/* Header Premium - Enhanced */}
      <header className="bg-gradient-to-r from-primary via-orange to-secondary shadow-2xl sticky top-0 z-50 backdrop-blur-md border-b-4 border-secondary">
        <div className="container mx-auto px-4 py-4 relative z-10">
          <div className="flex items-center justify-between mb-3">
            <Link href={`/level/${level}`}>
              <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 hover:scale-105 transition-all font-bold backdrop-blur-sm border border-white/30">
                ← Retour
              </Button>
            </Link>
            <motion.div 
              className="glass backdrop-blur-xl px-5 py-2 rounded-full shadow-2xl border-2 border-white/40"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-sm font-black text-white drop-shadow-lg">
                {currentLesson + 1} / {module.lessons.length}
              </span>
            </motion.div>
          </div>
          <div className="h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm shadow-inner-lg">
            <motion.div
              className="h-full bg-gradient-to-r from-secondary via-secondary-light to-secondary shadow-glow-yellow relative overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          {/* Module Header - Enhanced Premium Design */}
          <Card variant="elevated" className="mb-6 relative overflow-hidden border-4 border-secondary/30">
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-primary/10 to-orange/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-secondary/10 to-primary/10 rounded-full blur-2xl" />
            
            <div className="flex items-center gap-6 mb-8 relative z-10">
              <motion.div 
                className="text-7xl md:text-8xl drop-shadow-2xl flex-shrink-0"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  repeatDelay: 2
                }}
              >
                {module.icon}
              </motion.div>
              <div className="flex-1">
                <h1 className="text-4xl md:text-5xl font-black gradient-text mb-3 drop-shadow-sm">
                  {module.title}
                </h1>
                <p className="text-lg md:text-xl text-text-light font-semibold">{module.description}</p>
              </div>
            </div>

            {/* Audio Speed Control - Enhanced Premium */}
            <div className="bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50 rounded-2xl p-6 shadow-xl border-2 border-orange-200/50 relative z-10">
              <div className="flex items-center gap-3 mb-5">
                <motion.div 
                  className="text-4xl"
                  animate={{ rotate: [0, -15, 15, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 1 }}
                >
                  🎚️
                </motion.div>
                <label className="text-xl font-black text-text">
                  Vitesse de lecture audio
                </label>
              </div>
              <div className="flex gap-3 flex-wrap">
                {speedOptions.map((option) => (
                  <motion.button
                    key={option.value}
                    onClick={() => setAudioSpeed(option.value)}
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all shadow-lg ${
                      audioSpeed === option.value
                        ? 'bg-gradient-to-r from-primary via-orange to-secondary text-white scale-105 ring-4 ring-secondary/50 shadow-glow-md'
                        : 'bg-white text-text hover:bg-gradient-to-r hover:from-orange-50 hover:to-yellow-50 border-2 border-gray-200 hover:border-orange-300 hover:shadow-xl'
                    }`}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Lesson Card - Enhanced */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentLesson}
            initial={{ opacity: 0, x: 100, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -100, scale: 0.95 }}
            transition={{ duration: 0.4, type: "spring" }}
          >
            <Card variant="elevated" className="mb-6 border-2 border-orange-200/50 overflow-hidden">
              {/* Spanish - En premier - Enhanced */}
              <div className="mb-8 pb-8 border-b-2 border-gradient-to-r from-primary via-orange to-secondary relative">
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-orange to-secondary" />
                
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="gradient" glow className="text-base px-4 py-2">
                    🇪🇸 ESPAÑOL
                  </Badge>
                  <motion.button
                    onClick={() => playAudio(lesson.es, 'es')}
                    whileHover={{ scale: 1.2, rotate: 15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-4xl hover:drop-shadow-lg transition-all active:scale-95 bg-gradient-to-br from-orange-100 to-red-100 p-3 rounded-full border-2 border-orange-300 shadow-lg hover:shadow-xl"
                    aria-label="Écouter en espagnol"
                  >
                    🔊
                  </motion.button>
                </div>
                
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-3xl md:text-4xl font-black gradient-text leading-relaxed"
                >
                  {lesson.es}
                </motion.p>
              </div>

              {/* French - En second - Enhanced */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <Badge variant="info" glow className="text-base px-4 py-2">
                    🇫🇷 FRANÇAIS
                  </Badge>
                  <motion.button
                    onClick={() => playAudio(lesson.fr, 'fr')}
                    whileHover={{ scale: 1.2, rotate: -15 }}
                    whileTap={{ scale: 0.9 }}
                    className="text-4xl hover:drop-shadow-lg transition-all active:scale-95 bg-gradient-to-br from-blue-100 to-indigo-100 p-3 rounded-full border-2 border-blue-300 shadow-lg hover:shadow-xl"
                    aria-label="Écouter en français"
                  >
                    🔊
                  </motion.button>
                </div>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl md:text-3xl font-bold text-text leading-relaxed"
                >
                  {lesson.fr}
                </motion.p>
              </div>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Navigation - Enhanced */}
        <div className="flex gap-4 mb-8">
          <Button
            onClick={handlePrevious}
            disabled={currentLesson === 0}
            variant="outline"
            className="flex-1 py-4"
            size="lg"
          >
            <span className="flex items-center justify-center gap-2">
              <motion.span
                animate={currentLesson > 0 ? { x: [-2, 0, -2] } : {}}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ←
              </motion.span>
              Précédent
            </span>
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 py-4"
            size="lg"
            variant="gradient"
          >
            <span className="flex items-center justify-center gap-2">
              {currentLesson === module.lessons.length - 1 ? '🎯 Passer au Quiz' : 'Suivant'}
              <motion.span
                animate={{ x: [0, 2, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </span>
          </Button>
        </div>

        {/* Tips - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card variant="gradient" className="border-2 border-info-200/50">
            <div className="flex gap-4 items-start">
              <motion.div 
                className="text-4xl flex-shrink-0"
                animate={{ 
                  rotate: [0, 10, -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                💡
              </motion.div>
              <div>
                <h4 className="font-black text-lg mb-2 text-text">
                  Astuce d'apprentissage
                </h4>
                <p className="text-text-light leading-relaxed">
                  Répétez à voix haute pour améliorer votre prononciation ! 
                  L'écoute active et la répétition sont les clés pour maîtriser une nouvelle langue.
                </p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </main>
  );
}
