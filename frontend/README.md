# Game AI Platform - Frontend

A modern, AI-powered game development platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

### 🎮 Core Features
- **User Authentication**: Secure login/register with JWT tokens
- **AI GDD Generator**: Generate comprehensive Game Design Documents using AI
- **Project Management**: Create and manage multiple game projects
- **Dashboard**: Overview of projects, statistics, and quick actions
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile

### 🚀 AI Tools (Current & Planned)
- ✅ **AI GDD Generator** - Generate detailed Game Design Documents
- 🔄 **Character Generator** - Create unique game characters (Coming Soon)
- 🔄 **Story Generator** - Generate compelling game narratives (Coming Soon)
- 🔄 **Level Generator** - Create game levels and environments (Coming Soon)

### 🎨 UI/UX Features
- **Dark/Light Mode**: Automatic theme switching
- **Modern Design**: Clean, professional interface
- **Loading States**: Smooth loading animations
- **Notifications**: Toast notifications for user feedback
- **Responsive Layout**: Mobile-first design approach

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + Context
- **HTTP Client**: Axios
- **Icons**: Heroicons (SVG)
- **Fonts**: Geist Sans & Geist Mono

## Getting Started

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Game-Platform-AI-Generator/frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Update `.env.local` with your configuration:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:7788/api/external/v1
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── ai-tools/          # AI tools pages
│   │   │   └── gdd-generator/ # GDD Generator page
│   │   ├── login/             # Login page
│   │   ├── register/          # Register page
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Home page
│   ├── components/            # Reusable components
│   │   ├── LoadingSpinner.tsx
│   │   └── Notification.tsx
│   ├── hooks/                 # Custom React hooks
│   │   └── useAuth.ts         # Authentication hook
│   └── lib/                   # Utility functions
│       ├── auth.ts            # Authentication API calls
│       └── types.ts           # TypeScript type definitions
├── public/                    # Static assets
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Key Components

### Authentication System
- **useAuth Hook**: Manages authentication state and user data
- **Login/Register**: Secure user authentication with JWT tokens
- **Protected Routes**: Automatic redirection for unauthenticated users
- **Token Management**: Automatic token storage and refresh

### AI GDD Generator
- **Form-based Input**: Collect game details (title, genre, platform, etc.)
- **AI Processing**: Generate comprehensive GDD using AI
- **Export Options**: Save and download generated documents
- **Real-time Feedback**: Loading states and progress indicators

### Dashboard
- **Statistics Cards**: Project counts, completion rates, AI usage
- **AI Tools Grid**: Access to all available AI tools
- **Recent Projects**: Table view of user's game projects
- **Quick Actions**: Fast access to common tasks

## API Integration

The frontend integrates with the backend API for:
- User authentication and authorization
- Project management
- AI tool processing
- Data persistence

### API Endpoints Used
- `POST /api/external/v1/login` - User login
- `POST /api/external/v1/register` - User registration
- `POST /api/external/v1/google-oauth` - Google OAuth login
- `GET /api/external/v1/projects` - Get user projects (planned)
- `POST /api/external/v1/ai/gdd-generate` - Generate GDD (planned)

## Development

### Available Scripts
- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm type-check` - Run TypeScript type checking

### Code Style
- **ESLint**: Configured with Next.js recommended rules
- **Prettier**: Code formatting (if configured)
- **TypeScript**: Strict type checking enabled
- **Tailwind**: Utility-first CSS approach

### Best Practices
- Use TypeScript for all new code
- Follow React hooks patterns
- Implement proper error handling
- Use semantic HTML elements
- Ensure accessibility compliance
- Write responsive designs

## Deployment

### Build for Production
```bash
pnpm build
```

### Deploy to Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables
3. Deploy automatically on push to main branch

### Deploy to Other Platforms
- **Netlify**: Use `pnpm build` and deploy the `out` folder
- **Docker**: Use the provided Dockerfile
- **VPS**: Build and serve with `pnpm start`

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](../../LICENSE) file for details.

## Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Happy Game Development! 🎮✨**