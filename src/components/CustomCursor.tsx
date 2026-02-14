import { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const pos = useRef({ x: 0, y: 0 });
  const followerPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if ("ontouchstart" in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      }
    };

    let raf: number;
    const animateFollower = () => {
      followerPos.current.x += (pos.current.x - followerPos.current.x) * 0.12;
      followerPos.current.y += (pos.current.y - followerPos.current.y) * 0.12;
      if (followerRef.current) {
        followerRef.current.style.transform = `translate(${followerPos.current.x}px, ${followerPos.current.y}px)`;
      }
      raf = requestAnimationFrame(animateFollower);
    };
    raf = requestAnimationFrame(animateFollower);

    window.addEventListener("mousemove", onMouseMove);

    const handleHoverIn = () => setIsHovering(true);
    const handleHoverOut = () => setIsHovering(false);

    const addHoverListeners = () => {
      document.querySelectorAll("button, a, .glow-button, [role='button']").forEach((el) => {
        el.addEventListener("mouseenter", handleHoverIn);
        el.addEventListener("mouseleave", handleHoverOut);
      });
    };

    addHoverListeners();
    const observer = new MutationObserver(addHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.body.classList.remove("custom-cursor-active");
    };
  }, []);

  if (isTouch) return null;

  const heartSize = isHovering ? 28 : 18;
  const followerSize = isHovering ? 50 : 34;

  return (
    <>
      {/* Main heart cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[10000] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="flex items-center justify-center transition-all duration-200"
          style={{
            width: heartSize,
            height: heartSize,
            marginLeft: -heartSize / 2,
            marginTop: -heartSize / 2,
            filter: isHovering
              ? "drop-shadow(0 0 12px hsl(348 100% 65%)) drop-shadow(0 0 24px hsl(348 100% 65% / 0.5))"
              : "drop-shadow(0 0 6px hsl(348 100% 65% / 0.8))",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="hsl(348 100% 65%)"
            width={heartSize}
            height={heartSize}
            className="transition-all duration-200"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
      {/* Follower heart outline */}
      <div
        ref={followerRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{ willChange: "transform" }}
      >
        <div
          className="transition-all duration-300"
          style={{
            width: followerSize,
            height: followerSize,
            marginLeft: -followerSize / 2,
            marginTop: -followerSize / 2,
            filter: `drop-shadow(0 0 8px hsl(348 100% 65% / ${isHovering ? 0.4 : 0.15}))`,
            opacity: isHovering ? 0.6 : 0.35,
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="hsl(348 100% 65%)"
            strokeWidth="1.2"
            width={followerSize}
            height={followerSize}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
