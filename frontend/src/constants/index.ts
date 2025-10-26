/**
 * Application constants
 * Centralizes static data and enum-like values
 */

// Game Genres
export const GAME_GENRES = [
  'Action',
  'Adventure',
  'RPG',
  'Strategy',
  'Simulation',
  'Puzzle',
  'Racing',
  'Sports',
  'Fighting',
  'Horror',
  'Platformer',
  'Shooter',
] as const;

export type GameGenre = typeof GAME_GENRES[number];

// Game Platforms
export const GAME_PLATFORMS = [
  'PC',
  'PlayStation 5',
  'Xbox Series X/S',
  'Nintendo Switch',
  'Mobile (iOS/Android)',
  'Web Browser',
  'VR/AR',
] as const;

export type GamePlatform = typeof GAME_PLATFORMS[number];

// Target Audiences
export const TARGET_AUDIENCES = [
  'Children (6-12)',
  'Teenagers (13-17)',
  'Young Adults (18-25)',
  'Adults (26-40)',
  'Mature (40+)',
  'All Ages',
] as const;

export type TargetAudience = typeof TARGET_AUDIENCES[number];

// Project Status
export const PROJECT_STATUS = {
  PLANNING: 'Planning',
  IN_PROGRESS: 'In Progress',
  COMPLETED: 'Completed',
  ARCHIVED: 'Archived',
} as const;

export type ProjectStatus = typeof PROJECT_STATUS[keyof typeof PROJECT_STATUS];

// AI Tool Status
export const AI_TOOL_STATUS = {
  AVAILABLE: 'Available',
  COMING_SOON: 'Coming Soon',
  BETA: 'Beta',
  MAINTENANCE: 'Maintenance',
} as const;

export type AIToolStatus = typeof AI_TOOL_STATUS[keyof typeof AI_TOOL_STATUS];

// AI Tools Configuration
export const AI_TOOLS = [
  {
    id: 'gdd-generator',
    name: 'AI GDD Generator',
    description: 'Generate comprehensive Game Design Documents using AI',
    icon: '📋',
    status: AI_TOOL_STATUS.AVAILABLE,
    route: '/ai-tools/gdd-generator',
  },
  {
    id: 'character-generator',
    name: 'Character Generator',
    description: 'Create unique game characters with AI',
    icon: '👤',
    status: AI_TOOL_STATUS.COMING_SOON,
    route: '/ai-tools/character-generator',
  },
  {
    id: 'story-generator',
    name: 'Story Generator',
    description: 'Generate compelling game narratives',
    icon: '📖',
    status: AI_TOOL_STATUS.COMING_SOON,
    route: '/ai-tools/story-generator',
  },
  {
    id: 'level-generator',
    name: 'Level Generator',
    description: 'Create game levels and environments',
    icon: '🏗️',
    status: AI_TOOL_STATUS.COMING_SOON,
    route: '/ai-tools/level-generator',
  },
] as const;

export type AITool = typeof AI_TOOLS[number];

// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  GDD_GENERATOR: '/ai-tools/gdd-generator',
} as const;

