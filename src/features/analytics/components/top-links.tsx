import { Button } from "@/components/ui/button";
import { H4 } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { ChartColumn as ChartColumnIcon } from "lucide-react";
import { useNavigate } from "react-router";

const topLinks = [
  {
    id: 1,
    shortLink: "shortivo.ly/ABCD123",
    originalURL: "www.google.com",
    totalClicks: 400,
  },
  {
    id: 2,
    shortLink: "shortivo.ly/xYz123",
    originalURL: "www.google.com",
    totalClicks: 300,
  },
  {
    id: 3,
    shortLink: "shortivo.ly/QWerD123",
    originalURL: "www.google.com",
    totalClicks: 300,
  },
];

type TopLinksProps = {
  classname?: string;
};

export const TopLinks = ({ classname }: TopLinksProps) => {
  const navigate = useNavigate();

  return (
    <div className={classname}>
      <H4>Top 3 links last week</H4>
      <ul className="mt-4 flex flex-col gap-4">
        {topLinks.map((link) => (
          <li
            key={link.id}
            className="flex flex-col sm:flex-row sm:flex-nowrap gap-4 sm:gap-6 sm:items-center sm:justify-between w-full p-5 bg-white rounded-md"
          >
            <div className="flex flex-col flex-1 ">
              <H4 className="">{link.shortLink}</H4>
              <p className="text-stone-400">{link.originalURL}</p>
            </div>

            <div className="flex flex-col items-center justify-center">
              <h5 className="font-semibold text-stone-700">
                {link.totalClicks}
              </h5>
              <p className="text-sm">Total clicks</p>
            </div>

            <Button
              variant="outline"
              onClick={() => {
                navigate(paths.app.analytics.dashboard.getHref());
              }}
              className="flex gap-2 items-center border-primary/40"
            >
              <ChartColumnIcon className="size-4" />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
};
