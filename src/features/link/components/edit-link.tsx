import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Input } from "@/components/ui/input";
import { H3 } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { cn } from "@/lib/utils";
import { useNavigate, useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import type { Link as LinkModel } from "@/types/api";
import { getLinkById } from "../api/get-link-by-id";
import { toast } from "sonner";
import {
  updateLink,
  updateLinkSchema,
  type updateLinkInput,
} from "../api/update-link";
import { Form, FormField } from "@/components/ui/form/form";

export const EditLink = () => {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const [currentLink, setCurrentLink] = useState<LinkModel | null>(null);

  useEffect(() => {
    const getLink = async () => {
      const resp = await getLinkById(linkId!);
      setCurrentLink(resp.data);
    };

    getLink();
  }, [linkId]);

  const handleBackToLinkList = () => {
    navigate(paths.app.links.getHref());
  };

  const handleUpdateLink = async (data: updateLinkInput) => {
    try {
      const resp = await updateLink(data, linkId!);

      toast.info(resp.message);

      handleBackToLinkList();
    } catch {
      toast.error("failed to update link");
    }
  };

  return (
    <>
      <div className="max-w-3xl rounded-lg bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6">
          <div className="space-y-3">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to={paths.app.links.getHref()}>Links</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Edit link</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>

            <H3 className="text-4xl">Edit link</H3>
          </div>

          <Form
            id={linkId ?? "edit-link-form"}
            schema={updateLinkSchema}
            className="flex flex-col gap-5"
            onSubmit={handleUpdateLink}
          >
            {({ register, errors }) => {
              return (
                <>
                  <FormField label="Title" error={errors.title}>
                    <Input
                      id="edit-link-title"
                      defaultValue={currentLink?.title ?? ""}
                      placeholder="My awesome link"
                      {...register("title")}
                    />
                  </FormField>

                  <FormField label="Original URL">
                    <Input
                      id="edit-link-original-url"
                      value={currentLink?.originalURL ?? ""}
                      readOnly
                      className="bg-stone-50 text-stone-500"
                    />
                  </FormField>

                  <FormField label="Short URL">
                    <Input
                      id="edit-link-short-url"
                      value={currentLink?.shortURL ?? ""}
                      readOnly
                      className="bg-stone-50 text-stone-500"
                    />
                  </FormField>

                  <FormField label="description">
                    <textarea
                      id="edit-link-description"
                      defaultValue={currentLink?.description ?? ""}
                      placeholder="Add a short description"
                      className={cn(
                        "min-h-28 w-full resize-none rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                        "border focus-visible:ring-primary/10",
                      )}
                      {...register("description")}
                    />
                  </FormField>
                </>
              );
            }}
          </Form>
          <div className="flex justify-end gap-2 pt-1">
            <Button
              type="button"
              variant="outline"
              onClick={handleBackToLinkList}
            >
              Cancel
            </Button>
            <Button type="submit" form={linkId ?? "edit-link-form"}>
              Submit
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
