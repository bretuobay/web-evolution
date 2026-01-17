// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CategoriesPage from './pages/CategoriesPage';
import NotFoundPage from './pages/NotFoundPage';

/**
 * Historical Context: The Rise of Single Page Applications (SPAs)
 *
 * By the 2010s, web development was moving away from the traditional model where every user
 * action (like clicking a link) required a full page reload from the server. This "multi-page"
 * architecture felt slow and clunky compared to native desktop applications.
 *
 * React, introduced by Facebook in 2013, was a game-changer for building SPAs. SPAs load the
 * application's shell once and then dynamically update content as the user interacts with it.
 * This is achieved through client-side routing, where libraries like React Router manage the
 * URL and view changes in the browser without making new server requests for HTML pages.
 *
 * The <Router> component below is the heart of this SPA architecture. It intercepts browser
 * navigation events and, instead of letting the browser fetch a new page, it re-renders the
 * appropriate React components defined in the <Route> configurations. This results in a much
 * faster, more fluid user experience, akin to a native application.
 */
const App: React.FC = () => {
  return (
    <Router>
      <div className="ds-stack" style={{ maxWidth: '1200px', margin: '0 auto', padding: 'var(--ds-spacing)' }}>
        <header className="ds-card">
          <h1 className="ds-era-10s__title">Product Management SPA</h1>
          <nav>
            <ul className="ds-nav">
              <li><Link to="/">Products</Link></li>
              <li><Link to="/categories">Categories</Link></li>
            </ul>
          </nav>
        </header>
        <main className="ds-stack">
          {/*
            The <Routes> component is where the magic of client-side routing happens.
            React Router finds the first <Route> that matches the current URL and renders
            its `element`. This is a declarative way to map URLs to specific parts of
            your application's UI.
          */}
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </main>
        <footer className="ds-card ds-text-center">
          <p>&copy; 2010s Product Management Inc.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
