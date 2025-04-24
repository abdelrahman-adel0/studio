import { NextResponse } from 'next/server';

export function GET() {

  const stats = { events: 12, orders: 34, users: 5 };

  return NextResponse.json(stats, { status: 200 });
}
