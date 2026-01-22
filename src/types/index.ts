export interface UserProgress {
  level: string;
  completedModules: number[];
  currentModule: number;
  totalXP: number;
  streak: number;
  badges: string[];
  quizScores: Record<string, number>;
}

export interface QuizQuestion {
  id: string;
  type: 'mcq' | 'translate-fr-es' | 'translate-es-fr' | 'audio' | 'fill';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  audio?: string;
}

export interface Quiz {
  id: string;
  moduleId: number;
  questions: QuizQuestion[];
  passingScore: number;
}
