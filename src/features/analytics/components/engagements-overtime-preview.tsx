import { dummyEngagementByOvertime } from "@/features/analytics/data";
import { formatDateMMYY } from "@/utils/date-util";
import {
  CategoryScale,
  Chart as ChartJS,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
);

type EngagementOvertimePreviewProps = {
  className?: string;
};

export const EngagementOvertimePreview = ({
  className,
}: EngagementOvertimePreviewProps) => {
  const chartRef = useRef<ChartJS<"line"> | null>(null);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  const data: ChartData<"line"> = {
    labels: dummyEngagementByOvertime.map((item) => formatDateMMYY(item.date)),
    datasets: [
      {
        data: dummyEngagementByOvertime.map((item) => item.clicks),
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
          label: (context) => {
            return `Value ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className={className}>
      <div className="flex w-full flex-col gap-4 rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">
          Engagement Overtime
        </h4>
        <div className="h-52 w-full md:h-60">
          {dummyEngagementByOvertime.length > 0 ? (
            <Line
              id="engagement-overtime-preview-chart"
              data={data}
              options={options}
              ref={chartRef}
              redraw
            />
          ) : (
            <p className="text-sm text-stone-500">
              No overtime data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
