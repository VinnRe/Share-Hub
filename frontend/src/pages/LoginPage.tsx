import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const isSucccess = await handleLogin(email, password); 

      if (isSucccess) {
        navigate("/");
      } else {
        console.error("FAILED LOGGING IN, PLEASE CHECK YOUR CREDENTIALS");
      }
    } catch (error) {
      console.error("An error occured: ", error)
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="flex flex-col justify-center w-full lg:w-1/2 px-8 sm:px-12 lg:px-20 py-12 bg-light">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-maroon">
            Welcome Back
          </h1>
          <p className="text-gray-600 mb-8">
            Log in to continue to ShareHub
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label 
                htmlFor="email" 
                className="block text-sm font-medium mb-2 text-maroon"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors"
                placeholder="Email Address"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-sm font-medium mb-2 text-maroon"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded accent-crimson cursor-pointer"
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a 
                href="#" 
                className="text-sm font-medium text-crimson hover:underline"
              >
                Forgot password?
              </a>
            </div> */}

            {/* Login Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg cursor-pointer font-semibold text-light bg-crimson hover:bg-fire-brick transition-all hover:shadow-lg"
            >
              Log In
            </button>
          </form>
        </div>
      </div>

      {/* Right Section - Logo */}
      <div 
        className="hidden lg:flex items-center justify-center w-1/2 p-12 bg-gradient-to-br from-pale-pink to-rose-pink"
      >
        <div className="text-right">
          <h1 
            className="text-9xl font-bold tracking-tight text-light font-sans"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            <text className='text-red'>Share</text>
            <br />
            <text className="text-maroon">Hub</text>
          </h1>
          {/* <div className="mt-6 h-1 w-96 mx-auto rounded-full bg-light-pink"></div> */}
        </div>
      </div>
    </div>
  );
}