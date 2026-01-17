// src/components/client/DeleteButton.tsx
'use client';

import React from 'react';

interface DeleteButtonProps {
  id: number;
  // This will be a Server Action
  deleteAction: (id: number) => Promise<void>;
}

/**
 * Client Component: DeleteButton
 *
 * This component is a Client Component because it handles a user interaction (a click event).
 *
 * It calls a Server Action (`deleteAction`) that's passed in as a prop. This is a very
 * common and powerful pattern: the UI is interactive on the client, but the mutation
 * logic lives on the server. This avoids exposing API endpoints for mutations.
 *
 * Notice the `startTransition` call. This is a new React feature that helps keep the
 * UI responsive while the server action is processing. It tells React that the state
 * update is not urgent.
 */
const DeleteButton: React.FC<DeleteButtonProps> = ({ id, deleteAction }) => {
  const [isPending, startTransition] = React.useTransition();

  const handleClick = () => {
    startTransition(async () => {
      await deleteAction(id);
    });
  };

  return (
    <button onClick={handleClick} disabled={isPending}>
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
