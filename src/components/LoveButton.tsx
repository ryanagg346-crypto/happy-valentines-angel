import { useState, useRef, useCallback } from "react";
import gsap from "gsap";
import { useValentine } from "@/contexts/ValentineContext";

const LoveButton = () => {
  const { displayName } = useValentine();
  const [opened, setOpened] = useState(false);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const burst = useCallback(() => {
    const newHearts = Array.from({ length: 20 }, () => ({
      id: idCounter.current++,
      x: (Math.random() - 0.5) * 300,
      y: -(Math.random() * 250 + 50),
      size: 12 + Math.random() * 24,
      delay: Math.random() * 0.3,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => !newHearts.includes(h))), 2000);
  }, []);

  const handleClick = () => {
    if (opened) return;
    setOpened(true);
    burst();

    if (messageRef.current) {
      gsap.fromTo(
        messageRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.7)", delay: 0.3 }
      );
    }
  };

  return (
    <section className="py-24 px-6 relative overflow-hidden" ref={containerRef}>
      <div className="max-w-2xl mx-auto text-center relative">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold glow-text text-foreground mb-10">
          💖 A Special Surprise
        </h2>

        <div className="relative inline-block">
          {/* Heart burst particles */}
          {hearts.map((h) => (
            <span
              key={h.id}
              className="absolute pointer-events-none select-none"
              style={{
                left: "50%",
                top: "50%",
                fontSize: h.size,
                animation: `heartBurst 1.5s ease-out ${h.delay}s forwards`,
                ["--tx" as string]: `${h.x}px`,
                ["--ty" as string]: `${h.y}px`,
                opacity: 0,
              }}
            >
              ❤️
            </span>
          ))}

          <button
            onClick={handleClick}
            className={`glow-button text-xl font-serif tracking-wider transition-all duration-500 ${
              opened ? "scale-110" : ""
            }`}
            style={{
              boxShadow: opened
                ? "0 0 60px hsl(348 100% 65% / 0.6), 0 0 120px hsl(348 100% 65% / 0.3)"
                : undefined,
            }}
          >
            {opened ? "💕 My Heart is Yours 💕" : "Open My Heart ❤️"}
          </button>
        </div>

        {opened && (
          <div
            ref={messageRef}
            className="mt-12 glass-card max-w-lg mx-auto"
            style={{ opacity: 0 }}
          >
            <p className="personalized-name font-script text-3xl sm:text-4xl text-romantic-pink mb-4">
              This heart beats only for you, {displayName} ❤️
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Every moment with you feels like a dream I never want to wake up from.
              You are the reason I believe in magic. ✨
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes heartBurst {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1) rotate(20deg);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default LoveButton;
