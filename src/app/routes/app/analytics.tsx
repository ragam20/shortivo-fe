import { ContentLayout } from "@/components/layouts/content-layout";
import { H3 } from "@/components/ui/typography";
import { LinkCount } from "@/features/analytics/components/link-count";
import { TopLinks } from "@/features/analytics/components/top-links";

export const AnalyticsRoute = () => {
  return (
    <ContentLayout>
      <H3 className="text-4xl">Analytics</H3>
      <div className="flex flex-col gap-8">
        <LinkCount />
        <TopLinks />
      </div>
    </ContentLayout>
  );
};
