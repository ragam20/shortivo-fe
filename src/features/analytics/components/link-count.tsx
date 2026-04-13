import { H3 } from "@/components/ui/typography";
import type { DateRange } from "@/types/types";
import { useTotalCreatedLink } from "../api/get-total-created-link";
import { useTotalClicks } from "../api/get-total-clicks";
import { useTopLink } from "../api/get-top-link";

type LinkCountProps = {
  dateRange: DateRange | undefined;
};

export const LinkCount = ({ dateRange }: LinkCountProps) => {
  const { totalCreatedLink } = useTotalCreatedLink(dateRange);
  const { clicks } = useTotalClicks(dateRange);
  const { topLink } = useTopLink(1, dateRange);

  return (
    <div className="flex flex-col w-full md:flex-row gap-4 mt-4">
      <div className="bg-white rounded-md md:w-50 h-30">
        <div className="p-5">
          <p className="text-primary/80">Total Links</p>
          <H3 className="font-extrabold text-stone-600">
            {totalCreatedLink ? totalCreatedLink.totalLink : 0}
          </H3>
        </div>
      </div>

      <div className="bg-white rounded-md md:w-50 h-30">
        <div className="p-5">
          <p className="text-primary/80">Total clicks</p>
          <H3 className="font-extrabold text-stone-600">
            {clicks ? clicks.totalClick : 0}
          </H3>
        </div>
      </div>

      <div className="bg-white rounded-md flex-1 md:w-50 h-30 overflow-hidden">
        <div className="p-5">
          <p className="text-primary/80">Peak Performance</p>
          <H3 className="truncate w-full font-extrabold text-stone-600">
            {topLink.length >= 1 ? topLink[0].shortURL : "-"}
          </H3>
        </div>
      </div>
    </div>
  );
};
