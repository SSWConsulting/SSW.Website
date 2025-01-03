"use client";

import { createContext, useContext } from "react";

const TechnologyCardsContext = createContext(null);

const useTechnologyCardContext = () => {
  return useContext(TechnologyCardsContext);
};

const TechnologyCardsProvider = ({ children, data }) => {
  return (
    <TechnologyCardsContext.Provider value={data}>
      {children}
    </TechnologyCardsContext.Provider>
  );
};

export { TechnologyCardsProvider, useTechnologyCardContext };

