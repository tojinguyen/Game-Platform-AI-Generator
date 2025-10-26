"use client";

import StatsCard from './StatsCard';

interface StatsCardsProps {
  totalProjects: number;
  completedProjects: number;
  inProgressProjects: number;
  aiGeneratedProjects: number;
}

export default function StatsCards({
  totalProjects,
  completedProjects,
  inProgressProjects,
  aiGeneratedProjects,
}: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Total Projects"
        value={totalProjects}
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        }
        gradient="bg-gradient-to-br from-galaxy-cyan to-galaxy-purple"
      />
      <StatsCard
        title="Completed"
        value={completedProjects}
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="bg-gradient-to-br from-galaxy-gold to-galaxy-pink"
      />
      <StatsCard
        title="In Progress"
        value={inProgressProjects}
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        gradient="bg-gradient-to-br from-galaxy-purple to-galaxy-cyan"
      />
      <StatsCard
        title="AI Generated"
        value={aiGeneratedProjects}
        icon={
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        gradient="bg-gradient-to-br from-galaxy-pink to-galaxy-gold"
      />
    </div>
  );
}

