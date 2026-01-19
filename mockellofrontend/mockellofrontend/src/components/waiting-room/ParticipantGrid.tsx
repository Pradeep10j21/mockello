import { User } from "lucide-react";
import { useEffect, useState } from "react";

interface Participant {
  id: number;
  name: string;
  avatar?: string;
  isActive: boolean;
}

interface ParticipantGridProps {
  participants: Participant[];
  maxParticipants?: number;
}

const ParticipantGrid = ({ participants, maxParticipants = 5 }: ParticipantGridProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slots = Array.from({ length: maxParticipants }, (_, i) => {
    const participant = participants[i];
    return participant || null;
  });

  const activeCount = participants.filter(p => p.isActive).length;

  return (
    <div className={`flex flex-col items-center gap-4 ${mounted ? "animate-fade-up" : "opacity-0"}`} style={{ animationDelay: "0.2s" }}>
      {/* Participant count */}
      <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border">
        <div className="w-2 h-2 rounded-full bg-forest-medium animate-pulse" />
        <span className="text-sm font-medium text-foreground font-body">
          <span className="text-forest-medium font-bold">{activeCount}</span>
          <span className="text-muted-foreground">/{maxParticipants} Students Ready</span>
        </span>
      </div>

      {/* Avatar slots */}
      <div className="flex items-center gap-3 md:gap-4">
        {slots.map((participant, index) => (
          <div
            key={index}
            className={`relative transition-all duration-500 ${
              participant 
                ? "animate-scale-in" 
                : ""
            }`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {participant ? (
              <div className="relative">
                {/* Glow ring for active participants */}
                <div className="absolute -inset-1 rounded-full bg-forest-medium/30 animate-glow" />
                
                {/* Avatar container */}
                <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-forest-medium bg-card flex items-center justify-center overflow-hidden">
                  {participant.avatar ? (
                    <img 
                      src={participant.avatar} 
                      alt={participant.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-forest-medium to-forest-deep flex items-center justify-center">
                      <span className="text-primary-foreground font-bold text-lg">
                        {participant.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
                
                {/* Active indicator */}
                <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-forest-medium border-2 border-card flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-primary-foreground" />
                </div>
              </div>
            ) : (
              <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-dashed border-sage/60 bg-muted/30 flex items-center justify-center">
                <User className="w-5 h-5 text-sage" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ParticipantGrid;




