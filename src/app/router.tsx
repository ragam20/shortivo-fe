import { paths } from "@/config/paths";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Landing } from "./routes/Landing";
import { LoginRoute } from "./routes/auth/Login";
import { RegisterRoute } from "./routes/auth/Register";
import { ProtectedRoute } from "@/lib/AuthProvider";
import { AppRoot } from "./root";
import { NotFoundRoute } from "./routes/NotFound";

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
    element: (
      <ProtectedRoute>
        <AppRoot />
      </ProtectedRoute>
    ),
    children: [{}],
  },
  {
    path: "*",
    Component: NotFoundRoute,
  },
]);

export const AppRouter = () => {
  return <RouterProvider router={createAppRouter} />;
};
