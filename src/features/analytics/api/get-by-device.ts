import { privateApi } from "@/lib/api-client";
import {
  ApiError,
  type ApiResponse,
  type GetTotalEngagementByDevice,
} from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getEngagementByDevice = (
  id: string,
  filter: string,
): Promise<ApiResponse<GetTotalEngagementByDevice[]>> => {
  return privateApi.get(`/analytics/${id}/device${filter}`);
};

export const useEngagementByDevice = (
  id: string,
  dateRange: DateRange | undefined,
) => {
  const [engagementByDevice, setEngagementByDevice] = useState<
    GetTotalEngagementByDevice[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initEngagementByDevice = async () => {
      if (!id) {
        setEngagementByDevice([]);
        setError(null);
        return;
      }

      const filter = new URLSearchParams();

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getEngagementByDevice(
          id,
          filter.toString() !== "" ? `?${filter.toString()}` : "",
        );

        setEngagementByDevice(resp.data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    };

    initEngagementByDevice();
  }, [id, dateRange]);

  return {
    engagementByDevice,
    error,
  };
};
