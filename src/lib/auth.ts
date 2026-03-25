import type { AuthResponse, User } from "@/types/api";
import { privateApi, publicApi } from "./api-client";
import { z } from "zod";

export const signout = async (): Promise<void> => {
  publicApi.post("/auth/logout");
};

export const signinInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid Email"),
  password: z.string().min(5, "Required"),
});
export type SignInInput = z.infer<typeof signinInputSchema>;
export const signin = async (data: SignInInput): Promise<AuthResponse> => {
  return publicApi.post("/auth/signin", data);
};

export const signupInputSchema = z.object({
  username: z.string().min(4, "Required"),
  email: z.string().min(1, "Required").email("Invalid Email"),
  password: z.string().min(5, "Required"),
});
export type SignupInput = z.infer<typeof signupInputSchema>;
export const signup = async (data: SignupInput): Promise<AuthResponse> => {
  return publicApi.post("/auth/signup", data);
};

export const getUser = async (): Promise<User> => {
  const resp = await privateApi.get("/account/profile");

  return resp.data;
};
