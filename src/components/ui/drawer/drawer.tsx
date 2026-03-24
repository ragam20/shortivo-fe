import { cn } from "@/lib/utils";
import type React from "react";
import { useEffect } from "react";

type DrawerProps = {
  open: boolean;
  setOpen: (state: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

export const Drawer = ({ open, setOpen, children, className }: DrawerProps) => {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [setOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [setOpen]);

  return (
    <>
      <div
        className={`h-full inset-0 bg-black/50" z-40 transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        onClick={() => setOpen(false)}
      />
      <div
        className={cn(
          `
                h-screen fixed 
                top-0 left-0 right-0 bg-white
                z-50 transform transition-transform duration-300 ${open ? "translate-y-0" : "-translate-y-full"}
              `,
          className,
        )}
      >
        <div className="h-full overflow-y-auto min-w-xs">{children}</div>
      </div>
    </>
  );
};
