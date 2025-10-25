"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { login, googleOAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { login: authLogin, isLoggedIn, isLoading, isClient } = useAuth();

  useEffect(() => {
    if (isClient && !isLoading && isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, isLoading, isClient, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await login({ email, password });
      // Handle successful login with auth hook
      console.log("Login successful", data);
      
      // Mock user data - in real app, get from API response
      const userData = {
        name: email.split('@')[0], // Simple name extraction
        email: email,
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
      };
      
      authLogin(userData, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      
      router.push("/"); // Redirect to homepage or dashboard
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error(err);
    }
  };

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse
  ) => {
    setError(null);
    console.log("Google Login Succeeded:", credentialResponse);
    if (credentialResponse.credential) {
      try {
        const data = await googleOAuth({
          token: credentialResponse.credential,
        });
        // Handle successful login
        console.log("Google login successful", data);

        // Mock user data - in real app, get from API response
        const userData = {
          name: "Google User",
          email: "user@gmail.com",
          avatar:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face",
        };

        authLogin(userData, {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        router.push("/");
      } catch (err) {
        setError("Failed to login with Google.");
        console.error(err);
      }
    } else {
      setError("Google login failed: No credential received.");
      console.error("Google login failed: No credential received.");
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    console.error("Google Login Failed");
  };


  if (!isClient || isLoading) {
    return (
      <GalaxyBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-cyan mx-auto mb-4 galaxy-glow-soft"></div>
            <p className="text-galaxy-silver">Loading...</p>
          </div>
        </div>
      </GalaxyBackground>
    );
  }

  return (
    <GalaxyBackground>
      <div className="flex items-center justify-center min-h-screen relative">
        <GalaxyDecorations />
        <div className="w-full max-w-md p-8 space-y-6 bg-galaxy-primary/80 backdrop-blur-md rounded-lg shadow-galaxy galaxy-border relative z-10">
          <h1 className="text-2xl font-bold text-center galaxy-text">
            Login
          </h1>
          {error && <p className="text-galaxy-pink text-sm text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-galaxy-silver"
              >
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-white bg-galaxy-secondary/50 border border-galaxy-cyan/30 rounded-md shadow-sm placeholder-galaxy-silver/60 focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan focus:bg-galaxy-secondary/70 sm:text-sm galaxy-glow-soft"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-galaxy-silver"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-white bg-galaxy-secondary/50 border border-galaxy-cyan/30 rounded-md shadow-sm placeholder-galaxy-silver/60 focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan focus:bg-galaxy-secondary/70 sm:text-sm galaxy-glow-soft"
              />
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-galaxy-cyan to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-galaxy-cyan transition-all duration-300 galaxy-glow-soft hover:scale-105 cursor-pointer"
              >
                Login
              </button>
            </div>
          </form>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-galaxy-cyan/30" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-galaxy-primary/80 text-galaxy-silver">
                Or continue with
              </span>
            </div>
          </div>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleGoogleSuccess}
              onError={handleGoogleError}
              theme="filled_black"
              width="320px"
            />
          </div>
          <div className="text-sm text-center">
            <p className="text-galaxy-silver">
              Don&apos;t have an account?{" "}
              <Link
                href="/register"
                className="font-medium text-galaxy-cyan hover:text-galaxy-pink transition-colors duration-200 cursor-pointer"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GalaxyBackground>
  );
}
