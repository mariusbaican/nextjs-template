"use client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type Breakpoint = "xs" | "sm" | "md" | "lg" | "xl" | "2xl";

type GlobalContextType = {
  currentBreakpoint: Breakpoint;
};

const defaultValue: GlobalContextType = {
  currentBreakpoint: "2xl",
};

const GlobalContext = createContext<GlobalContextType>(defaultValue);

export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>("2xl");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setCurrentBreakpoint("xs");
      else if (window.innerWidth < 768) setCurrentBreakpoint("sm");
      else if (window.innerWidth < 1024) setCurrentBreakpoint("md");
      else if (window.innerWidth < 1280) setCurrentBreakpoint("lg");
      else if (window.innerWidth < 1536) setCurrentBreakpoint("xl");
      else setCurrentBreakpoint("2xl");
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <GlobalContext.Provider value={{ currentBreakpoint }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);
