import { Button } from "@/components/ui/button";
import { AppPagination } from "@/components/ui/pagination/app-pagination";
import type { Link } from "@/types/api";
import { useEffect, useState } from "react";
import {
  Link as LinkIcon,
  Ellipsis as EllipsisIcon,
  Pencil as PencilIcon,
  Eye as EyeIcon,
  Trash2 as Trash2Icon,
  Trash2,
} from "lucide-react";
import { H4 } from "@/components/ui/typography";
import { CopyAbleLinkText } from "@/components/ui/text/copyable-link-text";
import {
  MenuPopover,
  type MenuItem,
} from "@/components/ui/popover/popover-menu";

const dummyLinks: Link[] = [
  {
    id: 1,
    title: "Github",
    shortUrl: "shortivo.com/acXhsd",
    originalUrl: "https://www.github.com/Agam33",
    description: "This is My Github",
    expiredAt: "",
    createdAt: "",
  },
  {
    id: 2,
    title: "Google",
    shortUrl: "shortivo.com/acXhsd",
    originalUrl: "https://www.google.com/",
    description: "Google search",
    expiredAt: "",
    createdAt: "",
  },
  {
    id: 3,
    title: "Github",
    shortUrl: "shortivo.com/acXhsd",
    originalUrl: "www.github.com/Agam33",
    description: "This is My Github",
    expiredAt: "",
    createdAt: "",
  },
  {
    id: 4,
    title: "Github",
    shortUrl: "shortivo.com/acXhsd",
    originalUrl: "https://www.github.com/Agam33",
    description: "This is My Github",
    expiredAt: "",
    createdAt: "",
  },
  {
    id: 5,
    title: "Github",
    shortUrl: "shortivo.com/acXhsd",
    originalUrl: "https://www.github.com/Agam33",
    description: "This is My Github",
    expiredAt: "",
    createdAt: "",
  },
];

export const LinkList = () => {
  const [openMenu, setOpenMenu] = useState(false);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  const [links, setLinks] = useState<Link[]>([]);

  const cardMenuItems: MenuItem[] = [
    {
      label: "Edit link",
      icon: PencilIcon,
      onClick: () => {},
    },
    {
      label: "View detail",
      icon: EyeIcon,
      onClick: () => {},
    },
    {
      label: "Delete",
      icon: Trash2Icon,
      onClick: () => {},
    },
  ];

  useEffect(() => {
    const initLinks = () => {
      setLinks(dummyLinks);
    };

    initLinks();
  }, []);

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

                  <Button
                    className="cursor-pointer block xl:hidden"
                    variant={"ghost"}
                    onClick={() => {
                      setOpenMenu(true);
                    }}
                  >
                    <EllipsisIcon className="size-4" />
                  </Button>
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

                <MenuPopover items={cardMenuItems}>
                  <Button
                    className="cursor-pointer hidden xl:block"
                    variant={"ghost"}
                    onClick={() => {
                      setOpenMenu(true);
                    }}
                  >
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
    </>
  );
};
