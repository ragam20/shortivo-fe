import { H1 } from "@/components/ui/typography";
import { dummyTotalClicks } from "@/features/analytics/data";

type TotalClickCountPreviewProps = {
  className?: string;
};

export const TotalClickCountPreview = ({
  className,
}: TotalClickCountPreviewProps) => {
  return (
    <div className={className}>
      <div className="w-full rounded-lg bg-white p-4 shadow-sm">
        <h4 className="text-lg font-semibold text-stone-900">Link Clicks</h4>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <div className="flex items-end gap-2">
            <H1 className="text-center text-6xl font-bold">
              {dummyTotalClicks.totalClick}
            </H1>
            <p className="mb-2">Total Clicks</p>
          </div>

          <div className="flex items-end gap-2">
            <H1 className="text-center text-6xl font-bold">
              {dummyTotalClicks.uniqueClick}
            </H1>
            <p className="mb-2">Unique Clicks</p>
          </div>
        </div>
      </div>
    </div>
  );
};
