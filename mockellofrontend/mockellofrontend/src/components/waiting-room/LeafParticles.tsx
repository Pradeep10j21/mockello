import { useEffect, useState } from "react";
import { Leaf } from "lucide-react";

interface LeafParticle {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  opacity: number;
}

const LeafParticles = () => {
  const [leaves, setLeaves] = useState<LeafParticle[]>([]);

  useEffect(() => {
    const generateLeaves = () => {
      const newLeaves: LeafParticle[] = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 10,
        duration: 12 + Math.random() * 8,
        size: 12 + Math.random() * 16,
        opacity: 0.3 + Math.random() * 0.4,
      }));
      setLeaves(newLeaves);
    };

    generateLeaves();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {leaves.map((leaf) => (
        <div
          key={leaf.id}
          className="absolute"
          style={{
            left: `${leaf.left}%`,
            top: "-5%",
            animation: `leaf-fall ${leaf.duration}s linear infinite`,
            animationDelay: `${leaf.delay}s`,
            opacity: leaf.opacity,
          }}
        >
          <Leaf
            className="text-forest-medium"
            style={{
              width: leaf.size,
              height: leaf.size,
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default LeafParticles;




