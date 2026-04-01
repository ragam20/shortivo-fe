import { H3 } from "@/components/ui/typography";

export const LinkCount = () => {
  return (
    <div className="flex flex-col w-full md:flex-row gap-4 mt-4">
      <div className="bg-white rounded-md md:w-50 h-30">
        <div className="p-5">
          <p className="text-primary/80">Total Links</p>
          <H3 className="font-extrabold text-stone-600">4</H3>
        </div>
      </div>

      <div className="bg-white rounded-md md:w-50 h-30">
        <div className="p-5">
          <p className="text-primary/80">Total clicks</p>
          <H3 className="font-extrabold text-stone-600">1,000</H3>
        </div>
      </div>

      <div className="bg-white rounded-md flex-1 md:w-50 h-30 overflow-hidden">
        <div className="p-5">
          <p className="text-primary/80">Peak Performance</p>
          <H3 className="truncate w-full font-extrabold text-stone-600">
            shortivo.ly/ABCD123
          </H3>
        </div>
      </div>
    </div>
  );
};
