import { privateApi } from "@/lib/api-client";
import {
  ApiError,
  type ApiResponse,
  type GetTotalEngagementByOvertime,
} from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getEngagementByOvertime = (
  id: string,
  filter: string,
): Promise<ApiResponse<GetTotalEngagementByOvertime[]>> => {
  return privateApi.get(`/analytics/${id}/overtime${filter}`);
};

export const useEgagementByOvertime = (
  id: string,
  dateRange: DateRange | undefined,
) => {
  const [totalEgagements, setTotalEngagement] = useState<
    GetTotalEngagementByOvertime[]
  >([]);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    const initEngagement = async () => {
      if (!id) {
        setTotalEngagement([]);
        setError(null);
        return;
      }

      const filter = new URLSearchParams();

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getEngagementByOvertime(
          id,
          filter.toString() !== "" ? `?${filter.toString()}` : "",
        );

        setTotalEngagement(resp.data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    };

    initEngagement();
  }, [id, dateRange]);

  return {
    totalEgagements,
    error,
  };
};
