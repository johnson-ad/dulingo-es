import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { UserProgress } from '@/types';

interface ProgressStore extends UserProgress {
  completeModule: (moduleId: number, score: number) => void;
  addXP: (amount: number) => void;
  incrementStreak: () => void;
  addBadge: (badge: string) => void;
  setCurrentModule: (moduleId: number) => void;
  resetProgress: () => void;
}

const initialState: UserProgress = {
  level: 'a0',
  completedModules: [],
  currentModule: 1,
  totalXP: 0,
  streak: 0,
  badges: [],
  quizScores: {},
};

export const useProgressStore = create<ProgressStore>()(
  persist(
    (set) => ({
      ...initialState,
      completeModule: (moduleId, score) =>
        set((state) => ({
          completedModules: [...new Set([...state.completedModules, moduleId])],
          quizScores: { ...state.quizScores, [moduleId]: score },
          totalXP: state.totalXP + Math.round(score * 10),
        })),
      addXP: (amount) =>
        set((state) => ({ totalXP: state.totalXP + amount })),
      incrementStreak: () =>
        set((state) => ({ streak: state.streak + 1 })),
      addBadge: (badge) =>
        set((state) => ({
          badges: [...new Set([...state.badges, badge])],
        })),
      setCurrentModule: (moduleId) =>
        set({ currentModule: moduleId }),
      resetProgress: () => set(initialState),
    }),
    {
      name: 'espanol-progress',
    }
  )
);
