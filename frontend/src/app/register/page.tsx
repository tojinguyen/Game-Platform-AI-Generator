"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/auth";
import { useRouter } from "next/navigation";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await register({ name, email, password });
      console.log("Registration successful", data);
      router.push("/login"); // Redirect to login page after successful registration
    } catch (err) {
      setError("Failed to register. Please try again.");
      console.error(err);
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
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-galaxy-silver"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="block w-full px-3 py-2 mt-1 text-white bg-galaxy-secondary/50 border border-galaxy-cyan/30 rounded-md shadow-sm placeholder-galaxy-silver/60 focus:outline-none focus:ring-galaxy-cyan focus:border-galaxy-cyan focus:bg-galaxy-secondary/70 sm:text-sm galaxy-glow-soft"
              />
            </div>
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
                autoComplete="new-password"
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
                Register
              </button>
            </div>
          </form>
          <div className="text-sm text-center">
            <p className="text-galaxy-silver">
              Already have an account?{" "}
              <Link
                href="/login"
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
