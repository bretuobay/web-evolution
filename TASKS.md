# Web Evolution Educational Suite - Implementation Tasks

This document contains ordered tasks for building the Web Evolution Educational Suite. Execute tasks in order, as later tasks depend on earlier ones.

---

## Phase 1: Foundation Setup

### Task 1.1: Initialize Turborepo Structure

**Goal**: Set up the monorepo foundation with proper workspace configuration.

**Steps**:
1. Verify turbo.json exists and configure pipelines for `dev`, `build`, `lint`, and `test`
2. Update root package.json with workspace definitions for `apps/*` and `packages/*`
3. Create the following directory structure:
   ```
   packages/
   ├── design-system/
   ├── database/
   └── shared-types/
   apps/
   ├── 1-ssr-app/
   ├── 2-api-server/
   ├── 3-jquery-app/
   ├── 4-react-app/
   ├── 5-nextjs-app/
   └── 6-mvvm-app/
   docs/
   ```
4. Initialize each directory with a package.json containing appropriate name and dependencies

**Acceptance Criteria**:
- `npm install` runs without errors
- `npx turbo build` recognizes all workspaces
- Each package/app has a valid package.json

---

### Task 1.2: Create Shared Types Package

**Goal**: Define TypeScript interfaces used across all applications.

**Steps**:
1. Create `packages/shared-types/package.json` with name `@wees/shared-types`
2. Create `packages/shared-types/src/index.ts` with the following interfaces:
   ```typescript
   export interface Product {
     id: number;
     name: string;
     description: string;
     price: number;
     quantity: number;
     categoryId: number;
     createdAt: string;
     updatedAt: string;
   }

   export interface Category {
     id: number;
     name: string;
     parentId: number | null;
     description: string;
   }

   export interface PaginatedResponse<T> {
     data: T[];
     total: number;
     page: number;
     pageSize: number;
     totalPages: number;
   }

   export interface ApiError {
     code: string;
     message: string;
     details?: Record<string, string>;
   }
   ```
3. Configure TypeScript with tsconfig.json (strict mode enabled)
4. Add build script to compile to dist/

**Acceptance Criteria**:
- Package builds without TypeScript errors
- Types are exportable via `@wees/shared-types`

---

### Task 1.3: Create Database Package

**Goal**: Set up SQLite database with schema, seed data, and TypeScript client.

**Steps**:
1. Create `packages/database/package.json` with name `@wees/database`
2. Install dependencies: `better-sqlite3`, `@types/better-sqlite3`
3. Create `packages/database/src/schema.sql`:
   ```sql
   CREATE TABLE IF NOT EXISTS categories (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     parent_id INTEGER REFERENCES categories(id),
     description TEXT,
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE TABLE IF NOT EXISTS products (
     id INTEGER PRIMARY KEY AUTOINCREMENT,
     name TEXT NOT NULL,
     description TEXT,
     price REAL NOT NULL,
     quantity INTEGER NOT NULL DEFAULT 0,
     category_id INTEGER REFERENCES categories(id),
     created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
     updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
   );

   CREATE INDEX idx_products_category ON products(category_id);
   CREATE INDEX idx_products_name ON products(name);
   ```
4. Create `packages/database/src/seed.sql` with sample inventory data (at least 20 products across 5 categories)
5. Create `packages/database/src/client.ts` with:
   - Database initialization function
   - CRUD operations for products and categories
   - Pagination helper functions
   - Search functionality
6. Export all functions and types from `packages/database/src/index.ts`

**Acceptance Criteria**:
- Database initializes and creates tables
- Seed data loads correctly
- All CRUD operations work
- Package exports are accessible via `@wees/database`

---

### Task 1.4: Create Design System Package

**Goal**: Build shared CSS system with era-specific styling.

**Steps**:
1. Create `packages/design-system/package.json` with name `@wees/design-system`
2. Create base styles in `packages/design-system/src/styles/base.css`:
   - CSS reset
   - CSS custom properties for colors, spacing, typography
   - Utility classes
3. Create era-specific styles:
   - `90s.css`: Table-based layouts feel, bright colors, beveled buttons, system fonts
   - `00s.css`: Web 2.0 gradients, rounded corners, glossy buttons, shadows
   - `10s.css`: Flat design, minimal shadows, bold colors, card-based layouts
   - `modern.css`: Subtle gradients, micro-interactions, glass morphism hints
4. Create shared component styles in `packages/design-system/src/styles/components.css`:
   - Forms (inputs, buttons, labels)
   - Tables
   - Cards
   - Navigation
   - Pagination
5. Ensure all styles meet WCAG 2.1 AA color contrast requirements

**Acceptance Criteria**:
- All CSS files are valid
- Color contrasts pass accessibility checks
- Styles are importable from the package

---

## Phase 2: API Server

### Task 2.1: Build REST API Server

**Goal**: Create the shared API backend that jQuery and React apps will consume.

**Steps**:
1. Initialize `apps/2-api-server` with Express.js and TypeScript
2. Install dependencies: `express`, `cors`, `helmet`, `express-rate-limit`
3. Create folder structure:
   ```
   src/
   ├── routes/
   │   ├── products.ts
   │   └── categories.ts
   ├── middleware/
   │   ├── errorHandler.ts
   │   ├── validation.ts
   │   └── rateLimit.ts
   ├── docs/
   │   └── openapi.yaml
   └── index.ts
   ```
4. Implement RESTful endpoints:
   - `GET /api/products` - List with pagination, search, category filter
   - `GET /api/products/:id` - Get single product
   - `POST /api/products` - Create product
   - `PUT /api/products/:id` - Update product
   - `DELETE /api/products/:id` - Delete product
   - `GET /api/categories` - List all categories
   - `GET /api/categories/:id` - Get category with products
   - `POST /api/categories` - Create category
   - `PUT /api/categories/:id` - Update category
   - `DELETE /api/categories/:id` - Delete category
5. Add proper error handling with consistent JSON error responses
6. Add request validation middleware
7. Add rate limiting (for educational demonstration)
8. Create OpenAPI/Swagger documentation in `docs/openapi.yaml`

**Acceptance Criteria**:
- All endpoints return proper JSON responses
- Error handling returns consistent error format
- Rate limiting works
- Server runs on configurable port (default 3002)

---

### Task 2.2: Create API Server README

**Goal**: Document the API server with educational content.

**Steps**:
1. Create `apps/2-api-server/README.md` following the educational README structure:
   - Historical context of REST APIs and their evolution from SOAP
   - Architectural overview with request/response flow diagram (ASCII)
   - Explanation of HTTP verbs and RESTful principles
   - Implementation notes on Express middleware pattern
   - API documentation summary
   - Discussion questions about API design

**Acceptance Criteria**:
- README is comprehensive and educational
- Includes working examples of API calls

---

## Phase 3: SSR Application (1990s-2000s Style)

### Task 3.1: Build Pure SSR Application

**Goal**: Create a server-rendered application using Express and EJS templates.

**Steps**:
1. Initialize `apps/1-ssr-app` with Express.js and EJS
2. Install dependencies: `express`, `ejs`, `express-session`, `body-parser`
3. Create MVC folder structure:
   ```
   src/
   ├── controllers/
   │   ├── productController.ts
   │   └── categoryController.ts
   ├── models/
   │   └── index.ts (re-exports from @wees/database)
   ├── views/
   │   ├── layouts/
   │   │   └── main.ejs
   │   ├── partials/
   │   │   ├── header.ejs
   │   │   ├── footer.ejs
   │   │   └── pagination.ejs
   │   ├── products/
   │   │   ├── index.ejs
   │   │   ├── show.ejs
   │   │   ├── new.ejs
   │   │   └── edit.ejs
   │   └── categories/
   │       ├── index.ejs
   │       └── show.ejs
   ├── routes/
   │   ├── products.ts
   │   └── categories.ts
   └── public/
       └── styles/
   ```
4. Implement full page reload workflows:
   - Product listing with server-side pagination
   - Product detail view
   - Create product form with server-side validation
   - Edit product form
   - Delete product (with confirmation page)
   - Category browsing
5. Use form POST submissions (no JavaScript for core functionality)
6. Add flash messages for success/error feedback
7. Include the 90s.css styling from design-system
8. Add educational comments in code explaining the MVC pattern

**Acceptance Criteria**:
- All CRUD operations work via form submissions
- No JavaScript required for core functionality
- Pages render with 90s-era styling
- Forms have server-side validation with error display

---

### Task 3.2: Create SSR App README

**Goal**: Document the SSR application with historical context.

**Steps**:
1. Create `apps/1-ssr-app/README.md` covering:
   - Historical context: PHP, Perl CGI, Classic ASP era
   - How the web worked with dial-up and server constraints
   - MVC pattern explanation with diagrams
   - Advantages (SEO, no JS dependency, simple mental model)
   - Disadvantages (poor UX, server load, full page reloads)
   - Discussion questions about when SSR is still appropriate today

**Acceptance Criteria**:
- README provides genuine historical insight
- Includes comparison with modern SSR renaissance

---

## Phase 4: jQuery Application (Mid-2000s Style)

### Task 4.1: Build jQuery SPA

**Goal**: Create a single-page application using jQuery and AJAX.

**Steps**:
1. Initialize `apps/3-jquery-app` as a static site with build tooling
2. Create folder structure:
   ```
   src/
   ├── js/
   │   ├── app.js           # Main application bootstrap
   │   ├── api.js           # AJAX API client
   │   ├── router.js        # Simple hash-based routing
   │   ├── plugins/
   │   │   ├── inventory-table.js    # Custom jQuery plugin
   │   │   └── form-validator.js     # Form validation plugin
   │   └── utils/
   │       └── helpers.js
   ├── css/
   │   └── app.css
   └── index.html           # Single HTML file
   ```
3. Install jQuery and jQuery UI via npm (use era-appropriate versions conceptually, but modern builds)
4. Implement features:
   - Hash-based routing (`#/products`, `#/products/new`, etc.)
   - AJAX calls to API server for all data operations
   - jQuery UI components (dialogs, datepickers if applicable)
   - Custom jQuery plugin for the inventory table with sorting
   - DOM manipulation for rendering (no virtual DOM)
   - Loading spinners during AJAX calls
5. Include 00s.css styling from design-system
6. Add educational comments explaining jQuery patterns and AJAX

**Acceptance Criteria**:
- All CRUD operations work via AJAX
- Hash-based navigation works
- Custom jQuery plugin is functional
- No full page reloads after initial load

---

### Task 4.2: Create jQuery App README

**Goal**: Document the jQuery application with Web 2.0 context.

**Steps**:
1. Create `apps/3-jquery-app/README.md` covering:
   - Historical context: Rise of AJAX, Gmail, Google Maps impact
   - How jQuery solved cross-browser compatibility nightmares
   - Plugin ecosystem and community contribution model
   - DOM manipulation vs. data binding comparison
   - Common pitfalls: spaghetti code, callback hell, memory leaks
   - Discussion questions about jQuery's legacy and current use

**Acceptance Criteria**:
- README captures the revolutionary nature of AJAX
- Honestly addresses jQuery's limitations

---

## Phase 5: React Application (2010s Style)

### Task 5.1: Build React SPA

**Goal**: Create a modern React application with hooks and functional components.

**Steps**:
1. Initialize `apps/4-react-app` with Vite and React + TypeScript template
2. Install dependencies: `react-router-dom`, `@tanstack/react-query` (optional for data fetching)
3. Create folder structure:
   ```
   src/
   ├── components/
   │   ├── common/
   │   │   ├── Button.tsx
   │   │   ├── Input.tsx
   │   │   ├── Table.tsx
   │   │   ├── Pagination.tsx
   │   │   └── Modal.tsx
   │   ├── products/
   │   │   ├── ProductList.tsx
   │   │   ├── ProductForm.tsx
   │   │   └── ProductCard.tsx
   │   └── categories/
   │       ├── CategoryList.tsx
   │       └── CategoryBadge.tsx
   ├── hooks/
   │   ├── useProducts.ts
   │   ├── useCategories.ts
   │   └── useApi.ts
   ├── contexts/
   │   └── AppContext.tsx
   ├── pages/
   │   ├── ProductsPage.tsx
   │   ├── ProductDetailPage.tsx
   │   ├── CategoriesPage.tsx
   │   └── NotFoundPage.tsx
   ├── utils/
   │   └── api.ts
   ├── App.tsx
   └── main.tsx
   ```
4. Implement features:
   - React Router for client-side routing
   - Context API + useReducer for state management
   - Custom hooks for data fetching
   - Component composition patterns
   - Form handling with controlled components
   - Optimistic UI updates
5. Include 10s.css styling from design-system
6. Add educational comments explaining React patterns

**Acceptance Criteria**:
- All CRUD operations work
- Client-side routing is smooth
- State management is centralized
- Components are reusable and composable

---

### Task 5.2: Create React App README

**Goal**: Document the React application with component architecture context.

**Steps**:
1. Create `apps/4-react-app/README.md` covering:
   - Historical context: Rise of SPAs, component thinking, Facebook's scale
   - Virtual DOM explanation with diagrams
   - Unidirectional data flow benefits
   - Hooks revolution and functional components
   - State management ecosystem fragmentation
   - Discussion questions about React's trade-offs

**Acceptance Criteria**:
- README explains component-based thinking clearly
- Includes comparison with jQuery approach

---

## Phase 6: Next.js Application (Modern Hybrid)

### Task 6.1: Build Next.js Application

**Goal**: Create a modern hybrid application using Next.js App Router.

**Steps**:
1. Initialize `apps/5-nextjs-app` with `create-next-app` (App Router, TypeScript)
2. Create folder structure:
   ```
   src/
   ├── app/
   │   ├── layout.tsx
   │   ├── page.tsx
   │   ├── products/
   │   │   ├── page.tsx              # Server Component - list
   │   │   ├── [id]/
   │   │   │   └── page.tsx          # Server Component - detail
   │   │   ├── new/
   │   │   │   └── page.tsx          # Has Client Component form
   │   │   └── loading.tsx           # Streaming loading state
   │   ├── categories/
   │   │   └── page.tsx
   │   └── api/
   │       └── [...] (optional internal API routes)
   ├── components/
   │   ├── server/
   │   │   ├── ProductTable.tsx
   │   │   └── CategoryNav.tsx
   │   └── client/
   │       ├── ProductForm.tsx       # 'use client'
   │       ├── SearchBar.tsx         # 'use client'
   │       └── DeleteButton.tsx      # 'use client'
   └── lib/
       ├── db.ts                     # Server-side database access
       └── actions.ts                # Server Actions
   ```
3. Implement features:
   - Server Components for data fetching (direct database access)
   - Client Components only where interactivity needed
   - Server Actions for mutations
   - Streaming SSR with loading.tsx
   - Proper error boundaries
   - Image optimization with next/image
   - Metadata API for SEO
5. Include modern.css styling from design-system
6. Add educational comments contrasting with pure client-side React

**Acceptance Criteria**:
- Mix of Server and Client Components is clear
- Server Actions handle mutations
- Streaming loading states work
- SEO metadata is present

---

### Task 6.2: Create Next.js App README

**Goal**: Document the Next.js application explaining the SSR renaissance.

**Steps**:
1. Create `apps/5-nextjs-app/README.md` covering:
   - Historical context: Return to server rendering, but smarter
   - React Server Components explanation
   - When to use Server vs Client Components
   - Streaming and Suspense benefits
   - Comparison with original SSR app (full circle)
   - Edge computing implications
   - Discussion questions about the future of web architecture

**Acceptance Criteria**:
- README explains the "why" of modern SSR
- Shows the evolution from App 1 to App 5

---

## Phase 7: MVVM Application

### Task 7.1: Build MVVM Application

**Goal**: Create an MVVM implementation demonstrating two-way data binding.

**Steps**:
1. Initialize `apps/6-mvvm-app` (can use Vue.js as MVVM example, or custom implementation)
2. If using Vue.js, create folder structure:
   ```
   src/
   ├── viewmodels/
   │   ├── ProductListViewModel.ts
   │   ├── ProductFormViewModel.ts
   │   └── CategoryViewModel.ts
   ├── views/
   │   ├── ProductListView.vue
   │   ├── ProductFormView.vue
   │   └── CategoryView.vue
   ├── models/
   │   └── index.ts
   ├── bindings/
   │   └── README.md (explain Vue's reactivity as binding system)
   └── App.vue
   ```
3. If custom implementation, create:
   - Observable class for reactive data
   - ViewModel base class
   - Simple templating with data binding syntax
   - Computed properties implementation
4. Implement features:
   - Two-way binding for forms
   - Computed/derived properties
   - ViewModel mediating between View and Model
   - Observable collections for lists
5. Include appropriate era styling
6. Add extensive comments explaining MVVM concepts

**Acceptance Criteria**:
- Two-way data binding is demonstrated
- ViewModel pattern is clear
- Computed properties work reactively

---

### Task 7.2: Create MVVM App README

**Goal**: Document the MVVM application with pattern context.

**Steps**:
1. Create `apps/6-mvvm-app/README.md` covering:
   - Historical context: Knockout.js, Silverlight/WPF origins
   - MVVM vs MVC vs MVP comparison with diagrams
   - Two-way binding pros and cons
   - Modern resurgence in SwiftUI, Jetpack Compose
   - Why Vue.js is often called MVVM
   - Discussion questions about binding complexity

**Acceptance Criteria**:
- README explains MVVM clearly
- Pattern comparison is educational

---

## Phase 8: Documentation and Polish

### Task 8.1: Create Evolution Timeline Document

**Goal**: Build the historical progression documentation.

**Steps**:
1. Create `docs/evolution-timeline.md` with:
   - ASCII/text timeline from 1990s to present
   - Key technology releases with dates
   - Dominant architectural patterns per era
   - Browser capability milestones
   - Internet adoption statistics

**Acceptance Criteria**:
- Timeline is accurate and educational
- Connects to each app in the suite

---

### Task 8.2: Create Comparison Table Document

**Goal**: Build feature and technology comparison across all apps.

**Steps**:
1. Create `docs/comparison-table.md` with tables comparing:
   - Technologies used
   - Bundle sizes (where applicable)
   - Lines of code per app
   - Development complexity
   - Runtime performance characteristics
   - SEO capabilities
   - Accessibility approach
   - Testing approach

**Acceptance Criteria**:
- Comparisons are fair and educational
- Trade-offs are clearly explained

---

### Task 8.3: Create Teaching Guide

**Goal**: Build instructor documentation for using the suite.

**Steps**:
1. Create `docs/teaching-guide.md` with:
   - Suggested course structure (12-week curriculum)
   - Learning objectives per app
   - Hands-on exercises
   - Discussion prompts
   - Assessment ideas
   - Prerequisites for students

**Acceptance Criteria**:
- Guide is practical for educators
- Includes concrete exercises

---

### Task 8.4: Create Root README

**Goal**: Build comprehensive project README.

**Steps**:
1. Update root `README.md` with:
   - Project overview and purpose
   - Quick start instructions
   - Architecture diagram (ASCII)
   - Links to all apps with descriptions
   - Contributing guidelines
   - License information

**Acceptance Criteria**:
- README enables quick project understanding
- Setup instructions work

---

## Phase 9: Testing and Accessibility

### Task 9.1: Add Unit Tests

**Goal**: Add tests for shared packages and business logic.

**Steps**:
1. Set up Vitest as test runner in root
2. Add unit tests for `@wees/database` CRUD operations
3. Add unit tests for API server endpoints
4. Add component tests for React app
5. Ensure all tests run via `npx turbo test`

**Acceptance Criteria**:
- Tests pass
- Coverage for critical paths

---

### Task 9.2: Add Accessibility Tests

**Goal**: Ensure all apps meet WCAG 2.1 AA.

**Steps**:
1. Install axe-core for accessibility testing
2. Add accessibility tests for each app
3. Fix any accessibility violations found
4. Document accessibility approach in each app

**Acceptance Criteria**:
- All apps pass axe-core automated checks
- Manual accessibility review completed

---

## Execution Notes for LLM Agent

1. **Execute tasks in order** - Later tasks depend on earlier ones
2. **Verify each task** before moving to the next
3. **Use the shared packages** - Don't duplicate code across apps
4. **Maintain educational focus** - Add comments explaining patterns
5. **Test as you go** - Verify functionality before proceeding
6. **Ask for clarification** if requirements are ambiguous
7. **Commit after each major task** with descriptive messages
