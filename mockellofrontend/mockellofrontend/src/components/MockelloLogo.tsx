interface MockelloLogoProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

const MockelloLogo = ({ size = "md", className = "" }: MockelloLogoProps) => {
  const sizeClasses = {
    sm: "text-xl",
    md: "text-2xl md:text-3xl",
    lg: "text-3xl md:text-4xl",
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center overflow-hidden">
        <img src="/logo.png" alt="Mockello Logo" className="w-8 h-8 object-contain" />
      </div>
      <h1 className={`font-display font-bold tracking-tight ${sizeClasses[size]}`}>
        <span className="text-foreground">Mockello</span>
      </h1>
    </div>
  );
};

export default MockelloLogo;




