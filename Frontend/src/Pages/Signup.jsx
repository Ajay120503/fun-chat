import React, { useState } from 'react';
import { Smartphone } from 'lucide-react';
import { Link, useNavigate } from 'react-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { signup } from '../lib/api';
import toast from 'react-hot-toast';
import { useThemeStore } from '../store/useThemeStore';

function Signup() {
  const [signupData, setSignupData] = useState({
    fullName: '',
    email: '',
    password: '',
  });

  const { theme } = useThemeStore();

  const [agreeTerms, setAgreeTerms] = useState(false);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['authUser'] });
      toast.success('Account created successfully!');
      navigate('/login');
    },
    onError: (error) => {
      const message = error?.response?.data?.message || 'Signup failed. Try again.';
      toast.error(message);
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSignup = (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      toast.error('You must agree to the terms and privacy policy.');
      return;
    }
    signupMutation(signupData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100 px-4 py-12" data-theme={theme}>
      {/* Outer Card Wrapper with Unified Border */}
      <div className="flex flex-col lg:flex-row w-full max-w-5xl bg-base-200 rounded-xl shadow-xl overflow-hidden border border-primary/20">
        {/* Left: Signup Form */}
        <div className="w-full lg:w-1/2 p-6 lg:p-10">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Smartphone className="size-8 text-primary" />
            <h1 className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              FUN CHAT
            </h1>
          </div>

          <form onSubmit={handleSignup} className="space-y-4">
            <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>

            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="input input-bordered w-full"
              value={signupData.fullName}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              value={signupData.email}
              onChange={handleChange}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered w-full"
              value={signupData.password}
              onChange={handleChange}
            />

            <div className="form-control">
              <label className="label cursor-pointer gap-2">
                <input
                  type="checkbox"
                  className="checkbox checkbox-sm"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                />
                <span className="text-xs">
                  I agree to the{' '}
                  <span className="text-primary hover:underline">terms of service</span> and{' '}
                  <span className="text-primary hover:underline">privacy policy</span>.
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary w-full flex items-center justify-center gap-2"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Creating...
                </>
              ) : (
                'Create Account'
              )}
            </button>

            <p className="text-sm text-center mt-2">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign In
              </Link>
            </p>
          </form>
        </div>

        {/* Right: Image + Welcome Text */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 p-6 lg:p-10 items-center justify-center">
          <div className="relative w-full max-w-sm">
            <img
              src="/SignupIcon.png"
              alt="Signup Illustration"
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

export default Signup;
