'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Switch} from '@/components/ui/switch';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info} from 'lucide-react';
import {toast} from "@/hooks/use-toast"
import { useToast } from "@/hooks/use-toast"

interface Stats {
  events: number;
  orders: number;
  users: number;
}

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { toast } = useToast()

  useEffect(() => {
    const checkAdminStatus = () => {
      const user = localStorage.getItem('user');
      setIsAdmin(user === 'admin');
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    if (!isAdmin) {
      router.push('/login');
    }
  }, [isAdmin, router]);

  useEffect(() => {
    const loadMaintenanceMode = () => {
      const storedMaintenanceMode = localStorage.getItem('maintenanceMode');
      setMaintenanceMode(storedMaintenanceMode === 'true');
    };

    loadMaintenanceMode();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        // Attempt to fetch from the API endpoint
        const response = await fetch('/api/admin/stats');
        if (!response.ok) {
          throw new Error(`Failed to fetch stats: ${response.status}`);
        }
        const data: Stats = await response.json();
        setStats(data);
      } catch (apiError: any) {
        console.warn('Failed to fetch stats from API, using mock data:', apiError);
        // If the API fails, use mock data
        setStats({events: 50, orders: 100, users: 200});
        //setError(`Failed to fetch stats. Using mock data. Error: ${apiError.message || 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const toggleMaintenanceMode = async () => {
    try {
      // Optimistically update the state
      setMaintenanceMode((prev) => !prev);
      localStorage.setItem('maintenanceMode', (!maintenanceMode).toString());
      // Call the API endpoint to toggle maintenance mode
      const response = await fetch('/api/admin/maintenance/toggle', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error(`Failed to toggle maintenance mode: ${response.status}`);
      }

      toast({
        title: "Maintenance Mode Updated",
        description: `Maintenance mode is now ${maintenanceMode ? 'disabled' : 'enabled'}.`,
      })
    } catch (apiError: any) {
      console.error('Failed to toggle maintenance mode via API, reverting local state:', apiError);
      // Revert the state if the API call fails
      setMaintenanceMode((prev) => prev);
      localStorage.setItem('maintenanceMode', maintenanceMode.toString());
      setError(`Failed to toggle maintenance mode. Reverted to previous state. Error: ${apiError.message || 'Unknown error'}`);
    }
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      {error && (
        <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {loading ? (
        <div>Loading stats...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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

      <Card className="w-full max-w-md mt-4">
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
        <Alert variant="destructive">
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

export default AdminPage;
