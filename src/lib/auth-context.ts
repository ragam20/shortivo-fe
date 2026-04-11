import type { Account } from "@/types/api";
import { createContext } from "react";
import type { SignInInput, SignupInput } from "./auth";

type AuthContextType = {
  account: Account | null;
  isLoading: boolean;
  isAuthActionLoading: boolean;
  login: (data: SignInInput) => Promise<void>;
  register: (data: SignupInput) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
