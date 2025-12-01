import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link, useLocation } from 'react-router';

export default function SignupPage() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const { handleSignup, handleLogin } = useAuth();
  const navigate = useNavigate() 
  const location = useLocation();
  const [passwordError, setPasswordError] = useState('');

  const validatePassword = (): boolean => {
    if (password.length < 8) {
      setPasswordError('Password must be at least 8 characters');
      return false;
    }
    if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
      return false;
    }
    setPasswordError('');
    return true;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("PRESSED")
    if (!validatePassword() || !agreeToTerms) {
      return;
    }

    try {
      const isSuccess = await handleSignup(firstName, lastName, email, password)

      if(isSuccess) {
        const isLogged = await handleLogin(email, password);
        if (isLogged) {
          const from = location.state?.from?.pathname || '/';
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.log("Error Signing up: ", error)
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Logo */}
      <div 
        className="hidden lg:flex items-center justify-center w-1/2 p-12 bg-gradient-to-br from-pale-pink to-rose-pink"
      >
        <div className="text-left">
          <h1 
            className="text-9xl font-bold tracking-tight text-light font-sans"
            style={{ textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}
          >
            <span className="text-red">Share</span>
            <br />
            <span className="text-maroon">Hub</span>
          </h1>
        </div>
      </div>

      {/* Right Section - Signup Form */}
    <div className="flex flex-col justify-center w-full h-screen lg:w-1/2 px-8 sm:px-12 lg:px-20 py-12 bg-light">
        <div className="w-full max-w-md mx-auto">
          <h1 className="text-4xl font-bold mb-2 text-maroon">
            Create Account
          </h1>
          <p className="text-gray-600 mb-8">
            Sign up to get started with ShareHub
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label 
                  htmlFor="firstName" 
                  className="block text-sm font-medium mb-2 text-maroon"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors"
                  placeholder="Juan"
                  required
                />
              </div>
              <div>
                <label 
                  htmlFor="lastName" 
                  className="block text-sm font-medium mb-2 text-maroon"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors"
                  placeholder="Dela Cruz"
                  required
                />
              </div>
            </div>

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
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label 
                htmlFor="confirmPassword" 
                className="block text-sm font-medium mb-2 text-maroon"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border-2 border-pale-pink bg-blush focus:border-crimson focus:outline-none transition-colors pr-12"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {passwordError && (
              <p className="mt-1 text-sm text-red-600">{passwordError}</p>
            )}

            {/* Terms & Conditions */}
            <div className="flex items-start">
              <input
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="w-4 h-4 rounded mt-1 accent-crimson cursor-pointer"
                required
              />
              <label className="ml-2 text-sm text-gray-600">
                I agree to the{' '}
                <a href="#" className="text-crimson font-medium hover:underline">
                  Terms of Service
                </a>
                {' '}and{' '}
                <a href="#" className="text-crimson font-medium hover:underline">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Signup Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-lg font-semibold text-light bg-crimson cursor-pointer hover:bg-fire-brick transition-all hover:shadow-lg"
            >
              Create Account
            </button>
          </form>

          {/* Login Link */}
          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link 
              to="/login" 
              className="font-medium text-crimson hover:underline cursor-pointer"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}