// src/components/common/Modal.tsx
import React, { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

/**
 * A reusable Modal component.
 * This component demonstrates how to handle complex UI elements like modals
 * in React. It encapsulates the logic for showing/hiding the modal and provides
 * a clear API for its parent component to use.
 */
const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
      onClick={onClose}
    >
      <div
        className="ds-card"
        style={{ minWidth: '400px', maxWidth: '90vw' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ds-flex" style={{ justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--ds-spacing)' }}>
          <h2 className="ds-era-10s__title" style={{ margin: 0 }}>{title}</h2>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: 'var(--ds-muted)',
            }}
          >
            &times;
          </button>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
