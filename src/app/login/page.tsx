'use client';

import {useState, useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {Input} from '@/components/ui/input';
import {useToast} from "@/hooks/use-toast"

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {toast} = useToast();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is already logged in
    const checkLoggedIn = () => {
      const user = localStorage.getItem('user');
      if (user === 'admin') {
        router.push('/admin');
      }
    };

    checkLoggedIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username || !password) {
      toast({
        title: "Login Error",
        description: "Please enter both username and password.",
        variant: "destructive",
      });
      return;
    }

    // For demonstration, check if the username is "admin" and password isn't empty.
    if (username === 'admin' && password !== '') {
      localStorage.setItem('user', 'admin');
      router.push('/admin');
      toast({
        title: "Login Successful",
        description: "Successfully logged in as admin.",
      });
    } else {
      toast({
        title: "Login Error",
        description: "Invalid credentials. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Login</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
            <div className="grid gap-2">
              <label htmlFor="username">Username</label>
              <Input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <label htmlFor="password">Password</label>
              <Input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <Button type="submit">Log In</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default LoginPage;
