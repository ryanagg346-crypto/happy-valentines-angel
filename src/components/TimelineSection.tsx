import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const days = [
  { emoji: "🌹", name: "Rose Day", date: "Feb 7", desc: "Express your love with a beautiful rose that speaks a thousand words." },
  { emoji: "💍", name: "Propose Day", date: "Feb 8", desc: "Take the leap and let your heart speak its deepest truth." },
  { emoji: "🍫", name: "Chocolate Day", date: "Feb 9", desc: "Sweeten your bond with the richness of chocolate and love." },
  { emoji: "🧸", name: "Teddy Day", date: "Feb 10", desc: "A warm teddy to hold close when you can't be there." },
  { emoji: "🤞", name: "Promise Day", date: "Feb 11", desc: "Make promises that last forever, sealed with love." },
  { emoji: "🤗", name: "Hug Day", date: "Feb 12", desc: "Wrap your arms around them and feel the world disappear." },
  { emoji: "💋", name: "Kiss Day", date: "Feb 13", desc: "A kiss that says everything words cannot." },
  { emoji: "❤️", name: "Valentine's Day", date: "Feb 14", desc: "The day love celebrates itself in all its glory." },
];

const TimelineSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".timeline-card").forEach((card, i) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            toggleActions: "play none none none",
          },
          delay: i * 0.05,
        });
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="timeline" ref={containerRef} className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-center mb-4 glow-text text-foreground">
          Valentine's Week
        </h2>
        <p className="font-script text-2xl sm:text-3xl text-romantic-soft-pink text-center mb-16">
          A journey through love
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {days.map((day) => (
            <div
              key={day.name}
              className="timeline-card glass-card group transition-all duration-500 hover:scale-105 float relative overflow-hidden"
              style={{ animationDelay: `${Math.random() * 2}s` }}
            >
              {/* Shine sweep effect */}
              <div
                className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(105deg, transparent 40%, hsl(348 100% 65% / 0.12) 45%, hsl(0 0% 100% / 0.15) 50%, hsl(348 100% 65% / 0.12) 55%, transparent 60%)",
                  backgroundSize: "200% 100%",
                  animation: "shineSweep 1.2s ease-in-out",
                }}
              />
              <div className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-300 relative z-10">
                {day.emoji}
              </div>
              <h3 className="text-xl font-serif font-bold text-foreground mb-1 relative z-10">{day.name}</h3>
              <p className="text-sm text-romantic-pink font-medium mb-3 relative z-10">{day.date}</p>
              <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{day.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shineSweep {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
};

export default TimelineSection;
