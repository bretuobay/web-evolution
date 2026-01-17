// src/hooks/useApi.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchApi } from '../utils/api';

/**
 * Historical Context: Data Fetching Evolution
 *
 * In the early days of React (and jQuery), data fetching was often done imperatively.
 * Developers would manually trigger AJAX calls inside lifecycle methods (like `componentDidMount`)
 * or event handlers, and then manually update the component's state with the results. This
 * led to scattered, hard-to-manage, and often repetitive fetching logic. Error handling,
 * loading states, and caching were also manual, leading to boilerplate and bugs.
 *
 * The introduction of React Hooks in v16.8 (2018) revolutionized this. Hooks allowed developers
 * to extract and reuse stateful logic from components. This led to the creation of custom
 * hooks like the ones in this file (`useApi`, `useProducts`, `useCategories`).
 *
 * Libraries like React Query (now TanStack Query) took this a step further. They provided
 * dedicated hooks (`useQuery`, `useMutation`) that abstract away the complexities of data
- * fetching, caching, synchronization, and state management.
 *
 * `useQuery` handles fetching, caching, and re-fetching data automatically.
 * `useMutation` provides a simple way to handle data creation, updates, and deletions,
 * including powerful features like "optimistic updates".
 *
 * This custom `useApi` hook centralizes the fetching logic for a specific data type (e.g., products,
 * categories), providing a clean, declarative API to the components. Components no longer
 * need to know *how* to fetch data; they just need to know *what* data they need.
 */

// A generic hook for fetching data
export const useApi = <T>(key: string, endpoint: string) => {
  const queryClient = useQueryClient();

  const { data, isLoading, error } = useQuery<T[], Error>({
    queryKey: [key],
    queryFn: () => fetchApi(endpoint),
  });

  const mutationOptions = {
    onSuccess: () => {
      // Invalidate the cache for the given key to trigger a re-fetch
      queryClient.invalidateQueries({ queryKey: [key] });
    },
  };

  const createItem = useMutation({
    mutationFn: (item: Omit<T, 'id'>) => fetchApi(endpoint, { method: 'POST', body: JSON.stringify(item) }),
    ...mutationOptions,
  });

  const updateItem = useMutation({
    mutationFn: (item: T & { id: number }) => fetchApi(`${endpoint}/${item.id}`, { method: 'PUT', body: JSON.stringify(item) }),
    ...mutationOptions,
  });

  const deleteItem = useMutation({
    mutationFn: (id: number) => fetchApi(`${endpoint}/${id}`, { method: 'DELETE' }),
    ...mutationOptions,
  });

  return { data, isLoading, error, createItem, updateItem, deleteItem };
};
