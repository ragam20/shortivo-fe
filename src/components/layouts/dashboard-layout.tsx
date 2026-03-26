import type React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
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
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { NavLink, useLocation } from "react-router";

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

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { pathname } = useLocation();
  const currMenu =
    dashboardMenus.find((m) => m.path === pathname) ?? dashboardMenus[0];

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

      <div className="flex flex-col w-full min-h-screen overflow-hidden">
        <header className="h-14 w-full shadow">
          <SidebarTrigger className="absolute top-24 z-10" />
          <div className="flex items-center justify-between py-2 px-4">
            {!openSidebar && (
              <H3
                className={`text-primary transition-opacity duration-700 ${!openSidebar ? "opacity-100" : "opacity-0"}`}
              >
                Shortivo
              </H3>
            )}

            <div className="flex gap-2 items-center justify-end w-full">
              <Button
                variant={"outline"}
                className="border-primary py-2 px-3 md:py-4 md:px-5 rounded-sm border-2 text-primary/80 cursor-pointer hover:text-white hover:bg-primary font-bold"
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

              <Avatar className="cursor-pointer">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="user img"
                  className="grayscale"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 w-full bg-primary/8">{children}</main>
      </div>
    </SidebarProvider>
  );
};

function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white border-b-2">
        <H3 className="text-primary my-auto px-4 py-8 text-3xl">Shortivo</H3>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="p-4">
          {dashboardMenus.map((item) => (
            <SidebarMenuItem key={item.title}>
              <NavLink
                to={item.path}
                end
                className={({ isActive }) =>
                  `cursor-pointer text-sm w-full mb-1 flex gap-2 px-4 py-2 rounded-xl items-center
                  ${
                    isActive
                      ? "text-white bg-primary/80 hover:text-white hover:bg-primary/80"
                      : "text-stone-800 hover:text-stone-800 hover:bg-primary/20"
                  }`
                }
              >
                <item.icon className="size-5" />
                {item.title}
              </NavLink>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
