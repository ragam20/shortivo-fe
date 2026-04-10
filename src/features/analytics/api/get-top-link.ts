import { privateApi } from "@/lib/api-client";
import type { ApiResponse, Link } from "@/types/api";
import type { DateRange } from "@/types/types";
import { useEffect, useState } from "react";

export const getTopLink = (filter: string): Promise<ApiResponse<Link[]>> => {
  return privateApi.get(`/links${filter}`);
};

export const useTopLink = (limit: number, dateRange: DateRange | undefined) => {
  const [topLink, setTopLink] = useState<Link[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initTopLink = async () => {
      const filter = new URLSearchParams();

      filter.append("sortBy", "-click_count");
      filter.append("limit", `${limit}`);

      if (dateRange) {
        filter.append("created_from", dateRange.from);
        filter.append("created_to", dateRange.to);
      }

      try {
        const resp = await getTopLink(
          filter.toString() !== "" ? `?${filter}` : "",
        );
        setTopLink(resp.data);

        setError(null);
      } catch (err: any) {
        setError(err.message);
      }
    };

    initTopLink();
  }, [dateRange, limit]);

  return {
    topLink,
    error,
  };
};
