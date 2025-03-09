# Sports Team Manager

A modern web application for managing sports teams, built with React, TypeScript, and Directus.

## Project Structure

This is a monorepo project using Turborepo with the following packages:

- `packages/frontend`: React application for the web interface
- Backend is handled by Directus

## Quick Start

### Development

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development environment:

   With Docker (recommended):
   ```bash
   npm run docker:dev
   ```

   Without Docker:
   ```bash
   npm run dev
   ```

### Production

Build and start the production environment:

```bash
npm run docker:prod
```

## Available Scripts

### Root Directory

- `npm run dev` - Start development servers
- `npm run build` - Build all packages
- `npm run lint` - Lint all packages
- `npm run start` - Start production servers
- `npm run docker:dev` - Start development environment with Docker
- `npm run docker:dev:build` - Rebuild and start development environment
- `npm run docker:prod` - Start production environment with Docker
- `npm run docker:prod:build` - Rebuild and start production environment
- `npm run clean` - Clean all build files and node_modules

### Frontend Package

- `npm run dev` - Start Vite development server
- `npm run build` - Build for production
- `npm run lint` - Lint code
- `npm run preview` - Preview production build locally
- `npm run clean` - Clean build files and node_modules

## Features

### Authentication
- Email/password authentication using Directus
- Protected routes with authentication state management
- Login and registration functionality

### Team Management
- Dashboard overview
- Event planning (training, match, meeting)
- Team member availability tracking
- Notification system

## Tech Stack

### Frontend
- React 18 with TypeScript
- Vite for build tooling
- TanStack Query for data fetching
- Zustand for state management
- Tailwind CSS for styling
- Lucide React for icons

### Backend (Directus)
- REST API
- SQLite database
- Redis for caching
- Authentication system

## Development

### Environment Variables

Copy `.env.example` to `.env` and adjust values:

```bash
cp .env.example .env
```

### Docker Environments

Development:
- Hot reloading enabled
- Source maps
- Development tools
- Exposed ports for debugging

Production:
- Optimized builds
- Nginx for static file serving
- Caddy for SSL termination
- Redis caching
- Security headers

## Database Schema

### Collections

1. Users (Directus)
   - Default fields
   - Team role

2. Events
   - Title
   - Description
   - Start/End dates
   - Location
   - Type (training/match/meeting)
   - Recurrence settings

3. Availability
   - Event reference
   - User reference
   - Status
   - Comment

4. Notifications
   - Title
   - Message
   - Type
   - Status
   - User/Event references

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a pull request

## License

MIT