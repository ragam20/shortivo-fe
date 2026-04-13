import { privateApi } from "@/lib/api-client";
import { ApiError, type ApiResponse, type GetClicks } from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getLinkClicksById = (
  id: string,
  filter: string,
): Promise<ApiResponse<GetClicks>> => {
  return privateApi.get(`/analytics/${id}/clicks${filter}`);
};

export const useLinkClicksById = (
  id: string,
  dateRange: DateRange | undefined,
) => {
  const [linkClicks, setLinkClick] = useState<GetClicks | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initLinkClicks = async () => {
      if (!id) {
        setLinkClick(null);
        setError(null);
        return;
      }

      const filter = new URLSearchParams();

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getLinkClicksById(
          id,
          filter.toString() !== "" ? `?${filter.toString()}` : "",
        );
        setLinkClick(resp.data);
        setError(null);
      } catch (err) {
        if (err instanceof ApiError) {
          setError(err.message);
        }
      }
    };

    initLinkClicks();
  }, [id, dateRange]);

  return {
    linkClicks,
    error,
  };
};
