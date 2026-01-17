// src/utils/api.ts

const API_URL = "http://localhost:3001/api";

/**
 * A utility function to handle API requests.
 * @param endpoint The API endpoint to call.
 * @param options The options for the fetch request.
 * @returns The JSON response from the API.
 */
export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const response = await fetch(`${API_URL}/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorData = await response
      .json()
      .catch(() => ({ message: "An unknown error occurred" }));
    throw new Error(errorData.message || "Something went wrong");
  }

  return response.json();
};
