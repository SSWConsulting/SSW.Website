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

// Neither flag reaches the rendered header today. MegaMenuWrapper passes
// `isFlagVisible={false}` and always supplies `rightSideActionsOverride`, and every
// `hidePhone` branch inside ssw.megamenu sits behind that override — so setting
// either value changes nothing on screen. Anyone reconnecting them must render the
// hidden state inside the override's own markup, and resolve the page's appearance
// server-side (`x-pathname` from proxy.ts, read in app/layout.tsx) rather than through
// this context, which only ever arrives after hydration.
export function useMobileHeaderAppearance(
  value: MobileHeaderAppearance | null
) {
  const { setMobile } = useHeaderAppearance();
  useEffect(() => {
    setMobile(value ?? {});
    return () => setMobile({});
  }, [value, setMobile]);
}
