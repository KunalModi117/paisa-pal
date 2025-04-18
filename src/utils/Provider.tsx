"use client";

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

export interface AuthContextProps {
  children: ReactNode;
}

export const Provider = ({ children }: AuthContextProps) => {
  return <SessionProvider>{children}</SessionProvider>;
};
