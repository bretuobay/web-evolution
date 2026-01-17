// src/components/common/Input.tsx
import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * A reusable Input component.
 * This demonstrates the principle of component composition. We create a styled
 * wrapper around the native HTML `<input>` element, making it easy to reuse
 * with consistent styling across the application.
 */
const Input: React.FC<InputProps> = (props) => {
  return <input className="form-input" {...props} />;
};

export default Input;
