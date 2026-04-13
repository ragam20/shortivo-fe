import { dummyEngagementByDevice } from "@/features/analytics/data";
import {
  ArcElement,
  Chart as ChartJS,
  Legend,
  Tooltip,
  type ChartData,
  type ChartOptions,
  type Plugin,
} from "chart.js";
import { useEffect, useRef } from "react";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

type EngagementByDevicePreviewProps = {
  className?: string;
};

export const EngagementByDevicePreview = ({
  className,
}: EngagementByDevicePreviewProps) => {
  const chartRef = useRef<ChartJS<"doughnut"> | null>(null);

  useEffect(() => {
    return () => {
      chartRef.current?.destroy();
      chartRef.current = null;
    };
  }, []);

  const deviceStats = dummyEngagementByDevice.map((item, index) => {
    const normalizedDevice = item.device.trim().toLowerCase();

    const deviceConfig: Record<string, { label: string; color: string }> = {
      mobile: { label: "Mobile", color: "#6366F1" },
      phone: { label: "Phone", color: "#6366F1" },
      tablet: { label: "Tablet", color: "#10B981" },
      web: { label: "Web", color: "#F97316" },
      desktop: { label: "Desktop", color: "#F97316" },
      unknown: { label: "Unknown", color: "#EAB308" },
    };

    const fallbackColors = ["#6366F1", "#10B981", "#F97316", "#EAB308"];
    const fallbackLabel =
      normalizedDevice.length > 0
        ? `${item.device.charAt(0).toUpperCase()}${item.device.slice(1)}`
        : "Unknown";
    const config = deviceConfig[normalizedDevice] ?? {
      label: fallbackLabel,
      color: fallbackColors[index % fallbackColors.length],
    };

    return {
      label: config.label,
      value: item.clicks,
      color: config.color,
    };
  });

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
          label: (context) => {
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
      const values = chart.data.datasets[0]?.data ?? [];

      let sumValue = 0;
      values.forEach((value) => {
        sumValue += Number(value);
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

  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">
          Engagement by device
        </h4>
        <div className="mt-6 flex w-full flex-col justify-center gap-6 md:flex-row">
          <div className="mx-auto h-72 w-full p-2 md:h-80 md:flex-1 xl:w-64">
            <Doughnut
              id="engagement-by-device-preview-chart"
              ref={chartRef}
              data={data}
              options={options}
              plugins={[valueLabelPlugin]}
              redraw
            />
          </div>

          <div>
            {deviceStats.length > 0 ? (
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
            ) : (
              <p className="text-sm text-stone-500">
                No device data available.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
