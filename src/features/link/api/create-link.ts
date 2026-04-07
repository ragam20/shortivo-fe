import { privateApi } from "@/lib/api-client";
import type { ApiResponse } from "@/types/api";
import { z } from "zod";

export const createLinkInputSchema = z.object({
  title: z.string().optional(),
  url: z.string().refine((val) => {
    try {
      new URL(val);
      return true;
    } catch {
      return false;
    }
  }, "Invalid URL"),
  description: z.string().optional(),
});
export type createLinkInput = z.infer<typeof createLinkInputSchema>;
export const createLink = async (
  data: createLinkInput,
): Promise<ApiResponse<boolean>> => {
  return await privateApi.post("/links", data);
};
