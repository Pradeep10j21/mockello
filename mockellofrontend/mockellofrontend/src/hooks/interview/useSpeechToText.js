import { useState, useEffect, useRef, useCallback } from 'react';

export function useSpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState(null);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef(null);
  const restartTimeoutRef = useRef(null);
  const shouldListenRef = useRef(false); // <--- Controls intention

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      console.warn('Speech Recognition API not supported in this browser');
      setIsSupported(false);
      return;
    }

    setIsSupported(true);
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log('Speech recognition started');
      setIsListening(true);
      setError(null);
    };

    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';

      // Process all results for faster updates
      for (let i = 0; i < event.results.length; i++) {
        const result = event.results[i];
        const transcript = result[0].transcript;
        const confidence = result[0].confidence || 0.7;

        // Lower confidence threshold for faster updates
        if (confidence > 0.3) {
          if (result.isFinal) {
            finalTranscript += transcript + ' ';
          } else {
            // Show interim results immediately for faster feedback
            interimTranscript += transcript;
          }
        }
      }

      // Combine final and interim - show interim immediately for speed
      const combined = finalTranscript.trim() + (interimTranscript ? ' ' + interimTranscript : '');
      // Update immediately without checking length for faster response
      setTranscript(combined);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setError(event.error);

      if (event.error === 'no-speech') {
        setIsListening(false);
        // Auto-restart after no-speech ONLY if we effectively want to listen
        if (shouldListenRef.current) {
          if (restartTimeoutRef.current) {
            clearTimeout(restartTimeoutRef.current);
          }
          restartTimeoutRef.current = setTimeout(() => {
            if (recognitionRef.current && shouldListenRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.error('Failed to restart recognition:', e);
              }
            }
          }, 1000);
        }
      } else if (event.error === 'not-allowed') {
        setIsListening(false);
        shouldListenRef.current = false; // Stop trying
        alert('Microphone permission denied. Please allow microphone access and refresh the page.');
      } else if (event.error === 'network') {
        setIsListening(false);
        // Try to restart after network error
        if (shouldListenRef.current) {
          setTimeout(() => {
            if (recognitionRef.current && shouldListenRef.current) {
              try {
                recognitionRef.current.start();
              } catch (e) {
                console.error('Failed to restart after network error:', e);
              }
            }
          }, 2000);
        }
      } else {
        setIsListening(false);
      }
    };

    recognition.onend = () => {
      console.log('Speech recognition ended');
      setIsListening(false);

      // Auto-restart if continuous mode is enabled AND we want to listen
      if (recognitionRef.current && recognitionRef.current.continuous && shouldListenRef.current) {
        // Reduced delay for faster restart
        if (restartTimeoutRef.current) {
          clearTimeout(restartTimeoutRef.current);
        }
        restartTimeoutRef.current = setTimeout(() => {
          try {
            if (recognitionRef.current && shouldListenRef.current) {
              recognitionRef.current.start();
            }
          } catch (error) {
            console.error('Error restarting recognition:', error);
            // If start fails, it might already be started, so ignore
          }
        }, 100);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      shouldListenRef.current = false; // Ensure we stop on unmount
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (restartTimeoutRef.current) {
        clearTimeout(restartTimeoutRef.current);
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) {
      alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari.');
      return;
    }

    shouldListenRef.current = true; // Mark intention to listen

    if (recognitionRef.current && !isListening) {
      try {
        setError(null);
        recognitionRef.current.start();
      } catch (error) {
        console.error('Error starting recognition:', error);
        if (error.name === 'InvalidStateError') {
          // Recognition might already be started, try to stop and restart
          try {
            recognitionRef.current.stop();
            setTimeout(() => {
              if (recognitionRef.current && shouldListenRef.current) {
                recognitionRef.current.start();
              }
            }, 100);
          } catch (e) {
            console.error('Failed to restart recognition:', e);
          }
        }
      }
    }
  }, [isSupported, isListening]);

  const stopListening = useCallback(() => {
    shouldListenRef.current = false; // Mark intention to STOP
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
  }, [isListening]);

  const abortListening = useCallback(() => {
    shouldListenRef.current = false; // Mark intention to STOP
    if (recognitionRef.current) {
      recognitionRef.current.abort();
      setIsListening(false);
    }
    if (restartTimeoutRef.current) {
      clearTimeout(restartTimeoutRef.current);
    }
  }, []);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setError(null);
  }, []);

  return {
    transcript,
    isListening,
    error,
    isSupported,
    startListening,
    stopListening,
    abortListening,
    resetTranscript
  };
}

