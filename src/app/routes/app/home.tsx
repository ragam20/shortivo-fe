import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H4, P } from "@/components/ui/typography";

export const HomeRoute = () => {
  return (
    <>
      <ContentLayout>
        <div>
          <div className="w-full bg-white rounded-lg px-8 py-8">
            <div className="md:flex md:items-center md:justify-between">
              <H4>Create a short link quickly</H4>
              <P className="text-stone-800">
                You can create <span className="font-extrabold">5</span> more
                links this month
              </P>
            </div>

            <div className="mt-10">
              <P className="font-bold">Paste your destination URL</P>
              <div className=" md:flex md:items-center gap-4 mt-2">
                <Input placeholder="https://www.example.com" />
                <Button className="mt-4 md:mt-0 py-5 cursor-pointer">
                  Create short link
                </Button>
              </div>
            </div>
          </div>
        </div>
      </ContentLayout>
    </>
  );
};
