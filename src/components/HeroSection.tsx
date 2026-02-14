import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import HeartParticles from "./HeartParticles";
import { useValentine } from "@/contexts/ValentineContext";

const subtexts = [
  "7 Days of Love ✨",
  "Celebrate Every Moment 💕",
  "With My Love Angel🌹",
];

const HeroSection = () => {
  const { displayName, nameUpdated } = useValentine();
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [typing, setTyping] = useState(true);

  // Typewriter effect
  useEffect(() => {
    const fullText = subtexts[textIndex];
    if (typing) {
      if (displayText.length < fullText.length) {
        const t = setTimeout(() => setDisplayText(fullText.slice(0, displayText.length + 1)), 60);
        return () => clearTimeout(t);
      } else {
        const t = setTimeout(() => setTyping(false), 2000);
        return () => clearTimeout(t);
      }
    } else {
      if (displayText.length > 0) {
        const t = setTimeout(() => setDisplayText(displayText.slice(0, -1)), 30);
        return () => clearTimeout(t);
      } else {
        setTextIndex((i) => (i + 1) % subtexts.length);
        setTyping(true);
      }
    }
  }, [displayText, typing, textIndex]);

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, { y: 60, opacity: 0, duration: 1.2, ease: "power3.out", delay: 0.2 });
      gsap.from(subRef.current, { y: 40, opacity: 0, duration: 1, ease: "power3.out", delay: 0.6 });
      gsap.from(btnRef.current, { y: 30, opacity: 0, duration: 1, ease: "power3.out", delay: 1 });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const scrollToTimeline = () => {
    document.getElementById("timeline")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: "linear-gradient(160deg, hsl(0 0% 6%) 0%, hsl(0 100% 12%) 50%, hsl(0 0% 6%) 100%)",
      }}
    >
      <HeartParticles />
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <h1
          ref={headingRef}
          className="text-5xl sm:text-7xl md:text-8xl font-serif font-bold mb-6 glow-text text-foreground leading-tight"
        >
          Happy Valentine's Day,
          <br />
          <span className={`personalized-name text-romantic-pink transition-all duration-500 ${nameUpdated ? "scale-110" : ""}`}>
            {displayName}
          </span> ❤️
        </h1>
        <p
          ref={subRef}
          className="font-script text-2xl sm:text-3xl md:text-4xl text-romantic-soft-pink mb-10 min-h-[2.5rem]"
        >
          {displayText}
          <span className="animate-pulse">|</span>
        </p>
        <button ref={btnRef} className="glow-button text-lg font-serif tracking-widest uppercase" onClick={scrollToTimeline}>
          Start the Love Journey
        </button>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default HeroSection;
