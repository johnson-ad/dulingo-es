export interface Level {
  id: string;
  name: string;
  description: string;
  color: string;
  modules: number;
  estimatedHours: number;
}

export const levels: Level[] = [
  {
    id: 'a0',
    name: 'A0 - Débutant Absolu',
    description: 'Commencez votre voyage en espagnol',
    color: 'from-green-400 to-green-600',
    modules: 18,
    estimatedHours: 30,
  },
  {
    id: 'a1',
    name: 'A1 - Débutant',
    description: 'Phrases simples et conversations de base',
    color: 'from-blue-400 to-blue-600',
    modules: 15,
    estimatedHours: 40,
  },
  {
    id: 'a2',
    name: 'A2 - Élémentaire',
    description: 'Conversations quotidiennes',
    color: 'from-purple-400 to-purple-600',
    modules: 15,
    estimatedHours: 50,
  },
  {
    id: 'b1',
    name: 'B1 - Intermédiaire',
    description: 'Comprendre des textes et conversations complexes',
    color: 'from-orange-400 to-orange-600',
    modules: 12,
    estimatedHours: 60,
  },
  {
    id: 'b2',
    name: 'B2 - Intermédiaire Avancé',
    description: 'Parler couramment sur des sujets variés',
    color: 'from-red-400 to-red-600',
    modules: 12,
    estimatedHours: 70,
  },
  {
    id: 'c1',
    name: 'C1 - Avancé',
    description: 'Maîtrise et expression sophistiquée',
    color: 'from-pink-400 to-pink-600',
    modules: 10,
    estimatedHours: 80,
  },
  {
    id: 'c2',
    name: 'C2 - Maîtrise',
    description: 'Niveau natif et expertise complète',
    color: 'from-indigo-400 to-indigo-600',
    modules: 10,
    estimatedHours: 100,
  },
];
