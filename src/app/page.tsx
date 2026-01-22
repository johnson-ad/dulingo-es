'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { levels } from '@/data/levels';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { useProgressStore } from '@/store/useProgressStore';

export default function Home() {
  const { totalXP, streak, completedModules } = useProgressStore();

  return (
    <main className="min-h-screen pb-20 bg-gradient-to-br from-primary-50 via-blue-50 to-purple-50 relative overflow-hidden">
      {/* Decorative Background Elements - Modern & Playful */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-primary/20 to-blue/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-purple/20 to-secondary/20 rounded-full blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute top-1/3 right-1/3 w-72 h-72 bg-gradient-to-br from-coral/15 to-transparent rounded-full blur-2xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-64 h-64 bg-gradient-to-br from-blue/15 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Header - Modern Hero Section */}
      <header className="relative bg-gradient-to-br from-primary via-blue to-purple text-white shadow-soft-2xl overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        
        <div className="container mx-auto px-4 py-16 md:py-20 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="inline-block mb-6"
            >
              <motion.div 
                className="text-8xl md:text-9xl drop-shadow-2xl"
                animate={{ 
                  rotate: [0, -5, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatDelay: 3,
                  ease: "easeInOut" 
                }}
              >
                🇪🇸
              </motion.div>
            </motion.div>
            
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 drop-shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              ¡Aprende Español!
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-3xl mb-8 opacity-95 font-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              De débutant absolu à expert 🚀
            </motion.p>
            
            <motion.p 
              className="text-base md:text-lg mb-4 opacity-90 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Apprenez l'espagnol de manière ludique et addictive. 
              Plus de 500 millions de personnes parlent espagnol dans le monde ! 🌍
            </motion.p>
          </motion.div>

          {/* Stats - Modern Premium Design */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 mt-12 max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="glass backdrop-blur-xl rounded-3xl p-6 md:p-8 text-center border-2 border-white/40 shadow-soft-xl hover:shadow-glow-md transition-all"
            >
              <motion.div 
                className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-br from-white to-primary-100 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                {totalXP}
              </motion.div>
              <div className="text-sm md:text-base opacity-95 font-bold">✨ XP Total</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="glass backdrop-blur-xl rounded-3xl p-6 md:p-8 text-center border-2 border-white/40 shadow-soft-xl hover:shadow-glow-yellow transition-all"
            >
              <motion.div 
                className="text-4xl md:text-5xl font-black mb-2"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              >
                🔥 {streak}
              </motion.div>
              <div className="text-sm md:text-base opacity-95 font-bold">Jours consécutifs</div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: "spring", stiffness: 200 }}
              whileHover={{ scale: 1.08, y: -8 }}
              className="glass backdrop-blur-xl rounded-3xl p-6 md:p-8 text-center border-2 border-white/40 shadow-soft-xl hover:shadow-glow-blue transition-all"
            >
              <motion.div 
                className="text-4xl md:text-5xl font-black mb-2 bg-gradient-to-br from-white to-blue-100 bg-clip-text text-transparent"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5, ease: "easeInOut" }}
              >
                {completedModules.length}
              </motion.div>
              <div className="text-sm md:text-base opacity-95 font-bold">📚 Modules</div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Levels Section */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-4xl md:text-6xl font-black mb-4 gradient-text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            Choisissez votre niveau
          </motion.h2>
          <p className="text-lg md:text-xl text-text font-semibold max-w-2xl mx-auto">
            Progressez à votre rythme, du niveau débutant à expert 🎯
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {levels.map((level, index) => (
            <motion.div
              key={level.id}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                delay: index * 0.08 + 0.4,
                type: "spring",
                stiffness: 120,
                damping: 12
              }}
              whileHover={{ scale: 1.03, y: -8 }}
            >
              <Link href={`/level/${level.id}`}>
                <Card variant="elevated" className="h-full relative overflow-hidden group hover:shadow-soft-2xl">
                  {/* Animated gradient bar */}
                  <motion.div 
                    className={`bg-gradient-to-r ${level.color} h-2.5 rounded-full mb-6 shadow-soft`}
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: index * 0.08 + 0.5, duration: 0.7, ease: "easeOut" }}
                  />
                  
                  {/* Hover effect overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue/5 to-purple/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl" />
                  
                  <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black mb-4 text-text group-hover:gradient-text transition-all">
                      {level.name}
                    </h3>
                    <p className="text-text-light text-base md:text-lg mb-6 leading-relaxed font-medium">
                      {level.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-6 flex-wrap">
                      <Badge variant="info" glow size="md">
                        📚 {level.modules} modules
                      </Badge>
                      <Badge variant="warning" glow size="md">
                        ⏱️ {level.estimatedHours}h
                      </Badge>
                    </div>

                    <Button variant="primary" className="w-full" size="md">
                      Commencer
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        →
                      </motion.span>
                    </Button>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Motivational Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <Card variant="colorful" className="text-center">
            <motion.div
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl md:text-7xl mb-6"
            >
              💡
            </motion.div>
            <h3 className="text-3xl md:text-4xl font-black mb-4 gradient-text">
              Pourquoi apprendre l'espagnol ?
            </h3>
            <p className="text-text text-base md:text-lg leading-relaxed font-medium mb-6">
              Plus de <span className="font-black text-primary text-xl">500 millions</span> de locuteurs dans le monde ! 
              L'espagnol est la 2ème langue la plus parlée et ouvre des portes vers de nouvelles 
              cultures, opportunités professionnelles et voyages inoubliables. 🌎✨
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Badge variant="success" size="lg">🌍 21 pays</Badge>
              <Badge variant="purple" size="lg">💼 Carrière</Badge>
              <Badge variant="coral" size="lg">✈️ Voyages</Badge>
              <Badge variant="gradient" size="lg">🎉 Culture riche</Badge>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* CTA Footer - Modern PWA Prompt */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 100 }}
        className="fixed bottom-0 left-0 right-0 glass backdrop-blur-xl border-t-2 border-white/50 p-4 md:hidden shadow-soft-2xl z-50"
      >
        <div className="text-center text-sm font-bold text-primary flex items-center justify-center gap-2">
          <motion.span 
            className="text-2xl"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            📱
          </motion.span>
          Ajoutez à l'écran d'accueil pour une expérience optimale !
        </div>
      </motion.div>
    </main>
  );
}
