import { NextResponse } from 'next/server';

export async function POST() {
  try {
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error toggling maintenance mode:', error);
    return NextResponse.json({ error: 'Failed to toggle maintenance mode' }, { status: 500 });
  }
}

