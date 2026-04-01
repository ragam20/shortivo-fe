import { ContentLayout } from "@/components/layouts/content-layout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { H3 } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { mockLinks } from "@/features/link/data/mock-links";
import { cn } from "@/lib/utils";
import { Link, useNavigate, useParams } from "react-router";

export const EditLinkRoute = () => {
  const navigate = useNavigate();
  const { linkId } = useParams();
  const currentLink = mockLinks.find((link) => String(link.id) === linkId);

  const handleBackToLinks = () => {
    navigate(paths.app.links.getHref());
  };

  return (
    <ContentLayout>
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

          <form
            key={linkId ?? "edit-link-form"}
            className="flex flex-col gap-5"
            onSubmit={(event) => {
              event.preventDefault();
              handleBackToLinks();
            }}
          >
            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-link-title">title</Label>
              <Input
                id="edit-link-title"
                defaultValue={currentLink?.title ?? ""}
                placeholder="My awesome link"
                className="bg-white"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-link-original-url">original url</Label>
              <Input
                id="edit-link-original-url"
                value={currentLink?.originalUrl ?? ""}
                readOnly
                className="bg-stone-50 text-stone-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-link-short-url">short url</Label>
              <Input
                id="edit-link-short-url"
                value={currentLink?.shortUrl ?? ""}
                readOnly
                className="bg-stone-50 text-stone-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="edit-link-description">description</Label>
              <textarea
                id="edit-link-description"
                defaultValue={currentLink?.description ?? ""}
                placeholder="Add a short description"
                className={cn(
                  "min-h-28 w-full resize-none rounded-lg border border-input bg-white px-3 py-2 text-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50",
                  "border focus-visible:ring-primary/10",
                )}
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={handleBackToLinks}
              >
                Cancel
              </Button>
              <Button type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </div>
    </ContentLayout>
  );
};
