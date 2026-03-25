import { Button } from "@/components/ui/button";
import { H3, H4, P } from "@/components/ui/typography";
import BadgeCheckIC from "@/assets/badge-check.svg?react";
import MenuIC from "@/assets/menu.svg?react";
import CloseIC from "@/assets/close.svg?react";
import { useContext, useState } from "react";
import { Drawer } from "@/components/ui/drawer/drawer";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router";
import { paths } from "@/config/paths";
import { AuthContext } from "@/lib/auth-context";

export const Landing = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate();

  const auth = useContext(AuthContext);
  if (auth?.user) {
    navigate(paths.app.root.path);
  }

  return (
    <>
      {openDrawer && (
        <Drawer open={openDrawer} setOpen={setOpenDrawer}>
          <div className="p-4 flex items-center justify-between">
            <H3
              className="text-primary"
              onClick={() => {
                navigate(paths.landing.path);
              }}
            >
              Shortivo
            </H3>
            <CloseIC
              className="size-6"
              onClick={() => setOpenDrawer(!openDrawer)}
            />
          </div>

          <div className="mt-24">
            <ul className="text-center flex flex-col gap-8">
              <li onClick={() => {}}>
                <H3>Features</H3>
              </li>
              <li onClick={() => {}}>
                <H3>Pricing</H3>
              </li>
              <li onClick={() => {}}>
                <H3>Docs</H3>
              </li>
            </ul>
          </div>

          <div className="min-w-xs absolute bottom-0 w-full h-36 shadow-[0_-4px_10px_rgba(0,0,0,0.1)]">
            <div className="p-6 flex flex-col gap-4">
              <Button
                variant={"outline"}
                className="w-full py-5 text-md active:bg-gray-100"
                onClick={() => {
                  navigate(paths.auth.login.path);
                }}
              >
                Sign in
              </Button>
              <Button
                className="w-full py-5 font-bold text-md active:bg-primary/80"
                onClick={() => {
                  navigate(paths.auth.register.path);
                }}
              >
                Sign up
              </Button>
            </div>
          </div>
        </Drawer>
      )}

      <header>
        <nav className="md:4xl xl:w-7xl md:mx-auto h-16 p-4 flex items-center justify-between">
          <div>
            <H3 className="text-primary cursor-pointer">Shortivo</H3>
          </div>
          <div className="hidden md:flex md:gap-16 md:items-center md:mt-1 ">
            <a className="cursor-pointer">
              <H4 className="text-md font-medium">Features</H4>
            </a>
            <a className="cursor-pointer">
              <H4 className="text-md font-medium">Pricing</H4>
            </a>
            <a className="cursor-pointer">
              <H4 className="text-md font-medium">Docs</H4>
            </a>
          </div>
          <div className="hidden md:flex md:gap-2 gap-4">
            <Button
              variant={"outline"}
              className="py-5 px-4"
              onClick={() => {
                navigate(paths.auth.login.path);
              }}
            >
              Sign in
            </Button>
            <Button
              className="py-5 px-4 font-bold"
              onClick={() => {
                navigate(paths.auth.register.path);
              }}
            >
              Get Started
            </Button>
          </div>

          <MenuIC
            className="size-5 md:hidden"
            onClick={() => {
              setOpenDrawer(!openDrawer);
            }}
          />
        </nav>
      </header>

      <main>
        <section
          id="hero-section"
          className="lg:w-5xl xl:w-7xl lg:mx-auto px-2 mt-16 lg:mt-24 lg:4xl flex flex-col items-center lg:items-stretch gap-8 lg:gap-4 lg:flex-row lg:justify-between"
        >
          <div className="text-center lg:text-start">
            <H3 className="text-4xl">A Better Way to Manage Your Links</H3>
            <P>
              Create memorable short links, customize link, and measure
              engagement with built-in analytics.
            </P>

            <div className="mt-8">
              <p className="font-bold">
                Get started for free. With the free plan, you can:{" "}
              </p>
              <ul className="mt-4 flex flex-col lg:block items-center">
                <li className="flex items-center gap-1">
                  <BadgeCheckIC className="size-4" />
                  customize 3 link per month
                </li>

                <li className="flex items-center gap-1">
                  <BadgeCheckIC className="size-4" />
                  create 10 short links each month
                </li>

                <li className="flex items-center gap-1">
                  <BadgeCheckIC className="size-4" />
                  enjoy unlimited clicks
                </li>
              </ul>
            </div>
          </div>

          <div className="md:w-2xl w-full shadow-[0_0_10px_rgba(0,0,0,0.1)] mb-4">
            <div className="p-4">
              <H3>Shorten a long link</H3>
              <Input
                className="w-full focus-visible:ring-primary/10 border-primary py-5 mt-4"
                placeholder="https://www.example.com"
              />
              <Button className="mt-4 px-6 py-5 after:content-['→']">
                Get your free link
              </Button>
            </div>
          </div>
        </section>

        <div className="w-full h-36" />
      </main>

      <footer className="absolute w-full bottom-0 h-16 bg-primary mt-4">
        <p className="text-white text-center mt-4">
          © {new Date().getFullYear()} Shortivo. All rights reserved.
        </p>
      </footer>
    </>
  );
};
