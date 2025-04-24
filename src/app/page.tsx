'use client';

import {useState} from 'react';
import {Switch} from '@/components/ui/switch';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Info, Settings} from 'lucide-react';
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
import {ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent} from '@/components/ui/chart';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {Input} from '@/components/ui/input';
import {Textarea} from '@/components/ui/textarea';
import {useToast} from '@/hooks/use-toast';
import {useEffect} from 'react';

const data = [
  {name: 'Jan', value: 400},
  {name: 'Feb', value: 300},
  {name: 'Mar', value: 200},
  {name: 'Apr', value: 278},
  {name: 'May', value: 189},
  {name: 'Jun', value: 239},
  {name: 'Jul', value: 349},
];

const chartConfig = {
  value: {
    label: 'Value',
  },
};

export default function Home() {
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [selectedMenuItem, setSelectedMenuItem] = useState('Overview');
  const [siteName, setSiteName] = useState('AdminSwitch');
  const [siteDescription, setSiteDescription] = useState('Admin Dashboard with Maintenance Mode Switch');
  const {toast} = useToast();

  // Load site settings from local storage on initial load
  useEffect(() => {
    const storedSiteName = localStorage.getItem('siteName');
    const storedSiteDescription = localStorage.getItem('siteDescription');

    if (storedSiteName) {
      setSiteName(storedSiteName);
    }
    if (storedSiteDescription) {
      setSiteDescription(storedSiteDescription);
    }
  }, []);

  const saveSiteSettings = () => {
    localStorage.setItem('siteName', siteName);
    localStorage.setItem('siteDescription', siteDescription);

    toast({
      title: 'Settings Saved',
      description: 'Site name and description have been successfully saved.',
    });
  };

  const toggleMaintenanceMode = () => {
    setMaintenanceMode((prev) => !prev);
  };

  const handleMenuItemClick = (menuItem: string) => {
    setSelectedMenuItem(menuItem);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full items-start space-x-2 p-4">
        <Sidebar>
          <SidebarHeader>
            <div>
              <h2 className="font-semibold text-lg">{siteName}</h2>
              <p className="text-sm text-muted-foreground">Dashboard</p>
            </div>
          </SidebarHeader>
          <SidebarSeparator />
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={selectedMenuItem === 'Overview'}
                    onClick={() => handleMenuItemClick('Overview')}
                  >
                    Overview
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={selectedMenuItem === 'Settings'}
                    onClick={() => handleMenuItemClick('Settings')}
                  >
                    Settings
                  </SidebarMenuButton>
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

          {selectedMenuItem === 'Overview' && (
            <>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Visitors</CardTitle>
                    <CardDescription>Total number of visitors on the site</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">4,524</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>New Subscribers</CardTitle>
                    <CardDescription>New users who subscribed to the newsletter</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">245</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Orders processed</CardTitle>
                    <CardDescription>The total ammount of orders processed</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,245</div>
                  </CardContent>
                </Card>
              </div>

              <Card className="w-full">
                <CardHeader>
                  <CardTitle>Website traffic</CardTitle>
                  <CardDescription>Website traffic over the last 7 days.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig}>
                    <ResponsiveContainer width="100%" height={300}>
                      <AreaChart data={data} margin={{top: 10, right: 30, left: 0, bottom: 0}}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip content={<ChartTooltipContent />} />
                        <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

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
            </>
          )}

          {selectedMenuItem === 'Settings' && (
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Settings</CardTitle>
                <CardDescription>Customize your application settings.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <label htmlFor="siteName" className="text-sm font-medium leading-none">
                    Site Name
                  </label>
                  <Input
                    type="text"
                    id="siteName"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="siteDescription" className="text-sm font-medium leading-none">
                    Site Description
                  </label>
                  <Textarea
                    id="siteDescription"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="col-span-3"
                  />
                </div>
                <Button onClick={saveSiteSettings}>Save Settings</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}
