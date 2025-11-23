import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/state/slices';
import { authApi } from '@/lib/api';
import { TrendingUp } from 'lucide-react';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginMutation = useMutation({
    mutationFn: () => authApi.login(email, password),
    onSuccess: (data) => {
      if (data.success) {
        dispatch(login({ user: data.user, token: data.token }));
        navigate('/dashboard');
      } else {
        alert(data.message);
      }
    },
    onError: (error: unknown) => {
      alert(`Login failed: ${error}`);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginMutation.mutate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-slate-800">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center justify-center gap-2 mb-8">
          <TrendingUp className="h-8 w-8 text-blue-400" />
          <span className="text-3xl font-bold text-white">Groww</span>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="user@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <Button
                type="submit"
                disabled={loginMutation.isPending}
                className="w-full"
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>

              {loginMutation.isError && (
                <div className="p-3 bg-red-100 text-red-700 rounded text-sm">
                  Login failed. Please try again.
                </div>
              )}

              <div className="text-center text-sm text-muted-foreground">
                <p>Demo credentials: Any email/password will work</p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
