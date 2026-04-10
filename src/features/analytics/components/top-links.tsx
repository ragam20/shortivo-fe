import { Button } from "@/components/ui/button";
import { H4 } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import type { DateRange } from "@/types/types";
import { ChartColumn as ChartColumnIcon } from "lucide-react";
import { useNavigate } from "react-router";
import { useTopLink } from "../api/get-top-link";

type TopLinksProps = {
  classname?: string;
  dateRange: DateRange | undefined;
};

const DEFAULT_LIMIT_LINK = 3;

export const TopLinks = ({ classname, dateRange }: TopLinksProps) => {
  const navigate = useNavigate();
  const { topLink } = useTopLink(DEFAULT_LIMIT_LINK, dateRange);

  return (
    <div className={classname}>
      <H4>Top 3 links </H4>

      {topLink.length > 0 ? (
        <ul className="mt-4 flex flex-col gap-4">
          {topLink.map((link) => (
            <li
              key={link.id}
              className="flex flex-col sm:flex-row sm:flex-nowrap gap-4 sm:gap-6 sm:items-center sm:justify-between w-full p-5 bg-white rounded-md"
            >
              <div className="flex flex-col flex-1 ">
                <H4 className="">{link.shortURL}</H4>
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
                  navigate(
                    paths.app.analytics.perlink.getHref(link.id.toString()),
                  );
                }}
                className="flex gap-2 items-center border-primary/40"
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
  );
};
