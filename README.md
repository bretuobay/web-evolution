# Web Evolution Educational Suite (WEES)

An educational monorepo demonstrating the evolution of web development from the 1990s to present through a unified inventory management application built with different architectural paradigms.

```
1990s              2000s              2010s              2020s
  |                  |                  |                  |
  v                  v                  v                  v
+--------+      +----------+      +---------+      +----------+
|  SSR   | ---> |  jQuery  | ---> |  React  | ---> | Next.js  |
|  EJS   |      |  AJAX    |      |  SPA    |      |  Hybrid  |
+--------+      +----------+      +---------+      +----------+
    |                |                  |                |
    +----------------+------------------+----------------+
                            |
                    Same Inventory App
                    Different Paradigms
```

## Purpose

This suite is designed for **computer science students, junior developers, and web enthusiasts** who want to understand:

- How web architectures have evolved over three decades
- The trade-offs between different approaches (SSR, SPA, Hybrid)
- Why certain technologies emerged and what problems they solved
- Practical implementation differences between eras

## Quick Start

```bash
# Install dependencies
npm install

# Run all apps in development
npx turbo dev

# Run a specific app
npx turbo dev --filter=1-ssr-app

# Build all apps
npx turbo build
```

## Applications

| App | Era | Pattern | Port | Description |
|-----|-----|---------|------|-------------|
| [1-ssr-app](./apps/1-ssr-app) | 1990s-2000s | MVC | 3001 | Pure server-side rendering with Express + EJS |
| [2-api-server](./apps/2-api-server) | 2000s+ | REST | 3002 | RESTful API backend for client apps |
| [3-jquery-app](./apps/3-jquery-app) | Mid-2000s | Plugin-based | 3003 | jQuery SPA with AJAX |
| [4-react-app](./apps/4-react-app) | 2010s | Component-based | 3004 | React SPA with hooks and functional components |
| [5-nextjs-app](./apps/5-nextjs-app) | 2020s | Hybrid SSR/CSR | 3005 | Next.js App Router with Server Components |
| 6-mvvm-app | TBD | MVVM | 3006 | Two-way data binding demonstration |

## Architecture

```
web-evolution/
├── packages/
│   ├── design-system/     # Era-specific CSS (90s, 00s, 10s, modern)
│   ├── database/          # Shared SQLite database & CRUD operations
│   └── shared-types/      # TypeScript interfaces
├── apps/
│   ├── 1-ssr-app/         # Express + EJS (full page reloads)
│   ├── 2-api-server/      # REST API (serves 3-6)
│   ├── 3-jquery-app/      # jQuery + AJAX (Web 2.0 style)
│   ├── 4-react-app/       # React + Vite (component architecture)
│   ├── 5-nextjs-app/      # Next.js (Server Components)
│   └── 6-mvvm-app/        # MVVM pattern
└── docs/                  # Educational documentation
```

### Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend Apps                         │
├─────────────┬─────────────┬─────────────┬─────────────┬─────┤
│   1-ssr     │  3-jquery   │  4-react    │  5-nextjs   │ ... │
│   (direct)  │   (AJAX)    │   (fetch)   │  (direct +  │     │
│             │             │             │   actions)  │     │
└──────┬──────┴──────┬──────┴──────┬──────┴──────┬──────┴─────┘
       │             │             │             │
       │             └──────┬──────┘             │
       │                    │                    │
       │           ┌────────▼────────┐          │
       │           │  2-api-server   │          │
       │           │   (REST API)    │          │
       │           └────────┬────────┘          │
       │                    │                    │
       └───────────┬────────┴────────┬──────────┘
                   │                 │
            ┌──────▼─────────────────▼──────┐
            │      @wees/database           │
            │        (SQLite)               │
            └───────────────────────────────┘
```

## Shared Packages

### @wees/database

Shared SQLite database with:
- Schema and seed data for inventory management
- TypeScript client with CRUD operations
- Pagination and search utilities

### @wees/design-system

Era-specific styling system:
- `base.css` - CSS variables, resets, utilities
- `90s.css` - Geocities-style (beveled buttons, bright colors)
- `00s.css` - Web 2.0 (gradients, rounded corners, glossy)
- `10s.css` - Flat design (minimal shadows, bold colors)
- `modern.css` - Current trends (subtle gradients, glass morphism)
- `components.css` - Shared component styles (tables, forms, cards)

### @wees/shared-types

TypeScript interfaces for Product, Category, and API responses.

## Core Commands

```bash
# Development
npm install              # Install all dependencies
npx turbo dev            # Run all apps
npx turbo dev --filter=1-ssr-app  # Run specific app

# Building
npx turbo build          # Build all apps
npx turbo build --filter=4-react-app  # Build specific app

# Testing
npx turbo test           # Run all tests
npx turbo lint           # Lint all code
```

## The Evolution Story

### 1990s-2000s: Server-Side Rendering
The web began with servers doing all the work. Technologies like PHP, Perl CGI, and ASP generated complete HTML pages for every request. Users experienced full page reloads for every interaction.

**App 1 demonstrates:** MVC pattern, form POST submissions, server-side validation, session-based state.

### Mid-2000s: AJAX Revolution
jQuery and AJAX changed everything. Gmail and Google Maps showed that web apps could feel like desktop applications. No more full page reloads!

**App 3 demonstrates:** AJAX calls, jQuery plugins, hash-based routing, DOM manipulation.

### 2010s: Component Era
React introduced the Virtual DOM and component-based thinking. Single Page Applications became the norm. State management became both powerful and complex.

**App 4 demonstrates:** Functional components, hooks, React Router, Context API, React Query.

### 2020s: The Hybrid Renaissance
We've come full circle. Modern frameworks like Next.js combine server rendering with client interactivity. Server Components fetch data directly; client components handle interactivity.

**App 5 demonstrates:** Server Components, Server Actions, streaming SSR, hybrid rendering.

## Educational Resources

Each app includes a detailed README with:
- **Historical Context** - When and why this approach was dominant
- **Architectural Overview** - Data flow diagrams and patterns
- **Implementation Notes** - How it differs from other approaches
- **Discussion Questions** - For classroom or self-study

## Core Principles

1. **Educational First** - Code clarity over optimization
2. **Historical Accuracy** - Technologies represented as they were used
3. **Progressive Disclosure** - Start simple, add complexity
4. **Accessibility** - All apps meet WCAG 2.1 AA standards
5. **Consistency** - Same business logic, different implementations

## Tech Stack

- **Language:** TypeScript (strict mode)
- **Runtime:** Node.js 24
- **Monorepo:** Turborepo
- **Database:** SQLite (shared)
- **Apps:** Express/EJS, jQuery, React/Vite, Next.js

## Contributing

Contributions are welcome! Please ensure:
- Code includes educational comments explaining patterns
- Accessibility standards are maintained
- The same inventory management features are implemented
- READMEs follow the established structure

## License

MIT

---

Built for learning. Built for understanding. Built to show how far we've come.
