import type { AuthResponse } from "@/types/api";
import { publicApi } from "./apiClient";
import { z } from "zod";

const logout = async (): Promise<void> => {
  publicApi.post("/auth/logout");
};

export const signinInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid Email"),
  password: z.string().min(5, "Required"),
});
export type SignInInput = z.infer<typeof signinInputSchema>;
const signin = async (data: SignInInput): Promise<AuthResponse> => {
  return publicApi.post("/auth/signin", data);
};

export const signupInputSchema = z.object({
  username: z.string().min(4, "Required"),
  email: z.string().min(1, "Required").email("Invalid Email"),
  password: z.string().min(5, "Required"),
});
export type SignupInput = z.infer<typeof signupInputSchema>;
const signup = async (data: SignupInput): Promise<AuthResponse> => {
  return publicApi.post("/auth/signup", data);
};
