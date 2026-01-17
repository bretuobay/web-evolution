// src/components/client/DeleteButton.tsx
'use client';

import React from 'react';

interface DeleteButtonProps {
  id: number;
  // This will be a Server Action
  deleteAction: (id: number) => Promise<void>;
}

/**
 * Button that runs the provided server-side delete action.
 */
const DeleteButton: React.FC<DeleteButtonProps> = ({ id, deleteAction }) => {
  const [isPending, startTransition] = React.useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await deleteAction(id);
    });
  };

  return (
    <button className="delete-button" onClick={handleClick} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
