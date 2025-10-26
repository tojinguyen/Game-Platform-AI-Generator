"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";
import { ROUTES } from "@/constants";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    
    try {
      await register({ name, email, password });
      console.log("Registration successful");
      router.push(ROUTES.LOGIN);
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <GalaxyBackground>
      <div className="flex items-center justify-center min-h-screen relative">
        <GalaxyDecorations />
        <div className="w-full max-w-md p-8 space-y-6 bg-galaxy-primary/80 backdrop-blur-md rounded-lg shadow-galaxy galaxy-border relative z-10">
          <h1 className="text-2xl font-bold text-center galaxy-text">
            Create an account
          </h1>
          {error && <p className="text-galaxy-pink text-sm text-center">{error}</p>}
          <form className="space-y-6" onSubmit={handleRegister}>
            <FormInput
              id="name"
              name="name"
              type="text"
              label="Name"
              autoComplete="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              autoComplete="new-password"
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
              Register
            </Button>
          </form>
          <div className="text-sm text-center">
            <p className="text-galaxy-silver">
              Already have an account?{" "}
              <Link
                href={ROUTES.LOGIN}
                className="font-medium text-galaxy-cyan hover:text-galaxy-pink transition-colors duration-200 cursor-pointer"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </GalaxyBackground>
  );
}
