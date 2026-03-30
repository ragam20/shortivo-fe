import { Separator } from "@/components/ui/separator";
import { H1, H3, P } from "@/components/ui/typography";
import { PricingList } from "@/features/pricing/components/pricing-list";
import { X as XIcon } from "lucide-react";
import { useNavigate } from "react-router";

export const PricingRoute = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="md:w-5xl px-4 mx-auto overflow-hidden">
        <header className="py-4 flex items-center justify-between">
          <H3 className="cursor-pointer text-primary">Shortivo</H3>
          <XIcon
            className="size-6 cursor-pointer"
            onClick={() => {
              navigate(-1);
            }}
          />
        </header>

        <Separator className="my-4" />

        <main className="flex flex-col gap-14 w-full">
          <div className="w-full mt-10 text-center">
            <H1>
              Create Impactful and Trackable Experience with The Shortivo
              Connection Platform
            </H1>
            <P>Upgrade to unlock more value from your short links.</P>
          </div>
          <PricingList />
        </main>
      </div>
    </>
  );
};
