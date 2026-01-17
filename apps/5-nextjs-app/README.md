# Phase 6: The Modern Hybrid (Next.js App Router)

Welcome to the final phase of our web evolution journey! This application is built with the Next.js App Router and represents the current state-of-the-art in web development, bringing together the best of server-side rendering and client-side interactivity. It shares the same 2010s-era palette as `apps/4-react-app` by importing the `base`, `components`, and `10s` styles from `@wees/design-system`.

## The Renaissance of Server Rendering

We've come full circle. Our journey began with a classic server-side rendered application (Phase 1) and now we return to a server-centric model, but with a significant evolution. This isn't your old SSR. This is a hybrid model that leverages the power of the server for initial rendering, data fetching, and security, while still providing the rich, interactive experience of a single-page application.

## React Server Components (RSCs)

The core innovation of this architecture is React Server Components.

- **What are they?** RSCs are React components that run exclusively on the server. They can directly access server-side resources like databases, file systems, and internal APIs without needing to expose an API endpoint. They render to an intermediate format that is then streamed to the client.

- **Why are they a big deal?**
  1.  **Zero Client-Side JavaScript:** Server Components do not send any of their own code to the browser. This results in smaller bundle sizes and a faster initial page load.
  2.  **Direct Data Access:** As you can see in `src/components/server/ProductTable.tsx`, the component fetches data directly from the database. There's no need for `useEffect`, `useState`, or data fetching libraries like React Query on the client.
  3.  **Security:** Server Components can safely use secret keys and tokens without exposing them to the browser.

## Server vs. Client Components

The key to this architecture is understanding when to use each type of component.

- **Use a Server Component when:**
  - You need to fetch data.
  - You need to access backend resources directly.
  - You don't need user interactivity (e.g., `onClick`, `onChange`).
  - You want to keep sensitive logic on the server.
  - **Examples:** `ProductTable.tsx`, `CategoryNav.tsx`

- **Use a Client Component when:**
  - You need user interactivity and state (`useState`, `useEffect`, `onClick`).
  - You need to use browser-only APIs (e.g., `localStorage`, `window`).
  - **Examples:** `ProductForm.tsx`, `SearchBar.tsx`, `DeleteButton.tsx`

You'll notice that even in Client Components, we can leverage the server through **Server Actions**. The `ProductForm` uses a Server Action to handle the form submission, keeping the mutation logic on the server.

## Streaming and Suspense

This application uses Streaming SSR with React Suspense.

- **How it works:** When a page is requested, the server immediately sends the static parts of the page (the "shell"). For parts of the page that need to fetch data, it sends a fallback UI (like in `src/app/products/loading.tsx`).
- **The benefit:** The user sees the page layout almost instantly. As the data becomes available on the server, the server "streams" the rendered HTML for the data-dependent components to the client, which then seamlessly fills in the missing pieces. This provides a much better user experience than a blank screen or a full-page loader.

## Comparison with the Original SSR App

- **App 1 (Classic SSR):** Every interaction required a full page reload. The server was responsible for all rendering, and the client was "dumb".
- **App 5 (Modern Hybrid):** The initial load is server-rendered for speed and SEO. Subsequent navigations are client-side, providing a fast, app-like feel. We have the component model of a modern framework, but with the performance benefits of a server-rendered architecture.

## Edge Computing Implications

This architecture is perfectly suited for edge computing. The server-rendering part of the application can be deployed to edge servers close to your users, resulting in extremely low latency.

## Discussion Questions

- What are the tradeoffs of this new model compared to a pure client-side SPA?
- How does the developer experience of co-locating data fetching with components change how you think about building features?
- Is this the final form of web architecture, or is there another evolution on the horizon?

## CRUD Flow

- **Product list (`/products`)** renders `ProductTable`, which uses `listProducts` directly and streams via `<Suspense>`. The header now links to the `/products/new` form and still accepts `search` parameters supplied by `SearchBar`.
- **Product detail (`/products/[id]`)** fetches the record with `getProductById`, shows a friendly hero using the same era styling, and exposes quick links to edit or return to the list.
- **Create & edit (`/products/new` + `/products/[id]/edit`)** reuse `ProductForm`. The same server action `createOrUpdateProduct` backs both routes so creating and updating share validation, revalidation, and redirects.
- **Delete** is handled by `DeleteButton`, which starts a transition and calls the `removeProduct` server action. The table re-renders after `revalidatePath('/products')` runs on the server.

This application is a testament to the idea that the web is not a linear progression, but a cycle of ideas that are constantly being refined and improved upon. We've taken the best of the past and combined it with the innovations of the present to create a truly modern web experience.
