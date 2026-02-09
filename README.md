# Ttrack FE

Frontend admin app for Ttrack. It is a React single-page application that handles authentication, renders the login flow, and protects private routes while integrating with a backend API generated from an OpenAPI spec.

## Tech Stack
- React 18 + TypeScript
- Vite for dev server and build
- PrimeReact + PrimeFlex + PrimeIcons for UI
- React Router for routing
- TanStack React Query for server state and API calls
- Axios for HTTP
- React Hook Form + Zod for forms and validation
- Vitest + Testing Library for tests
- ESLint + Prettier for linting and formatting
- Orval for OpenAPI client generation
- Husky for git hooks

## Requirements
- Node.js 18+ (recommended)
- npm (or compatible package manager)

## Setup
1) Install dependencies:
```bash
npm install
```

2) Configure environment variables. Create a `.env.local` file in the root of the project.

Here are the available variables:

- `VITE_APP_USE_PROXY`: Set to `true` to use the Vite proxy for API requests. This is useful for avoiding CORS issues during development. When `true`, requests to `/api` on the frontend will be proxied to the URL specified in `VITE_API_BASE_URL`.
- `VITE_API_BASE_URL`: The base URL of the backend API. This is where the proxy will forward requests.
- `VITE_APP_LOCAL_URL`: The URL of the local backend. This is used when `VITE_APP_USE_PROXY` is set to `false`.

**Example `.env.local` for development with proxy:**
```bash
VITE_APP_USE_PROXY=true
VITE_API_BASE_URL=http://44.199.248.244:8080/
VITE_APP_LOCAL_URL=http://localhost:8080/
```

**Example `.env.local` for development without proxy (local backend):**
```bash
VITE_APP_USE_PROXY=false
VITE_APP_LOCAL_URL=http://localhost:8080/
```

3) Start the dev server:
```bash
npm run dev
```

## Available Scripts
- `npm run dev` - Start Vite dev server
- `npm run build` - Type-check and build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix lint errors where possible
- `npm run format` - Format with Prettier
- `npm run format:check` - Check formatting
- `npm run test` - Run tests once with Vitest
- `npm run test:ui` - Run Vitest in UI mode
- `npm run test:coverage` - Run tests with coverage
- `npm run orval` - Generate API client from OpenAPI, then format output
- `npm run orval:watch` - Watch OpenAPI spec and regenerate on change

## How It Works
- Entry point is `src/main.tsx`. It initializes:
  - React Query client
  - PrimeReact provider and styles
  - Global styles
  - API base URL via `setApiBaseUrl`
- Routes are defined in `src/routes/Routes.tsx` using React Router.
- `src/routes/ProtectedRoute.tsx` guards routes by calling `useGetUser`:
  - unauthenticated users are redirected to `/`
  - authenticated users are redirected to `/dashboard` from the login page
- Login flow:
  - `src/pages/LoginPage/LoginPage.tsx` uses `useLogin` and then verifies the session via `useGetUser`
  - UI is composed in `src/features/login`
  - Form validation uses Zod and React Hook Form
- API client:
  - Orval generates clients into `src/api/generated`
  - `src/api/http.ts` defines the Axios client and Orval mutator

## Project Structure
- `src/api` - Axios setup and generated API clients
- `src/features` - Feature modules (login)
- `src/pages` - Route-level pages
- `src/routes` - Router and route guards
- `src/styles` - Global styles
- `src/test` - Testing setup and utilities

## Tooling Notes
- Husky runs `npm run lint` and `npm run test` on pre-commit (`.husky/pre-commit`).
- Vitest is configured in `vitest.config.ts` with `jsdom` and `data-test` attributes for Testing Library.
- ESLint config lives in `eslint.config.js` and Prettier in `.prettierrc.json`.
- Orval uses `orval.config.cjs` and expects a Swagger spec at `http://localhost:8080/swagger/ttrack-be-1.0.yml` by default.

> **Developed with ❤️ by vladimirvaca 👽**