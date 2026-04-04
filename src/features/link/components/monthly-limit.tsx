import { useEffect, useState } from "react";
import { getMonthLimit } from "../api/get-monthly-limit";
import { P } from "@/components/ui/typography";

export const MonthLimitText = () => {
  const [currLimit, setCurrLimit] = useState(0);

  useEffect(() => {
    const initMonthlyLimit = async () => {
      const data = await getMonthLimit();

      setCurrLimit(data.monthlyLimit - data.currLimit);
    };

    initMonthlyLimit();
  }, [currLimit]);

  return (
    <>
      <P className="text-stone-800">
        You can create <span className="font-extrabold">{currLimit}</span> more
        links this month
      </P>
    </>
  );
};
