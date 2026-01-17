# CLAUDE.md - Web Evolution Educational Suite

## Project Overview

This is the **Web Evolution Educational Suite (WEES)** - an educational monorepo demonstrating the evolution of web development from the 1990s to present through a unified inventory management application built with different architectural paradigms.

**Target Audience**: Computer science students, junior developers, and web enthusiasts

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Runtime**: Node.js 24
- **Monorepo Tool**: Turborepo
- **Database**: SQLite (shared across all apps)
- **Apps**: Express/EJS, jQuery, React, Next.js, MVVM

## Repository Structure

```
web-evolution/
├── packages/
│   ├── design-system/     # Shared styling and era-specific CSS
│   ├── database/          # SQLite client, schema, models
│   └── shared-types/      # Shared TypeScript definitions
├── apps/
│   ├── 1-ssr-app/         # Pure SSR (Express + EJS) - 1990s-2000s
│   ├── 2-api-server/      # REST API backend
│   ├── 3-jquery-app/      # jQuery SPA - Mid-2000s
│   ├── 4-react-app/       # React SPA - 2010s
│   ├── 5-nextjs-app/      # Next.js hybrid - Modern
│   └── 6-mvvm-app/        # MVVM implementation
└── docs/                  # Educational documentation
```

## Core Commands

```bash
# Install dependencies
npm install

# Run all apps in development
npx turbo dev

# Run a specific app
npx turbo dev --filter=1-ssr-app

# Build all apps
npx turbo build

# Run tests
npx turbo test

# Lint code
npx turbo lint
```

## Development Guidelines

### Code Standards

- TypeScript strict mode is enabled across all packages
- ESLint configuration varies per era-appropriateness
- All implementations must meet WCAG 2.1 AA accessibility standards
- Use semantic HTML structure
- Comment code to explain era-specific patterns for educational value

### Core Principles

1. **Educational First**: Code should be readable and pedagogically valuable over optimized
2. **Historical Accuracy**: Represent technologies as they were used in their era
3. **Progressive Disclosure**: Start simple, add complexity gradually
4. **Consistency**: Same business logic (inventory CRUD), different implementations

### What NOT to Prioritize

- Production-ready optimizations (clarity > performance)
- Legacy browser support
- Comprehensive feature parity (focus on architectural patterns)

## Application Features (All Apps)

Each app implements the same inventory management system:
- **Product Management**: CRUD operations
- **Categories**: Hierarchical product categorization
- **Search & Filter**: Name search, category filter
- **Pagination**: Server-side or client-side based on era
- **Form Validation**: Era-appropriate techniques
- **Responsive Design**: Mobile-friendly using era techniques

## App-Specific Patterns

| App | Pattern | Key Technologies |
|-----|---------|-----------------|
| 1-ssr-app | MVC | Express, EJS, server-side forms |
| 2-api-server | REST | Express, JWT, JSON responses |
| 3-jquery-app | Plugin-based | jQuery, Bootstrap, AJAX |
| 4-react-app | Component-based | React, Vite, React Router |
| 5-nextjs-app | Hybrid SSR/CSR | Next.js App Router, Server Components |
| 6-mvvm-app | MVVM | Two-way binding, ViewModels |

## Database

All apps share a single SQLite database from the `packages/database` package:
- Schema defined in `packages/database/src/schema.sql`
- Seed data in `packages/database/src/seed.sql`
- TypeScript client in `packages/database/src/client.ts`
- Shared interfaces in `packages/database/src/models/`

## Design System

The `packages/design-system` provides era-specific styling:
- `base.css` - CSS custom properties, resets
- `90s.css` - Geocities-style
- `00s.css` - Web 2.0 style
- `10s.css` - Flat design
- `modern.css` - Current trends

## Testing Strategy

- Unit tests for business logic
- Integration tests for data flow
- Accessibility testing with axe-core
- Cross-browser testing for era-relevant browsers

## Educational README Structure

Each app's README should follow this structure:
1. Historical Context (when dominant, what problems solved)
2. Architectural Overview (data flow diagram, patterns)
3. Implementation Notes (differences from previous approach)
4. Running the Application
5. Discussion Questions

## When Making Changes

- Maintain educational clarity over code elegance
- Add comments explaining era-specific patterns
- Ensure accessibility compliance (WCAG 2.1 AA)
- Keep business logic consistent across apps
- Update relevant README with implementation notes
