import type React from "react";
import { useSearchParams } from "react-router";
import { Head } from "../seo/head";
import { H3 } from "../ui/typography";

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

export const AuthLayout = ({ children, title }: LayoutProps) => {
  // const [searchParams] = useSearchParams();
  // const redirectTo = searchParams.get("redirectTo");

  return (
    <>
      <Head title={title} description="Authentication Page" />
      <div className="xl:flex min-h-screen xl:bg-primary justify-center xl:justify-between overflow-hidden">
        <div className="xl:flex-1 xl:flex bg-white xl:rounded-tl-[50px] xl:rounded-br-[50px] xl:flex-col gap-10">
          <H3
            className="text-primary mt-8 xl:px-16 cursor-pointer w-full text-center xl:text-left xl:w-auto text-4xl"
            onClick={() => {}}
          >
            Shortivo
          </H3>
          <div className="md:w-2xl mx-auto h-full p-4">{children}</div>
        </div>
        <div className="bg-transparent xl:w-sm"></div>
      </div>
    </>
  );
};
