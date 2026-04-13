import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import { paths } from "@/config/paths";
import { useNavigate } from "react-router";

export const NotFoundRoute = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-primary/10 px-4">
      <div className="w-full max-w-xl rounded-2xl bg-white px-8 py-10 text-center shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
          404 Error
        </p>
        <H1 className="mt-3 text-5xl text-stone-900">Page not found</H1>
        <P className="mt-4 text-base text-stone-600">
          The page you are looking for does not exist or may have been moved.
        </P>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => navigate(paths.landing.getHref())}>
            Go to landing page
          </Button>
          <Button
            variant="outline"
            onClick={() => navigate(paths.app.home.getHref())}
          >
            Go to dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};
