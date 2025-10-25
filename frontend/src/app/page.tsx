"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import GalaxyBackground from "@/components/GalaxyBackground";
import GalaxyDecorations from "@/components/GalaxyDecorations";

// Mock data - trong thực tế sẽ fetch từ API
const mockUser = {
  name: "John Doe",
  email: "john@example.com",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"
};

const mockProjects = [
  {
    id: 1,
    name: "Space Adventure RPG",
    type: "RPG",
    status: "In Progress",
    lastModified: "2 hours ago",
    aiGenerated: true
  },
  {
    id: 2,
    name: "Puzzle Quest",
    type: "Puzzle",
    status: "Completed",
    lastModified: "1 day ago",
    aiGenerated: false
  },
  {
    id: 3,
    name: "Racing Simulator",
    type: "Racing",
    status: "Planning",
    lastModified: "3 days ago",
    aiGenerated: true
  }
];

const aiTools = [
  {
    id: "gdd-generator",
    name: "AI GDD Generator",
    description: "Generate comprehensive Game Design Documents using AI",
    icon: "📋",
    status: "Available",
    color: "bg-blue-500"
  },
  {
    id: "character-generator",
    name: "Character Generator",
    description: "Create unique game characters with AI",
    icon: "👤",
    status: "Coming Soon",
    color: "bg-green-500"
  },
  {
    id: "story-generator",
    name: "Story Generator",
    description: "Generate compelling game narratives",
    icon: "📖",
    status: "Coming Soon",
    color: "bg-purple-500"
  },
  {
    id: "level-generator",
    name: "Level Generator",
    description: "Create game levels and environments",
    icon: "🏗️",
    status: "Coming Soon",
    color: "bg-orange-500"
  }
];

export default function Home() {
  const { user, isLoggedIn, isLoading, isClient, logout } = useAuth();
  const router = useRouter();

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
                href="/login"
              >
                Login
              </Link>
              <Link
                className="rounded-full border border-solid border-galaxy-cyan/50 transition-all duration-300 flex items-center justify-center hover:bg-galaxy-primary/50 hover:border-galaxy-cyan hover:scale-105 galaxy-glow-soft font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto text-galaxy-cyan cursor-pointer"
                href="/register"
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
        
        {/* Header */}
        <header className="bg-galaxy-primary/80 backdrop-blur-md shadow-galaxy border-b border-galaxy-cyan/20 sticky top-0 z-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center">
                <h1 className="text-2xl font-bold galaxy-text">
                  Game AI Platform
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3">
                  <img
                    className="h-8 w-8 rounded-full border-2 border-galaxy-cyan/50 galaxy-glow-soft"
                    src={user?.avatar || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face"}
                    alt={user?.name || "User"}
                  />
                  <span className="text-sm font-medium text-galaxy-silver">
                    {user?.name || "User"}
                  </span>
                </div>
                <button
                  onClick={logout}
                  className="text-sm text-galaxy-cyan hover:text-galaxy-pink transition-colors duration-200 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </header>

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
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-6 galaxy-border hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-galaxy-cyan to-galaxy-purple rounded-lg galaxy-glow-soft">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-galaxy-silver">Total Projects</p>
                  <p className="text-2xl font-semibold text-white">{mockProjects.length}</p>
                </div>
              </div>
            </div>

            <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-6 galaxy-border hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-galaxy-gold to-galaxy-pink rounded-lg galaxy-glow-soft">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-galaxy-silver">Completed</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockProjects.filter(p => p.status === 'Completed').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-6 galaxy-border hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-galaxy-purple to-galaxy-cyan rounded-lg galaxy-glow-soft">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-galaxy-silver">In Progress</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockProjects.filter(p => p.status === 'In Progress').length}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-6 galaxy-border hover:scale-105 transition-transform duration-200 cursor-pointer">
              <div className="flex items-center">
                <div className="p-2 bg-gradient-to-br from-galaxy-pink to-galaxy-gold rounded-lg galaxy-glow-soft">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-galaxy-silver">AI Generated</p>
                  <p className="text-2xl font-semibold text-white">
                    {mockProjects.filter(p => p.aiGenerated).length}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Tools Section */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 galaxy-text">AI Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {aiTools.map((tool) => (
                <div
                  key={tool.id}
                  className={`bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy hover:shadow-galaxy-soft transition-all duration-300 galaxy-border hover:scale-105 ${
                    tool.status === 'Coming Soon' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  onClick={() => tool.status === 'Available' && router.push(`/ai-tools/${tool.id}`)}
                >
                  <div className="p-6">
                    <div className={`w-12 h-12 bg-gradient-to-br from-galaxy-cyan to-galaxy-purple rounded-lg flex items-center justify-center text-white text-2xl mb-4 galaxy-glow-soft`}>
                      {tool.icon}
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {tool.name}
                    </h4>
                    <p className="text-sm text-galaxy-silver mb-4">
                      {tool.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        tool.status === 'Available' 
                          ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-pink text-white'
                          : 'bg-galaxy-secondary text-galaxy-silver'
                      }`}>
                        {tool.status}
                      </span>
                      {tool.status === 'Available' && (
                        <svg className="w-4 h-4 text-galaxy-cyan" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>

          {/* Recent Projects */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white galaxy-text">Recent Projects</h3>
              <button className="text-galaxy-cyan hover:text-galaxy-pink font-medium transition-colors duration-200 cursor-pointer">
                View All
              </button>
            </div>
            <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy overflow-hidden galaxy-border">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-galaxy-cyan/20">
                  <thead className="bg-galaxy-secondary/80">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-galaxy-cyan uppercase tracking-wider">
                        Project
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-galaxy-cyan uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-galaxy-cyan uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-galaxy-cyan uppercase tracking-wider">
                        Last Modified
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-galaxy-cyan uppercase tracking-wider">
                        AI Generated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-galaxy-primary/40 divide-y divide-galaxy-cyan/20">
                    {mockProjects.map((project) => (
                      <tr key={project.id} className="hover:bg-galaxy-secondary/30 cursor-pointer transition-colors duration-200">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-white">
                            {project.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gradient-to-r from-galaxy-cyan to-galaxy-purple text-white">
                            {project.type}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            project.status === 'Completed' 
                              ? 'bg-gradient-to-r from-galaxy-gold to-galaxy-pink text-white'
                              : project.status === 'In Progress'
                              ? 'bg-gradient-to-r from-galaxy-purple to-galaxy-cyan text-white'
                              : 'bg-galaxy-secondary text-galaxy-silver'
                          }`}>
                            {project.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-galaxy-silver">
                          {project.lastModified}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {project.aiGenerated ? (
                            <span className="text-galaxy-gold">✓</span>
                          ) : (
                            <span className="text-galaxy-silver">-</span>
                          )}
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-white mb-6 galaxy-text">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <button className="bg-gradient-to-r from-galaxy-cyan to-galaxy-purple hover:from-galaxy-purple hover:to-galaxy-pink text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center galaxy-glow-soft hover:scale-105 cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                New Project
              </button>
              <button className="bg-gradient-to-r from-galaxy-gold to-galaxy-pink hover:from-galaxy-pink hover:to-galaxy-purple text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center galaxy-glow-soft hover:scale-105 cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Generate GDD
              </button>
              <button className="bg-gradient-to-r from-galaxy-purple to-galaxy-cyan hover:from-galaxy-cyan hover:to-galaxy-gold text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center galaxy-glow-soft hover:scale-105 cursor-pointer">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
                View Analytics
              </button>
            </div>
          </div>
        </main>
      </div>
    </GalaxyBackground>
  );
}