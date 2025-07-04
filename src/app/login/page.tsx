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
    if (!password) {
        toast({
            title: "Login Error",
            description: "Please enter a password.",
            variant: "destructive",
        });
        return;
    }
    if (password.length < 6) {
        toast({
        title: "Login Error",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    // Check for admin username and password
    if (username === 'admin' && password === 'password') {

      console.log("Admin login successful");
      // Correct admin credentials
      //save the user data


      localStorage.setItem('user', JSON.stringify({ admin: true }));
      toast({
        title: "Login Successful",
        description: "Successfully logged in as admin.",
      });
      router.push('/admin');
    } else {
        toast({
            title: "Login Error",
            description: "Invalid username or password.",
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
