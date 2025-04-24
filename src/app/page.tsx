'use client';

import {useState} from 'react';
import {Switch} from '@/components/ui/switch';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
} from '@/components/ui/sidebar';

export default function Home() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);

  const toggleMaintenanceMode = () => {
    setMaintenanceMode((prev) => !prev);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full items-start space-x-2 p-4">
        <Sidebar>
          <SidebarHeader>
            <div>
              <h2 className="font-semibold text-lg">AdminSwitch</h2>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>Overview</SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>Settings</SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <p className="text-xs text-muted-foreground">
              Made by Firebase Studio
            </p>
          </SidebarFooter>
        </Sidebar>
        <div className="flex flex-col flex-1 space-y-4">
          <div className="flex items-center space-x-2">
            <SidebarTrigger>Open Dashboard</SidebarTrigger>
          </div>
          <Card className="w-full">
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
      </div>
    </SidebarProvider>
  );
}
