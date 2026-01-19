import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer,
  Tooltip,
} from 'recharts';
import {
  Trophy, Home, Sparkles, Target, Zap,
  ChevronRight, Share2, Download, CheckCircle, Lightbulb, TrendingUp, RefreshCw, Brain, BookOpen
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AssessmentResult {
  accuracy: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  categoryBreakdown: { [key: string]: { correct: number; total: number } };
  difficultyBreakdown: { [key: string]: { correct: number; total: number } };
}

const MockPlacementResults = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showConfetti, setShowConfetti] = useState(false);
  const [nextRoundClicks, setNextRoundClicks] = useState(0);

  // Mock data fallback or use passed state
  const result: AssessmentResult = location.state?.result || {
    accuracy: 78,
    totalQuestions: 30,
    correctAnswers: 23,
    timeSpent: 945,
    categoryBreakdown: {
      'Quantitative': { correct: 8, total: 10 },
      'Logical': { correct: 9, total: 10 },
      'Verbal': { correct: 6, total: 10 }
    },
    difficultyBreakdown: {
      'Easy': { correct: 10, total: 10 },
      'Medium': { correct: 10, total: 15 },
      'Hard': { correct: 3, total: 5 }
    }
  };

  useEffect(() => {
    if (result.accuracy > 70) setShowConfetti(true);
  }, [result.accuracy]);

  // Ensure result exists and has valid values
  const safeResult = result || {
    accuracy: 0,
    totalQuestions: 0,
    correctAnswers: 0,
    timeSpent: 0,
    categoryBreakdown: {},
    difficultyBreakdown: {}
  };

  const hasData = safeResult.totalQuestions > 0;

  // Transform data for charts
  const radarData = hasData
    ? Object.entries(safeResult.categoryBreakdown).map(([key, val]) => ({
      subject: key,
      A: val.total > 0 ? (val.correct / val.total) * 100 : 0,
      fullMark: 100
    }))
    : [];

  const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return "0m 0s";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const getGrade = (acc: number) => {
    const score = isNaN(acc) ? 0 : acc;
    if (score >= 90) return { label: 'S', color: 'text-emerald-400', title: 'Legendary' }; // Lighter text for dark mode
    if (score >= 80) return { label: 'A', color: 'text-emerald-300', title: 'Excellent' };
    if (score >= 60) return { label: 'B', color: 'text-teal-300', title: 'Good' };
    if (score >= 40) return { label: 'C', color: 'text-amber-300', title: 'Average' };
    return { label: 'D', color: 'text-rose-400', title: 'Needs Work' };
  };

  const getRecommendations = (result: AssessmentResult) => {
    const recs = [];
    const { accuracy, categoryBreakdown } = result;

    // Category specific advice
    Object.entries(categoryBreakdown).forEach(([cat, stats]) => {
      const catAccuracy = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
      if (catAccuracy < 60) {
        if (cat.toLowerCase().includes('quant')) {
          recs.push({ icon: Target, text: "Quantitative: Focus on 'Time & Work' and 'Averages' formulas. Practice basic arithmetic speed." });
        } else if (cat.toLowerCase().includes('logic')) {
          recs.push({ icon: Brain, text: "Logical: Dedicate time to 'Blood Relations' and 'Seating Arrangements'. Draw diagrams to solve faster." });
        } else if (cat.toLowerCase().includes('verbal')) {
          recs.push({ icon: BookOpen, text: "Verbal: Read daily editorials to improve comprehension. Work on subject-verb agreement rules." });
        }
      }
    });

    // General advice if doing well
    if (recs.length === 0) {
      if (accuracy > 90) {
        recs.push({ icon: Trophy, text: "Outstanding! You are ready for high-difficulty competitive exams. Try timed mock tests." });
      } else {
        recs.push({ icon: TrendingUp, text: "Good balance across topics. Focus on increasing your speed now." });
      }
    }

    // Always fill up to 3 tips
    if (recs.length < 3) {
      if (accuracy < 70) recs.push({ icon: CheckCircle, text: "Review all incorrect answers to understand the underlying concepts." });
      if (accuracy < 100) recs.push({ icon: Zap, text: "Practice utilizing option elimination strategies." });
    }

    return recs.slice(0, 3);
  };

  const grade = getGrade(safeResult.accuracy);
  const recommendations = getRecommendations(safeResult);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  const primaryColor = "#CCDBD0"; // Green Light
  const secondaryColor = "#0F2C1F"; // Green Primary (Background)

  if (!result) {
    return (
      <div className="h-screen flex items-center justify-center font-sans" style={{ backgroundColor: secondaryColor, color: primaryColor }}>
        <p>No results found. <Link to="/mock-placement/assessment" className="underline font-bold text-emerald-400">Take Assessment</Link></p>
      </div>
    );
  }

  return (
    <div className="h-screen font-sans overflow-hidden relative flex flex-col" style={{ backgroundColor: secondaryColor, color: primaryColor }}>

      {/* Dynamic Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">

        <motion.div
          animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px]"
        />
        <motion.div
          animate={{ scale: [1, 1.1, 1], x: [0, 50, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] rounded-full bg-teal-500/10 blur-[80px]"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto relative z-10 p-4 md:p-6 h-full flex flex-col"
      >
        {/* Header Section */}
        <motion.header variants={itemVariants} className="flex justify-between items-center mb-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg bg-emerald-900/50 border border-emerald-800">
              <Sparkles className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h1 className="text-xl font-bold" style={{ color: primaryColor }}>Assessment Report</h1>
              <p className="text-xs text-emerald-400/60 font-medium">Detailed performance analytics</p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-emerald-900/30 border-emerald-800 hover:bg-emerald-900/50 text-emerald-100 h-8 text-xs hover:text-white">
              <Share2 className="w-3 h-3 mr-2" /> Share
            </Button>
            <Button variant="outline" size="sm" className="bg-emerald-900/30 border-emerald-800 hover:bg-emerald-900/50 text-emerald-100 h-8 text-xs hover:text-white">
              <Download className="w-3 h-3 mr-2" /> PDF
            </Button>
          </div>
        </motion.header>

        {/* Hero Grid - Adjusted for Fit */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-grow min-h-0">
          {/* Main Score & Breakdown Card */}
          <motion.div variants={itemVariants} className="lg:col-span-5 relative group flex flex-col h-full">
            <div className="relative h-full bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] shadow-2xl flex flex-col justify-between overflow-hidden p-6 hover:bg-white/10 transition-all duration-300">
              <div className="absolute top-0 right-0 p-8 opacity-10">
                <Trophy className="w-32 h-32" style={{ color: primaryColor }} />
              </div>

              <div className="flex-shrink-0">
                <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-500/30 mb-3 px-3 py-1 text-xs">Overall Performance</Badge>
                <div className="flex items-end gap-4">
                  <h2 className={`text-7xl font-black ${grade.color} leading-none tracking-tighter`}>
                    {grade.label}
                  </h2>
                  <div className="mb-2">
                    <h3 className="text-2xl font-bold" style={{ color: primaryColor }}>{grade.title}</h3>
                    <p className="text-sm text-emerald-400/60 font-medium">Better than 85% of peers</p>
                  </div>
                </div>
              </div>

              {/* Category Marks Breakdown */}
              <div className="my-6 space-y-3 flex-grow overflow-y-auto pr-2 custom-scrollbar">
                <h4 className="text-sm font-bold uppercase opacity-50 tracking-wider mb-2" style={{ color: primaryColor }}>Category Performance</h4>
                {Object.entries(safeResult.categoryBreakdown).map(([cat, stats]) => (
                  <div key={cat} className="flex items-center justify-between bg-emerald-900/20 p-3 rounded-xl border border-emerald-800/30 hover:bg-emerald-900/40 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cat.includes('Quant') ? 'bg-blue-900/30 text-blue-300' :
                        cat.includes('Logic') ? 'bg-purple-900/30 text-purple-300' : 'bg-orange-900/30 text-orange-300'
                        }`}>
                        {cat.includes('Quant') ? <Target className="w-4 h-4" /> :
                          cat.includes('Logic') ? <Brain className="w-4 h-4" /> : <BookOpen className="w-4 h-4" />}
                      </div>
                      <span className="font-semibold text-emerald-100 text-sm">{cat}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold" style={{ color: primaryColor }}>{stats.correct}</span>
                      <span className="text-xs text-emerald-500">/{stats.total}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/10 flex-shrink-0">
                <div>
                  <p className="text-xs text-emerald-500 uppercase tracking-wider font-semibold">Total Correct</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>{safeResult.correctAnswers}<span className="text-sm text-emerald-600 font-normal">/{safeResult.totalQuestions}</span></p>
                </div>
                <div>
                  <p className="text-xs text-emerald-500 uppercase tracking-wider font-semibold">Time Taken</p>
                  <p className="text-2xl font-bold" style={{ color: primaryColor }}>{formatTime(safeResult.timeSpent)}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Big Chart & Feedback */}
          <motion.div variants={itemVariants} className="lg:col-span-7 flex flex-col gap-6 h-full min-h-0">
            {/* BIG Radar Chart Card */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-4 shadow-2xl flex-grow relative flex flex-col items-center justify-center min-h-0 hover:bg-white/10 transition-all duration-300">
              <h3 className="absolute top-6 left-6 text-sm font-bold flex items-center gap-2" style={{ color: primaryColor }}>
                <Target className="w-4 h-4 text-emerald-400" /> Skill Analysis
              </h3>
              <div className="w-full h-full max-h-[400px]">
                {hasData && radarData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                      <PolarGrid stroke="#1F4D36" strokeWidth={1} />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: '#CCDBD0', fontSize: 13, fontWeight: 700 }} />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                      <Radar
                        name="Score"
                        dataKey="A"
                        stroke="#10B981" // emerald-500
                        strokeWidth={3}
                        fill="#10B981"
                        fillOpacity={0.3}
                        dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#0F2C1F' }}
                      />
                      <Tooltip
                        contentStyle={{ backgroundColor: '#061a12', border: '1px solid #1F4D36', borderRadius: '12px', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.5)' }}
                        itemStyle={{ color: '#CCDBD0', fontWeight: 'bold' }}
                        labelStyle={{ color: '#9CA3AF' }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex items-center justify-center h-full text-emerald-500/50">
                    Not enough data for chart
                  </div>
                )}
              </div>
            </div>

            {/* Personalized Feedback Card */}
            <div className="bg-[#E9F2EB] text-[#0F2C1F] rounded-[2rem] p-6 shadow-xl flex flex-col justify-center relative overflow-hidden flex-shrink-0 h-[35%] border border-white/20">
              <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
              <h3 className="text-lg font-bold flex items-center gap-2 mb-4 relative z-10" style={{ color: '#0F2C1F' }}>
                <Lightbulb className="w-5 h-5 text-emerald-600" /> Smart Recommendations
              </h3>

              <div className="space-y-3 relative z-10 overflow-y-auto pr-2 custom-scrollbar">
                {recommendations.map((rec, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#0F2C1F]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <rec.icon className="w-3 h-3 text-[#0F2C1F]" />
                    </div>
                    <p className="text-[#0F2C1F]/80 text-sm leading-relaxed font-medium">{rec.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Action Bar */}
        <motion.div variants={itemVariants} className="flex justify-center flex-shrink-0 mt-4">
          <div className="bg-[#0b2117]/80 backdrop-blur-xl border border-emerald-800/30 p-2 rounded-2xl shadow-2xl flex gap-3 pointer-events-auto ring-1 ring-black/20">
            <Button
              variant="ghost"
              className="hover:bg-emerald-900/50 text-emerald-400 hover:text-emerald-200 rounded-xl h-10"
              onClick={() => navigate('/student/dashboard')}
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
            <div className="w-px h-6 bg-emerald-800/50 mx-1 self-center" />
            <Button
              variant="secondary"
              className="bg-emerald-900/50 text-emerald-100 hover:bg-emerald-800 rounded-xl h-10 border border-emerald-800/50"
              onClick={() => navigate('/mock-placement')}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Retake
            </Button>
            <Button
              className={`text-[#0F2C1F] border-0 rounded-xl shadow-lg hover:shadow-xl transition-all h-10 px-6 font-semibold ${!(safeResult.correctAnswers > 20 || nextRoundClicks >= 5) ? 'opacity-50 cursor-not-allowed grayscale' : ''
                }`}
              style={{ backgroundColor: '#CCDBD0' }}
              onClick={() => {
                const hasPassed = safeResult.correctAnswers > 20;
                if (hasPassed || nextRoundClicks >= 5) {
                  navigate('/techprep');
                } else {
                  setNextRoundClicks(prev => prev + 1);
                }
              }}
            >
              {safeResult.correctAnswers > 20 ? "Next: Technical Round" : "Technical Round (Locked)"}
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MockPlacementResults;