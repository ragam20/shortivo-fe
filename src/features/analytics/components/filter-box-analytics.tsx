import { CalendarPicker } from "@/components/ui/calendar-picker";
import { cn } from "@/lib/utils";
import type { DateRange } from "react-day-picker";

type FilterBoxAnalyticsProps = {
  className?: string;
  onDateRangeChange: (date: DateRange | null | undefined) => void;
};

export const FilterBoxAnalytics = ({
  className,
  onDateRangeChange,
}: FilterBoxAnalyticsProps) => {
  return (
    <div
      className={cn(
        "w-full flex items-center overflow-auto md:flex-none gap-2",
        className,
      )}
    >
      <CalendarPicker title="Filter by date" onDateChange={onDateRangeChange} />
    </div>
  );
};
