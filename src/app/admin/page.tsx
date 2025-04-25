'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { useAdmin } from '@/hooks/use-admin';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface Stats {
    events: number;
  orders: number;
  users: number;
}

const AdminDashboardPage = () => {
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(true);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isAdmin = useAdmin();
  const router = useRouter();

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          if (response.status === 502) {
             setError('Failed to fetch stats. The server is temporarily unavailable (502 Bad Gateway). Please try again later.');
          } else {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return;
        }

        const text = await response.text();
        try {
          const data: Stats = JSON.parse(text);
          setStats(data);
        } catch (jsonError) {
          console.error('Error parsing JSON:', jsonError);
          setError('Failed to parse stats data.');
        }
      } catch (error: any) {
        console.error('Error fetching stats:', error);
        setError(`Failed to fetch stats. Error: ${error.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };
    if (isAdmin.isAdmin) fetchStats();
  }, [isAdmin.isAdmin]); 

  const toggleMaintenanceMode = async () => {
    setMaintenanceMode(prev => !prev);
     
     try {
         const response = await fetch('/api/admin/maintenance/toggle', { method: 'POST' });
         if (!response.ok) throw new Error(`${response.status} - ${response.statusText}`);
         localStorage.setItem('maintenanceMode', (!maintenanceMode).toString());
         toast({
             title: "Maintenance Mode Updated",
             description: `Maintenance mode is now ${!maintenanceMode ? 'enabled' : 'disabled'}.`,
         })
    } catch (apiError: any) {
      console.error('Failed to toggle maintenance mode', apiError);
      setMaintenanceMode(prev => !prev);
      toast({title: `Failed to toggle maintenance mode. Reverted to previous state. Error: ${apiError.message || 'Unknown error'}`})
     }
   
  };

    const handleLogout = () => {
        localStorage.removeItem('user');
        router.push('/');
    };
  
  if (!isAdmin.isAdmin) {  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-bold mb-4">403 - Access Denied</h1>
      </div>
    );
  }
  
  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
          <Button onClick={handleLogout} className='m-4'>Logout</Button>
      
          {error && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
      )}

          {isAdmin.isLoading ? (
              <div>Loading stats...</div>
          ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 p-4 w-full max-w-7xl">
                  <Card>
                      <CardHeader>
                          <CardTitle>Total Events</CardTitle>
                          <CardDescription>Number of events</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{stats?.events ?? 'N/A'}</div>
                      </CardContent>
                  </Card>

                  <Card>
                      <CardHeader>
                          <CardTitle>Total Orders</CardTitle>
                          <CardDescription>Number of orders</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{stats?.orders ?? 'N/A'}</div>
                      </CardContent>
                  </Card>

                  <Card>
                      <CardHeader>
                          <CardTitle>Total Users</CardTitle>
                          <CardDescription>Number of registered users</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <div className="text-2xl font-bold">{stats?.users ?? 'N/A'}</div>
                      </CardContent>
                  </Card>
              </div>
          )}
          <div className="p-4 w-full max-w-7xl">
            <Card className="mt-4">
                  <CardHeader>
                      <CardTitle>Maintenance Mode</CardTitle>
                      <CardDescription>
                          Enable or disable maintenance mode for the application.
                      </CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center space-x-4">
                      <Switch id="maintenance" checked={maintenanceMode} onCheckedChange={toggleMaintenanceMode} />
                      <label htmlFor="maintenance" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {maintenanceMode ? 'Enabled' : 'Disabled'}
                      </label>
                  </CardContent>
              </Card>
              {maintenanceMode && (
                  <Alert variant="destructive" className="mt-4">
                      <Info className="h-4 w-4" />
                      <AlertTitle>Maintenance Mode Active</AlertTitle>
                      <AlertDescription>
                          The application is currently in maintenance mode. Users may experience disruptions.
                      </AlertDescription>
                  </Alert>
              )}        


    </div>
  );
};

export default AdminDashboardPage;
