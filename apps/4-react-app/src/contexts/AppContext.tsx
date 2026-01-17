// src/contexts/AppContext.tsx
import React, { createContext, useReducer, useContext, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

/**
 * Historical Context: State Management Fragmentation
 *
 * As React applications grew more complex, managing state became a major challenge.
 * Initially, state was passed down through props ("prop drilling"), which was cumbersome.
 *
 * To solve this, React introduced the Context API, a way to share state across the entire
 * app without having to pass props down manually at every level. However, the original
 * Context API was limited and had performance issues.
 *
 * This led to an explosion of state management libraries in the ecosystem, with Redux
 * becoming the most popular. Redux introduced a centralized store and a strict, predictable
 * pattern for updating state (actions, reducers), inspired by Flux architecture.
 *
 * React Hooks (specifically `useReducer` and `useContext`) made implementing Redux-like
 * patterns much simpler and more integrated into React itself. `useReducer` provides a
 * way to manage complex state logic, while `useContext` makes it easy to consume the
 * state and dispatch function provided by the reducer.
 *
 * This `AppContext` demonstrates a modern, built-in approach to state management. It combines
 * a state-management reducer (`appReducer`) with a provider for a React Query client,
 * centralizing both client-side UI state and server-side data cache management in one place.
 * This pattern is often sufficient for many applications, reducing the need for external
 * libraries like Redux.
 */

interface AppState {
  // Define your application's state properties here
  // Example: theme: 'light' | 'dark';
}

type Action = { type: 'SET_THEME'; payload: 'light' | 'dark' };

const initialState: AppState = {
  // theme: 'light',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => null,
});

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    // case 'SET_THEME':
    //   return { ...state, theme: action.payload };
    default:
      return state;
  }
};

const queryClient = new QueryClient();

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};
