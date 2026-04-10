import type { DateRange } from "@/types/types";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  type ChartOptions,
  type ChartData,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Bar } from "react-chartjs-2";
import { useParams } from "react-router";
import { useEngagementByReferrer } from "@/features/analytics/api/get-by-referrer";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const options: ChartOptions<"bar"> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      callbacks: {
        label: (context: any): string => {
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

type EngagementByReferrerProps = {
  className?: string;
  dateRange: DateRange | undefined;
};

export const EngagementByReferrer = ({
  className,
  dateRange,
}: EngagementByReferrerProps) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);
  const { linkId } = useParams();
  const { engagementByReferrers, error } = useEngagementByReferrer(
    linkId ?? "",
    dateRange,
  );

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  const data: ChartData<"bar"> = {
    labels: engagementByReferrers.map((item) =>
      item.referer?.trim() ? item.referer : "Unknown",
    ),
    datasets: [
      {
        data: engagementByReferrers.map((item) => item.clicks),

        backgroundColor: "#4287f5",
      },
    ],
  };

  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold">Engagement by Referrer</h4>
        {error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
        <div className="w-full mt-6 flex flex-col h-54">
          {engagementByReferrers.length > 0 ? (
            <Bar
              id="engagement-by-referrer"
              data={data}
              ref={chartRef}
              options={options}
            />
          ) : (
            <p className="text-sm text-stone-500">No referrer data available.</p>
          )}
        </div>
      </div>
    </div>
  );
};
