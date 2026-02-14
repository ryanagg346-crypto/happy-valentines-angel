import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useValentine } from "@/contexts/ValentineContext";

gsap.registerPlugin(ScrollTrigger);

const FinalSection = () => {
  const { displayName } = useValentine();
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".final-heading", {
        y: 50,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: { trigger: ".final-heading", start: "top 85%" },
      });
      gsap.from(".final-sub", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.3,
        scrollTrigger: { trigger: ".final-sub", start: "top 85%" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-6 relative"
      style={{
        background: "radial-gradient(ellipse at center, hsl(0 100% 10%) 0%, hsl(0 0% 6%) 70%)",
      }}
    >
      <div className="text-center max-w-3xl mx-auto">
        <div className="final-heading heartbeat text-7xl sm:text-8xl mb-8 select-none">❤️</div>
        <h2 className="final-heading text-4xl sm:text-5xl md:text-7xl font-serif font-bold glow-text text-foreground mb-6 leading-tight">
          You are my forever Valentine,
          <br />
          <span className="personalized-name text-romantic-pink">{displayName}</span> 💕
        </h2>
        <p className="final-sub font-script text-2xl sm:text-3xl text-romantic-soft-pink">
          Today, tomorrow, and always...
        </p>
      </div>
    </section>
  );
};

export default FinalSection;
