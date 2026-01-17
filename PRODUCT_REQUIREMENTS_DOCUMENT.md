# Web Evolution Educational Suite: Product Requirements Document

## 1. Overview

**Project Name**: Web Evolution Educational Suite (WEES)
**Purpose**: An educational tool demonstrating the evolution of web development from the 1990s to present through a unified inventory management application built with different architectural paradigms.
**Target Audience**: Computer science students, junior developers, and web enthusiasts
**Tech Stack**: TypeScript, Node.js 24, TurboRepo, SQLite, EJS, jQuery, React, Next.js
**Repository Structure**: Monorepo managed with Turborepo

## 2. Goals & Non-Goals

### Goals:

- Demonstrate historical progression of web architectures
- Show practical implementation differences between eras
- Maintain consistent UI/UX across implementations for fair comparison
- Provide educational commentary on each approach
- Enable side-by-side comparison of trade-offs

### Non-Goals:

- Production-ready code (educational clarity > optimization)
- Support for legacy browsers
- Comprehensive feature parity (focus on architectural patterns)

## 3. Core Principles

1. **Educational First**: Code should be readable and pedagogically valuable
2. **Historical Accuracy**: Represent technologies as they were used in their era
3. **Progressive Disclosure**: Start simple, add complexity gradually
4. **Accessibility**: All implementations must meet WCAG 2.1 AA standards
5. **Consistency**: Same business logic, different implementations

## 4. Repository Structure

```
web-evolution-educational-suite/
├── packages/
│   ├── design-system/          # Shared styling and components
│   │   ├── src/
│   │   │   ├── styles/
│   │   │   │   ├── base.css    # CSS custom properties, resets
│   │   │   │   ├── 90s.css     # Geocities-style styling
│   │   │   │   ├── 00s.css     # Web 2.0 styling
│   │   │   │   ├── 10s.css     # Flat design
│   │   │   │   └── modern.css  # Current design trends
│   │   │   └── components/     # Era-agnostic UI components
│   │   └── package.json
│   │
│   ├── database/              # Shared SQLite database
│   │   ├── src/
│   │   │   ├── schema.sql     # Database schema
│   │   │   ├── seed.sql       # Sample data
│   │   │   ├── client.ts      # Database client wrapper
│   │   │   └── models/        # Shared TypeScript interfaces
│   │   └── package.json
│   │
│   └── shared-types/          # Shared TypeScript definitions
│       └── package.json
│
├── apps/
│   ├── 1-ssr-app/            # Pure SSR (PHP/Perl style)
│   │   ├── src/
│   │   │   ├── controllers/   # MVC controllers
│   │   │   ├── models/        # Data models
│   │   │   ├── views/         # EJS templates
│   │   │   ├── routes/        # Express routes
│   │   │   └── public/        # Static assets
│   │   ├── README.md         # Historical context & notes
│   │   └── package.json
│   │
│   ├── 2-api-server/         # REST API backend
│   │   ├── src/
│   │   │   ├── routes/        # API endpoints
│   │   │   ├── middleware/    # Auth, validation, etc.
│   │   │   └── docs/          # OpenAPI/Swagger docs
│   │   ├── README.md         # API design evolution notes
│   │   └── package.json
│   │
│   ├── 3-jquery-app/         # jQuery SPA
│   │   ├── src/
│   │   │   ├── js/
│   │   │   │   ├── app.js     # Main application
│   │   │   │   ├── plugins/   # jQuery plugins
│   │   │   │   └── utils/     # Utility functions
│   │   │   └── index.html     # Single HTML file
│   │   ├── README.md         # jQuery era documentation
│   │   └── package.json
│   │
│   ├── 4-react-app/          # React SPA
│   │   ├── src/
│   │   │   ├── components/    # React components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── contexts/      # React context
│   │   │   └── utils/         # Helper functions
│   │   ├── README.md         # Component architecture notes
│   │   └── package.json
│   │
│   ├── 5-nextjs-app/         # Next.js hybrid
│   │   ├── src/
│   │   │   ├── app/          # App router pages
│   │   │   ├── components/   # Server/client components
│   │   │   └── lib/          # Server-side utilities
│   │   ├── README.md         # Modern SSR renaissance notes
│   │   └── package.json
│   │
│   └── 6-mvvm-app/           # MVVM implementation
│       ├── src/
│       │   ├── viewmodels/   # ViewModel classes
│       │   ├── views/        # Templates
│       │   ├── models/       # Data models
│       │   └── bindings/     # Data binding system
│       ├── README.md         # MVVM philosophy notes
│       └── package.json
│
├── docs/
│   ├── evolution-timeline.md # Historical progression
│   ├── comparison-table.md   # Feature/tech comparison
│   └── teaching-guide.md     # How to use for education
│
├── turbo.json               # Turborepo configuration
├── package.json
└── README.md
```

## 5. Application Specifications

### 5.1 Inventory App Core Features (All Implementations)

- **Product Management**: CRUD operations for shop inventory
- **Categories**: Product categorization with hierarchical support
- **Search & Filter**: Basic search by name, category filter
- **Pagination**: Server-side or client-side based on era
- **Form Validation**: Era-appropriate validation techniques
- **Responsive Design**: Mobile-friendly using era-appropriate techniques

### 5.2 App 1: Pure SSR Application (1990s-2000s Style)

**Tech**: Express.js + EJS + Server-side forms
**Pattern**: MVC (Model-View-Controller)
**Characteristics**:

- Full page reloads on every interaction
- Form submissions via POST with server-side processing
- No client-side JavaScript for core functionality
- Session-based authentication (simulated)
- Progressive enhancement optional (for advanced demo)

**Educational Notes**:

- How PHP/Perl/ASP dominated early web
- Advantages: SEO-friendly, no JS dependency
- Disadvantages: Poor UX, high server load
- Historical context: Dial-up limitations, server costs
- Alternatives: Java Servlets, ColdFusion, Classic ASP

### 5.3 App 2: API Server

**Tech**: Express.js + RESTful API
**Purpose**: Serve data to client-side apps
**Features**:

- RESTful endpoints with proper HTTP verbs
- JSON responses with consistent error handling
- Basic authentication (JWT for modern, session for historical context)
- Rate limiting demonstration
- API versioning example

### 5.4 App 3: jQuery Application (Mid-2000s Style)

**Tech**: jQuery + Bootstrap (era-appropriate version)
**Pattern**: Plugin-based architecture
**Characteristics**:

- AJAX calls to API server
- jQuery UI for interactive components
- Plugin system demonstration (custom inventory plugins)
- DOM manipulation vs. data binding discussion
- Progressive enhancement principles

**Educational Notes**:

- How jQuery solved cross-browser compatibility
- The rise of AJAX and Web 2.0
- Plugin ecosystem impact
- Limitations: "Spaghetti code", manual DOM updates
- Alternatives: MooTools, Prototype.js, Dojo Toolkit

### 5.5 App 4: React Application (2010s Style)

**Tech**: React + TypeScript + Vite
**Pattern**: Component-based architecture
**Characteristics**:

- Functional components with hooks
- Client-side routing (React Router)
- State management (Context API + useReducer)
- Component composition patterns
- Virtual DOM explanation

**Educational Notes**:

- Component reusability benefits
- Unidirectional data flow
- Virtual DOM vs direct DOM manipulation
- Ecosystem fragmentation (state management solutions)
- Alternatives: Angular 2+, Vue.js, Ember.js

### 5.6 App 5: Next.js Application (Modern Hybrid)

**Tech**: Next.js 14+ (App Router)
**Pattern**: Hybrid rendering (SSR + CSR)
**Characteristics**:

- Server Components for data fetching
- Client Components for interactivity
- Streaming SSR demonstration
- Built-in optimizations (Image, Script components)
- API Routes within same app

**Educational Notes**:

- Return to SSR benefits (SEO, performance)
- Modern hybrid approach advantages
- Edge computing implications
- Partial hydration concepts
- Meta-frameworks trend (Nuxt, SvelteKit)

### 5.7 App 6: MVVM Implementation (Personal Take)

**Tech**: Custom implementation or Vue.js (as MVVM example)
**Pattern**: Model-View-ViewModel
**Characteristics**:

- Two-way data binding demonstration
- ViewModel as mediator between Model and View
- Observable pattern implementation
- Computed properties demonstration

**Educational Notes**:

- MVVM historical context (Knockout.js, Silverlight)
- Comparison with MVC and MVP
- Modern resurgence in SwiftUI, Jetpack Compose
- Two-way binding pros/cons
- Alternatives: Backbone.js, Ember.js, Aurelia

## 6. Shared Packages Specifications

### 6.1 Design System Package

**Purpose**: Consistent styling across eras with era-specific adaptations
**Features**:

- CSS custom properties for theming
- Era-specific CSS classes (`.90s-table`, `.modern-card`)
- Accessible component templates
- Responsive grid system (different per era)
- Typography scales for each era
- Icon system (font-based for old, SVG for new)

### 6.2 Database Package

**Purpose**: Single SQLite database shared across all apps
**Features**:

- TypeScript interfaces for all tables
- Connection pooling management
- Migration system (for educational purposes)
- Seed data representing different eras
- Utility functions for each app type

## 7. Educational Content Requirements

### 7.1 README Structure for Each App

```
# [App Name] - [Era]

## Historical Context
- When was this approach dominant?
- What problems did it solve?
- Key technologies of the era

## Architectural Overview
- Diagram of data flow
- Key patterns used
- Folder structure explanation

## Implementation Notes
- How this differs from previous approach
- Trade-offs made
- Notable code decisions

## Running the Application
- Specific setup instructions
- Era-appropriate tooling

## Discussion Questions
1. What UX limitations exist in this approach?
2. How does this affect developer workflow?
3. What scalability concerns emerge?
```

### 7.2 Comparison Metrics (Track for Each App)

- Initial page load time
- Time to interactive
- Bundle size (where applicable)
- Lines of code
- Number of files
- Development setup complexity
- Learning curve estimate

## 8. Development Guidelines

### 8.1 Code Standards

- TypeScript strict mode enabled
- ESLint configuration per era appropriateness
- Accessibility attributes required
- Semantic HTML structure
- Commented code explaining era-specific patterns

### 8.2 Testing Strategy

- Unit tests for business logic
- Integration tests for data flow
- Accessibility testing (axe-core)
- Cross-browser testing for era-relevant browsers

### 8.3 Build & Deployment

- Each app independently deployable
- Docker containers for each era's environment
- Static exports where possible
- Netlify/Vercel deployment for modern apps
- Traditional hosting simulation for SSR app

## 9. Teaching Aids

### 9.1 Timeline Visualization

Interactive timeline showing:

- Technology releases
- Dominant architectural patterns
- Browser capability milestones
- Internet adoption rates

### 9.2 Side-by-Side Comparison Tool

Web tool allowing students to:

- View same feature across all implementations
- Switch between era-appropriate styling
- See code side-by-side
- Toggle between raw and commented views

### 9.3 Quiz System

Multiple-choice questions covering:

- Technology identification
- Problem-solution matching
- Architecture pattern recognition
- Historical chronology

## 10. Success Metrics

1. **Educational Value**: Student comprehension scores
2. **Completeness**: All eras represented accurately
3. **Usability**: Easy navigation between implementations
4. **Performance**: Each app performs appropriately for its era
5. **Accessibility**: All apps meet WCAG standards

## 11. Future Iterations (Beyond Iteration I)

- Add WebSocket/real-time implementations
- Include PWA demonstration
- Add WebAssembly example
- Include GraphQL vs REST comparison
- Add mobile native comparisons (React Native, Capacitor)
- Include desktop app versions (Electron, Tauri)

## 12. Appendix: Historical Technologies Reference

### Early 1990s

- Static HTML
- CGI scripts (Perl, C)
- No CSS, tables for layout

### Late 1990s

- PHP, ASP, JSP
- Inline styling
- Framesets
- Java Applets
- Flash

### Early 2000s

- XHTML strict
- CSS 2.1
- XMLHttpRequest (AJAX)
- SOAP web services

### Mid 2000s

- jQuery dominance
- Web 2.0
- REST APIs
- Early MVC frameworks

### 2010s

- Single Page Apps
- Component architecture
- Build tools (Webpack, Babel)
- CSS-in-JS

### 2020s

- TypeScript dominance
- Meta-frameworks
- Edge computing
- Web Components resurgence

---

**Document Status**: Draft v1.0  
**Last Updated**: [Current Date]  
**Project Lead**: [Your Name/Team]  
**Educational Advisor**: [To be assigned]  
**Target Completion**: 12 weeks from kickoff
