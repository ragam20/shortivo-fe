import { privateApi } from "@/lib/api-client";
import {
  ApiError,
  type ApiResponse,
  type GetTotalCreatedLink,
} from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getTotalCreatedLink = (
  filter: string,
): Promise<ApiResponse<GetTotalCreatedLink>> => {
  return privateApi.get(`/analytics/link${filter}`);
};

export const useTotalCreatedLink = (dateRange: DateRange | undefined) => {
  const [totalCreatedLink, setTotalCreatedLink] =
    useState<GetTotalCreatedLink | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTotalCreatedLink = async () => {
      const filter = new URLSearchParams();

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getTotalCreatedLink(
          filter.toString() !== "" ? `?${filter}` : "",
        );

        setTotalCreatedLink(resp.data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    };

    initTotalCreatedLink();
  }, [dateRange]);

  return {
    totalCreatedLink,
    error,
  };
};
