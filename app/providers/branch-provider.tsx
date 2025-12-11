"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

export const useBranch = () => {
  const context = useContext(TinaBranchContext);
  if (!context) {
    throw new Error("useBranch must be used within a BranchProvider");
  }
  return context;
};

type BranchContextType = {
  branch: string;
};

const TinaBranchContext = createContext<BranchContextType>(null);

const TinaBranchProvider = ({
  children,
  branch,
}: {
  children: React.ReactNode;
  branch: string;
}) => {
  return (
    <TinaBranchContext.Provider value={{ branch }}>
      {children}
    </TinaBranchContext.Provider>
  );
};

export {
  TinaBranchContext as BranchContext,
  TinaBranchProvider as BranchProvider,
};
