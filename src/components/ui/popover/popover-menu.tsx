import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import type { LucideProps } from "lucide-react";

type MenuIcon = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

export type MenuItem = {
  label: string;
  icon?: MenuIcon;
  trailingIcon?: MenuIcon;
  disabled?: boolean;
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
              onClick={() => {
                if (item.disabled) {
                  return;
                }

                item.onClick();
              }}
              className={`flex w-full items-center justify-between rounded px-2 py-1 ${
                item.disabled
                  ? "cursor-not-allowed text-stone-500"
                  : "cursor-pointer hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-1">
                {item.icon && <item.icon className="size-3" />}
                <p className="py-0.5">{item.label}</p>
              </div>
              {item.trailingIcon ? <item.trailingIcon className="size-3" /> : null}
            </li>
          ))}
        </ul>
      </PopoverContent>
    </Popover>
  );
};
