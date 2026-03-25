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
} from "../ui/sidebar";
import { H3 } from "../ui/typography";
import { Head } from "../seo/head";
import { useState } from "react";
import { paths } from "@/config/paths";
import HomeIcon from "@/assets/home.svg?react";
import { ChartLine, Link2, Mail } from "lucide-react";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type DashboardMenu = {
  title: string;
  icon: any;
  path: string;
};

const dashboardMenus: DashboardMenu[] = [
  { title: "Home", icon: HomeIcon, path: paths.app.home.path },
  { title: "Links", icon: Link2, path: paths.app.links.path },
  { title: "Analytics", icon: ChartLine, path: paths.app.analytics.path },
];

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currMenu, setCurrMenu] = useState(dashboardMenus[0]);
  const [openSidebar, setOpenSidebar] = useState(true);

  return (
    <SidebarProvider
      open={openSidebar}
      onOpenChange={(state: boolean) => {
        setOpenSidebar(state);
      }}
    >
      <AppSidebar
        onClickMenu={(menu: DashboardMenu) => {
          setCurrMenu(menu);
        }}
        menu={currMenu}
      />

      <Head
        title={`${currMenu.title} | Shortivo`}
        description={currMenu.title}
      />

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

      <main className="">{children}</main>
    </SidebarProvider>
  );
};

type AppSidebarProps = {
  menu: DashboardMenu;
  onClickMenu: (menu: DashboardMenu) => void;
};

function AppSidebar({ menu, onClickMenu }: AppSidebarProps) {
  return (
    <Sidebar>
      <SidebarHeader className="bg-white border-b-2">
        <H3 className="text-primary my-auto px-4 py-8 text-3xl">Shortivo</H3>
      </SidebarHeader>
      <SidebarContent className="bg-white">
        <SidebarMenu className="p-4">
          {dashboardMenus.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton
                asChild
                onClick={() => {
                  onClickMenu(item);
                }}
                className={`
                  cursor-pointer w-full mt-2 
                  ${item.title === menu.title ? "text-white bg-primary/80" : "text-stone-800"} 
                  ${item.title === menu.title ? "hover:text-white hover:bg-primary/80" : "hover:text-stone-800 hover:bg-primary/20"} `}
              >
                <div>
                  <item.icon />
                  {item.title}
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  );
}
