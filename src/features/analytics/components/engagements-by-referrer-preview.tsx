import { dummyEngagementByReferrer } from "@/features/analytics/data";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Title,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context): string => {
          const value = context.raw;
          return `  ${value}`;
        },
      },
    },
    legend: {
      display: false,
    },
  },
};

type EngagementByReferrerPreviewProps = {
  className?: string;
};

export const EngagementByReferrerPreview = ({
  className,
}: EngagementByReferrerPreviewProps) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  const data: ChartData<"bar"> = {
    labels: dummyEngagementByReferrer.map((item) =>
      item.referer?.trim() ? item.referer : "Unknown",
    ),
    datasets: [
      {
        data: dummyEngagementByReferrer.map((item) => item.clicks),
        backgroundColor: "#4287f5",
      },
    ],
  };

  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold">Engagement by Referrer</h4>
        <div className="mt-6 flex h-54 w-full flex-col">
          {dummyEngagementByReferrer.length > 0 ? (
            <Bar
              id="engagement-by-referrer-preview"
              data={data}
              ref={chartRef}
              options={options}
            />
          ) : (
            <p className="text-sm text-stone-500">
              No referrer data available.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
