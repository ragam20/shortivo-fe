import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { formatDateMMYY } from "@/utils/date-util";
import { useEffect, useRef } from "react";
import type { DateRange } from "react-day-picker";

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Title);

type EngagementOvertimeProps = {
  classname?: string;
  dateRange: DateRange | null | undefined;
};

export const EngagementOvertime = ({
  classname,
  dateRange,
}: EngagementOvertimeProps) => {
  const rawData = [
    { date: "2026-03-24", value: 33 },
    { date: "2026-03-25", value: 20 },
    { date: "2026-03-27", value: 17 },
    { date: "2026-03-28", value: 52 },
    { date: "2026-03-29", value: 45 },
    { date: "2026-03-30", value: 66 },
    { date: "2026-03-31", value: 25 },
  ];

  const data: ChartData<"line"> = {
    labels: rawData.map((item) => formatDateMMYY(item.date)),
    datasets: [
      {
        data: rawData.map((item) => item.value),

        borderColor: "#937be3",
        tension: 0.1,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: "#937be3",
        pointBackgroundColor: "#937be3",
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: "#111827",
        padding: 10,
        displayColors: false,
        callbacks: {
          label: (context: any) => {
            return `Value ${context.raw}`;
          },
        },
      },
    },
  };

  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className={classname}>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">
          Engagement Overtime
        </h4>
        <div className="h-52 w-full md:h-60">
          <Line
            id="engagement-overtime-chart"
            data={data}
            options={options}
            ref={chartRef}
            redraw
          />
        </div>
      </div>
    </div>
  );
};
