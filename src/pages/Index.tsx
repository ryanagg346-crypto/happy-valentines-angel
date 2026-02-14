import { useState, useCallback } from "react";
import { ValentineProvider } from "@/contexts/ValentineContext";
import Preloader from "@/components/Preloader";
import CustomCursor from "@/components/CustomCursor";
import HeroSection from "@/components/HeroSection";
import NameInputSection from "@/components/NameInputSection";
import TimelineSection from "@/components/TimelineSection";
import LoveMessageSection from "@/components/LoveMessageSection";
import LoveButton from "@/components/LoveButton";
import FinalSection from "@/components/FinalSection";

const Index = () => {
  const [loaded, setLoaded] = useState(false);
  const onComplete = useCallback(() => setLoaded(true), []);

  return (
    <ValentineProvider>
      {!loaded && <Preloader onComplete={onComplete} />}
      <CustomCursor />
      <main className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        <HeroSection />
        <NameInputSection />
        <TimelineSection />
        <LoveMessageSection />
        <LoveButton />
        <FinalSection />
      </main>
    </ValentineProvider>
  );
};

export default Index;
