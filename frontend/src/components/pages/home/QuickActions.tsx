"use client";

interface QuickAction {
  label: string;
  icon: React.ReactNode;
  gradient: string;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
}

export default function QuickActions({ actions }: QuickActionsProps) {
  return (
    <div className="mb-8">
      <h3 className="text-2xl font-bold text-white mb-6 galaxy-text">Quick Actions</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            className={`${action.gradient} text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center galaxy-glow-soft hover:scale-105 cursor-pointer`}
          >
            {action.icon}
            {action.label}
          </button>
        ))}
      </div>
    </div>
  );
}

