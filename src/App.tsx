// App.tsx
import { useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/sonner";          // ← Correct import for shadcn/ui Sonner
import { toast } from "sonner";                           // ← for calling toast()
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function App() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasInteracted = useRef(false);

  useEffect(() => {
    // Create the audio element once
    audioRef.current = new Audio("/bgmusic.mp3");

    // Optional: make it loop and/or quieter
    // audioRef.current.loop = true;
    // audioRef.current.volume = 0.3; // 0 to 1 range

    const handleFirstInteraction = () => {
      if (hasInteracted.current) return;
      hasInteracted.current = true;

      const playPromise = audioRef.current?.play();

      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            console.log("♡ Background music started!");
            // Optional: show a nice toast when music plays
            // toast("♡ Music is playing", {
            //   description: "Happy Valentine's Day! 💕",
            //   duration: 5000,
            // });
          })
          .catch((err) => {
            console.log("Play failed:", err.message);
            // Common harmless message: "The play() request was interrupted by a call to pause()"
          });
      }
    };

    // Listen for first user interaction (click or touch)
    document.addEventListener("click", handleFirstInteraction, { once: true });
    document.addEventListener("touchstart", handleFirstInteraction, { once: true });

    // Cleanup on unmount
    return () => {
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("touchstart", handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />           {/* ← This renders all Sonner toasts globally */}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            {/* Add your other custom routes HERE, above the catch-all */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;