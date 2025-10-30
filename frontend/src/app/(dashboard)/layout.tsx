"use client";

import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import GalaxyBackground from '@/components/GalaxyBackground';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, isLoading, isClient } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isClient && !isLoading && !isLoggedIn) {
      router.push('/login');
    }
  }, [isLoggedIn, isLoading, isClient, router]);

  if (!isClient || isLoading || !isLoggedIn) {
    return (
      <GalaxyBackground>
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-galaxy-cyan mx-auto mb-4 galaxy-glow-soft"></div>
            <p className="text-galaxy-silver">Loading session...</p>
          </div>
        </div>
      </GalaxyBackground>
    );
  }

  return (
    <GalaxyBackground>
      <div className="flex min-h-screen bg-black/30">
        <Sidebar />
        <main className="flex-1 flex flex-col overflow-hidden">
          {children}
        </main>
      </div>
    </GalaxyBackground>
  );
}
