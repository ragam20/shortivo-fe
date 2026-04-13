import { AuthLayout } from "@/components/layouts/auth-layout";
import { paths } from "@/config/paths";
import { LoginForm } from "@/features/auth/components/login-form";
import { useNavigate, useSearchParams } from "react-router";

export const LoginRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <>
      <AuthLayout title="Log in | Shortivo">
        <LoginForm
          onSuccess={() => {
            navigate(redirectTo || paths.app.root.path, { replace: true });
          }}
          navigateTo={(path: string) => {
            navigate(path);
          }}
        />
      </AuthLayout>
    </>
  );
};
