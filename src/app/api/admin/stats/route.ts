import {NextResponse} from 'next/server';

export async function GET() {
  // Mock data for admin stats
  const stats = {
    events: 120,
    orders: 456,
    users: 789,
  };

  return NextResponse.json(stats);
}
