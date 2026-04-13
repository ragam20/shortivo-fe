import { privateApi } from "@/lib/api-client";
import { ApiError, type ApiResponse, type GetClicks } from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getTotalClicks = (
  filter: string,
): Promise<ApiResponse<GetClicks>> => {
  return privateApi.get(`/analytics/clicks${filter}`);
};

export const useTotalClicks = (dateRange: DateRange | undefined) => {
  const [clicks, setClicks] = useState<GetClicks | null>(null);
  const [errror, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTotalClicks = async () => {
      const filter = new URLSearchParams();

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getTotalClicks(
          filter.toString() !== "" ? `?${filter}` : "",
        );
        setClicks(resp.data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    };

    initTotalClicks();
  }, [dateRange]);

  return {
    clicks,
    errror,
  };
};
