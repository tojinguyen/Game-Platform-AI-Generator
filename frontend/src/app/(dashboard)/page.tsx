"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";

import StatsCards from "@/components/pages/home/StatsCards";
import AITools from "@/components/pages/home/AITools";
import ProjectsTable from "@/components/pages/home/ProjectsTable";
import QuickActions from "@/components/pages/home/QuickActions";
import { PROJECT_STATUS, ROUTES } from "@/constants";

// Mock data - will be replaced with API calls
const mockProjects = [
  {
    id: 1,
    name: "Space Adventure RPG",
    type: "RPG",
    status: PROJECT_STATUS.IN_PROGRESS,
    lastModified: "2 hours ago",
    aiGenerated: true
  },
  {
    id: 2,
    name: "Puzzle Quest",
    type: "Puzzle",
    status: PROJECT_STATUS.COMPLETED,
    lastModified: "1 day ago",
    aiGenerated: false
  },
  {
    id: 3,
    name: "Racing Simulator",
    type: "Racing",
    status: PROJECT_STATUS.PLANNING,
    lastModified: "3 days ago",
    aiGenerated: true
  }
];

export default function Home() {
  const { user, isLoggedIn, isLoading, isClient, logout } = useAuth();
  const router = useRouter();

  // Calculate stats
  const stats = {
    totalProjects: mockProjects.length,
    completedProjects: mockProjects.filter(p => p.status === PROJECT_STATUS.COMPLETED).length,
    inProgressProjects: mockProjects.filter(p => p.status === PROJECT_STATUS.IN_PROGRESS).length,
    aiGeneratedProjects: mockProjects.filter(p => p.aiGenerated).length,
  };

  // Quick actions
  const quickActions = [
    {
      label: "New Project",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      ),
      gradient: "bg-gradient-to-r from-galaxy-cyan to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-pink",
      onClick: () => console.log("New Project clicked"),
    },
    {
      label: "Generate GDD",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      gradient: "bg-gradient-to-r from-galaxy-gold to-galaxy-pink hover:from-galaxy-pink hover:to-galaxy-purple",
      onClick: () => router.push(ROUTES.GDD_GENERATOR),
    },
    {
      label: "View Analytics",
      icon: (
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      gradient: "bg-gradient-to-r from-galaxy-purple to-galaxy-cyan hover:from-galaxy-cyan hover:to-galaxy-gold",
      onClick: () => console.log("View Analytics clicked"),
    },
  ];

  // Show loading state during SSR and initial client hydration
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

  if (!isLoggedIn) {
    return (
      <GalaxyBackground>
        <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative">
          <GalaxyDecorations />
          <main className="flex flex-col gap-[32px] row-start-2 items-center z-10">
            <h1 className="text-4xl font-bold text-center galaxy-text">
              Welcome to the Game Platform AI Generator
            </h1>
            <p className="text-lg text-center text-galaxy-silver">
              Please login or register to continue.
            </p>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <Link
                className="rounded-full border border-solid border-transparent transition-all duration-300 flex items-center justify-center bg-gradient-to-r from-galaxy-cyan to-galaxy-purple text-white gap-2 hover:from-galaxy-purple hover:to-galaxy-pink hover:scale-105 galaxy-glow-soft font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto cursor-pointer"
                href={ROUTES.LOGIN}
              >
                Login
              </Link>
              <Link
                className="rounded-full border border-solid border-galaxy-cyan/50 transition-all duration-300 flex items-center justify-center hover:bg-galaxy-primary/50 hover:border-galaxy-cyan hover:scale-105 galaxy-glow-soft font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto text-galaxy-cyan cursor-pointer"
                href={ROUTES.REGISTER}
              >
                Register
              </Link>
            </div>
          </main>
        </div>
      </GalaxyBackground>
    );
  }

  return (
    <GalaxyBackground>
      <div className="min-h-screen relative">
        <GalaxyDecorations />
        
        

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2 galaxy-text">
              Welcome back, {user?.name || "User"}!
            </h2>
            <p className="text-galaxy-silver">
              Ready to create your next amazing game? Let's get started with our AI-powered tools.
            </p>
          </div>

          {/* Stats Cards */}
          <StatsCards
            totalProjects={stats.totalProjects}
            completedProjects={stats.completedProjects}
            inProgressProjects={stats.inProgressProjects}
            aiGeneratedProjects={stats.aiGeneratedProjects}
          />

          {/* AI Tools Section */}
          <AITools />

          {/* Recent Projects */}
          <ProjectsTable projects={mockProjects} />

          {/* Quick Actions */}
          <QuickActions actions={quickActions} />
        </main>
      </div>
    </GalaxyBackground>
  );
}
