import { paths } from "@/config/paths";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useEffect } from "react";
import { Landing } from "./routes/landing";
import { LoginRoute } from "./routes/auth/login";
import { RegisterRoute } from "./routes/auth/register";
import { AppRoot } from "./root";
import { NotFoundRoute } from "./routes/not-found";
import { HomeRoute } from "./routes/app/home";
import { LinksRoute } from "./routes/app/links";
import { AnalyticsRoute } from "./routes/app/analytics";
import { Toaster } from "@/components/ui/sonner";
import { PricingRoute } from "./routes/pricing";
import { DashboardPerLinkAnalyticsRoute } from "./routes/app/dashboard-perlink-analytics";
import { DashboardPerLinkAnalyticsPreviewRoute } from "./routes/app/dashboard-perlink-analytics-preview";
import { EditLinkRoute } from "./routes/app/edit-link";
import { RouteErrorBoundary } from "./route-error-boundary";
import { ProtectedRoute } from "@/lib/auth-provider";
import { trackPageView } from "@/lib/analytics";

let lastTrackedPagePath: string | null = null;

const trackCurrentPageView = () => {
  const pagePath = `${window.location.pathname}${window.location.search}${window.location.hash}`;

  if (lastTrackedPagePath === pagePath) {
    return;
  }

  lastTrackedPagePath = pagePath;

  window.setTimeout(() => {
    trackPageView({
      page_path: pagePath,
      page_location: `${window.location.origin}${pagePath}`,
      page_title: document.title,
    });
  }, 0);
};

const createAppRouter = createBrowserRouter([
  {
    path: paths.landing.path,
    Component: Landing,
    ErrorBoundary: RouteErrorBoundary,
  },
  {
    path: paths.pricing.path,
    Component: PricingRoute,
    ErrorBoundary: RouteErrorBoundary,
  },
  {
    path: paths.auth.login.path,
    Component: LoginRoute,
    ErrorBoundary: RouteErrorBoundary,
  },
  {
    path: paths.auth.register.path,
    Component: RegisterRoute,
    ErrorBoundary: RouteErrorBoundary,
  },

  {
    path: paths.app.root.path,
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),

    ErrorBoundary: RouteErrorBoundary,

    children: [
      {
        index: true,
        path: "",
        Component: HomeRoute,
        ErrorBoundary: RouteErrorBoundary,
      },
      {
        path: paths.app.links.path,
        Component: LinksRoute,
        ErrorBoundary: RouteErrorBoundary,
      },
      {
        path: paths.app.links.edit.path,
        Component: EditLinkRoute,
        ErrorBoundary: RouteErrorBoundary,
      },
      {
        path: paths.app.analytics.path,
        Component: AnalyticsRoute,
        ErrorBoundary: RouteErrorBoundary,
      },
      {
        path: paths.app.analytics.perlink.paths,
        Component: DashboardPerLinkAnalyticsRoute,
        ErrorBoundary: RouteErrorBoundary,
      },
      {
        path: paths.app.analytics.preview.paths,
        Component: DashboardPerLinkAnalyticsPreviewRoute,
        ErrorBoundary: RouteErrorBoundary,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundRoute,
    ErrorBoundary: RouteErrorBoundary,
  },
]);

export const AppRouter = () => {
  useEffect(() => {
    trackCurrentPageView();

    return createAppRouter.subscribe(trackCurrentPageView);
  }, []);

  return (
    <>
      <RouterProvider router={createAppRouter} />
      <Toaster position="top-right" richColors closeButton />
    </>
  );
};
