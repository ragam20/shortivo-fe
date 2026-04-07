import { privateApi } from "@/lib/api-client";
import type { ApiResponse, Link } from "@/types/api";

export const GetLinkList = async (
  params: string,
): Promise<ApiResponse<Link[]>> => {
  return await privateApi.get(`/links?${params}`);
};
