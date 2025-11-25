# Rablo Fitness Manager App

A Next.js-based fitness center management application that enables managers to create profiles, manage their fitness centers, and access a comprehensive dashboard.

## Setup

### Prerequisites

- **Node.js** (v18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** (package manager)

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd rablo-fitness-app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file in the root directory with the required environment variables (see Environment Variables section below).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Access the application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build and Production

- **Build for production:**
  ```bash
  npm run build
  ```

- **Start production server:**
  ```bash
  npm start
  ```

## Environment Variables

The application requires the following environment variables to be configured in a `.env.local` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_BASE_URL` | Base URL for the backend API | `https://backend-p2wd.onrender.com` |
| `NEXT_PUBLIC_GOOGLE_AUTH_URL` | Google OAuth authentication endpoint for managers | `https://backend-p2wd.onrender.com/auth/google/manager` |

### Creating `.env.local`

```dotenv
NEXT_PUBLIC_API_BASE_URL=https://backend-p2wd.onrender.com
NEXT_PUBLIC_GOOGLE_AUTH_URL=https://backend-p2wd.onrender.com/auth/google/manager
```

**Note:** Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser and should contain non-sensitive data only.

## Architecture Overview

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home/Splash page
│   ├── layout.tsx         # Root layout component
│   ├── splash/            # Splash/welcome screen
│   ├── login/             # Authentication page
│   ├── create-profile/    # Manager profile creation
│   ├── dashboard/         # Manager dashboard
│   └── manager/           # Manager-specific pages
├── api/                    # API client utilities
│   └── client.ts          # API endpoints and request handlers
├── components/            # Reusable React components
│   ├── Button.tsx         # Custom button component
│   └── Input.tsx          # Custom input component
├── utils/                 # Utility functions
│   └── storage.ts         # LocalStorage abstraction layer
└── assets/                # Static assets
```

### Key Technologies

- **Framework:** [Next.js 16](https://nextjs.org/) - React-based full-stack framework
- **Language:** [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/) - Utility-first CSS framework
- **Font:** [Geist Font](https://vercel.com/font) - Optimized via Next.js Font Optimization
- **Linting:** [ESLint](https://eslint.org/) - Code quality and style consistency

### Core Architecture

#### 1. **Page Structure (App Router)**
- **Splash Page** (`/splash`) - Initial welcome screen
- **Login Page** (`/login`) - Google OAuth authentication entry point
- **Create Profile** (`/create-profile`) - Manager profile setup form
- **Dashboard** (`/dashboard`) - Main manager interface
- **Manager Pages** (`/manager`) - Manager-specific functionality

#### 2. **API Layer** (`src/api/client.ts`)
The API client provides typed methods for backend communication:
- `getBasicProfile(managerID)` - Retrieve manager profile information
- `createManagerProfile(managerID, data)` - Create or update manager profile

**Supported Profile Data:**
- Contact information (phone number, email)
- Personal details (name, date of birth, gender)
- Location data (coordinates, city, state, country, pincode)
- Role designation

#### 3. **State Management** (`src/utils/storage.ts`)
Browser-based storage management using the Storage utility:

**Storage Keys:**
- `userID` - Manager's unique identifier
- `authToken` - Authentication token
- `userName` - Manager's name
- `userEmail` - Manager's email
- `accCreated` - Account creation status flag

**Key Functions:**
- `getStorageItem(key)` - Retrieve stored value
- `setStorageItem(key, value)` - Store value
- `clearAppStorage()` - Clear all app-related stored data

#### 4. **Component Library** (`src/components/`)
Reusable UI components:
- **Button.tsx** - Custom button component with styling
- **Input.tsx** - Custom input field component

### Data Flow

1. User visits splash page
2. User authenticates via Google OAuth (`/login`)
3. Backend validates credentials and returns `userID` and `authToken`
4. Application stores credentials in localStorage
5. User completes profile setup (`/create-profile`)
6. Profile data is sent to backend via `createManagerProfile` API call
7. User accesses dashboard (`/dashboard`) with full functionality

### Environment & Deployment

- **Development:** `npm run dev` - Hot-reloading development server
- **Production Build:** `npm run build` - Optimized production bundle
- **Deployment:** Can be deployed to [Vercel](https://vercel.com/) or any Node.js-compatible hosting

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
