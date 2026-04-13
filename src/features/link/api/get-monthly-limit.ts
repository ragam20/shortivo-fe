import { privateApi } from "@/lib/api-client";
import type { MonthLimit } from "@/types/api";

export async function getMonthLimit(): Promise<MonthLimit> {
  const resp = await privateApi.get<MonthLimit>("/links/monthly-limit");
  return resp.data;
}
