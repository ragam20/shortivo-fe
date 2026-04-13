import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { H3 } from "@/components/ui/typography";
import { AnalyticsPreview } from "@/features/analytics/components/analytics-preview";
import { FilterBoxAnalytics } from "@/features/analytics/components/filter-box-analytics";
import { LinkCount } from "@/features/analytics/components/link-count";
import { TopLinks } from "@/features/analytics/components/top-links";
import { AuthContext } from "@/lib/auth-context";
import { PLAN, type DateRange } from "@/types/types";
import { XIcon } from "lucide-react";
import { useContext, useState } from "react";

export const AnalyticsRoute = () => {
  const ctx = useContext(AuthContext);

  const [currDateRange, setCurrDateRange] = useState<DateRange | undefined>(
    undefined,
  );
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleClearFilters = () => {
    setIsFilterActive(false);
    setCurrDateRange(undefined);
  };

  return (
    <>
      {ctx?.account?.plan?.code !== PLAN.FREE ? (
        <ContentLayout>
          <H3 className="text-4xl mb-8">Analytics</H3>
          <div className="flex flex-col gap-4">
            <div className="flex gap-4 flex-wrap">
              <FilterBoxAnalytics
                className="w-fit"
                onDateRangeChange={(v) => {
                  setIsFilterActive(true);
                  setCurrDateRange({
                    from: v.from,
                    to: v.to,
                  });
                }}
              />
              {isFilterActive ? (
                <Button
                  variant="outline"
                  className="py-5"
                  onClick={handleClearFilters}
                >
                  <XIcon />
                  <p>Clear filter</p>
                </Button>
              ) : null}
            </div>
            <LinkCount dateRange={currDateRange} />
            <TopLinks dateRange={currDateRange} />
          </div>
        </ContentLayout>
      ) : (
        <AnalyticsPreview />
      )}
    </>
  );
};
