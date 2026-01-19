import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { groqService } from '@/services/groqService';
import { API_BASE_URL } from '@/services/apiConfig';


const DebugAudio = () => {
    const [logs, setLogs] = useState<string[]>([]);
    const [isRecording, setIsRecording] = useState(false);
    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);

    const addLog = (msg: string) => {
        setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);
    };

    const runDiagnostics = async () => {
        addLog("--- Starting Diagnostics ---");

        // 1. Check Backend Connectivity
        try {
            addLog(`Pinging Backend (${API_BASE_URL}/)...`);
            const res = await fetch(`${API_BASE_URL}/`);

            if (res.ok) addLog("Backend Online: " + res.status);
            else addLog("Backend Error: " + res.status);
        } catch (e) {
            addLog("CRITICAL: Backend Unreachable! " + e);
        }

        // 2. Transcribe Test
        if (!navigator.mediaDevices) {
            addLog("CRITICAL: navigator.mediaDevices is undefined! (Are you on HTTPS?)");
            return;
        }
    };

    const startRecording = async () => {
        setIsRecording(true);
        chunksRef.current = [];
        addLog("Requesting Microphone...");

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            addLog("Microphone Access Granted.");

            const mimeType = 'audio/webm'; // Chrome default
            const recorder = new MediaRecorder(stream, { mimeType });

            recorder.ondataavailable = e => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                    addLog(`Received chunk: ${e.data.size} bytes`);
                }
            };

            recorder.onstop = async () => {
                const blob = new Blob(chunksRef.current, { type: mimeType });
                addLog(`Recording Stopped. Total Blob Size: ${blob.size} bytes`);

                if (blob.size < 100) {
                    addLog("WARNING: Blob is empty or too small!");
                    return;
                }

                addLog("Sending to Backend Proxy...");
                try {
                    const text = await groqService.transcribeAudio(blob);
                    addLog("TRANSCRIPTION RESULT: " + text);
                } catch (e) {
                    addLog("TRANSCRIPTION FAILED: " + e);
                }
            };

            mediaRecorderRef.current = recorder;
            recorder.start();
            addLog("Recorder Started...");

            // Auto stop after 3s
            setTimeout(() => {
                if (recorder.state === 'recording') {
                    recorder.stop();
                    setIsRecording(false);
                    stream.getTracks().forEach(t => t.stop());
                }
            }, 3000);

        } catch (e) {
            addLog("Mic Error: " + e);
            setIsRecording(false);
        }
    };

    return (
        <div className="p-8 max-w-2xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Audio Debugger</h1>
            <div className="flex gap-4">
                <Button onClick={runDiagnostics} variant="outline">Test Connectivity</Button>
                <Button onClick={startRecording} disabled={isRecording}>
                    {isRecording ? "Recording..." : "Record 3s Test"}
                </Button>
            </div>

            <Card className="p-4 bg-black text-green-400 font-mono text-sm h-96 overflow-auto">
                {logs.map((log, i) => (
                    <div key={i}>{log}</div>
                ))}
            </Card>
        </div>
    );
};

export default DebugAudio;
