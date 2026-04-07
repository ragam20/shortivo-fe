import { privateApi } from "@/lib/api-client";
import type { ApiResponse, Link } from "@/types/api";
import { z } from "zod";

export const updateLinkSchema = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
});
export type updateLinkInput = z.infer<typeof updateLinkSchema>;
export const updateLink = (
  data: updateLinkInput,
  linkId: string,
): Promise<ApiResponse<Link>> => {
  return privateApi.patch(`/links/${linkId}`, data);
};
