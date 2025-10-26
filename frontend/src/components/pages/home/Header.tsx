"use client";

import { useAuth } from '@/hooks/useAuth';
import { config } from '@/config';

interface HeaderProps {
  onLogout: () => void;
}

export default function Header({ onLogout }: HeaderProps) {
  const { user } = useAuth();

  return (
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
                src={user?.avatar || config.defaults.avatar}
                alt={user?.name || 'User'}
              />
              <span className="text-sm font-medium text-galaxy-silver">
                {user?.name || 'User'}
              </span>
            </div>
            <button
              onClick={onLogout}
              className="text-sm text-galaxy-cyan hover:text-galaxy-pink transition-colors duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

