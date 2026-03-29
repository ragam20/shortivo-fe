import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { LucideProps } from "lucide-react";

export type MenuItem = {
  label: string;
  icon?: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  onClick: () => void;
};

type MenuPopoverProps = {
  items: MenuItem[];
  children: React.ReactNode;
};

export const MenuPopover = ({
  items,
  children: popoverTrigger,
}: MenuPopoverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>{popoverTrigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-58">
        <ul className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li
              key={index}
              onClick={item.onClick}
              className={`${item.icon ? "flex gap-1" : ""} w-full  items-center hover:bg-muted cursor-pointer rounded`}
            >
              {item.icon && <item.icon className="size-3" />}
              <p className="py-0.5">{item.label}</p>
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
