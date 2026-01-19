import { motion, AnimatePresence } from "framer-motion";
import { User, Wifi } from "lucide-react";

interface Participant {
  id: number;
  name: string;
  isActive: boolean;
}

interface SonarRadarProps {
  participants: Participant[];
  maxParticipants: number;
}

const SonarRadar = ({ participants, maxParticipants }: SonarRadarProps) => {
  const slots = Array.from({ length: maxParticipants }, (_, i) => {
    const participant = participants[i];
    const angle = (i * 360) / maxParticipants - 90;
    const radius = 120;
    const x = Math.cos((angle * Math.PI) / 180) * radius;
    const y = Math.sin((angle * Math.PI) / 180) * radius;
    return { x, y, participant, index: i };
  });

  return (
    <div className="relative w-80 h-80 md:w-96 md:h-96 flex items-center justify-center">
      {/* Sonar rings */}
      {[1, 2, 3].map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full border-2 border-forest-medium/20"
          style={{
            width: `${ring * 33}%`,
            height: `${ring * 33}%`,
          }}
        />
      ))}

      {/* Animated sonar pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute w-24 h-24 rounded-full border-2 border-forest-medium/40"
            initial={{ scale: 1, opacity: 0.6 }}
            animate={{ scale: 2.5, opacity: 0 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.7,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Center avatar */}
      <motion.div
        className="absolute z-10 w-20 h-20 md:w-24 md:h-24 rounded-full bg-gradient-to-br from-forest-medium to-forest-deep flex items-center justify-center shadow-glow"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <User className="w-10 h-10 md:w-12 md:h-12 text-primary-foreground" />
      </motion.div>

      {/* Broadcasting indicator */}
      <motion.div
        className="absolute -top-2 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-forest-deep/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-body"
        animate={{ opacity: [1, 0.7, 1] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <Wifi className="w-3 h-3" />
        <span>Broadcasting</span>
      </motion.div>

      {/* Participant slots around the radar */}
      {slots.map(({ x, y, participant, index }) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: "50%",
            top: "50%",
            transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
          }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <AnimatePresence mode="wait">
            {participant ? (
              <motion.div
                key={`active-${participant.id}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="relative"
              >
                {/* Ping effect when joining */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-forest-medium"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 2, opacity: 0 }}
                  transition={{ duration: 0.6 }}
                />
                
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-br from-sage to-forest-medium flex items-center justify-center border-2 border-forest-medium shadow-lg relative z-10">
                  <span className="text-primary-foreground font-semibold text-sm md:text-base">
                    {participant.name.charAt(0)}
                  </span>
                </div>
                
                {/* Name label */}
                <motion.div
                  className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <span className="text-xs font-body text-foreground/80 bg-background/80 px-2 py-0.5 rounded-full">
                    {participant.name}
                  </span>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${index}`}
                className="w-12 h-12 md:w-14 md:h-14 rounded-full border-2 border-dashed border-sage/50 flex items-center justify-center"
                animate={{ opacity: [0.4, 0.7, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.2 }}
              >
                <span className="text-sage/50 text-xs">?</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};

export default SonarRadar;




