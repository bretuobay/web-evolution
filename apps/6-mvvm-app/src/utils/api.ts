// apps/6-mvvm-app/src/utils/api.ts

const API_URL = 'http://localhost:3002/api';

/**
 * Centralized API helper so every MVVM ViewModel communicates with the same backend.
 */
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: 'An unknown error occurred' }));
    throw new Error(errorData.message || 'Something went wrong');
  }

  return response.json();
};
