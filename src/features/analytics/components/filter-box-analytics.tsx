import { CalendarPicker } from "@/components/ui/calendar-picker";
import { cn } from "@/lib/utils";
import type { DateRange } from "@/types/types";

type FilterBoxAnalyticsProps = {
  className?: string;
  onDateRangeChange: (date: DateRange) => void;
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
      <CalendarPicker
        title="Filter by date"
        onDateChange={(dateRange) => {
          if (dateRange) {
            onDateRangeChange({
              from: dateRange?.from!.toISOString(),
              to: dateRange?.to!.toISOString(),
            });
          }
        }}
      />
    </div>
  );
};
