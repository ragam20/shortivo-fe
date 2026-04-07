import { Calendar as CalendarIcon, X as CloseIcon } from "lucide-react";
import { Button } from "./button";
import React from "react";
import { Dialog, DialogContent, DialogTrigger } from "./dialog";
import { H4 } from "./typography";
import { Calendar } from "./calendar";
import { Input } from "./input";
import {
  formatDateToString,
  isValidDateRange,
  toDateRange,
} from "@/utils/date-util";
import type { DateRange } from "react-day-picker";
import { toast } from "sonner";

type CalendarPickerProps = {
  onDateChange: (date: DateRange | undefined) => void;
  title: string;
};

const dateFilter = [
  { title: "Last hour", value: "1h" },
  { title: "Today", value: "24h" },
  { title: "Last 7 days", value: "7d" },
  { title: "Last 30 days", value: "30d" },
  { title: "Last 60 days", value: "60d" },
  { title: "Last 90 days", value: "90d" },
];

export const CalendarPicker = ({
  onDateChange,
  title,
}: CalendarPickerProps) => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>({
    from: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ),
    to: new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ),
  });

  const [calendarMonth, setCalendarMonth] = React.useState(
    new Date(new Date().getFullYear(), new Date().getMonth(), 1),
  );

  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant={"outline"} className="relative cursor-pointer py-5">
            <CalendarIcon className="absolute left-4" />
            <p className="pl-8">{title}</p>
          </Button>
        </DialogTrigger>
        <DialogContent showCloseButton={false} className="w-2xl">
          <div className="flex justify-between">
            <H4>{title}</H4>
            <CloseIcon
              className="cursor-pointer"
              onClick={() => {
                setOpen(!open);
              }}
            />
          </div>
          <div className="flex gap-2 w-full">
            <Input
              disabled
              value={
                dateRange?.from ? formatDateToString(dateRange.from, "/") : ""
              }
            />
            <Input
              disabled
              value={dateRange?.to ? formatDateToString(dateRange.to, "/") : ""}
            />
          </div>
          <Calendar
            mode="range"
            month={calendarMonth}
            onMonthChange={setCalendarMonth}
            selected={dateRange}
            onSelect={setDateRange}
            className="w-full"
            classNames={{
              range_start:
                "relative isolate [&>button]:!bg-primary [&>button]:text-white",
              range_middle: "[&>button]:!bg-primary/10",
              range_end:
                "relative isolate rounded-none [&>button]:!bg-primary [&>button]:text-white",
              today: "bg-primary/20",
            }}
          />
          <div className="w-full p-4 bg-primary/10 flex flex-wrap gap-2">
            {dateFilter.map((item, index) => (
              <Button
                key={index}
                className="cursor-pointer text-xs"
                onClick={() => {
                  const range = toDateRange(item.value);
                  setDateRange(range);
                }}
              >
                {item.title}
              </Button>
            ))}
          </div>

          <div className="w-full flex gap-2 justify-end">
            <Button
              className="py-4 cursor-pointer"
              onClick={() => {
                if (!dateRange) {
                  toast.warning("Please choose a date first");
                  return;
                }

                if (!isValidDateRange(dateRange.from!, dateRange.to!)) {
                  toast.warning("max 90 days");
                  return;
                }

                onDateChange(dateRange);
                setOpen(!open);
              }}
            >
              Submit
            </Button>
            <Button
              variant={"outline"}
              className="py-4 cursor-pointer"
              onClick={() => {
                setOpen(!open);
                onDateChange(undefined);
                setDateRange({
                  from: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                  ),
                  to: new Date(
                    new Date().getFullYear(),
                    new Date().getMonth(),
                    new Date().getDate(),
                  ),
                });
              }}
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
