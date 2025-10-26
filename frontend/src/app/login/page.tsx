"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { login, googleOAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants";
import { config } from "@/config";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login: authLogin, isLoggedIn, isLoading: authLoading, isClient } = useAuth();

  useEffect(() => {
    if (isClient && !authLoading && isLoggedIn) {
      router.push(ROUTES.HOME);
    }
  }, [isLoggedIn, authLoading, isClient, router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      const data = await login({ email, password });
      console.log("Login successful", data);
      
      // Mock user data - in real app, get from API response
      const userData = {
        name: email.split('@')[0],
        email: email,
        avatar: config.defaults.avatar
      };
      
      authLogin(userData, {
        accessToken: data.accessToken,
        refreshToken: data.refreshToken
      });
      
      router.push(ROUTES.HOME);
    } catch (err) {
      setError("Failed to login. Please check your credentials.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
    setError(null);
    setIsLoading(true);
    console.log("Google Login Succeeded:", credentialResponse);
    
    if (credentialResponse.credential) {
      try {
        const data = await googleOAuth({ token: credentialResponse.credential });
        console.log("Google login successful", data);

        // Mock user data - in real app, get from API response
        const userData = {
          name: "Google User",
          email: "user@gmail.com",
          avatar: config.defaults.avatar,
        };

        authLogin(userData, {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });

        router.push(ROUTES.HOME);
      } catch (err) {
        setError("Failed to login with Google.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Google login failed: No credential received.");
      console.error("Google login failed: No credential received.");
      setIsLoading(false);
    }
  };

  const handleGoogleError = () => {
    setError("Google login failed. Please try again.");
    console.error("Google Login Failed");
  };

  if (!isClient || authLoading) {
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
            <FormInput
              id="email"
              name="email"
              type="email"
              label="Email address"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
              id="password"
              name="password"
              type="password"
              label="Password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              variant="primary"
              fullWidth
              isLoading={isLoading}
            >
              Login
            </Button>
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
                href={ROUTES.REGISTER}
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
