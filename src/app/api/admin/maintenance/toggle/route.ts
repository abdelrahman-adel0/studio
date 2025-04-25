import { NextResponse } from 'next/server';

export async function POST() {
    try {
        const maintenanceMode = localStorage.getItem('maintenanceMode') === 'true';

        localStorage.setItem('maintenanceMode', (!maintenanceMode).toString());
        return NextResponse.json({ success: true }, { status: 200 });
    } catch (error) {
      console.error('Error toggling maintenance mode in localStorage:', error);
      return NextResponse.json({ error: 'Failed to toggle maintenance mode' }, { status: 500 });
    }
}

