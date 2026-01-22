import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';

interface UserProgress {
  totalXP: number;
  streak: number;
  lastActivityDate: string | null;
  completedModules: Array<{
    level: string;
    moduleId: string;
    completedAt: string;
  }>;
}

export function useProgress() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/progress');
      if (!response.ok) {
        throw new Error('Failed to fetch progress');
      }
      const data = await response.json();
      setProgress(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!authLoading) {
      fetchProgress();
    }
  }, [isAuthenticated, authLoading]);

  const completeModule = async (level: string, moduleId: string, xpGained: number) => {
    if (!isAuthenticated) {
      throw new Error('Not authenticated');
    }

    try {
      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ level, moduleId, xpGained }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      const data = await response.json();
      
      // Refresh progress
      await fetchProgress();
      
      return data;
    } catch (err) {
      throw err;
    }
  };

  return {
    progress,
    isLoading: isLoading || authLoading,
    error,
    completeModule,
    refetch: fetchProgress,
  };
}
