import { privateApi } from "@/lib/api-client";
import type { ApiResponse, Link } from "@/types/api";

export const getLinkById = async (id: string): Promise<ApiResponse<Link>> => {
  return await privateApi.get(`/links/${id}`);
};
