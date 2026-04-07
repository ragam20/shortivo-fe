import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  createLink,
  createLinkInputSchema,
  type createLinkInput,
} from "../api/create-link";
import { toast } from "sonner";
import { getDomainName } from "@/utils/url-util";

type CreateLinkPopoverProps = {
  children: React.ReactNode;
  onSuccess: () => void | Promise<void>;
};

export const CreateLinkPopover = ({
  children: popoverTrigger,
  onSuccess,
}: CreateLinkPopoverProps) => {
  const [open, setOpen] = useState(false);

  const onSubmit = async (data: createLinkInput) => {
    try {
      const payload = {
        ...data,
        title: data.title || getDomainName(data.url),
      };

      const resp = await createLink(payload);
      await onSuccess();

      toast.info(resp.message);

      setOpen(false);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create link");
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{popoverTrigger}</PopoverTrigger>
      <PopoverContent align="end" className="w-88 gap-4 rounded-2xl p-5">
        <PopoverHeader>
          <PopoverTitle className="text-base font-semibold">
            Create a new link
          </PopoverTitle>
        </PopoverHeader>

        <Form
          id="create-link-input"
          className="my-4"
          schema={createLinkInputSchema}
          onSubmit={onSubmit}
        >
          {({ register, errors }) => (
            <>
              <FormField label="title" error={errors.title}>
                <Input
                  id="create-link-title"
                  placeholder="My awesome link"
                  {...register("title")}
                />
              </FormField>

              <FormField label="url" error={errors.url}>
                <Input
                  id="create-link-url"
                  placeholder="https://example.com"
                  {...register("url")}
                />
              </FormField>

              <FormField label="description" error={errors.description}>
                <textarea
                  id="create-link-description"
                  placeholder="Add a short description"
                  className={cn(
                    "min-h-28 w-full rounded-lg border border-input bg-transparent px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                    "resize-none border focus-visible:ring-primary/10",
                  )}
                  {...register("description")}
                />
              </FormField>
            </>
          )}
        </Form>

        <div className="flex justify-end gap-2 ">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>
          <Button type="submit" form="create-link-input">
            Submit
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
