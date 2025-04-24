'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Switch} from '@/components/ui/switch';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info} from 'lucide-react';

const AdminPage = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Simulate checking if the user is an admin.
    // Replace this with your actual authentication logic.
    const checkAdminStatus = () => {
      const user = localStorage.getItem('user');
      if (user === 'admin') {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, []);

  useEffect(() => {
    // Load maintenance mode status from local storage on initial load
    const storedMaintenanceMode = localStorage.getItem('maintenanceMode');
    if (storedMaintenanceMode) {
      setMaintenanceMode(storedMaintenanceMode === 'true');
    }
  }, []);

  useEffect(() => {
    // Update maintenance mode status in local storage when it changes
    localStorage.setItem('maintenanceMode', maintenanceMode.toString());
  }, [maintenanceMode]);

  const toggleMaintenanceMode = () => {
    setMaintenanceMode((prev) => !prev);
  };

  if (!isAdmin) {
    // For simplicity, just render a 403 message.
    // In a real app, you might want to redirect to a login page.
    return (
      <div className="flex items-center justify-center h-screen">
        <Card>
          <CardHeader>
            <CardTitle>403 - Forbidden</CardTitle>
          </CardHeader>
          <CardContent>
            <p>You do not have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-start min-h-screen py-2">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Courses</CardTitle>
            <CardDescription>Number of courses available</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Enrollments</CardTitle>
            <CardDescription>Number of active enrollments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">450</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Number of registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">275</div>
          </CardContent>
        </Card>
      </div>

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
