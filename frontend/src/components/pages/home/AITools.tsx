"use client";

import { useRouter } from 'next/navigation';
import { AI_TOOLS } from '@/constants';

export default function AITools() {
  const router = useRouter();

  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-6 galaxy-text">AI Tools</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {AI_TOOLS.map((tool) => (
          <div
            key={tool.id}
            className={`bg-galaxy-primary/60 backdrop-blur-md rounded-lg shadow-galaxy hover:shadow-galaxy-soft transition-all duration-300 galaxy-border hover:scale-105 ${
              tool.status === 'Coming Soon' ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
            }`}
            onClick={() => tool.status === 'Available' && router.push(tool.route)}
          >
            <div className="p-6">
              <div className="w-12 h-12 bg-gradient-to-br from-galaxy-cyan to-galaxy-purple rounded-lg flex items-center justify-center text-white text-2xl mb-4 galaxy-glow-soft">
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
  );
}

