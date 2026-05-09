import { AuthLayout } from "@/components/layouts/auth-layout";
import { paths } from "@/config/paths";
import { RegisterForm } from "@/features/auth/components/register-form";
import { trackEvent } from "@/lib/analytics";
import { useNavigate, useSearchParams } from "react-router";

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <>
      <AuthLayout title="Register your account | Shortivo">
        <RegisterForm
          onSuccess={() => {
            trackEvent("sign_up", {
              method: "email",
              source: "register_form",
              redirect_to: redirectTo || paths.app.root.path,
            });
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
