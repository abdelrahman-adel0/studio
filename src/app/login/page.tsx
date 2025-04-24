'use client';

import {useState} from 'react';
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!username) {
      toast({
        title: "Login Error",
        description: "Please enter a username.",
        variant: "destructive",
      });
      return;
    }

    // For demonstration, check if the username is "admin".
    if (username === 'admin') {
      localStorage.setItem('user', JSON.stringify({admin: true}));
      toast({
        title: "Login Successful",
        description: "Successfully logged in as admin.",
      });
      router.push('/admin');
    } else {
      localStorage.setItem('user', JSON.stringify({admin: false}));
       toast({
         title: "Login Successful",
         description: "Successfully logged in.",
       });
      router.push('/');
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
