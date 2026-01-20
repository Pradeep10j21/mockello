import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiConfig';
import { usePeer } from '../../context/PeerContext';

export const WaitingRoom: React.FC = () => {
  const navigate = useNavigate();
  const { myPeerId } = usePeer();
  const [sessionId, setSessionId] = useState('');
  const [name, setName] = useState('');
  const [topic, setTopic] = useState('');
  const [status, setStatus] = useState('initial'); // initial, joined
  const [error, setError] = useState('');
  const [startTime, setStartTime] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  const joinLobby = async () => {
    if (!name || !myPeerId) return setError("Please enter name or wait for connection");
    try {
      // Use peerId as participantId
      const res = await apiService.joinLobby(myPeerId, myPeerId, name);
      setSessionId(res.data.sessionId);
      setTopic(res.data.topic);
      setStartTime(res.data.startTime);
      setStatus('joined');
      setError('');
    } catch (err: any) {
      setError("Failed to join lobby");
    }
  };

  useEffect(() => {
    let interval: any;
    if (status === 'joined' && sessionId) {
      interval = setInterval(async () => {
        try {
          const res = await apiService.getSessionStatus(sessionId);

          if (res.data.status === 'active') {
            // Check allocation
            const roomRes = await apiService.getMyRoom(sessionId, myPeerId);
            if (roomRes.data.status === 'allocated') {
              navigate(`/session/${sessionId}/room/${roomRes.data.roomId}`, { state: { name, myPeerId } });
            }
          } else {
            // Start timer
            if (typeof res.data.secondsRemaining === 'number') {
              setTimeLeft(res.data.secondsRemaining);
            }
          }
        } catch (err) {
          console.error(err);
        }
      }, 1000); // Check every second for timer
    }
    return () => clearInterval(interval);
  }, [status, sessionId, navigate, myPeerId, name]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="container" style={{ maxWidth: '600px', marginTop: '50px', textAlign: 'center' }}>
      <h1>Virtual GD Portal</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!myPeerId && <p>Initializing connection...</p>}

      {status === 'initial' && (
        <div className="card">
          <h2>Enter Details</h2>
          <input
            placeholder="Your Name"
            value={name}
            onChange={e => setName(e.target.value)}
            style={{ padding: '12px', marginBottom: '20px', display: 'block', width: '100%', boxSizing: 'border-box', fontSize: '16px' }}
          />
          <button className="btn" onClick={joinLobby} disabled={!myPeerId} style={{ width: '100%' }}>
            Join Next Batch
          </button>
        </div>
      )}

      {status === 'joined' && (
        <div className="card">
          <h2>Waiting for Round to Start</h2>
          <p>Participants are being grouped. A unique GD topic will be assigned to each room shortly.</p>

          <div style={{ fontSize: '48px', margin: '30px 0', fontWeight: 'bold' }}>
            {timeLeft !== null ? formatTime(timeLeft) : "Loading..."}
          </div>

          <p>Please wait while others join. You will be automatically placed in a room when the timer hits zero.</p>
        </div>
      )}
    </div>
  );
};
