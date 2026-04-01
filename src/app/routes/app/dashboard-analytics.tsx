import { ContentLayout } from "@/components/layouts/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { H3, P } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { EngagementByDevice } from "@/features/analytics/components/engagements-by-device";
import { EngagementByReferrer } from "@/features/analytics/components/engagements-by-referrer";
import { EngagementOvertime } from "@/features/analytics/components/engagements-overtime";
import { FilterBoxAnalytics } from "@/features/analytics/components/filter-box-analytics";
import { TotalClickCount } from "@/features/analytics/components/total-click-count";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import Masonry from "react-masonry-css";
import { Link } from "react-router";

const masonryBreakpoints = {
  default: 2,
  1280: 1,
};

export const DashboardAnalyticsRoute = () => {
  const [currDateRange, setCurrDateRange] = useState<
    DateRange | null | undefined
  >(null);

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

        <FilterBoxAnalytics onDateRangeChange={setCurrDateRange} />

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
