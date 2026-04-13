import { H1 } from "@/components/ui/typography";
import { useLinkClicksById } from "../api/get-total-click-by-id";
import { useParams } from "react-router";
import type { DateRange } from "@/types/types";

type TotalClickCountProps = {
  className?: string;
  dateRange: DateRange | undefined;
};

export const TotalClickCount = ({
  className,
  dateRange,
}: TotalClickCountProps) => {
  const { linkId } = useParams();
  const { linkClicks } = useLinkClicksById(linkId ?? "", dateRange);

  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">Link Clicks</h4>
        <div className="flex gap-8 justify-center items-center mt-8 flex-wrap">
          <div className="flex gap-2 items-end">
            <H1 className="text-center font-bold text-6xl">
              {linkClicks ? linkClicks?.totalClick : "0"}
            </H1>
            <p className="mb-2">Total Clicks</p>
          </div>

          <div className="flex gap-2 items-end">
            <H1 className="text-center font-bold text-6xl">
              {linkClicks ? linkClicks?.uniqueClick : "0"}
            </H1>
            <p className="mb-2">Unique Clicks</p>
          </div>
        </div>
      </div>
    </div>
  );
};
