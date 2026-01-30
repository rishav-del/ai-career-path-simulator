# CareerSim - AI Career Path Simulator

## Overview

CareerSim is an AI-powered career simulation application that generates personalized career path recommendations. Users input their skills, interests, background, and goals, and the system uses OpenAI to analyze their profile and suggest three distinct career trajectories (Plan A, B, C) with match scores, timelines, skill gap analysis, and 30-day action plans.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS with shadcn/ui component library
- **Animations**: Framer Motion for page transitions and micro-interactions
- **Build Tool**: Vite with path aliases (@/, @shared/, @assets/)

The frontend follows a pages-based structure with reusable components. Forms use react-hook-form with Zod validation schemas shared between client and server.

### Backend Architecture
- **Framework**: Express 5 on Node.js with TypeScript
- **API Pattern**: RESTful endpoints defined in shared/routes.ts with Zod schemas for type-safe request/response validation
- **AI Integration**: OpenAI API via Replit AI Integrations (environment variables: AI_INTEGRATIONS_OPENAI_API_KEY, AI_INTEGRATIONS_OPENAI_BASE_URL)

The server handles simulation creation, storage, and retrieval. AI prompts are structured to return JSON with career paths including match scores, timelines, and action plans.

### Data Storage
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema Location**: shared/schema.ts (shared between client and server)
- **Migrations**: Generated via drizzle-kit, stored in /migrations folder
- **Connection**: Uses DATABASE_URL environment variable

Main table: `simulations` - stores user input (skills, interests, availability, background, goals) and AI-generated results as JSONB.

### Project Structure
```
client/           # React frontend
  src/
    components/   # Reusable UI components
    pages/        # Route components (Home, Simulator, Result)
    hooks/        # Custom React hooks
    lib/          # Utilities (queryClient, utils)
server/           # Express backend
  routes.ts       # API route handlers
  storage.ts      # Database operations
  db.ts           # Database connection
shared/           # Shared code between client/server
  schema.ts       # Drizzle schema definitions
  routes.ts       # API route definitions with Zod schemas
```

### Development vs Production
- **Development**: Vite dev server with HMR, tsx for TypeScript execution
- **Production**: Vite builds to dist/public, esbuild bundles server to dist/index.cjs

## External Dependencies

### Required Environment Variables
- `DATABASE_URL` - PostgreSQL connection string (required)
- `AI_INTEGRATIONS_OPENAI_API_KEY` - OpenAI API key via Replit AI Integrations
- `AI_INTEGRATIONS_OPENAI_BASE_URL` - OpenAI base URL via Replit AI Integrations

### Third-Party Services
- **OpenAI API**: Powers career path generation with structured JSON responses
- **PostgreSQL**: Primary data store for simulations

### Key NPM Packages
- drizzle-orm / drizzle-kit: Database ORM and migrations
- @tanstack/react-query: Async state management
- shadcn/ui components: Built on Radix UI primitives
- framer-motion: Animations
- zod: Schema validation (shared between frontend/backend)
- wouter: Client-side routing

### Replit Integrations
The project includes pre-built utilities in `server/replit_integrations/` and `client/replit_integrations/` for:
- Audio/voice chat capabilities
- Image generation
- Batch processing with rate limiting
- Chat storage patterns

These are available for future feature expansion but not currently used in the main application flow.