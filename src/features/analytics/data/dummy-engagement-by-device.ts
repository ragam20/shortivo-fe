import type { GetTotalEngagementByDevice } from "@/types/api";

export const dummyEngagementByDevice: GetTotalEngagementByDevice[] = [
  {
    device: "mobile",
    clicks: 1240,
  },
  {
    device: "desktop",
    clicks: 860,
  },
  {
    device: "tablet",
    clicks: 290,
  },
  {
    device: "unknown",
    clicks: 110,
  },
];
