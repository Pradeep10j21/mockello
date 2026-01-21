import axios from 'axios';

// Detect environment to set appropriate backend URL
const isDev = import.meta.env.DEV;
const localUrl = 'http://127.0.0.1:8000';
const productionUrl = 'https://mock-smna.onrender.com';

export const API_BASE_URL = import.meta.env.VITE_API_URL || (isDev ? localUrl : productionUrl);

export const SAVE_SCORE_URL = `${API_BASE_URL}/scores/save`;
export const TECHNICAL_QUESTIONS_URL = `${API_BASE_URL}/technical-interview/questions`;
export const TECHNICAL_EVALUATE_URL = `${API_BASE_URL}/technical-interview/evaluate`;
export const GET_STUDENT_PROFILE_URL = (email: string) => `${API_BASE_URL}/student/me/${email}`;

// Axios Instance for GD Module
const api = axios.create({
    baseURL: API_BASE_URL
});

export const apiService = {
    createSession: (topic: string) => api.post('/gd-session/join-lobby', { topic }), // Modified to point to lobby or similar
    joinLobby: (participantId: string, peerId: string, name: string) =>
        api.post('/gd-session/join-lobby', { participantId, peerId, name }),
    getSessionStatus: (sessionId: string) => api.get(`/gd-session/status?sessionId=${sessionId}`),
    getMyRoom: (sessionId: string, participantId: string) =>
        api.get(`/gd-session/my-room?sessionId=${sessionId}&participantId=${participantId}`),
    sendTranscript: (sessionId: string, roomId: string | undefined, speakerId: string, text: string) =>
        api.post('/gd-transcript/add', { sessionId, roomId, speakerId, text }),
    getTranscripts: (sessionId: string, roomId?: string) =>
        api.get(`/gd-transcript/${sessionId}${roomId ? `?roomId=${roomId}` : ''}`),
    api: api, // Expose instance
    async evaluateParticipant(sessionId: string, roomId: string, peerId: string) {
        return axios.post(`${API_BASE_URL}/gd-evaluation/evaluate`, { sessionId, roomId, peerId });
    },
};
