import { privateApi } from "@/lib/api-client";
import {
  ApiError,
  type ApiResponse,
  type GetTotalEngagementByReferer,
} from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getEngagementByReferrer = (
  id: string,
  filter: string,
): Promise<ApiResponse<GetTotalEngagementByReferer[]>> => {
  return privateApi.get(`/analytics/${id}/referrer${filter}`);
};

export const useEngagementByReferrer = (
  id: string,
  dateRange: DateRange | undefined,
) => {
  const [engagementByReferrers, setEngagementByReferrers] = useState<
    GetTotalEngagementByReferer[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initEgagementByReferrer = async () => {
      if (!id) {
        setEngagementByReferrers([]);
        setError(null);
        return;
      }

      const filter = new URLSearchParams();

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getEngagementByReferrer(
          id,
          filter.toString() !== "" ? `?${filter.toString()}` : "",
        );

        setEngagementByReferrers(resp.data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    };

    initEgagementByReferrer();
  }, [id, dateRange]);

  return {
    engagementByReferrers,
    error,
  };
};
