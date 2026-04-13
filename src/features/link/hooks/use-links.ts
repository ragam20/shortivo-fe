import {
  useEffect,
  useMemo,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { GetLinkList } from "../api/get-links";
import type { ApiResponse, Link } from "@/types/api";

const LINKS_PER_PAGE = 10;

export type FilterParams = {
  search?: string | null;
  createdFrom?: string | null;
  createdTo?: string | null;
  page: number;
  limit?: number;
};

export const useLinks = () => {
  const [links, setLinks] = useState<Link[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [filterParams, setFilterParams] = useState<FilterParams>({
    page: 1,
    limit: LINKS_PER_PAGE,
  });

  const isFilterActive = useMemo(() => {
    return (
      !!filterParams.search ||
      !!filterParams.createdTo ||
      !!filterParams.createdFrom
    );
  }, [filterParams]);

  const applyResponse = (resp: ApiResponse<Link[]>) => {
    setLinks(resp.data);

    const nextTotalPages =
      resp.meta?.totalPage ??
      Math.max(
        1,
        Math.ceil((resp.meta?.totalItem ?? resp.data.length) / LINKS_PER_PAGE),
      );

    setTotalPages(nextTotalPages);
  };

  const loadLinks = async (nextPage: number) => {
    setIsLoading(true);

    try {
      setFilterParams(() => ({ page: nextPage }));
      const q = buildQuery(filterParams);
      const resp = await GetLinkList(q);
      applyResponse(resp);
    } finally {
      setIsLoading(false);
    }
  };

  const updateFilters = (
    setFilterParams: Dispatch<SetStateAction<FilterParams>>,
    updates: Partial<FilterParams>,
  ) => {
    setFilterParams((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  useEffect(() => {
    let isCancelled = false;

    const syncLinks = async () => {
      setIsLoading(true);

      try {
        const q = buildQuery(filterParams);
        const resp = await GetLinkList(q);

        if (isCancelled) {
          return;
        }

        applyResponse(resp);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    void syncLinks();

    return () => {
      isCancelled = true;
    };
  }, [filterParams]);

  return {
    links,
    totalPages,
    isLoading,
    filterParams,
    isFilterActive,
    setFilterParams,
    updateFilters,
    refetch: () => loadLinks(filterParams.page!),
  };
};

function buildQuery(params: FilterParams) {
  const query = new URLSearchParams();

  if (params.search) query.append("search", params.search);
  if (params.createdTo) query.append("created_to", params.createdTo);
  if (params.createdFrom) query.append("created_from", params.createdFrom);

  query.append("page", params.page.toString());
  query.append(
    "limit",
    params.limit ? params.limit?.toString() : LINKS_PER_PAGE.toString(),
  );

  return query.toString();
}
