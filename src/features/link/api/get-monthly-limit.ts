import { privateApi } from "@/lib/api-client";

export type MonthLimit = {
  monthlyLimit: number;
  currLimit: number;
};

export async function getMonthLimit(): Promise<MonthLimit> {
  const resp = await privateApi.get<MonthLimit>("/links/monthly-limit");
  return resp.data;
}
