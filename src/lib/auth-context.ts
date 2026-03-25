import type { AuthResponse, User } from "@/types/api";
import { createContext } from "react";
import type { SignInInput, SignupInput } from "./auth";

type AuthContextType = {
  user: User | null;
  login: (data: SignInInput) => Promise<AuthResponse>;
  register: (data: SignupInput) => Promise<AuthResponse>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);
