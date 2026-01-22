import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db';

export async function GET() {
  try {
    const result = await initDatabase();
    
    if (result.success) {
      return NextResponse.json({ 
        message: '✅ Database initialized successfully',
        success: true 
      });
    } else {
      return NextResponse.json({ 
        message: '❌ Database initialization failed',
        error: result.error,
        success: false 
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Init DB error:', error);
    return NextResponse.json({ 
      message: '❌ Error initializing database',
      error: String(error),
      success: false 
    }, { status: 500 });
  }
}
