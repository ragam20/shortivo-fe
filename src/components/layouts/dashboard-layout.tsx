import type React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "../ui/sidebar";
import { H3 } from "../ui/typography";
import { Head } from "../seo/head";
import { useState } from "react";
import { paths } from "@/config/paths";
import {
  ChartLine,
  Link2,
  Mail,
  HomeIcon,
  type LucideProps,
} from "lucide-react";
import { Button } from "../ui/button";
import { NavLink, useLocation, useNavigate } from "react-router";
import type { User } from "@/types/api";
import { UserAvatar } from "../ui/avatar/user-avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { AvatarPopOver } from "../ui/popover/popover-avatar";

type DashboardMenu = {
  title: string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  path: string;
};

const dashboardMenus: DashboardMenu[] = [
  { title: "Home", icon: HomeIcon, path: paths.app.home.getHref() },
  { title: "Links", icon: Link2, path: paths.app.links.getHref() },
  { title: "Analytics", icon: ChartLine, path: paths.app.analytics.getHref() },
];

type DashboardLayoutProps = {
  user: User;
  children: React.ReactNode;
};

export const DashboardLayout = ({ user, children }: DashboardLayoutProps) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { pathname } = useLocation();
  const isMobile = useIsMobile();
  const currMenu =
    dashboardMenus.find((m) => m.path === pathname) ?? dashboardMenus[0];
  const showHeaderTitle = isMobile || !openSidebar;

  const navigate = useNavigate();

  return (
    <SidebarProvider
      open={openSidebar}
      onOpenChange={(state: boolean) => {
        setOpenSidebar(state);
      }}
    >
      <AppSidebar />

      <Head
        title={`${currMenu.title} | Shortivo`}
        description={currMenu.title}
      />

      <div className="flex w-full min-h-screen flex-col">
        <header className="sticky top-0 z-20 w-full border-b bg-white shadow-sm">
          <div className="flex min-h-14 items-center justify-between gap-3 px-4 py-2">
            <div className="flex min-w-0 items-center gap-2">
              <SidebarTrigger className="shrink-0 md:absolute md:top-10 md:left-0" />
              {showHeaderTitle && (
                <H3 className="ml-4 truncate text-primary transition-opacity duration-200">
                  Shortivo
                </H3>
              )}
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  navigate(paths.pricing.path);
                }}
                className="cursor-pointer rounded-sm border-2 border-primary px-3 py-2 font-bold text-primary/80 hover:bg-primary hover:text-white md:px-5 md:py-4"
              >
                UPGRADE
              </Button>

              <Button
                onClick={() => {}}
                variant={"outline"}
                className="cursor-pointer"
              >
                <Mail className="size-5 text-stone-500" />
              </Button>

              <AvatarPopOver user={user}>
                <UserAvatar user={user} className="cursor-pointer" />
              </AvatarPopOver>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full bg-primary/8">{children}</main>
      </div>
    </SidebarProvider>
  );
};

function AppSidebar() {
  const { pathname } = useLocation();
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Sidebar collapsible="icon" className="group">
      <SidebarHeader className="bg-white border-b-2">
        <H3 className="text-primary my-auto px-4 py-8 text-3xl group-data-[collapsible=icon]:hidden">
          Shortivo
        </H3>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="p-4 group-data-[collapsible=icon]:px-1 group-data-[collapsible=icon]:py-8">
          {dashboardMenus.map((item) => {
            const isActive = pathname === item.path;

            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.title}
                  className={`h-10 text-md rounded-xl px-5 group-data-[collapsible=icon]:mx-auto group-data-[collapsible=icon]:size-10 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0 group-data-collapsible:my-1 ${
                    isActive
                      ? "bg-primary/80 text-white hover:bg-primary/80 hover:text-white group-data-[collapsible=icon]:bg-transparent group-data-[collapsible=icon]:text-primary/80 group-data-[collapsible=icon]:hover:bg-transparent group-data-[collapsible=icon]:hover:text-primary/80"
                      : "text-stone-800 hover:bg-primary/20 hover:text-stone-800 group-data-[collapsible=icon]:hover:bg-transparent group-data-[collapsible=icon]:hover:text-stone-800"
                  }`}
                >
                  <NavLink
                    to={item.path}
                    end
                    onClick={() => {
                      if (isMobile) {
                        setOpenMobile(false);
                      }
                    }}
                    className="w-full"
                  >
                    <span className="flex size-8 items-center justify-center rounded-lg transition-colors group-data-[collapsible=icon]:size-10">
                      <item.icon className="size-4 group-data-[collapsible=icon]:size-6" />
                    </span>
                    <span className="group-data-[collapsible=icon]:hidden">
                      {item.title}
                    </span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
