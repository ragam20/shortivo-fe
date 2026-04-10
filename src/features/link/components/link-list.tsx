import { Button } from "@/components/ui/button";
import { AppPagination } from "@/components/ui/pagination/app-pagination";
import type { Link } from "@/types/api";
import React, { useState } from "react";
import {
  Link as LinkIcon,
  Ellipsis as EllipsisIcon,
  Pencil as PencilIcon,
  Eye as EyeIcon,
  Trash2 as Trash2Icon,
  ChartColumn as ChartColumnIcon,
  Lock as LockIcon,
  SearchIcon,
  X as XIcon,
} from "lucide-react";
import { H3, H4 } from "@/components/ui/typography";
import { CopyAbleLinkText } from "@/components/ui/text/copyable-link-text";
import {
  MenuPopover,
  type MenuItem,
} from "@/components/ui/popover/popover-menu";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { ViewLinkDetailDialog } from "@/features/link/components/view-link-detail-dialog";
import { CalendarPicker } from "@/components/ui/calendar-picker";
import { Input } from "@/components/ui/input";
import { CreateLinkPopover } from "./create-link";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { useLinks } from "../hooks/use-links";
import type { DateRange } from "react-day-picker";
import { toDateTimeRangeISOString } from "@/utils/date-util";
import { toast } from "sonner";
import { AuthContext } from "@/lib/auth-context";
import { PLAN } from "@/types/types";
import { useContext } from "react";

const LINK_LIST_SKELETON_ROWS = 3;

export const LinkList = () => {
  const ctx = useContext(AuthContext);
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [calendarPickerKey, setCalendarPickerKey] = useState(0);
  const navigate = useNavigate();
  const isFreePlan = ctx?.account?.plan?.code === PLAN.FREE;
  const {
    links,
    filterParams,
    totalPages,
    isLoading,
    isFilterActive,
    setFilterParams,
    updateFilters,
    refetch,
  } = useLinks();

  const handleCreateSuccess = async () => {
    if (filterParams.page !== 1) {
      updateFilters(setFilterParams, { page: 1 });
      return;
    }

    await refetch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFilters(setFilterParams, { search: e.target.value });
  };

  const handleDateChange = (date: DateRange | undefined) => {
    if (!date?.from || !date?.to) {
      updateFilters(setFilterParams, {
        createdFrom: null,
        createdTo: null,
        page: 1,
      });
      return;
    }

    const dates = toDateTimeRangeISOString(date);

    updateFilters(setFilterParams, {
      createdFrom: dates.from,
      createdTo: dates.to,
      page: 1,
    });
  };

  const handleClearFilters = () => {
    setCalendarPickerKey((prev) => prev + 1);
    updateFilters(setFilterParams, {
      search: null,
      createdFrom: null,
      createdTo: null,
      page: 1,
    });
  };

  const getCardMenuItems = (link: Link): MenuItem[] => [
    {
      label: "Analytics",
      icon: ChartColumnIcon,
      trailingIcon: isFreePlan ? LockIcon : undefined,
      disabled: isFreePlan,
      onClick() {
        if (isFreePlan) {
          return;
        }

        navigate(paths.app.analytics.perlink.getHref(link.id.toString()));
      },
    },
    {
      label: "Edit link",
      icon: PencilIcon,
      onClick: () => {
        navigate(paths.app.links.edit.getHref(link.id));
      },
    },
    {
      label: "View detail",
      icon: EyeIcon,
      onClick: () => {
        setSelectedLink(link);
        setOpenDetailDialog(true);
      },
    },
    {
      label: "Delete",
      icon: Trash2Icon,
      onClick: () => {
        toast.info("You can't delete the link for better analytics.");
      },
    },
  ];

  return (
    <>
      <H3 className="text-4xl">Links</H3>
      <div className="my-4 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <SearchIcon className="absolute left-4 top-2.5 size-5" />
          <Input
            className="bg-white pl-11"
            placeholder="Search links"
            value={filterParams.search ? filterParams.search : ""}
            onChange={handleSearchChange}
          />
        </div>

        <div className="flex flex-col gap-2 sm:flex-row md:flex-none">
          <div className="flex flex-col gap-2 sm:flex-row">
            <CalendarPicker
              key={calendarPickerKey}
              title="Filter by created at"
              onDateChange={handleDateChange}
            />
            {isFilterActive ? (
              <Button
                variant="outline"
                className="py-5"
                onClick={handleClearFilters}
              >
                <XIcon />
                <p>Clear filter</p>
              </Button>
            ) : null}
          </div>
          <CreateLinkPopover onSuccess={handleCreateSuccess}>
            <Button className="flex gap-1 py-5">
              <LinkIcon />
              <p>Create link</p>
            </Button>
          </CreateLinkPopover>
        </div>
      </div>

      <Separator className="my-6" />

      <div className="w-full min-h-screen flex flex-col">
        {isLoading ? (
          <div className="space-y-4">
            {Array.from({ length: LINK_LIST_SKELETON_ROWS }).map((_, index) => (
              <div
                key={index}
                className="rounded-md bg-white p-4 xl:flex xl:items-center xl:gap-4"
              >
                <Skeleton className="hidden size-10 xl:block" />

                <div className="mb-4 flex w-full justify-between xl:hidden">
                  <Skeleton className="size-10" />
                  <Skeleton className="size-10" />
                </div>

                <div className="flex-1 space-y-3">
                  <Skeleton className="h-5 w-40" />
                  <Skeleton className="h-4 w-full max-w-md" />
                </div>

                <Skeleton className="hidden h-10 w-10 xl:block" />
              </div>
            ))}
          </div>
        ) : links.length > 0 ? (
          <ul>
            {links.map((link) => (
              <li
                key={link.id}
                className="w-full h-fit bg-white mt-4 rounded-md"
              >
                <div className="p-4 xl:flex xl:gap-4 items-center">
                  <Button
                    variant={"outline"}
                    className="hidden xl:block border-primary/50"
                  >
                    <LinkIcon />
                  </Button>

                  <div className="xl:hidden flex w-full justify-between mb-4">
                    <Button
                      variant={"outline"}
                      className="block xl:hidden border-primary/50"
                    >
                      <LinkIcon />
                    </Button>

                    <MenuPopover items={getCardMenuItems(link)}>
                      <Button
                        className="cursor-pointer block xl:hidden"
                        variant={"ghost"}
                      >
                        <EllipsisIcon className="size-4" />
                      </Button>
                    </MenuPopover>
                  </div>

                  <div className="flex-1 min-w-0">
                    <H4 className="truncate">{link.title}</H4>
                    <div className="flex flex-wrap gap-2 items-center">
                      <CopyAbleLinkText
                        text={link.shortURL}
                        fontStyle="truncate"
                      />
                      <a
                        href={link.originalURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="truncate font-medium text-stone-800 text-sm hover:underline"
                      >
                        {link.originalURL}
                      </a>
                    </div>
                  </div>

                  <MenuPopover items={getCardMenuItems(link)}>
                    <Button
                      className="cursor-pointer hidden xl:block"
                      variant={"ghost"}
                    >
                      <EllipsisIcon className="size-4" />
                    </Button>
                  </MenuPopover>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-6 rounded-md bg-white p-6 text-sm text-stone-600">
            {isFilterActive
              ? "No matching results."
              : "No links yet. Create your first link to get started"}
          </div>
        )}

        <AppPagination
          className="mt-6"
          page={filterParams.page}
          onPageChange={(v) => {
            updateFilters(setFilterParams, {
              page: v,
            });
          }}
          totalPages={totalPages}
        />
      </div>

      <ViewLinkDetailDialog
        link={selectedLink}
        open={openDetailDialog}
        onOpenChange={(open) => {
          setOpenDetailDialog(open);

          if (!open) {
            setSelectedLink(null);
          }
        }}
      />
    </>
  );
};
