"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { config } from '@/config';
import { AI_TOOLS, ROUTES } from '@/constants';

const navItems = [
  { href: ROUTES.HOME, label: 'Dashboard', icon: '🏠', disabled: false },
  ...AI_TOOLS.map(tool => {
    return {
      href: tool.route,
      label: tool.name,
      icon: tool.icon, // Using emoji from constants
      disabled: tool.status !== 'Available',
    }
  })
];

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 flex-shrink-0 bg-galaxy-primary/50 backdrop-blur-xl border-r border-galaxy-cyan/20 flex flex-col text-white">
      <div className="h-16 flex items-center justify-center px-4 border-b border-galaxy-cyan/20">
        <span className="text-galaxy-cyan mr-3 text-2xl">🤖</span>
        <h1 className="text-xl font-bold galaxy-text">Game AI Platform</h1>
      </div>
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item, index) => (
          <Link
            key={item.href || index}
            href={item.disabled ? '#' : item.href}
            className={`flex items-center px-4 py-2.5 rounded-lg transition-colors duration-200 text-sm font-medium ${
              pathname === item.href
                ? 'bg-galaxy-cyan/20 text-white'
                : 'text-galaxy-silver hover:bg-galaxy-secondary/50 hover:text-white'
            } ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            <span className="mr-3">{item.icon}</span>
            <span>{item.label}</span>
            {item.disabled && <span className="ml-auto text-xs font-mono bg-galaxy-secondary px-1.5 py-0.5 rounded">Soon</span>}
          </Link>
        ))}
      </nav>
      <div className="p-4 border-t border-galaxy-cyan/20">
        <div className="flex items-center space-x-3 mb-4">
          <img
            className="h-10 w-10 rounded-full border-2 border-galaxy-cyan/50 galaxy-glow-soft"
            src={user?.avatar || config.defaults.avatar}
            alt={user?.name || 'User'}
          />
          <div>
            <span className="text-sm font-semibold text-white block">{user?.name || 'User'}</span>
            <span className="text-xs text-galaxy-silver block">{user?.email}</span>
          </div>
        </div>
        <button
          onClick={logout}
          className="w-full flex items-center justify-center px-4 py-2 rounded-lg transition-colors duration-200 text-sm font-medium text-galaxy-silver hover:bg-galaxy-secondary/50 hover:text-white"
        >
          <span className="mr-2">⍈</span>
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
