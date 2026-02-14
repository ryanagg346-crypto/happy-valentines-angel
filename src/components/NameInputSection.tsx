import { useState, useRef, useCallback } from "react";
import { useValentine } from "@/contexts/ValentineContext";
import gsap from "gsap";

const NameInputSection = () => {
  const { partnerName, setPartnerName } = useValentine();
  const [inputValue, setInputValue] = useState(partnerName);
  const [hearts, setHearts] = useState<{ id: number; x: number; y: number; size: number; delay: number }[]>([]);
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const idCounter = useRef(0);

  const burstHearts = useCallback(() => {
    const newHearts = Array.from({ length: 15 }, () => ({
      id: idCounter.current++,
      x: (Math.random() - 0.5) * 250,
      y: -(Math.random() * 200 + 40),
      size: 10 + Math.random() * 18,
      delay: Math.random() * 0.3,
    }));
    setHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => setHearts((prev) => prev.filter((h) => !newHearts.includes(h))), 2000);
  }, []);

  const handleSubmit = () => {
    setPartnerName(inputValue);
    burstHearts();

    // Animate all personalized text across the page
    gsap.fromTo(
      ".personalized-name",
      { scale: 0.8, opacity: 0.3 },
      { scale: 1, opacity: 1, duration: 0.6, ease: "back.out(1.7)", stagger: 0.1 }
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSubmit();
  };

  const getShareUrl = () => {
    const url = new URL(window.location.href.split("?")[0]);
    if (inputValue.trim()) {
      url.searchParams.set("name", inputValue.trim());
    }
    return url.toString();
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(getShareUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = getShareUrl();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleWhatsAppShare = () => {
    const name = inputValue.trim() || "My Love";
    const text = `💕 Happy Valentine's Week, ${name}! I made something special for you ❤️\n${getShareUrl()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="max-w-2xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold glow-text text-foreground mb-3">
          💝 Make It Personal
        </h2>
        <p className="font-script text-xl sm:text-2xl text-romantic-soft-pink mb-10">
          Add a name to make this extra special
        </p>

        {/* Input group */}
        <div className="relative inline-block w-full max-w-xl">
          {/* Heart burst particles */}
          {hearts.map((h) => (
            <span
              key={h.id}
              className="absolute pointer-events-none select-none z-20"
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

          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter your love's name ❤️"
              className="w-full sm:flex-1 px-6 py-4 rounded-full text-lg font-sans outline-none transition-all duration-400 bg-card/50 text-foreground placeholder:text-muted-foreground backdrop-blur-xl"
              style={{
                border: "1px solid hsl(348 100% 65% / 0.25)",
                boxShadow: "0 0 20px hsl(348 100% 65% / 0.1)",
              }}
              onFocus={(e) => {
                e.target.style.borderColor = "hsl(348 100% 65% / 0.6)";
                e.target.style.boxShadow = "0 0 30px hsl(348 100% 65% / 0.25), 0 0 60px hsl(348 100% 65% / 0.1)";
              }}
              onBlur={(e) => {
                e.target.style.borderColor = "hsl(348 100% 65% / 0.25)";
                e.target.style.boxShadow = "0 0 20px hsl(348 100% 65% / 0.1)";
              }}
            />
            <button
              onClick={handleSubmit}
              className="glow-button whitespace-nowrap text-base font-serif tracking-wide"
            >
              Make It Special 💖
            </button>
          </div>
        </div>

        {/* Share buttons */}
        <div className="mt-10 flex flex-col sm:flex-row gap-3 items-center justify-center">
          <button
            onClick={handleCopyLink}
            className="glass-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 flex items-center gap-2"
            style={{
              borderColor: copied ? "hsl(140 60% 50% / 0.4)" : undefined,
              boxShadow: copied ? "0 0 20px hsl(140 60% 50% / 0.2)" : undefined,
            }}
          >
            {copied ? (
              <>✅ Link Copied!</>
            ) : (
              <>💌 Share This Love</>
            )}
          </button>
          <button
            onClick={handleWhatsAppShare}
            className="glass-card px-6 py-3 text-sm font-medium text-foreground transition-all duration-300 hover:scale-105 flex items-center gap-2"
          >
            📱 Share on WhatsApp
          </button>
        </div>
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

export default NameInputSection;
