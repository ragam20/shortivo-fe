import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";

type CreateLinkPopoverProps = {
  children: React.ReactNode;
};

export const CreateLinkPopover = ({
  children: popoverTrigger,
}: CreateLinkPopoverProps) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{popoverTrigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-88 gap-4 rounded-2xl p-5">
        <PopoverHeader>
          <PopoverTitle className="text-base font-semibold">
            Create a new link
          </PopoverTitle>
        </PopoverHeader>

        <form
          className="flex flex-col gap-4"
          onSubmit={(event) => {
            event.preventDefault();
            setOpen(false);
          }}
        >
          <div className="flex flex-col gap-2">
            <Label htmlFor="create-link-title">title</Label>
            <Input id="create-link-title" placeholder="My awesome link" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="create-link-url">URL</Label>
            <Input id="create-link-url" placeholder="https://example.com" />
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="create-link-description">description</Label>
            <textarea
              id="create-link-description"
              placeholder="Add a short description"
              className={cn(
                "min-h-28 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                "resize-none border focus-visible:ring-primary/10",
              )}
            />
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button type="submit">Submit</Button>
          </div>
        </form>
      </PopoverContent>
    </Popover>
  );
};
