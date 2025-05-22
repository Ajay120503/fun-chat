import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login } from '../lib/api';
import toast from 'react-hot-toast';
import { useNavigate, Link } from 'react-router';
import { Smartphone } from 'lucide-react';
import { useThemeStore } from '../store/useThemeStore';

function Login() {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const { theme } = useThemeStore();

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: loginMutation, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Login successful!');
      navigate('/');
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Login failed');
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation(loginData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12" data-theme={theme}>
      {/* Shared Box for Left and Right */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl border border-primary/25 rounded-xl overflow-hidden shadow-xl bg-base-200">
        {/* Left Section - Login Form */}
        <div className="w-full lg:w-1/2 p-8 flex flex-col justify-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Smartphone className="size-9 text-primary" />
            <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              FUN CHAT
            </h1>
          </div>
          <form onSubmit={handleLogin} className="space-y-4 max-w-md mx-auto">
            <h2 className="text-2xl font-bold text-center mb-2">Sign Into Your Account</h2>

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={loginData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={loginData.password}
              onChange={handleChange}
            />

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Signing In...
                </>
              ) : (
                'Sign in'
              )}
            </button>

            <p className="text-sm text-center mt-2">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline font-medium">
                Create an account
              </Link>
            </p>
          </form>
        </div>

        {/* Right Section - Image and Text */}
        <div className="hidden lg:flex w-full lg:w-1/2 items-center justify-center bg-primary/10 p-6">
          <div className="relative w-full max-w-md">
            <img
              src="/Login.png"
              alt="Login Illustration"
              className="w-full h-full object-contain rounded-xl"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <div className="bg-black/60 text-white rounded-t-lg p-4">
                <h2 className="text-xl font-bold">Welcome to FUN CHAT!</h2>
                <p className="text-sm">
                  Connect, chat, and share your moments instantly. Your conversations, your privacy — always protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
