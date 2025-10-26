"use client";

import { PROJECT_STATUS } from '@/constants';

interface Project {
  id: number;
  name: string;
  type: string;
  status: string;
  lastModified: string;
  aiGenerated: boolean;
}

interface ProjectsTableProps {
  projects: Project[];
}

const getStatusStyle = (status: string) => {
  if (status === PROJECT_STATUS.COMPLETED) {
    return 'bg-gradient-to-r from-galaxy-gold to-galaxy-pink text-white';
  }
  if (status === PROJECT_STATUS.IN_PROGRESS) {
    return 'bg-gradient-to-r from-galaxy-purple to-galaxy-cyan text-white';
  }
  return 'bg-galaxy-secondary text-galaxy-silver';
};

export default function ProjectsTable({ projects }: ProjectsTableProps) {
  return (
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
              {projects.map((project) => (
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
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusStyle(project.status)}`}>
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
  );
}

