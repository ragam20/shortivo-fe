import { ContentLayout } from "@/components/layouts/content-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { H4, P } from "@/components/ui/typography";
import {
  createLink,
  createLinkInputSchema,
} from "@/features/link/api/create-link";
import { MonthLimitText } from "@/features/link/components/monthly-limit";
import { getDomainName } from "@/utils/url-util";
import { Link2, LoaderCircle, Sparkles } from "lucide-react";
import { type FormEvent, useState } from "react";
import { toast } from "sonner";

export const HomeRoute = () => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [monthLimitRefreshKey, setMonthLimitRefreshKey] = useState(0);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const parsed = createLinkInputSchema.safeParse({
      url,
      title: undefined,
      description: undefined,
    });

    if (!parsed.success) {
      setError(parsed.error.flatten().fieldErrors.url?.[0] ?? "Invalid URL");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await createLink({
        url: parsed.data.url,
        title: getDomainName(parsed.data.url),
      });

      setUrl("");
      setMonthLimitRefreshKey((prev) => prev + 1);
      toast.success(response.message);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Failed to create link");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ContentLayout>
      <div className="rounded-lg bg-white px-8 py-8 shadow-sm">
        <div className="flex flex-col gap-4 border-b border-stone-200 pb-6 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm font-medium text-primary">
              <Sparkles className="size-4" />
              Quick Create
            </div>
            <H4>Create a short link quickly</H4>
            <P className="max-w-2xl text-stone-600">
              Paste a destination URL and Shortivo will generate a new short
              link immediately. The title will be filled from the domain
              automatically.
            </P>
          </div>
          <MonthLimitText refreshKey={monthLimitRefreshKey} />
        </div>

        <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <P className="font-bold text-stone-800">
              Paste your destination URL
            </P>
            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="relative flex-1">
                <Link2 className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-stone-400" />
                <Input
                  type="url"
                  value={url}
                  onChange={(event) => {
                    setUrl(event.target.value);
                    if (error) {
                      setError(null);
                    }
                  }}
                  placeholder="https://www.example.com"
                  aria-invalid={error ? "true" : "false"}
                  className="h-12 bg-stone-50 pl-11 text-sm"
                  disabled={isSubmitting}
                />
              </div>
              <Button
                type="submit"
                size="lg"
                className="h-12 px-5"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderCircle className="size-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create short link"
                )}
              </Button>
            </div>
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
        </form>
      </div>
    </ContentLayout>
  );
};
