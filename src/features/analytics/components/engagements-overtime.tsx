import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { useEgagementByOvertime } from "@/features/analytics/api/get-by-overtime";
import { formatDateMMYY } from "@/utils/date-util";
import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import type { DateRange } from "@/types/types";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
);

type EngagementOvertimeProps = {
  classname?: string;
  dateRange: DateRange | undefined;
};

export const EngagementOvertime = ({
  classname,
  dateRange,
}: EngagementOvertimeProps) => {
  const { linkId } = useParams();
  const { totalEgagements, error } = useEgagementByOvertime(
    linkId ?? "",
    dateRange,
  );

  const data: ChartData<"line"> = {
    labels: totalEgagements.map((item) => formatDateMMYY(item.date)),
    datasets: [
      {
        data: totalEgagements.map((item) => item.clicks),

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
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <div className="h-52 w-full md:h-60">
          {totalEgagements.length > 0 ? (
            <Line
              id="engagement-overtime-chart"
              data={data}
              options={options}
              ref={chartRef}
              redraw
            />
          ) : (
            <p className="text-sm text-stone-500">No overtime data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
