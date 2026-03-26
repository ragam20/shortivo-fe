import { paths } from "@/config/paths";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Landing } from "./routes/landing";
import { LoginRoute } from "./routes/auth/login";
import { RegisterRoute } from "./routes/auth/register";
import { ProtectedRoute } from "@/lib/auth-provider";
import { AppRoot } from "./root";
import { NotFoundRoute } from "./routes/not-found";
import { HomeRoute } from "./routes/app/home";
import { LinksRoute } from "./routes/app/links";
import { AnalyticsRoute } from "./routes/app/analytics";

const createAppRouter = createBrowserRouter([
  {
    path: paths.landing.path,
    Component: Landing,
  },
  {
    path: paths.auth.login.path,
    Component: LoginRoute,
  },
  {
    path: paths.auth.register.path,
    Component: RegisterRoute,
  },
  {
    path: paths.app.root.path,
    // element: (
    //   <ProtectedRoute>
    //     <AppRoot />
    //   </ProtectedRoute>
    // ),

    element: <AppRoot />,

    children: [
      {
        index: true,
        path: "",
        Component: HomeRoute,
      },
      {
        path: paths.app.links.path,
        Component: LinksRoute,
      },
      {
        path: paths.app.analytics.path,
        Component: AnalyticsRoute,
      },
    ],
  },
  {
    path: "*",
    Component: NotFoundRoute,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={createAppRouter} />;
};
