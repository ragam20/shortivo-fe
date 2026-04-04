import type { Account, AuthResponse } from "@/types/api";
import { privateApi, publicApi } from "./api-client";
import { z } from "zod";

export const signout = async (): Promise<void> => {
  await privateApi.post("/auth/logout");
};

export const signinInputSchema = z.object({
  email: z.string().min(1, "Required").email("Invalid Email"),
  password: z.string().min(5, "Required"),
});
export type SignInInput = z.infer<typeof signinInputSchema>;
export const signin = async (data: SignInInput): Promise<AuthResponse> => {
  const resp = await publicApi.post("/auth/signin", data);
  return resp.data;
};

export const signupInputSchema = z.object({
  username: z.string().min(4, "Required"),
  email: z.string().min(1, "Required").email("Invalid Email"),
  password: z.string().min(5, "Required"),
});
export type SignupInput = z.infer<typeof signupInputSchema>;
export const signup = async (data: SignupInput): Promise<AuthResponse> => {
  const resp = await publicApi.post("/auth/signup", data);
  return resp.data;
};

export const getAccount = async (): Promise<Account> => {
  const resp = await privateApi.get("/users/account");
  return resp.data;
};

export const getRefreshToken = async (): Promise<AuthResponse> => {
  const resp = await publicApi.post("/auth/refresh-token");
  return resp.data;
};
