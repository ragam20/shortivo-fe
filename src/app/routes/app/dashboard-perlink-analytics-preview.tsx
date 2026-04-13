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
import { EngagementByDevicePreview } from "@/features/analytics/components/engagements-by-device-preview";
import { EngagementByReferrerPreview } from "@/features/analytics/components/engagements-by-referrer-preview";
import { EngagementOvertimePreview } from "@/features/analytics/components/engagements-overtime-preview";
import { FilterBoxAnalytics } from "@/features/analytics/components/filter-box-analytics";
import { TotalClickCountPreview } from "@/features/analytics/components/total-click-count-preview";
import { XIcon } from "lucide-react";
import { useState } from "react";
import Masonry from "react-masonry-css";
import { Link } from "react-router";

const masonryBreakpoints = {
  default: 2,
  1280: 1,
};

export const DashboardPerLinkAnalyticsPreviewRoute = () => {
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleClearFilters = () => {
    setIsFilterActive(false);
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
                <BreadcrumbPage>Dashboard Analytics Preview</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="space-y-2">
            <div className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              Upgrade to Plus to access this feature
            </div>
            <H3 className="text-4xl">Dashboard Analytics Preview</H3>
            <P className="max-w-2xl text-stone-600">
              Explore sample per-link analytics powered by preview data.
            </P>
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <FilterBoxAnalytics
            className="w-fit"
            onDateRangeChange={() => {
              setIsFilterActive(true);
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
          columnClassName="mb-8 space-y-8 bg-clip-padding pl-6"
        >
          <TotalClickCountPreview />
          <EngagementOvertimePreview />
          <EngagementByDevicePreview />
          <EngagementByReferrerPreview />
        </Masonry>
      </div>
    </ContentLayout>
  );
};
