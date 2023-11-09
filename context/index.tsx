"use client";

import React, { useState, useContext } from "react";
import { AccountProps, ChildProps, ContextType } from "@/types";
import { createContext } from "react";

export const Context = createContext<ContextType | null>(null);

const GlobalContext = ({ children }: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null);

  return (
    <div>
      <Context.Provider value={{ account, setAccount }}>
        {children}
      </Context.Provider>
    </div>
  );
};

export default GlobalContext;

export const useGlobalContext = () => {
  const context = useContext(Context);
  if (context === null) {
    throw new Error("useGlobalContext");
  }
  return context;
};
