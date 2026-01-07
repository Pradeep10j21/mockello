import { toast } from 'sonner';

// Get OpenAI API key from environment variable or use a default
// In production, this should come from environment variables
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || '';

export const whisperService = {
    // Transcribe audio using OpenAI Whisper API
    transcribeAudio: async (audioBlob: Blob): Promise<string> => {
        if (!OPENAI_API_KEY) {
            console.error('[WhisperService] OpenAI API key not found');
            toast.error("OpenAI API Key not configured. Please set VITE_OPENAI_API_KEY in your environment variables.");
            return '';
        }

        const formData = new FormData();

        // Better extension mapping based on MIME type
        let ext = 'webm';
        if (audioBlob.type.includes('wav')) ext = 'wav';
        else if (audioBlob.type.includes('mp4')) ext = 'mp4';
        else if (audioBlob.type.includes('mpeg')) ext = 'mp3';
        else if (audioBlob.type.includes('ogg')) ext = 'ogg';

        formData.append('file', audioBlob, `audio.${ext}`);
        formData.append('model', 'whisper-1');
        formData.append('response_format', 'json');

        try {
            console.log(`[WhisperService] Sending: ${audioBlob.size} bytes, mime: ${audioBlob.type}, ext: ${ext}`);
            const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${OPENAI_API_KEY}`,
                },
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[WhisperService] API Error (${response.status}):`, errorText);
                if (response.status === 401) {
                    toast.error("OpenAI API Key Invalid or Expired");
                } else if (response.status === 413) {
                    toast.error("Audio chunk too large for OpenAI");
                } else if (response.status === 429) {
                    toast.error("OpenAI API rate limit exceeded. Please try again later.");
                } else {
                    toast.error(`Transcription Error: ${response.status}`);
                }
                return '';
            }

            const data = await response.json();
            console.log(`[WhisperService] Success: "${data.text?.substring(0, 50)}..."`);
            return data.text || '';
        } catch (error) {
            console.error("[WhisperService] Fetch Error:", error);
            toast.error("Failed to connect to OpenAI API. Please check your internet connection.");
            return '';
        }
    },
};
