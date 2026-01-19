import { Participant } from '@/types/gd';
import { ParticipantTile } from './ParticipantTile';

interface VideoGridProps {
  participants: Participant[];
}

export function VideoGrid({ participants }: VideoGridProps) {
  const count = participants.length;
  
  // Calculate grid layout based on participant count
  const getGridClass = () => {
    if (count <= 2) return 'grid-cols-2';
    if (count <= 4) return 'grid-cols-2 grid-rows-2';
    if (count <= 6) return 'grid-cols-3 grid-rows-2';
    return 'grid-cols-4 grid-rows-2';
  };

  return (
    <div className={`grid gap-3 h-full p-2 ${getGridClass()}`}>
      {participants.map((participant) => (
        <ParticipantTile
          key={participant.id}
          participant={participant}
          isLarge={count <= 4}
        />
      ))}
    </div>
  );
}




