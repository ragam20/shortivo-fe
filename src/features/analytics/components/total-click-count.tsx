import { H1 } from "@/components/ui/typography";
import type { DateRange } from "react-day-picker";

type TotalClickCountProps = {
  className?: string;
  dateRange: DateRange | null | undefined;
};

export const TotalClickCount = ({
  className,
  dateRange,
}: TotalClickCountProps) => {
  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">Total Clicks</h4>
        <H1 className="text-center mt-4 font-bold text-6xl">44</H1>
      </div>
    </div>
  );
};
