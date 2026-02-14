import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface ValentineContextType {
  partnerName: string;
  displayName: string;
  setPartnerName: (name: string) => void;
  nameUpdated: boolean;
}

const ValentineContext = createContext<ValentineContextType>({
  partnerName: "",
  displayName: "My Love",
  setPartnerName: () => {},
  nameUpdated: false,
});

export const useValentine = () => useContext(ValentineContext);

export const ValentineProvider = ({ children }: { children: ReactNode }) => {
  const [partnerName, setPartnerNameState] = useState("");
  const [nameUpdated, setNameUpdated] = useState(false);

  // Read name from URL on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nameFromUrl = params.get("name");
    if (nameFromUrl) {
      setPartnerNameState(decodeURIComponent(nameFromUrl));
    }
  }, []);

  const displayName = partnerName.trim() || "My Love";

  const setPartnerName = (name: string) => {
    setPartnerNameState(name);
    setNameUpdated(true);
    setTimeout(() => setNameUpdated(false), 800);
  };

  return (
    <ValentineContext.Provider value={{ partnerName, displayName, setPartnerName, nameUpdated }}>
      {children}
    </ValentineContext.Provider>
  );
};
