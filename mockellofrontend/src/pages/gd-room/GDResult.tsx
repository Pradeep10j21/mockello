import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { apiService } from '../../services/apiConfig';
import { usePeer } from '../../context/PeerContext';
import { Loader2, TrendingUp, Award, Lightbulb, MessageCircle, BarChart3 } from 'lucide-react';

interface EvaluationResult {
  scores: { [key: string]: number };
  feedback: string;
  strengths: string[];
  improvements: string[];
}

export const Results: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { sessionId, roomId, myPeerId: statePeerId } = state || {};
  const { myPeerId: contextPeerId } = usePeer();
  const myPeerId = statePeerId || contextPeerId;

  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState<EvaluationResult | null>(null);
  const [error, setError] = useState('');
  const [proceedClicks, setProceedClicks] = useState(0);

  useEffect(() => {
    if (!sessionId || !roomId || !myPeerId) {
      if (!myPeerId) setError("Peer ID missing. Did you reload?");
      else setError("Session details missing.");
      setLoading(false);
      return;
    }

    const fetchEvaluation = async () => {
      try {
        const res = await apiService.evaluateParticipant(sessionId, roomId, myPeerId);
        setResult(res.data);
      } catch (err) {
        console.error(err);
        setError("Authorized evaluation failed. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [sessionId, roomId, myPeerId]);

  // Helper for category icons
  const getIcon = (cat: string) => {
    if (cat.includes("Creativity")) return <Lightbulb className="text-yellow-400" />;
    if (cat.includes("Participation")) return <TrendingUp className="text-blue-300" />;
    if (cat.includes("Choice")) return <MessageCircle className="text-purple-300" />;
    if (cat.includes("Leadership")) return <Award className="text-red-400" />;
    return <BarChart3 className="text-gray-300" />;
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1b4d3e] flex flex-col items-center justify-center">
        <Loader2 className="animate-spin text-[#d4a373] mb-4" size={48} />
        <h2 className="text-xl font-semibold text-white">Analyzing your performance...</h2>
        <p className="text-green-200">Our AI is reviewing the transcript logic.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#1b4d3e] flex items-center justify-center">
        <div className="bg-[#2d5a3d] p-8 rounded-xl shadow-lg text-center border border-[#3e6b4e]">
          <h2 className="text-red-400 text-xl font-bold mb-2">Error</h2>
          <p className="text-white">{error}</p>
          <button onClick={() => navigate('/gd-portal')} className="mt-4 px-4 py-2 bg-[#d4a373] text-[#1b4d3e] font-bold rounded hover:bg-[#c49363]">Back to Portal</button>
        </div>
      </div>
    );
  }

  if (!result) return null;

  return (
    <div className="min-h-screen bg-[#1b4d3e] p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-6">

        {/* Header */}
        <div className="bg-[#2d5a3d] rounded-2xl shadow-xl p-8 border border-[#3e6b4e] flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-white">Performance Report</h1>
            <p className="text-green-200 mt-1">Session ID: {sessionId?.slice(0, 8)}</p>
          </div>
          <button onClick={() => navigate('/gd-portal')} className="px-6 py-2 bg-[#d4a373] text-[#1b4d3e] font-bold rounded-lg hover:bg-[#c49363] transition-colors">
            Back to Portal
          </button>
        </div>

        {/* Scores Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Detailed Metrics */}
          <div className="bg-[#2d5a3d] rounded-2xl shadow-xl p-6 border border-[#3e6b4e]">
            <h3 className="text-lg font-semibold mb-6 text-white">Evaluation Metrics</h3>
            <div className="space-y-6">
              {Object.entries(result.scores).map(([category, score]) => (
                <div key={category}>
                  <div className="flex justify-between items-center mb-2">
                    <div className="flex items-center gap-2">
                      {getIcon(category)}
                      <span className="font-medium text-green-100">{category}</span>
                    </div>
                    <span className="font-bold text-white">{score}/10</span>
                  </div>
                  <div className="h-2 bg-[#1b4d3e] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#d4a373] rounded-full transition-all duration-1000"
                      style={{ width: `${(score / 10) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feedback & Summary */}
          <div className="space-y-6">
            <div className="bg-[#2d5a3d] rounded-2xl shadow-xl p-6 border border-[#3e6b4e]">
              <h3 className="text-lg font-semibold mb-4 text-white">AI Feedback</h3>
              <p className="text-green-100 leading-relaxed italic">
                "{result.feedback}"
              </p>
            </div>

            <div className="bg-[#2d5a3d] rounded-2xl shadow-xl p-6 border border-[#3e6b4e]">
              <h3 className="text-lg font-semibold mb-4 text-green-300">Strengths</h3>
              <ul className="space-y-2">
                {result.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-green-400 mt-1">✓</span>
                    <span className="text-green-100">{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-[#2d5a3d] rounded-2xl shadow-xl p-6 border border-[#3e6b4e]">
              <h3 className="text-lg font-semibold mb-4 text-orange-300">Areas for Improvement</h3>
              <ul className="space-y-2">
                {result.improvements.map((imp, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-orange-400 mt-1">!</span>
                    <span className="text-green-100">{imp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Final CTA */}
            <div className="flex justify-center mt-8">
              {(() => {
                const avgScore = Object.values(result.scores).reduce((a, b) => a + b, 0) / Object.values(result.scores).length;
                const passed = avgScore > 5;
                const isLocked = !passed && proceedClicks < 5;
                return (
                  <button
                    onClick={() => {
                      if (!isLocked) {
                        navigate('/technical-interview');
                      } else {
                        setProceedClicks(prev => prev + 1);
                      }
                    }}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold shadow-lg transform transition-all ${!isLocked
                      ? 'bg-gradient-to-r from-[#d4a373] to-[#c49363] text-[#1b4d3e] hover:shadow-xl hover:-translate-y-0.5 pointer-events-auto'
                      : 'bg-gray-600 text-gray-400 cursor-pointer active:scale-95'}`}
                  >
                    {!isLocked ? "Proceed to Technical Round" : `Score Low (${avgScore.toFixed(1)}/10)`} <TrendingUp size={20} />
                  </button>
                );
              })()}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
