'use client';

import {useEffect, useState} from 'react';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {useRouter} from 'next/navigation';

export default function Home() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Load maintenance mode status from local storage on initial load
    const storedMaintenanceMode = localStorage.getItem('maintenanceMode');
    if (storedMaintenanceMode) {
      setMaintenanceMode(storedMaintenanceMode === 'true');
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Welcome to AdminSwitch</h1>

      {maintenanceMode && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Maintenance Mode Active</AlertTitle>
          <AlertDescription>
            The application is currently in maintenance mode. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      <Button onClick={() => router.push('/login')}>Go to Login</Button>
    </div>
  );
}
