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
      <div className="flex flex-col items-center md:flex-row justify-center gap-8">
        {planList.map((plan) => {
          const isPlusPlan = plan.title.toLowerCase() === "plus";
          const isFreePlan = plan.title.toLowerCase() === "free";

          return (
            <Card
              key={plan.title}
              className={`bg-white ${isPlusPlan ? "min-h-100 border-primary" : "min-h-87"}`}
            >
              <CardContent className="w-64">
                <div>
                  {isPlusPlan ? (
                    <div className="-mx-4 -mt-4 mb-4 bg-primary px-4 py-4 text-center text-sm font-semibold tracking-[0.2em] text-white">
                      RECOMMENDED
                    </div>
                  ) : null}

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
