import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const lines = [
  "In a world full of fleeting moments,",
  "you are my forever.",
  "Every heartbeat whispers your name,",
  "every sunrise paints your smile.",
  "You are the poetry my soul writes,",
  "the melody my heart sings.",
  "Together, we are infinite. 💕",
];

const LoveMessageSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".love-line").forEach((line, i) => {
        gsap.from(line, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: line,
            start: "top 88%",
            toggleActions: "play none none none",
          },
          delay: i * 0.1,
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-28 px-6 relative"
      style={{
        background: "linear-gradient(180deg, hsl(0 0% 6%), hsl(0 0% 4%), hsl(0 0% 6%))",
      }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold glow-text text-foreground mb-12">
          💌 A Love Letter
        </h2>
        <div className="space-y-4">
          {lines.map((line, i) => (
            <p
              key={i}
              className="love-line font-script text-2xl sm:text-3xl md:text-4xl text-romantic-soft-pink leading-relaxed"
            >
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LoveMessageSection;
