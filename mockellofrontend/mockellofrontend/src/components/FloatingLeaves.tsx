import { Leaf, TreeDeciduous, TreePine, Flower2 } from "lucide-react";

const FloatingLeaves = () => {
  const leaves = [
    { Icon: Leaf, delay: "0s", left: "10%", size: 20 },
    { Icon: TreeDeciduous, delay: "3s", left: "25%", size: 24 },
    { Icon: Leaf, delay: "6s", left: "40%", size: 16 },
    { Icon: TreePine, delay: "9s", left: "60%", size: 28 },
    { Icon: Leaf, delay: "12s", left: "75%", size: 18 },
    { Icon: Flower2, delay: "2s", left: "85%", size: 22 },
    { Icon: Leaf, delay: "5s", left: "15%", size: 14 },
    { Icon: Leaf, delay: "8s", left: "50%", size: 20 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {leaves.map((leaf, index) => (
        <div
          key={index}
          className="absolute opacity-20 text-sage"
          style={{
            left: leaf.left,
            animation: `leafFall 15s linear infinite`,
            animationDelay: leaf.delay,
          }}
        >
          <leaf.Icon size={leaf.size} />
        </div>
      ))}
    </div>
  );
};

export default FloatingLeaves;
