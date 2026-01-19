import { toast } from 'sonner';
import { API_BASE_URL } from './apiConfig';


export interface GroqMessage {
    role: 'system' | 'user' | 'assistant';
    content: string;
}

export const groqService = {
    // Transcribe audio using Backend Proxy
    transcribeAudio: async (audioBlob: Blob): Promise<string> => {
        const formData = new FormData();

        // Simple file append, backend handles the rest
        let ext = 'webm';
        if (audioBlob.type.includes('wav')) ext = 'wav';
        else if (audioBlob.type.includes('mp4')) ext = 'mp4';

        const audioFile = new File([audioBlob], `audio.${ext}`, { type: audioBlob.type });
        formData.append('file', audioFile);

        try {
            console.log(`[GroqService] Sending ${audioBlob.size} bytes to Backend Proxy...`);
            const response = await fetch(`${API_BASE_URL}/ai-interviewer/transcribe`, {
                method: 'POST',
                // No headers needed, browser sets Content-Type for FormData
                body: formData,
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error(`[GroqService] Backend Error (${response.status}):`, errorText);
                toast.error(`Transcription Failed: ${response.status}`);
                return '';
            }

            const data = await response.json();
            console.log(`[GroqService] Success: "${data.text?.substring(0, 50)}..."`);
            return data.text || '';
        } catch (error) {
            console.error("[GroqService] Network Error:", error);
            toast.error("Could not connect to backend server.");
            return '';
        }
    },

    // Get chat completion using Groq Llama 3
    async getChatCompletion(messages: GroqMessage[]): Promise<string> {
        try {
            // Forward the chat request to the backend proxy so the Groq API key stays server-side.
            console.log("Forwarding chat request to backend proxy...", messages);
            const response = await fetch(`${API_BASE_URL}/ai-interviewer/chat`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ messages, model: "llama-3.3-70b-versatile", temperature: 0.7, max_tokens: 1024 }),
            });

            if (!response.ok) {
                const errorBody = await response.text();
                console.error(`Backend Groq Proxy Error (${response.status}):`, errorBody);
                throw new Error(`Backend Groq Proxy Error: ${response.status} - ${errorBody}`);
            }

            const data = await response.json();
            console.log("Backend Groq Response:", data);
            return data.choices?.[0]?.message?.content || data.text || "";
        } catch (error) {
            console.error("Error in getChatCompletion:", error);
            throw error;
        }
    },

    async evaluateInterview(history: GroqMessage[]): Promise<any> {
        const evaluationPrompt: GroqMessage = {
            role: 'system',
            content: `You are an expert Interview Evaluator. 
            Analyze the following interview transcript and provide a JSON evaluation.
            
            Metrics to score (0-100):
            1. Structure of Answer (Logical flow, intro/conclusion)
            2. Technical Clarity (Jargon usage, explanation depth)
            3. Confidence & Correctness (Tone, accuracy of facts)
            
            Output format MUST be valid JSON only:
            {
                "structureScore": number,
                "clarityScore": number,
                "confidenceScore": number,
                "overallScore": number,
                "feedback": "Brief qualitative summary of performance.",
                "improvements": ["Tip 1", "Tip 2", "Tip 3"]
            }
            Do not include markdown formatting like \`\`\`json. Just the raw JSON string.`
        };

        const messages = [evaluationPrompt, ...history.filter(m => m.role !== 'system')];

        try {
            const jsonStr = await this.getChatCompletion(messages);
            console.log("Raw LLM Evaluation Response:", jsonStr);

            // Robust JSON Extraction
            const jsonMatch = jsonStr.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                throw new Error("No JSON object found in response");
            }

            const cleanJson = jsonMatch[0];
            return JSON.parse(cleanJson);
        } catch (error) {
            console.error("Evaluation failed:", error);
            return {
                structureScore: 0,
                clarityScore: 0,
                confidenceScore: 0,
                overallScore: 0,
                feedback: "Could not generate evaluation.",
                improvements: []
            };
        }
    }
};
