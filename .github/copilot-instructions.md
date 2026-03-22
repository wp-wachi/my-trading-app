# GitHub Copilot Instructions — My Trading App

This file provides context and conventions for GitHub Copilot to assist with this project more effectively.

---

## Project Overview

**My Trading App** is a Next.js web application designed for trading-related features such as market data display, portfolio management, order tracking, and financial analytics. The project is currently in its early development stage and is being built with a modern React/Next.js stack.

---

## Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.x |
| UI Library | React | 19.x |
| Language | TypeScript | 5.x (strict) |
| Styling | Tailwind CSS | v4 |
| Linting | ESLint + eslint-config-next | 9.x |
| Package Manager | npm | latest |

---

## Project Structure

```
my-trading-app/
├── .github/
│   └── copilot-instructions.md   # This file
├── public/                        # Static assets (SVGs, icons, images)
├── src/
│   ├── app/                       # Next.js App Router root
│   │   ├── layout.tsx             # Root layout (fonts, metadata, providers)
│   │   ├── page.tsx               # Home page
│   │   ├── globals.css            # Global styles + Tailwind imports
│   │   ├── (auth)/                # Auth route group (future)
│   │   ├── (dashboard)/           # Dashboard route group (future)
│   │   ├── api/                   # API Route Handlers (future)
│   │   └── fonts/                 # Local font files (Geist)
│   ├── components/                # Reusable UI components (future)
│   │   ├── ui/                    # Primitive/atomic components (buttons, inputs)
│   │   └── charts/                # Trading chart components
│   ├── hooks/                     # Custom React hooks (future)
│   ├── lib/                       # Utility functions and shared logic (future)
│   ├── types/                     # Global TypeScript types and interfaces (future)
│   └── constants/                 # App-wide constants (future)
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

> When adding new features, follow the above structure. Create directories as needed, starting with `src/components/`, `src/hooks/`, `src/lib/`, and `src/types/`.

---

## Coding Standards

### TypeScript

- **Strict mode is enabled** — always define explicit types for function parameters and return values.
- Prefer `interface` over `type` for object shapes; use `type` for unions, intersections, and primitives.
- Use the `@/` path alias for all internal imports (e.g., `import { Button } from '@/components/ui/Button'`).
- Never use `any`. Use `unknown` for dynamic data and narrow types explicitly.
- Export types and interfaces from a dedicated `src/types/` directory when shared across multiple files.

```typescript
// ✅ Good
interface Trade {
  id: string;
  symbol: string;
  quantity: number;
  price: number;
  side: 'buy' | 'sell';
  timestamp: Date;
}

async function fetchTrades(userId: string): Promise<Trade[]> { ... }

// ❌ Avoid
function fetchTrades(userId: any): any { ... }
```

### React & Components

- Use **functional components** with TypeScript. Never use class components.
- Use **named exports** for components; use default exports only for Next.js page and layout files.
- Keep components small and focused — extract sub-components when a component exceeds ~150 lines.
- Define prop types using `interface` directly above the component.
- Use the `'use client'` directive only when the component needs browser APIs, event handlers, or React state/effects. Prefer Server Components for data fetching.

```typescript
// ✅ Good — Server Component (no directive needed)
interface MarketCardProps {
  symbol: string;
  price: number;
  change: number;
}

export function MarketCard({ symbol, price, change }: MarketCardProps) {
  return (
    <div className="rounded-lg border p-4">
      <h3 className="font-semibold">{symbol}</h3>
      <p>${price.toFixed(2)}</p>
    </div>
  );
}
```

### File & Directory Naming

| Item | Convention | Example |
|---|---|---|
| Pages / Layouts | `kebab-case` directory + `page.tsx` | `app/portfolio/page.tsx` |
| Components | `PascalCase.tsx` | `MarketCard.tsx` |
| Hooks | `camelCase` prefixed with `use` | `useMarketData.ts` |
| Utilities | `camelCase.ts` | `formatCurrency.ts` |
| Types | `PascalCase.ts` | `Trade.ts` or `types.ts` |
| Constants | `UPPER_SNAKE_CASE` for values | `const MAX_RETRIES = 3` |
| API route files | `route.ts` inside named directory | `app/api/trades/route.ts` |

---

## Styling with Tailwind CSS v4

- Use **Tailwind utility classes** directly in JSX. Avoid writing custom CSS unless truly necessary.
- Define design tokens (colors, spacing, fonts) in `globals.css` using CSS custom properties as Tailwind v4 theme configuration.
- Use the `cn()` utility (from `clsx` + `tailwind-merge` when added) to merge conditional class names.
- Prefer responsive variants (`sm:`, `md:`, `lg:`) over fixed pixel sizes.
- For dark mode, use the `dark:` variant; CSS variables for light/dark themes are already defined in `globals.css`.

```typescript
// ✅ Good
<div className="flex flex-col gap-4 p-6 bg-white dark:bg-zinc-900 rounded-xl shadow-sm">

// ✅ Conditional classes (after adding clsx/tailwind-merge)
import { cn } from '@/lib/utils';
<button className={cn('px-4 py-2 rounded', isActive && 'bg-blue-600 text-white')} />
```

---

## Next.js App Router Conventions

- **Route groups** using `(groupName)` folders keep routes organized without affecting URL paths.
- Use `layout.tsx` for shared UI within a route segment (navigation, sidebars).
- Use `loading.tsx` for skeleton/spinner UI per route segment.
- Use `error.tsx` for per-segment error boundaries.
- Use `not-found.tsx` for custom 404 pages.
- Fetch data in **Server Components** using `async/await` directly — no `useEffect` for data fetching in server components.
- Use Next.js `fetch` with caching options for server-side data: `fetch(url, { cache: 'no-store' })` for real-time market data.

```typescript
// ✅ Good — Server Component data fetching
export default async function PortfolioPage() {
  const portfolio = await fetchPortfolio(); // server-side, no useEffect
  return <PortfolioView data={portfolio} />;
}
```

---

## API Route Handlers

- Place all API routes under `src/app/api/`.
- One file per endpoint: `src/app/api/trades/route.ts`.
- Export named HTTP method functions: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`.
- Always return typed `NextResponse` objects with appropriate HTTP status codes.
- Validate request bodies before processing.

```typescript
// src/app/api/trades/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const trades = await getTrades();
    return NextResponse.json(trades, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch trades' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  // validate body...
  return NextResponse.json({ id: 'new-trade-id' }, { status: 201 });
}
```

---

## Custom Hooks

- Place custom hooks in `src/hooks/`.
- Prefix with `use`: `useMarketData`, `usePortfolio`, `useWebSocket`.
- Each hook should have a single responsibility.
- Return typed objects with named properties rather than arrays (except for simple `[value, setter]` pairs).

```typescript
// src/hooks/useMarketData.ts
'use client';

interface UseMarketDataReturn {
  price: number | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}

export function useMarketData(symbol: string): UseMarketDataReturn {
  // ...
}
```

---

## State Management

- Use **React Server Components** for server state wherever possible.
- Use **React `useState` / `useReducer`** for local component state.
- For global client state (e.g., selected instrument, user preferences), use **React Context** with a typed provider.
- For complex async state (data fetching, caching), consider adding **TanStack Query (React Query)** when the project grows.
- Avoid prop drilling beyond 2 levels — use context or co-location.

---

## Environment Variables

- All environment variables must be defined in `.env.local` (never committed to Git — already in `.gitignore`).
- Create a `.env.example` file listing all required variables with placeholder values.
- Variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`.
- Access server-only variables only in Server Components, API routes, or server actions.

```bash
# .env.example
NEXT_PUBLIC_API_BASE_URL=https://api.example.com
DATABASE_URL=postgresql://user:password@localhost:5432/trading_app
NEXTAUTH_SECRET=your-secret-here
NEXTAUTH_URL=http://localhost:3000
```

---

## Error Handling

- Always wrap async operations in `try/catch`.
- In API routes, return structured error responses: `{ error: string, code?: string }`.
- In Server Components, let errors bubble to the nearest `error.tsx` boundary.
- Never expose internal error details (stack traces, DB errors) to the client.
- Log errors server-side for debugging.

---

## Performance Guidelines

- Prefer **Server Components** to reduce client-side JavaScript bundle size.
- Use `next/image` (`<Image />`) for all images — never raw `<img>` tags.
- Use `next/link` (`<Link />`) for all internal navigation — never raw `<a>` tags for internal routes.
- Use `next/font` for custom fonts (already set up with Geist).
- For trading charts and heavy visualizations, load them with `dynamic()` and `{ ssr: false }`.

```typescript
import dynamic from 'next/dynamic';

const TradingChart = dynamic(() => import('@/components/charts/TradingChart'), {
  ssr: false,
  loading: () => <div className="h-64 animate-pulse bg-zinc-100 rounded" />,
});
```

---

## Git & Pull Request Conventions

- Branch naming: `feature/short-description`, `fix/bug-description`, `chore/task-description`
- Commit messages: Use conventional commits format
  - `feat: add portfolio summary card`
  - `fix: correct price formatting for non-USD symbols`
  - `chore: update dependencies`
  - `refactor: extract market data hook`
- Keep PRs focused — one feature or fix per PR.
- Always test your changes locally (`npm run dev`) before opening a PR.
- Run `npm run lint` before committing.

---

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Type-check (no emit)
npx tsc --noEmit
```

---

## Trading App Domain Glossary

To help Copilot understand domain-specific terminology used in this project:

| Term | Description |
|---|---|
| **Symbol** | A ticker/instrument identifier (e.g., `BTCUSDT`, `AAPL`) |
| **Order** | A request to buy or sell a financial instrument |
| **Trade** | A completed transaction between buyer and seller |
| **Portfolio** | Collection of assets held by a user |
| **Position** | Open holding of an asset (size + entry price) |
| **PnL** | Profit and Loss — realized or unrealized |
| **Bid/Ask** | Best buy / best sell price currently available |
| **Spread** | Difference between bid and ask price |
| **Candle / OHLCV** | Open, High, Low, Close, Volume — standard price data format |
| **Orderbook** | List of all outstanding buy and sell orders at various price levels |
| **Market order** | Order executed immediately at current market price |
| **Limit order** | Order to buy/sell at a specific price or better |
