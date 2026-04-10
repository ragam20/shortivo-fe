import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { H3, H4 } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { dummyTopLinks } from "@/features/analytics/data";
import { ChartColumnIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import { FilterBoxAnalytics } from "./filter-box-analytics";

export const AnalyticsPreview = () => {
  const navigate = useNavigate();
  const [isFilterActive, setIsFilterActive] = useState<boolean>(false);

  const handleClearFilters = () => {
    setIsFilterActive(false);
  };

  return (
    <ContentLayout>
      <div className="mb-8 flex flex-col gap-4">
        <div className="w-fit rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
          Upgrade to Plus to access this feature
        </div>
        <H3 className="text-4xl">Analytics</H3>
      </div>
      <div className="flex flex-col gap-4">
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

        <div className="mt-4 flex w-full flex-col gap-4 md:flex-row">
          <div className="h-30 rounded-md bg-white md:w-50">
            <div className="p-5">
              <p className="text-primary/80">Total Links</p>
              <H3 className="font-extrabold text-stone-600">65</H3>
            </div>
          </div>

          <div className="h-30 rounded-md bg-white md:w-50">
            <div className="p-5">
              <p className="text-primary/80">Total clicks</p>
              <H3 className="font-extrabold text-stone-600">1000</H3>
            </div>
          </div>

          <div className="h-30 flex-1 overflow-hidden rounded-md bg-white md:w-50">
            <div className="p-5">
              <p className="text-primary/80">Peak Performance</p>
              <H3 className="w-full truncate font-extrabold text-stone-600">
                shortivo.ly/2q3Nqm3HtHa
              </H3>
            </div>
          </div>
        </div>

        <div>
          <H4>Top 3 links</H4>

          {dummyTopLinks.length > 0 ? (
            <ul className="mt-4 flex flex-col gap-4">
              {dummyTopLinks.map((link) => (
                <li
                  key={link.id}
                  className="flex w-full flex-col gap-4 rounded-md bg-white p-5 sm:flex-row sm:flex-nowrap sm:items-center sm:justify-between sm:gap-6"
                >
                  <div className="flex flex-1 flex-col">
                    <H4>{link.shortURL}</H4>
                    <p className="text-stone-400">{link.originalURL}</p>
                  </div>

                  <div className="flex flex-col items-center justify-center">
                    <h5 className="font-semibold text-stone-700">
                      {link.clickCount}
                    </h5>
                    <p className="text-sm">Total clicks</p>
                  </div>

                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate(paths.app.analytics.preview.getHref());
                    }}
                    className="flex items-center gap-2 border-primary/40"
                  >
                    <ChartColumnIcon className="size-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="mt-6 rounded-md bg-white p-6 text-sm text-stone-600">
              No matching results.
            </div>
          )}
        </div>
      </div>
    </ContentLayout>
  );
};
