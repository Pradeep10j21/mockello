import { useEffect, useState } from "react";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

const facts = [
  "The first computer bug was an actual moth found in the Mark II computer in 1947.",
  "Python was named after Monty Python's Flying Circus, not the snake.",
  "The first programmer was Ada Lovelace, who wrote algorithms in the 1840s.",
  "Git was created by Linus Torvalds in just 2 weeks.",
  "The average person blinks 15-20 times per minute, but only 3-4 times while using a computer.",
  "The QWERTY keyboard was designed to slow down typing to prevent typewriter jams.",
  "The first 1GB hard drive weighed 550 pounds and cost $40,000 in 1980.",
  "Over 500 hours of video are uploaded to YouTube every minute.",
  "The first website ever created is still online at info.cern.ch.",
  "JavaScript was created in just 10 days by Brendan Eich.",
  "NASA's computers in 1969 had less processing power than a modern calculator.",
  "The term 'debugging' came from removing an actual bug from a computer.",
];

const BrainFeedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 15000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const goToNext = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % facts.length);
      setIsAnimating(false);
    }, 300);
  };

  const goToPrev = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + facts.length) % facts.length);
      setIsAnimating(false);
    }, 300);
  };

  return (
    <div className={`w-full max-w-lg ${mounted ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
      {/* Header */}
      <div className="flex items-center justify-center gap-2 mb-3">
        <Lightbulb className="w-4 h-4 text-gold-warm" />
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider font-body">
          Brain Feed
        </span>
      </div>

      {/* Fact Card */}
      <div className="relative group">
        {/* Navigation buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-3 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-muted"
        >
          <ChevronLeft className="w-4 h-4 text-muted-foreground" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-3 w-8 h-8 rounded-full bg-card border border-border shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10 hover:bg-muted"
        >
          <ChevronRight className="w-4 h-4 text-muted-foreground" />
        </button>

        {/* Fact content */}
        <div className="px-6 py-4 rounded-2xl bg-muted/30 border border-border backdrop-blur-sm">
          <p
            className={`text-center text-sm md:text-base text-foreground font-body leading-relaxed transition-all duration-300 ${
              isAnimating ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
            }`}
          >
            "{facts[currentIndex]}"
          </p>
        </div>
      </div>

      {/* Progress dots */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        {facts.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setIsAnimating(true);
              setTimeout(() => {
                setCurrentIndex(index);
                setIsAnimating(false);
              }, 300);
            }}
            className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
              index === currentIndex
                ? "w-4 bg-forest-medium"
                : "bg-sage/50 hover:bg-sage"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default BrainFeedCarousel;




