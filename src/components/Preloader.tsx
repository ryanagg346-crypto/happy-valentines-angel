import { useEffect, useState } from "react";

const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 400);
          return 100;
        }
        return prev + 2;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background transition-opacity duration-700"
      style={{ opacity: progress >= 100 ? 0 : 1, pointerEvents: progress >= 100 ? "none" : "auto" }}
    >
      <div className="heartbeat mb-8 text-7xl select-none">❤️</div>
      <p className="font-script text-3xl text-romantic-pink glow-text mb-6">Loading Love...</p>
      <div className="w-48 h-1 rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-100"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, hsl(0 100% 27%), hsl(348 100% 65%))",
          }}
        />
      </div>
    </div>
  );
};

export default Preloader;
