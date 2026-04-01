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
import type { DateRange } from "react-day-picker";

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
  dateRange: DateRange | null | undefined;
};

export const EngagementByReferrer = ({
  className,
  dateRange,
}: EngagementByReferrerProps) => {
  const chartRef = useRef<ChartJS<"bar"> | null>(null);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  // dummy
  const socialMediaData = [
    { id: 1, name: "facebook", value: 120 },
    { id: 2, name: "instagram", value: 200 },
    { id: 3, name: "twitter", value: 80 },
    { id: 4, name: "linkedin", value: 60 },
    { id: 5, name: "tiktok", value: 300 },
    { id: 6, name: "youtube", value: 250 },
    { id: 7, name: "reddit", value: 90 },
    { id: 8, name: "snapchat", value: 70 },
    { id: 9, name: "pinterest", value: 40 },
    { id: 10, name: "whatsapp", value: 180 },
    { id: 11, name: "redirect", value: 400 },
  ];

  const data: ChartData<"bar"> = {
    labels: socialMediaData.map((item) => item.name),
    datasets: [
      {
        data: socialMediaData.map((item) => item.value),

        backgroundColor: "#4287f5",
      },
    ],
  };

  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold">Engagement by Referrer</h4>
        <div className="w-full mt-6 flex flex-col h-54">
          <Bar
            id="engagement-by-referrer"
            data={data}
            ref={chartRef}
            options={options}
          />
        </div>
      </div>
    </div>
  );
};
