import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H3, P } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router";

export const RouteErrorBoundary = () => {
  const navigate = useNavigate();

  return (
    <div className="overflow-hidden flex min-h-screen items-center justify-center bg-primary/10 px-4">
      <Card className="w-full max-w-xl rounded-2xl bg-white py-0 shadow-sm">
        <CardHeader className="border-b px-6 py-6">
          <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-destructive/10 text-destructive">
            <AlertTriangle className="size-5" />
          </div>
          <P className="text-sm font-semibold uppercase tracking-[0.2em] text-destructive">
            Something went wrong
          </P>
          <CardTitle>
            <H3 className="text-3xl">This route failed to load</H3>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6 px-6 py-6">
          <P className="text-base text-stone-600">
            We could not open this page right now. Please try again or go back
            to another page.
          </P>

          <div className="flex flex-wrap gap-3">
            <Button onClick={() => window.location.reload()}>Try again</Button>
            <Button
              variant="outline"
              onClick={() => navigate(paths.app.home.getHref())}
            >
              Go to dashboard
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate(paths.landing.getHref())}
            >
              Go to landing page
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
