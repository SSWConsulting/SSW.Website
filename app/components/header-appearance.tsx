"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

export type MobileHeaderAppearance = {
  hideFlag?: boolean | null;
  hideContactButton?: boolean | null;
};
type Ctx = {
  mobile: MobileHeaderAppearance;
  setMobile: (v: MobileHeaderAppearance) => void;
};
const HeaderAppearanceContext = createContext<Ctx>({
  mobile: {},
  setMobile: () => {},
});

export function HeaderAppearanceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobile, setMobile] = useState<MobileHeaderAppearance>({});
  const value = useMemo(() => ({ mobile, setMobile }), [mobile]);
  return (
    <HeaderAppearanceContext.Provider value={value}>
      {children}
    </HeaderAppearanceContext.Provider>
  );
}

export const useHeaderAppearance = () => useContext(HeaderAppearanceContext);

// ponytail: client context → SSR shows full header for one frame before hiding flag/
// contact. Upgrade path if the flash matters: set `x-pathname` in middleware.ts and
// resolve appearance server-side in app/layout.tsx so the header renders correctly at SSR.
export function useMobileHeaderAppearance(value: MobileHeaderAppearance | null) {
  const { setMobile } = useHeaderAppearance();
  useEffect(() => {
    setMobile(value ?? {});
    return () => setMobile({});
  }, [value, setMobile]);
}
