'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { a0Modules } from '@/data/a0-modules';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Progress } from '@/components/ui/Progress';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/store/useProgressStore';

export default function LevelPage() {
  const params = useParams();
  const level = params.level as string;
  const { completedModules } = useProgressStore();

  // For now, only A0 is implemented
  const modules = level === 'a0' ? a0Modules : [];

  const completedCount = modules.filter(m => 
    completedModules.includes(m.id)
  ).length;

  return (
    <main className="min-h-screen pb-20 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-primary/15 to-blue/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-purple/15 to-secondary/15 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, -50, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-br from-coral/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header */}
      <header className="relative bg-gradient-to-br from-primary via-blue to-purple text-white shadow-soft-2xl">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-4 py-10 md:py-12 relative z-10">
          <Link href="/">
            <Button variant="ghost" size="sm" className="text-white hover:bg-white/20 mb-8 backdrop-blur-sm border-2 border-white/40 rounded-full">
              ← Retour à l'accueil
            </Button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
              <motion.div
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.05, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="text-7xl md:text-8xl"
              >
                {level === 'a0' ? '🌟' : '🚧'}
              </motion.div>
              <div className="flex-1">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black mb-3 drop-shadow-lg">
                  Niveau {level.toUpperCase()}
                </h1>
                <p className="text-xl md:text-2xl opacity-95 font-bold">
                  {level === 'a0' ? '🎯 Débutant Absolu - Vos premiers pas en espagnol' : '⏳ À venir...'}
                </p>
              </div>
            </div>
            
            <div className="glass backdrop-blur-xl rounded-3xl p-6 md:p-8 border-2 border-white/40 shadow-soft-xl max-w-3xl">
              <div className="flex items-center justify-between mb-4">
                <span className="font-black text-xl md:text-2xl">Progression du niveau</span>
                <motion.span 
                  className="text-3xl md:text-4xl"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  {completedCount === modules.length && modules.length > 0 ? '🏆' : '📚'}
                </motion.span>
              </div>
              <Progress 
                value={completedCount} 
                max={modules.length || 1}
                color="gradient"
                size="xl"
                animated
              />
            </div>
          </motion.div>
        </div>
      </header>

      {/* Modules */}
      <div className="container mx-auto px-4 py-12 md:py-16 relative z-10">
        {modules.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", stiffness: 120 }}
          >
            <Card variant="colorful" className="text-center max-w-3xl mx-auto">
              <motion.div 
                className="text-9xl mb-8"
                animate={{ 
                  rotate: [0, -10, 10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                🚧
              </motion.div>
              <h2 className="text-4xl md:text-5xl font-black mb-5 gradient-text">
                Contenu en préparation
              </h2>
              <p className="text-text text-lg md:text-xl mb-8 leading-relaxed font-medium">
                Ce niveau sera bientôt disponible ! Nous travaillons dur pour vous offrir 
                le meilleur contenu d'apprentissage possible. 🚀
              </p>
              <Link href="/">
                <Button size="lg" variant="gradient">
                  ← Retour à l'accueil
                </Button>
              </Link>
            </Card>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-black mb-4 gradient-text">
                Modules d'apprentissage
              </h2>
              <p className="text-text text-lg md:text-xl font-semibold max-w-2xl mx-auto">
                Complétez les modules dans l'ordre pour débloquer les suivants 🔓
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module, index) => {
                const isCompleted = completedModules.includes(module.id);
                const isLocked = index > 0 && !completedModules.includes(modules[index - 1].id);
                const isActive = !isLocked && !isCompleted;

                return (
                  <motion.div
                    key={module.id}
                    initial={{ opacity: 0, y: 30, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: index * 0.06 + 0.3,
                      type: "spring",
                      stiffness: 120,
                      damping: 12
                    }}
                    whileHover={!isLocked ? { scale: 1.03, y: -8 } : {}}
                  >
                    <Link 
                      href={isLocked ? '#' : `/level/${level}/module/${module.id}`}
                      className={isLocked ? 'pointer-events-none' : ''}
                    >
                      <Card 
                        variant={isActive ? "gradient" : isCompleted ? "elevated" : "bordered"} 
                        className={`h-full relative overflow-hidden group transition-all hover:shadow-soft-2xl ${
                          isLocked ? 'opacity-60 grayscale' : ''
                        } ${isCompleted ? 'border-2 border-success' : ''}`}
                      >
                        {/* Status indicator */}
                        <div className="absolute top-5 right-5 z-20">
                          {isCompleted && (
                            <motion.div
                              initial={{ scale: 0, rotate: -180 }}
                              animate={{ scale: 1, rotate: 0 }}
                              transition={{ type: "spring", stiffness: 200 }}
                            >
                              <Badge variant="success" glow size="lg">
                                ✓ Terminé
                              </Badge>
                            </motion.div>
                          )}
                          {isLocked && (
                            <Badge variant="default" size="lg">
                              🔒 Verrouillé
                            </Badge>
                          )}
                          {isActive && (
                            <Badge variant="gradient" glow size="lg">
                              ⚡ Disponible
                            </Badge>
                          )}
                        </div>

                        {/* Module content */}
                        <div className="flex items-start gap-5 relative z-10">
                          <motion.div 
                            className="text-6xl flex-shrink-0"
                            animate={!isLocked ? { 
                              rotate: [0, 10, -10, 0],
                              scale: [1, 1.08, 1]
                            } : {}}
                            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                          >
                            {module.icon}
                          </motion.div>
                          
                          <div className="flex-1">
                            <h3 className="text-xl md:text-2xl font-black mb-3 text-text group-hover:gradient-text transition-all">
                              {module.title}
                            </h3>
                            <p className="text-sm md:text-base text-text-light mb-5 leading-relaxed font-medium">
                              {module.description}
                            </p>
                            
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="info" size="md">
                                📖 {module.lessons.length} leçons
                              </Badge>
                              {!isLocked && !isCompleted && (
                                <Badge variant="warning" size="md">
                                  ⏱️ ~{Math.ceil(module.lessons.length * 2)} min
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Hover effect */}
                        {!isLocked && (
                          <motion.div 
                            className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-primary via-blue to-purple rounded-b-3xl"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                          />
                        )}
                      </Card>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Achievement section */}
            {completedCount > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="mt-12 max-w-4xl mx-auto"
              >
                <Card variant="colorful" className="text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.15, 1],
                      rotate: [0, 10, -10, 0]
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="text-7xl md:text-8xl mb-6"
                  >
                    {completedCount === modules.length ? '🏆' : '🌟'}
                  </motion.div>
                  <h3 className="text-3xl md:text-4xl font-black mb-4 gradient-text">
                    {completedCount === modules.length 
                      ? '¡Felicidades! Niveau terminé !'
                      : `Bravo ! ${completedCount} module${completedCount > 1 ? 's' : ''} complété${completedCount > 1 ? 's' : ''} !`
                    }
                  </h3>
                  <p className="text-text text-lg md:text-xl font-medium leading-relaxed mb-6">
                    {completedCount === modules.length 
                      ? 'Vous maîtrisez maintenant les bases ! Continuez vers le niveau suivant pour devenir un expert. 🚀'
                      : `Plus que ${modules.length - completedCount} module${modules.length - completedCount > 1 ? 's' : ''} pour terminer ce niveau ! Continue comme ça ! 💪`
                    }
                  </p>
                  {completedCount === modules.length && (
                    <Link href="/">
                      <Button variant="gradient" size="lg">
                        Retour aux niveaux →
                      </Button>
                    </Link>
                  )}
                </Card>
              </motion.div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
