"use client";

import React, { useState, useContext, useEffect } from "react";
import { AccountProps, ChildProps, ContextType, MovieProps } from "@/types";
import { createContext } from "react";

export const Context = createContext<ContextType | null>(null);

const GlobalContext = ({ children }: ChildProps) => {
  const [account, setAccount] = useState<AccountProps | null>(null);
  const [pageLoader, setPageLoader] = useState(true);
  const [open, setOpen] = useState(false);
  const [movie, setMovie] = useState<MovieProps | null>(null);

  useEffect(() => {
    setAccount(JSON.parse(sessionStorage.getItem("account")!));
  }, []);

  return (
    <div>
      <Context.Provider
        value={{
          account,
          setAccount,
          pageLoader,
          setPageLoader,
          open,
          setOpen,
          movie,
          setMovie,
        }}
      >
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
