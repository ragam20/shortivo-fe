import { Button } from "@/components/ui/button";
import { AppPagination } from "@/components/ui/pagination/app-pagination";
import type { Link } from "@/types/api";
import { useState } from "react";
import {
  Link as LinkIcon,
  Ellipsis as EllipsisIcon,
  Pencil as PencilIcon,
  Eye as EyeIcon,
  Trash2 as Trash2Icon,
  ChartColumn as ChartColumnIcon,
} from "lucide-react";
import { H4 } from "@/components/ui/typography";
import { CopyAbleLinkText } from "@/components/ui/text/copyable-link-text";
import {
  MenuPopover,
  type MenuItem,
} from "@/components/ui/popover/popover-menu";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { mockLinks } from "@/features/link/data/mock-links";
import { ViewLinkDetailDialog } from "@/features/link/components/view-link-detail-dialog";

export const LinkList = () => {
  const [page, setPage] = useState(1);
  const links = mockLinks;
  const navigate = useNavigate();
  const [selectedLink, setSelectedLink] = useState<Link | null>(null);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const totalPages = Math.max(1, Math.ceil(links.length / 5));

  const getCardMenuItems = (link: Link): MenuItem[] => [
    {
      label: "Analytics",
      icon: ChartColumnIcon,
      onClick() {
        navigate(paths.app.analytics.dashboard.getHref());
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
      onClick: () => {},
    },
  ];

  return (
    <>
      <div className="w-full min-h-screen flex flex-col">
        <ul>
          {links.map((link) => (
            <li key={link.id} className="w-full h-fit bg-white mt-4 rounded-md">
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
                    <Button className="cursor-pointer block xl:hidden" variant={"ghost"}>
                      <EllipsisIcon className="size-4" />
                    </Button>
                  </MenuPopover>
                </div>

                <div className="flex-1 min-w-0">
                  <H4 className="truncate">{link.title}</H4>
                  <div className="flex flex-wrap gap-2 items-center">
                    <CopyAbleLinkText
                      text={link.shortUrl}
                      fontStyle="truncate"
                    />
                    <a
                      href={link.originalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate font-medium text-stone-800 text-sm hover:underline"
                    >
                      {link.originalUrl}
                    </a>
                  </div>
                </div>

                <MenuPopover items={getCardMenuItems(link)}>
                  <Button className="cursor-pointer hidden xl:block" variant={"ghost"}>
                    <EllipsisIcon className="size-4" />
                  </Button>
                </MenuPopover>
              </div>
            </li>
          ))}
        </ul>

        <AppPagination
          className="mt-6"
          page={page}
          onPageChange={setPage}
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
