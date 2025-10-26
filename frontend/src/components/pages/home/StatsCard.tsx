"use client";

import { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  gradient: string;
}

export default function StatsCard({ title, value, icon, gradient }: StatsCardProps) {
  return (
    <div className="bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy p-6 galaxy-border hover:scale-105 transition-transform duration-200 cursor-pointer">
      <div className="flex items-center">
        <div className={`p-2 ${gradient} rounded-lg galaxy-glow-soft`}>
          {icon}
        </div>
        <div className="ml-4">
          <p className="text-sm font-medium text-galaxy-silver">{title}</p>
          <p className="text-2xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
}

