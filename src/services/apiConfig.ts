/**
 * Centralize the API base URL for the application.
 * Defaults to localhost:8000 for development, but should be overridden
 * by VITE_API_URL in production (Render).
 */
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
