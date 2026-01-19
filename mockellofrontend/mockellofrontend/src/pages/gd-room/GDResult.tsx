import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ArrowLeft,
  Trophy,
  TrendingUp,
  TrendingDown,
  Lightbulb,
  BarChart3,
  MessageCircle,
  Zap,
  Users,
  CheckCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import type { TranscriptMessage, Participant, GDResult as GDResultType } from '@/types/gd';

// Simulated AI analysis for "You"
const generateYourResult = (transcript: TranscriptMessage[]): GDResultType => {
  const yourMessages = transcript.filter((m) => m.isYou);
  const messageCount = yourMessages.length;

  // Calculate scores based on participation (with minimum base scores)
  const baseParticipation = messageCount > 0 ? Math.min(10, 5 + (messageCount / 3) * 5) : 6.5;
  const relevance = 7.8 + Math.random() * 1.5;
  const communication = 7.5 + Math.random() * 2;
  const confidence = 7.2 + Math.random() * 2.3;
  const logicalFlow = 7.6 + Math.random() * 1.8;
  const participation = baseParticipation + Math.random() * 1.5;

  const overallScore = ((participation + relevance + communication + confidence + logicalFlow) / 5);

  return {
    participantId: 'you',
    participantName: 'You',
    score: parseFloat(overallScore.toFixed(1)),
    rank: Math.floor(Math.random() * 3) + 1,
    strengths: [
      'Clear and articulate presentation of ideas',
      'Strong understanding of the topic and its implications',
      'Respectful and collaborative approach with other participants',
      'Used relevant real-world examples to support arguments',
      'Maintained composure and confidence throughout the discussion',
    ],
    weaknesses: [
      'Could initiate more points proactively',
      'Some arguments needed deeper analysis',
      'More engagement with opposing viewpoints would strengthen arguments',
    ],
    suggestions: [
      'Practice opening statements to initiate discussions confidently',
      'Back up your arguments with statistics and credible sources',
      'Actively acknowledge and build upon other participants\' points',
      'Summarize key takeaways at the end to leave a strong impression',
      'Work on body language and eye contact for better presence',
    ],
    relevance,
    communication,
    confidence,
    participation,
    logicalFlow,
  };
};

export default function GDResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const { transcript = [], topic = '' } = location.state || {};

  const result = generateYourResult(transcript);

  const scoreMetrics = [
    { label: 'Relevance', value: result.relevance, icon: MessageCircle },
    { label: 'Communication', value: result.communication, icon: Users },
    { label: 'Confidence', value: result.confidence, icon: Zap },
    { label: 'Participation', value: result.participation, icon: TrendingUp },
    { label: 'Logical Flow', value: result.logicalFlow, icon: BarChart3 },
  ];

  const getRankLabel = (rank: number) => {
    switch (rank) {
      case 1: return '1st';
      case 2: return '2nd';
      case 3: return '3rd';
      default: return `${rank}th`;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return 'text-green-600';
    if (score >= 6) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate('/gd-portal')}
            className="gap-2 text-[#0F2C1F] dark:text-[#2d5a3d] hover:text-[#0F2C1F] dark:hover:text-[#2d5a3d] font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Start New Discussion
          </Button>
        </motion.div>

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-center space-y-2"
        >
          <h1 className="font-display text-4xl font-bold text-[#0F2C1F] dark:text-[#2d5a3d]">
            Your Performance Report
          </h1>
          <p className="text-[#0F2C1F] dark:text-[#2d5a3d] font-medium">AI-powered analysis of your group discussion</p>
          <p className="text-sm text-[#0F2C1F] dark:text-[#2d5a3d] italic font-medium">Topic: "{topic}"</p>
        </motion.div>

        {/* Score Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-3xl shadow-elevated p-8"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="avatar-initial w-20 h-20 text-3xl">
                Y
              </div>
              <div>
                <h2 className="font-display text-2xl font-semibold text-[#0F2C1F] dark:text-[#2d5a3d]">You</h2>
                <p className="text-[#0F2C1F] dark:text-[#2d5a3d] font-medium">Discussion Participant</p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex items-center gap-3">
                <Trophy className="w-8 h-8 text-yellow-500" />
                <span className="text-5xl font-display font-bold text-[#0F2C1F] dark:text-[#2d5a3d]">
                  {getRankLabel(result.rank)}
                </span>
              </div>
              <p className="text-sm text-[#0F2C1F] dark:text-[#2d5a3d] mt-1 font-medium">Overall Rank</p>
            </div>

            <div className="text-center">
              <div className="text-5xl font-display font-bold text-[#0F2C1F] dark:text-[#2d5a3d]">
                {result.score}
              </div>
              <p className="text-sm text-[#0F2C1F] dark:text-[#2d5a3d] mt-1 font-medium">out of 10</p>
            </div>
          </div>
        </motion.div>

        {/* Score Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card rounded-3xl shadow-card p-6"
        >
          <h3 className="font-display text-xl font-semibold text-[#0F2C1F] dark:text-[#2d5a3d] mb-6 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Score Breakdown
          </h3>
          <div className="space-y-4">
            {scoreMetrics.map((metric, index) => (
              <motion.div
                key={metric.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-40 flex items-center gap-2">
                  <metric.icon className="w-4 h-4 text-[#0F2C1F] dark:text-[#2d5a3d]" />
                  <span className="text-sm font-medium text-[#0F2C1F] dark:text-[#2d5a3d]">{metric.label}</span>
                </div>
                <div className="flex-1">
                  <Progress value={metric.value * 10} className="h-3" />
                </div>
                <span className={`w-12 text-right font-semibold ${getScoreColor(metric.value)}`}>
                  {metric.value.toFixed(1)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Strengths, Weaknesses, Suggestions */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Strengths */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-card rounded-2xl shadow-card p-5"
          >
            <h3 className="font-display text-lg font-semibold text-[#0F2C1F] dark:text-[#2d5a3d] mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-600" />
              Strengths
            </h3>
            <ul className="space-y-2">
              {result.strengths.map((strength, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[#0F2C1F] dark:text-[#2d5a3d]">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                  {strength}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Areas for Improvement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card rounded-2xl shadow-card p-5"
          >
            <h3 className="font-display text-lg font-semibold text-[#0F2C1F] dark:text-[#2d5a3d] mb-4 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-600" />
              Areas to Improve
            </h3>
            <ul className="space-y-2">
              {result.weaknesses.map((weakness, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[#0F2C1F] dark:text-[#2d5a3d]">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-600 mt-2 flex-shrink-0" />
                  {weakness}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Suggestions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-card rounded-2xl shadow-card p-5"
          >
            <h3 className="font-display text-lg font-semibold text-[#0F2C1F] dark:text-[#2d5a3d] mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-primary" />
              Suggestions
            </h3>
            <ul className="space-y-2">
              {result.suggestions.map((suggestion, index) => (
                <li key={index} className="flex items-start gap-2 text-sm text-[#0F2C1F] dark:text-[#2d5a3d]">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                  {suggestion}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-center pt-4"
        >
          <Button
            onClick={() => navigate('/technical-interview')}
            size="lg"
            className="h-16 px-12 rounded-2xl font-black text-xl transition-all bg-[#0F2C1F] hover:bg-[#1a402d] text-white shadow-xl shadow-green-900/20 hover:scale-[1.02]"
          >
            PROCEED TO TECHNICAL INTERVIEW
            <ArrowRight className="w-6 h-6 ml-3" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}




