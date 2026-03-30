import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { H3, H4 } from "@/components/ui/typography";
import { CircleCheck as CircleCheckIcon } from "lucide-react";

const planList = [
  {
    title: "Free",
    price: 0,
    linkLimit: 5,
    analyticsEnabled: false,
    linkActiveDuration: 604800000,
    benefits: ["7 days active link"],
  },
  {
    title: "Plus",
    price: 5,
    linkLimit: 100,
    analyticsEnabled: true,
    linkActiveDuration: 2592000000,
    benefits: ["30 days active link", "Analytics", "Custom link"],
  },
];

export const PricingList = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-8 py-8 md:flex-row">
        {planList.map((plan) => {
          const isPlusPlan = plan.title.toLowerCase() === "plus";
          const isFreePlan = plan.title.toLowerCase() === "free";

          return (
            <Card
              key={plan.title}
              className={`relative mt-12 md:mt-0 overflow-visible bg-white min-h-100 ${isPlusPlan ? "border-primary border-3 rounded-t-none shadow-xl " : "border border-gray-200 shadow-sm"}`}
            >
              {isPlusPlan && (
                <div className="absolute w-65.5 rounded-xl rounded-b-none -top-12 left-1/2 -translate-x-1/2 bg-primary px-8 py-5 text-center text-xs font-semibold tracking-[0.2em] text-white">
                  RECOMMENDED
                </div>
              )}

              <CardContent
                className={`w-64 ${isPlusPlan ? "pt-8" : "pt-6"} pb-6`}
              >
                <div>
                  <div className="text-center">
                    <H3 className="">{plan.title}</H3>
                    <H4 className="text-lg">
                      <span className="text-primary/80 text-2xl font-extrabold">
                        ${plan.price}
                      </span>
                      /month
                    </H4>

                    <div className="my-4">
                      <p>
                        <span className="font-bold">{plan.linkLimit}</span>
                        links/month
                      </p>
                    </div>
                  </div>

                  <Button
                    variant={isPlusPlan ? "default" : "outline"}
                    className={`w-full ${isPlusPlan ? "bg-primary text-white hover:bg-primary/90" : "border-primary/80 hover:bg-primary/10"}`}
                  >
                    {!isFreePlan ? `Upgrade to ${plan.title}` : "Get started"}
                  </Button>

                  <ul className="mt-8">
                    {plan.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex w-full items-center gap-2"
                      >
                        <CircleCheckIcon className="size-4" />
                        <p>{benefit}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </>
  );
};
