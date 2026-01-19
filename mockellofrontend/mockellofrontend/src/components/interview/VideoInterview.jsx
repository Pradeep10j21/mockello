import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useSpeechToText } from '../../hooks/interview/useSpeechToText';
import { API_BASE_URL } from '../../services/apiConfig';

import './VideoInterview.css';
import Peer from 'peerjs';

function VideoInterview({ companyId, isActive, onStart, onStop, onTranscriptUpdate, onAnswerComplete, canProceed }) {
  const [stream, setStream] = useState(null);
  const [timer, setTimer] = useState(0);
  const [silenceTimer, setSilenceTimer] = useState(0);
  const videoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const peerRef = useRef(null);
  const currentCallRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const silenceIntervalRef = useRef(null);
  const lastTranscriptLengthRef = useRef(0);
  const joinPollRef = useRef(null);
  const joinedRef = useRef(false);

  const {
    transcript,
    isListening,
    error,
    isSupported,
    startListening,
    stopListening,
    resetTranscript
  } = useSpeechToText();

  const transcriptRef = useRef(null);

  useEffect(() => {
    onTranscriptUpdate(transcript);
    // Auto-scroll transcript to bottom only if user hasn't manually scrolled up
    if (transcriptRef.current) {
      const textarea = transcriptRef.current;
      const isNearBottom = textarea.scrollHeight - textarea.scrollTop - textarea.clientHeight < 50;

      // Only auto-scroll if user is near the bottom (hasn't scrolled up manually)
      if (isNearBottom || transcript.length === 0) {
        textarea.scrollTop = textarea.scrollHeight;
      }
    }
  }, [transcript, onTranscriptUpdate]);

  const handleNextQuestion = useCallback(() => {
    if (transcript.trim().length > 0) {
      stopListening();
      onAnswerComplete(transcript);
      resetTranscript();
      setSilenceTimer(0);
      lastTranscriptLengthRef.current = 0;

      // Restart listening after a short delay
      setTimeout(() => {
        if (isActive) {
          startListening();
        }
      }, 1500);
    }
  }, [transcript, stopListening, onAnswerComplete, resetTranscript, isActive, startListening]);

  // Improved auto-advance logic with silence detection
  useEffect(() => {
    if (isActive && isListening && transcript.trim().length > 0) {
      const currentLength = transcript.trim().length;
      const wordCount = transcript.trim().split(/\s+/).filter(w => w.length > 0).length;

      // Check if transcript has changed
      if (currentLength !== lastTranscriptLengthRef.current) {
        lastTranscriptLengthRef.current = currentLength;
        setSilenceTimer(0);
      }

      // Auto-advance after 4 seconds of silence and minimum 15 words
      // More lenient to avoid cutting off answers
      if (silenceTimer >= 4 && wordCount >= 15 && currentLength > 80) {
        handleNextQuestion();
      }
    }
  }, [transcript, isActive, isListening, silenceTimer, handleNextQuestion]);

  // Reset silence timer when transcript changes
  useEffect(() => {
    if (transcript.trim().length > 0) {
      const newLength = transcript.trim().length;
      if (newLength !== lastTranscriptLengthRef.current) {
        lastTranscriptLengthRef.current = newLength;
        setSilenceTimer(0);
      }
    }
  }, [transcript]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      return Promise.resolve();
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Please allow camera and microphone access to continue.');
      return Promise.reject(error);
    }
  };

  // Initialize PeerJS when component mounts
  useEffect(() => {
    try {
      const peer = new Peer();
      peerRef.current = peer;

      peer.on('open', (id) => {
        console.log('Peer open with id', id);
      });

      // When another peer calls us, answer with our stream and play their stream
      peer.on('call', async (call) => {
        console.log('Incoming call', call);
        // Ensure we have camera ready
        try {
          if (!stream) {
            await startCamera();
          }
          call.answer(stream);
        } catch (err) {
          console.error('Failed to answer call', err);
        }

        call.on('stream', (remoteStream) => {
          currentCallRef.current = call;
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = remoteStream;
          }
        });
      });

      peer.on('error', (err) => {
        console.warn('Peer error', err);
      });
    } catch (e) {
      console.warn('PeerJS init failed', e);
    }

    return () => {
      if (peerRef.current) {
        try { peerRef.current.destroy(); } catch (e) { }
        peerRef.current = null;
      }
    };
  }, []);

  // Helper to call a remote peer id
  const callRemotePeer = async (remoteId) => {
    if (!peerRef.current) {
      alert('Peer not initialized');
      return;
    }
    try {
      if (!stream) {
        await startCamera();
      }
      const call = peerRef.current.call(remoteId, stream);
      currentCallRef.current = call;
      call.on('stream', (remoteStream) => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = remoteStream;
      });
      call.on('close', () => {
        if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;
      });
    } catch (err) {
      console.error('Error calling remote peer', err);
      alert('Failed to call remote peer: ' + (err.message || err));
    }
  };

  const registerToRoom = async () => {
    try {
      const peer = peerRef.current;
      if (!peer || !peer.id) {
        console.log('Peer id not ready yet');
        return;
      }
      if (!companyId) {
        console.log('No companyId provided, skipping room join');
        return;
      }

      const res = await fetch(`${API_BASE_URL}/interview/room/join`, {

        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, peerId: peer.id })
      });
      const data = await res.json();
      const others = data.peers || [];
      if (others.length > 0) {
        // call first available peer
        callRemotePeer(others[0].peerId);
        joinedRef.current = true;
      } else {
        // start polling for other peers
        if (joinPollRef.current) clearInterval(joinPollRef.current);
        joinPollRef.current = setInterval(async () => {
          try {
            const r = await fetch(`${API_BASE_URL}/interview/room/${companyId}/peers`);

            const j = await r.json();
            const peers = j.peers || [];
            const other = peers.find(p => p.peerId !== peer.id);
            if (other) {
              callRemotePeer(other.peerId);
              joinedRef.current = true;
              clearInterval(joinPollRef.current);
              joinPollRef.current = null;
            }
          } catch (e) { console.warn('poll error', e); }
        }, 2000);
      }
    } catch (e) {
      console.warn('Failed to register to room', e);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  };

  const handleStart = async () => {
    try {
      // Check browser support first
      if (!isSupported) {
        alert('Speech recognition is not supported in this browser. Please use Chrome, Edge, or Safari for the best experience.');
        return;
      }

      // Start camera first
      await startCamera();

      // Call onStart to update parent state
      onStart();

      // Clear any existing timer first
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }

      // Start timer with stable reference
      timerIntervalRef.current = setInterval(() => {
        setTimer(prev => {
          // Use functional update to prevent glitches
          return prev + 1;
        });
      }, 1000);

      // Start listening after a small delay to ensure everything is ready
      // This prevents the mic state glitch
      setTimeout(() => {
        startListening();
      }, 100);
      // attach local stream to peer if peer exists
      if (peerRef.current && stream) {
        // nothing to do: PeerJS uses getUserMedia streams when calling/answering
      }
      // register to room so other peer can be discovered and auto-called
      setTimeout(() => {
        registerToRoom();
      }, 200);
    } catch (error) {
      console.error('Error starting interview:', error);
      if (error.name === 'NotAllowedError') {
        alert('Camera and microphone access denied. Please allow permissions and try again.');
      } else {
        alert('Failed to start interview. Please check your camera and microphone permissions.');
      }
    }
  };

  const handleStop = () => {
    stopCamera();
    stopListening();
    onStop();

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    if (silenceIntervalRef.current) {
      clearInterval(silenceIntervalRef.current);
    }
    setTimer(0);
    setSilenceTimer(0);
    lastTranscriptLengthRef.current = 0;
    resetTranscript();
    // close any active call
    try {
      if (currentCallRef.current) {
        currentCallRef.current.close();
        currentCallRef.current = null;
      }
    } catch (e) { }
    // clear join poll
    try { if (joinPollRef.current) clearInterval(joinPollRef.current); } catch (e) { }
  };

  useEffect(() => {
    // Silence detection timer
    if (isActive && isListening) {
      silenceIntervalRef.current = setInterval(() => {
        setSilenceTimer(prev => prev + 1);
      }, 1000);
    } else {
      if (silenceIntervalRef.current) {
        clearInterval(silenceIntervalRef.current);
      }
    }
    return () => {
      if (silenceIntervalRef.current) {
        clearInterval(silenceIntervalRef.current);
      }
    };
  }, [isActive, isListening]);

  useEffect(() => {
    return () => {
      stopCamera();
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (silenceIntervalRef.current) {
        clearInterval(silenceIntervalRef.current);
      }
    };
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="video-interview">
      <div className="video-container">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="video-preview"
        />
        <video
          ref={remoteVideoRef}
          autoPlay
          playsInline
          className="video-remote"
        />
        {!stream && (
          <div className="video-placeholder">
            <p>Camera will appear here</p>
          </div>
        )}
      </div>

      <div className="video-controls">
        <div className="control-item">
          <div className={`mic-indicator ${isActive && isListening ? 'active' : ''} ${error ? 'error' : ''} ${!isSupported ? 'unsupported' : ''}`}>
            <span className="mic-icon">
              {!isSupported ? '❌' : error ? '⚠️' : isActive && isListening ? '🎤' : '🔇'}
            </span>
            <span>
              {!isSupported ? 'Not Supported' :
                error ? 'Error' :
                  isActive && isListening ? 'Recording' : 'Mic Off'}
            </span>
            {isActive && isListening && <span className="recording-dot"></span>}
            {error && <div className="error-tooltip">{error}</div>}
          </div>
        </div>

        <div className="control-item">
          <div className="timer-display">
            <span className="timer-icon">⏱️</span>
            <span>{formatTime(timer)}</span>
          </div>
        </div>

        <div className="control-item">
          {!isActive ? (
            <button className="start-btn" onClick={handleStart}>
              Start Interview
            </button>
          ) : (
            <button className="stop-btn" onClick={handleStop}>
              Stop Interview
            </button>
          )}
        </div>
      </div>

      <div className="transcript-section">
        <textarea
          ref={transcriptRef}
          className="transcript-textarea"
          value={transcript}
          readOnly
          placeholder="Your speech will appear here... Speak clearly and naturally."
          autoFocus={false}
        />
        <div style={{ marginTop: 12 }}>
          <PeerControls peerRef={peerRef} onCall={callRemotePeer} />
        </div>
        {isActive && transcript.trim().length > 0 && (
          <div className="transcript-footer">
            <div className="transcript-footer-left">
              <span className="word-count">{transcript.trim().split(/\s+/).filter(w => w.length > 0).length} words</span>
              {silenceTimer >= 2 && (
                <span className="auto-advance-hint">Auto-advancing in {4 - silenceTimer} seconds...</span>
              )}
            </div>
            <button
              className="next-question-btn"
              onClick={handleNextQuestion}
              disabled={!canProceed}
            >
              Next Question →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default VideoInterview;

// Small inline component for peer ID display and connect field
function PeerControls({ peerRef, onCall }) {
  const [remoteId, setRemoteId] = useState('');
  const [myId, setMyId] = useState('');

  useEffect(() => {
    const peer = peerRef.current;
    if (!peer) return;
    const handleOpen = (id) => setMyId(id);
    if (peer.id) setMyId(peer.id);
    peer.on('open', handleOpen);
    return () => {
      try { peer.off('open', handleOpen); } catch (e) { }
    };
  }, [peerRef]);

  const handleCopy = () => {
    if (myId) navigator.clipboard?.writeText(myId);
  };

  const handleConnect = () => {
    if (!remoteId) return alert('Enter remote peer id');
    onCall(remoteId.trim());
  };

  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: '#666' }}>Your Peer ID</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <input readOnly value={myId || ''} style={{ flex: 1, padding: 8 }} />
          <button onClick={handleCopy} style={{ padding: '8px 12px' }}>Copy</button>
        </div>
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 12, color: '#666' }}>Connect to Peer ID</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 6 }}>
          <input value={remoteId} onChange={(e) => setRemoteId(e.target.value)} placeholder="remote peer id" style={{ flex: 1, padding: 8 }} />
          <button onClick={handleConnect} style={{ padding: '8px 12px' }}>Call</button>
        </div>
      </div>
    </div>
  );
}

