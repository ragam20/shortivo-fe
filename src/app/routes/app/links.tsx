import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { CalendarPicker } from "@/components/ui/calendar-picker";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { H3 } from "@/components/ui/typography";
import { CreateLinkPopover } from "@/features/link/components/create-link";
import { LinkList } from "@/features/link/components/link-list";
import { Search as SearchIcon, Link as LinkIcon } from "lucide-react";

export const LinksRoute = () => {
  return (
    <ContentLayout>
      <H3 className="text-4xl">Links</H3>
      <div className="my-4 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-2.5 size-5" />
          <Input className="bg-white pl-11" placeholder="search link" />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row md:flex-none">
          <CalendarPicker
            onDateChange={(date) => {
              console.log(date);
            }}
          />
          <CreateLinkPopover>
            <Button className="flex gap-1 py-5">
              <LinkIcon />
              <p>Create link</p>
            </Button>
          </CreateLinkPopover>
        </div>
      </div>

      <Separator className="my-6" />

      <LinkList />
    </ContentLayout>
  );
};
