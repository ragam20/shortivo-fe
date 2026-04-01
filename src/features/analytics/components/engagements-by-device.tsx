import { useEffect, useRef } from "react";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type Plugin,
  type ChartData,
  type ChartOptions,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import type { DateRange } from "react-day-picker";

ChartJS.register(ArcElement, Tooltip, Legend);

type EngagementByDeviceProps = {
  classname?: string;
  dateRange: DateRange | null | undefined;
};

export const EngagementByDevice = ({
  classname,
  dateRange,
}: EngagementByDeviceProps) => {
  const deviceStats = [
    { label: "Phone", value: 10, color: "#6366F1" },
    { label: "Tablets", value: 20, color: "#10B981" },
    { label: "Web", value: 30, color: "#F97316" },
    { label: "Unknown", value: 5, color: "#EFef4f" },
  ] as const;

  const data: ChartData<"doughnut"> = {
    labels: deviceStats.map((item) => item.label),
    datasets: [
      {
        data: deviceStats.map((item) => item.value),
        backgroundColor: deviceStats.map((item) => item.color),

        borderWidth: 9,
        borderRadius: 2,
        spacing: 0,
        hoverOffset: 10,
        hoverBorderWidth: 1,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const value = context.raw;
            return `  ${value}`;
          },
        },
      },
      legend: {
        display: false,
      },
    },
    cutout: 85,
    animation: {
      easing: "easeOutQuad",
      animateScale: false,
    },
  };

  const valueLabelPlugin: Plugin<"doughnut"> = {
    id: "valueLabelPlugin",
    beforeDraw(chart) {
      const { ctx, width, height } = chart;

      const data = chart.data.datasets[0].data;

      let sumValue = 0;
      data.forEach((v) => {
        sumValue += v;
      });

      ctx.save();

      ctx.font = "bold 32px sans-serif";
      ctx.fillStyle = "#3d403d";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(sumValue.toString(), width / 2, height / 2 - 10);

      ctx.font = "bold 18px sans-serif";
      ctx.fillStyle = "#939693";
      ctx.textAlign = "center";
      ctx.fillText("Engagement", width / 2, height / 2 + 34);
    },
  };

  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  return (
    <div className={classname}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">
          Engagement by device
        </h4>
        <div className="w-full mt-6 flex flex-col gap-6 md:flex-row justify-center">
          <div className="w-full xl:w-64 p-2 mx-auto h-72 md:h-80 md:flex-1">
            <Doughnut
              id="engagement-by-device-chart"
              ref={chartRef}
              data={data}
              options={options}
              plugins={[valueLabelPlugin]}
              redraw
            />
          </div>

          <div>
            <ul className="space-y-4 lg:space-y-0">
              {deviceStats.map((item) => (
                <li
                  key={item.label}
                  className="flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <span
                      className="size-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm font-medium text-stone-700">
                      {item.label}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-stone-900">
                    {item.value}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
