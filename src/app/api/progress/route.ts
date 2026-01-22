import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { sql } from '@vercel/postgres';

// GET user progress
export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);

    // Get user progress
    const progressResult = await sql`
      SELECT total_xp, streak, last_activity_date
      FROM user_progress
      WHERE user_id = ${userId}
    `;

    // Get completed modules
    const modulesResult = await sql`
      SELECT level, module_id, completed_at
      FROM completed_modules
      WHERE user_id = ${userId}
      ORDER BY completed_at DESC
    `;

    const progress = progressResult.rows[0] || {
      total_xp: 0,
      streak: 0,
      last_activity_date: null,
    };

    return NextResponse.json({
      totalXP: progress.total_xp,
      streak: progress.streak,
      lastActivityDate: progress.last_activity_date,
      completedModules: modulesResult.rows.map((m) => ({
        level: m.level,
        moduleId: m.module_id,
        completedAt: m.completed_at,
      })),
    });
  } catch (error) {
    console.error('Get progress error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération de la progression' },
      { status: 500 }
    );
  }
}

// POST update progress (complete module)
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const userId = parseInt(session.user.id);
    const { level, moduleId, xpGained } = await request.json();

    if (!level || !moduleId || typeof xpGained !== 'number') {
      return NextResponse.json(
        { error: 'Données invalides' },
        { status: 400 }
      );
    }

    // Check if module already completed
    const existingModule = await sql`
      SELECT id FROM completed_modules
      WHERE user_id = ${userId} AND level = ${level} AND module_id = ${moduleId}
    `;

    if (existingModule.rows.length > 0) {
      return NextResponse.json(
        { message: 'Module déjà complété' },
        { status: 200 }
      );
    }

    // Add completed module
    await sql`
      INSERT INTO completed_modules (user_id, level, module_id)
      VALUES (${userId}, ${level}, ${moduleId})
    `;

    // Get current progress
    const currentProgress = await sql`
      SELECT total_xp, streak, last_activity_date
      FROM user_progress
      WHERE user_id = ${userId}
    `;

    const current = currentProgress.rows[0];
    const today = new Date().toISOString().split('T')[0];
    const lastActivity = current.last_activity_date
      ? new Date(current.last_activity_date).toISOString().split('T')[0]
      : null;

    // Calculate new streak
    let newStreak = current.streak;
    if (!lastActivity) {
      newStreak = 1;
    } else {
      const daysDiff = Math.floor(
        (new Date(today).getTime() - new Date(lastActivity).getTime()) /
          (1000 * 60 * 60 * 24)
      );

      if (daysDiff === 1) {
        newStreak += 1; // Continue streak
      } else if (daysDiff > 1) {
        newStreak = 1; // Reset streak
      }
      // If daysDiff === 0, keep current streak
    }

    // Update progress
    await sql`
      UPDATE user_progress
      SET total_xp = total_xp + ${xpGained},
          streak = ${newStreak},
          last_activity_date = CURRENT_DATE,
          updated_at = CURRENT_TIMESTAMP
      WHERE user_id = ${userId}
    `;

    return NextResponse.json({
      success: true,
      totalXP: current.total_xp + xpGained,
      streak: newStreak,
    });
  } catch (error) {
    console.error('Update progress error:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la mise à jour de la progression' },
      { status: 500 }
    );
  }
}
