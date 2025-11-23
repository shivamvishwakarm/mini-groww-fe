import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { useAppDispatch } from '@/lib/hooks';
import { login } from '@/state/slices';
import { authApi } from '@/lib/api';
import { TrendingUp, Eye, EyeOff } from 'lucide-react';

type AuthMode = 'login' | 'signup' | 'forgot';

export function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [mode, setMode] = useState<AuthMode>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      // For demo, just log them in
      loginMutation.mutate();
    } else if (mode === 'forgot') {
      alert(`Password reset link sent to ${email}`);
      setMode('login');
    } else {
      loginMutation.mutate();
    }
  };

  return (
    <div className="min-h-screen flex bg-[#1a1f2e]">
      {/* Left Side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 flex-col justify-center items-center p-12 bg-gradient-to-br from-[#1a1f2e] to-[#252b3d]">
        <div className="max-w-md text-center">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
              <TrendingUp className="h-7 w-7 text-white" />
            </div>
            <span className="text-4xl font-bold text-white">Groww</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-4">
            Simple, Free Investing.
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Stocks, Mutual Funds, ETFs and more. All in one place.
          </p>
          <div className="space-y-4 text-left">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Zero Commission</h3>
                <p className="text-gray-400 text-sm">Invest in stocks and mutual funds for free</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">Trusted by Millions</h3>
                <p className="text-gray-400 text-sm">Join 5 Crore+ investors</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-1">
                <svg className="w-4 h-4 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-white font-semibold mb-1">100% Secure</h3>
                <p className="text-gray-400 text-sm">Bank-grade security for your investments</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-teal-500 flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-white" />
            </div>
            <span className="text-3xl font-bold text-white">Groww</span>
          </div>

          {/* Auth Card */}
          <div className="bg-[#252b3d] rounded-2xl border border-gray-700/50 p-8 shadow-2xl">
            {mode === 'forgot' ? (
              <>
                {/* Forgot Password */}
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-white mb-2">Forgot Password?</h2>
                  <p className="text-gray-400 text-sm">
                    Enter your email and we'll send you a reset link
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1f2e] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    Send Reset Link
                  </Button>

                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="w-full text-center text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    Back to Login
                  </button>
                </form>
              </>
            ) : (
              <>
                {/* Login/Signup Tabs */}
                <div className="flex gap-1 mb-6 bg-[#1a1f2e] p-1 rounded-lg">
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-colors ${mode === 'login'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode('signup')}
                    className={`flex-1 py-2.5 text-sm font-semibold rounded-md transition-colors ${mode === 'signup'
                        ? 'bg-green-500 text-white'
                        : 'text-gray-400 hover:text-white'
                      }`}
                  >
                    Sign Up
                  </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1a1f2e] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1a1f2e] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors pr-12"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {mode === 'signup' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Confirm your password"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full px-4 py-3 bg-[#1a1f2e] border border-gray-600 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-green-500 transition-colors pr-12"
                          required
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" />
                          ) : (
                            <Eye className="h-5 w-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {mode === 'login' && (
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => setMode('forgot')}
                        className="text-sm text-green-400 hover:text-green-300 transition-colors"
                      >
                        Forgot Password?
                      </button>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-lg transition-colors"
                  >
                    {loginMutation.isPending
                      ? 'Please wait...'
                      : mode === 'signup'
                        ? 'Create Account'
                        : 'Continue'}
                  </Button>

                  {loginMutation.isError && (
                    <div className="p-3 bg-red-500/10 border border-red-500/50 text-red-400 rounded-lg text-sm">
                      {mode === 'signup' ? 'Signup failed. Please try again.' : 'Login failed. Please try again.'}
                    </div>
                  )}

                  {mode === 'signup' && (
                    <p className="text-xs text-gray-400 text-center">
                      By signing up, you agree to our{' '}
                      <a href="#" className="text-green-400 hover:text-green-300">
                        Terms of Service
                      </a>{' '}
                      and{' '}
                      <a href="#" className="text-green-400 hover:text-green-300">
                        Privacy Policy
                      </a>
                    </p>
                  )}

                  <div className="text-center text-sm text-gray-500 pt-2">
                    <p>Demo: Any email/password works</p>
                  </div>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-gray-500 mt-6">
            © 2024 Groww. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
