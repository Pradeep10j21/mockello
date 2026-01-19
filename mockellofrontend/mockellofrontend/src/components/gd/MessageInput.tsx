import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, Mic, MicOff, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { groqService } from '@/services/groqService';
import { useRef } from 'react';

interface MessageInputProps {
  onSendMessage: (message: string) => void;
  isMuted: boolean;
  onToggleMute: () => void;
}

export function MessageInput({ onSendMessage, isMuted, onToggleMute }: MessageInputProps) {
  const [message, setMessage] = useState('');
  const [inputMode, setInputMode] = useState<'text' | 'voice'>('text');
  const [isListening, setIsListening] = useState(false);
  const { toast } = useToast();
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const handleSend = useCallback(() => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  }, [message, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const startVoiceRecognition = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const types = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4', ''];
      const mimeType = types.find(t => t === '' || MediaRecorder.isTypeSupported(t));

      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };

      recorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        if (audioBlob.size > 1000) {
          try {
            toast({ title: "Transcribing...", description: "Converting your speech to text..." });
            const text = await groqService.transcribeAudio(audioBlob);
            if (text.trim()) {
              setMessage(prev => (prev ? prev + ' ' + text.trim() : text.trim()));
            }
          } catch (err) {
            console.error("Transcription error:", err);
            toast({ title: "Transcription Failed", variant: "destructive" });
          }
        }
        stream.getTracks().forEach(t => t.stop());
      };

      recorder.start();
      setIsListening(true);
      if (isMuted) onToggleMute();
    } catch (err) {
      console.error("Mic access error:", err);
      toast({ title: "Mic Access Denied", description: "Please allow microphone access.", variant: "destructive" });
    }
  }, [isMuted, onToggleMute, toast]);

  const stopVoiceRecognition = useCallback(() => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  }, [isListening]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-2 p-3 bg-card rounded-2xl shadow-card"
    >
      {/* Mode toggle */}
      <div className="flex items-center gap-1 p-1 bg-soft/30 rounded-xl">
        <button
          onClick={() => setInputMode('text')}
          className={`p-2 rounded-lg transition-colors ${inputMode === 'text' ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'
            }`}
        >
          <Keyboard className="w-4 h-4" />
        </button>
        <button
          onClick={() => setInputMode('voice')}
          className={`p-2 rounded-lg transition-colors ${inputMode === 'voice' ? 'bg-primary text-primary-foreground' : 'text-muted hover:text-foreground'
            }`}
        >
          <Mic className="w-4 h-4" />
        </button>
      </div>

      {/* Input area */}
      <div className="flex-1 flex items-center gap-2">
        {inputMode === 'text' ? (
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your point..."
            className="flex-1 border-0 bg-soft/30 focus-visible:ring-1 focus-visible:ring-primary"
          />
        ) : (
          <div className="flex-1 flex items-center gap-3 px-4 py-2 bg-soft/30 rounded-lg">
            {isListening ? (
              <>
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-destructive rounded-full animate-pulse" />
                  <span className="text-sm text-[#0F2C1F] dark:text-[#2d5a3d] font-medium">Listening...</span>
                </div>
                <p className="flex-1 text-sm text-[#0F2C1F] dark:text-[#2d5a3d] truncate font-medium">{message || 'Speak now...'}</p>
              </>
            ) : (
              <p className="text-sm text-[#0F2C1F] dark:text-[#2d5a3d] font-medium">Click mic to start speaking</p>
            )}
          </div>
        )}

        {/* Action button */}
        {inputMode === 'voice' ? (
          <button
            onClick={isListening ? stopVoiceRecognition : startVoiceRecognition}
            className={`p-3 rounded-full transition-all ${isListening
              ? 'bg-destructive text-destructive-foreground animate-pulse'
              : 'bg-primary text-primary-foreground hover:bg-primary/90'
              }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
        ) : null}

        <Button
          onClick={handleSend}
          disabled={!message.trim()}
          className="bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <Send className="w-4 h-4 mr-1" />
          Send
        </Button>
      </div>
    </motion.div>
  );
}




