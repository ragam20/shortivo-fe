import { ContentLayout } from "@/components/layouts/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { H3, P } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { EngagementByDevice } from "@/features/analytics/components/engagements-by-device";
import { EngagementByReferrer } from "@/features/analytics/components/engagements-by-referrer";
import { EngagementOvertime } from "@/features/analytics/components/engagements-overtime";
import { FilterBoxAnalytics } from "@/features/analytics/components/filter-box-analytics";
import { TotalClickCount } from "@/features/analytics/components/total-click-count";
import type { DateRange } from "@/types/types";
import { XIcon } from "lucide-react";
import { useState } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router";

const masonryBreakpoints = {
  default: 2,
  1280: 1,
};

export const DashboardPerLinkAnalyticsRoute = () => {
  const [currDateRange, setCurrDateRange] = useState<DateRange | undefined>(
    undefined,
  );
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleClearFilters = () => {
    setIsFilterActive(false);
    setCurrDateRange(undefined);
  };

  return (
    <ContentLayout>
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4 rounded-lg bg-white px-6 py-6 shadow-sm">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to={paths.app.analytics.getHref()}>Analytics</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard Analytics</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-2">
            <H3 className="text-4xl">Dashboard Analytics</H3>
            <P className="max-w-2xl text-stone-600">
              Review headline performance for the links highlighted in the
              analytics overview.
            </P>
          </div>
        </div>

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

        <Masonry
          breakpointCols={masonryBreakpoints}
          className="-ml-6 flex w-auto"
          columnClassName="space-y-8 pl-6 bg-clip-padding mb-8"
        >
          <TotalClickCount dateRange={currDateRange} />
          <EngagementOvertime dateRange={currDateRange} />
          <EngagementByDevice dateRange={currDateRange} />
          <EngagementByReferrer dateRange={currDateRange} />
        </Masonry>
      </div>
    </ContentLayout>
  );
};
