// Detect environment to set appropriate backend URL
const isDev = import.meta.env.DEV;
const localUrl = 'http://127.0.0.1:8000';
const productionUrl = 'https://mockellobackend.onrender.com';

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDev ? localUrl : productionUrl);

export const SAVE_SCORE_URL = `${API_BASE_URL}/scores/save`;
export const GET_STUDENT_PROFILE_URL = (email: string) => `${API_BASE_URL}/student/me/${email}`;
