// src/components/common/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

/**
 * Historical Context: Component-Based Architecture
 *
 * Before frameworks like React, UIs were often built by directly manipulating the DOM with
 * libraries like jQuery. This meant finding an element and changing its properties, classes,
 * or content. This approach, called imperative programming, becomes incredibly complex and
 * error-prone as applications grow.
 *
 * React introduced a declarative, component-based approach. Instead of telling the computer
 * *how* to change the UI, you declare *what* the UI should look like for a given state.
 *
 * This `Button` component is a perfect example of a reusable UI primitive. It encapsulates
 * the structure (a `<button>` element), the styling (CSS classes based on `variant`), and
 * the behavior (`onClick`, `disabled`, etc.).
 *
 * By breaking the UI down into small, reusable components, we can:
 * 1.  **Enforce Consistency**: Every button in the application looks and feels the same.
 * 2.  **Reduce Duplication**: We don't have to write the same button HTML and CSS over and over.
 * 3.  **Isolate Logic**: The logic for how a button works is contained within this one file.
 * 4.  **Improve Maintainability**: If we need to change how all buttons look, we only have to
 *     edit this single file.
 *
 * This is a fundamental shift from the page-centric, imperative world of jQuery.
 */
const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'btn';
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    danger: 'btn-danger',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
