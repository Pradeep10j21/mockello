import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import MockelloLogo from "@/components/MockelloLogo";
import LeafParticles from "@/components/waiting-room/LeafParticles";
import SonarRadar from "@/components/waiting-room/SonarRadar";
import SeniorTipsGrid from "@/components/waiting-room/SeniorTipsGrid";
import ReadyButton from "@/components/waiting-room/ReadyButton";
import AIFallbackModal from "@/components/waiting-room/AIFallbackModal";
import ExitWarningModal from "@/components/waiting-room/ExitWarningModal";
import { Button } from "@/components/ui/button";
import { Loader2, Radio, LogOut, Clock } from "lucide-react";

const TOTAL_TIME = 300; // 5 minutes in seconds
const MAX_PARTICIPANTS = 5;

const sampleNames = ["Arjun", "Priya", "Rahul", "Sneha", "Vikram", "Ananya", "Karthik", "Divya"];

const formatTime = (seconds: number) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

const WaitingRoom = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [remainingTime, setRemainingTime] = useState(TOTAL_TIME);
  const [participants, setParticipants] = useState<Array<{ id: number; name: string; isActive: boolean }>>([]);
  const [showExitModal, setShowExitModal] = useState(false);
  const [showAIModal, setShowAIModal] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [isRoomReady, setIsRoomReady] = useState(false);
  const [isUserReady, setIsUserReady] = useState(false);

  // Initialize with random participants
  useEffect(() => {
    const timer = setTimeout(() => {
      const initialCount = Math.floor(Math.random() * 2) + 1;
      const initial = Array.from({ length: initialCount }, (_, i) => ({
        id: i + 1,
        name: sampleNames[i],
        isActive: true,
      }));
      setParticipants(initial);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (isLoading || isRoomReady) return;

    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 1) {
          if (participants.length < MAX_PARTICIPANTS) {
            setShowAIModal(true);
          } else {
            handleEnterRoom();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isLoading, isRoomReady, participants.length]);

  // Simulate random participant joins (every 5 seconds for demo)
  useEffect(() => {
    if (isLoading || participants.length >= MAX_PARTICIPANTS) return;

    const scheduleNextJoin = () => {
      const delay = 5000; // 5 seconds for demo
      return setTimeout(() => {
        setParticipants((prev) => {
          if (prev.length >= MAX_PARTICIPANTS) return prev;
          const newParticipant = {
            id: prev.length + 1,
            name: sampleNames[prev.length] || `Student ${prev.length + 1}`,
            isActive: true,
          };
          return [...prev, newParticipant];
        });
      }, delay);
    };

    const timer = scheduleNextJoin();
    return () => clearTimeout(timer);
  }, [isLoading, participants.length]);

  // Check if room is full
  useEffect(() => {
    if (participants.length >= MAX_PARTICIPANTS) {
      setIsRoomReady(true);
    }
  }, [participants.length]);

  // Handle browser back/close
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  const handleEnterRoom = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      navigate("/gd-portal/gd-room");
    }, 500);
  }, [navigate]);

  const handleUserReady = () => {
    setIsUserReady(true);
  };

  const handleExitConfirm = () => {
    setShowExitModal(false);
    navigate("/gd-portal");
  };

  const handleAIFallbackContinue = () => {
    setShowAIModal(false);
    handleEnterRoom();
  };

  // Timer progress (0-1)
  const timerProgress = remainingTime / TOTAL_TIME;
  const isTimerWarning = remainingTime < 60;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-hero animate-gradient-shift flex flex-col items-center justify-center">
        <LeafParticles />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MockelloLogo size="lg" className="mb-8" />
        </motion.div>
        <motion.div
          className="flex flex-col items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Loader2 className="w-10 h-10 text-forest-medium animate-spin-leaf" />
          <p className="text-muted-foreground font-body">Initializing Digital Zen Garden...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className="min-h-screen bg-gradient-hero animate-gradient-shift overflow-hidden relative flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Background elements */}
        <LeafParticles />

        {/* Header */}
        <motion.header
          className="fixed top-0 left-0 right-0 z-50 px-4 py-4 md:px-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center justify-center max-w-6xl mx-auto">
            <MockelloLogo size="md" />
          </div>
        </motion.header>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 pt-24 pb-32">
          {/* Radar Section */}
          <motion.div
            className="text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Radio className="w-5 h-5 text-forest-medium animate-pulse-soft" />
              <h2 className="font-display text-xl md:text-2xl font-bold text-foreground">
                Searching for Peers
              </h2>
            </div>
            <p className="text-forest-deep font-body font-medium text-base md:text-lg">
              Matching Logic... ({participants.length}/{MAX_PARTICIPANTS} Found)
            </p>
          </motion.div>

          {/* Sonar Radar with Avatar Slots */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, type: "spring", damping: 20 }}
          >
            <SonarRadar participants={participants} maxParticipants={MAX_PARTICIPANTS} />
          </motion.div>

          {/* Ready Button */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <ReadyButton
              isReady={isUserReady}
              isRoomReady={isRoomReady}
              onReady={handleUserReady}
              onEnter={handleEnterRoom}
            />
          </motion.div>

          {/* Senior Tips Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <SeniorTipsGrid />
          </motion.div>
        </main>

        {/* Bottom Bar - Fixed */}
        <motion.div
          className="fixed bottom-0 left-0 right-0 z-40 px-4 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="glass-forest rounded-2xl max-w-2xl mx-auto px-6 py-4 flex items-center justify-between">
            {/* Timer */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-12">
                {/* Circular progress */}
                <svg className="w-full h-full -rotate-90" viewBox="0 0 48 48">
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke="hsl(var(--muted))"
                    strokeWidth="3"
                    fill="none"
                  />
                  <circle
                    cx="24"
                    cy="24"
                    r="20"
                    stroke={isTimerWarning ? "hsl(var(--gold-warm))" : "hsl(var(--forest-medium))"}
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeDasharray={`${timerProgress * 125.6} 125.6`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <Clock 
                  className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 ${
                    isTimerWarning ? "text-gold-warm" : "text-forest-medium"
                  }`} 
                />
              </div>
              <div>
                <p className={`font-display text-2xl font-bold ${
                  isTimerWarning ? "text-gold-warm" : "text-forest-deep"
                }`}>
                  {formatTime(remainingTime)}
                </p>
                <p className="font-body text-xs text-muted-foreground">Time remaining</p>
              </div>
            </div>

            {/* Lobby Status Pill */}
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-sage/30 rounded-full">
              <div className="w-2 h-2 rounded-full bg-forest-medium animate-pulse" />
              <span className="font-body text-sm font-medium text-forest-deep">
                Lobby: {participants.length}/{MAX_PARTICIPANTS}
              </span>
            </div>

            {/* Leave Queue Button */}
            <Button
              variant="ghost"
              onClick={() => setShowExitModal(true)}
              className="text-destructive hover:bg-destructive/10 font-body gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Leave Queue</span>
            </Button>
          </div>
        </motion.div>

        {/* Exit Warning Modal */}
        <ExitWarningModal
          open={showExitModal}
          onOpenChange={setShowExitModal}
          onConfirm={handleExitConfirm}
        />

        {/* AI Fallback Modal */}
        <AIFallbackModal
          open={showAIModal}
          onContinue={handleAIFallbackContinue}
        />
      </motion.div>
    </AnimatePresence>
  );
};

export default WaitingRoom;

