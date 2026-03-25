import { AuthLayout } from "@/components/layouts/AuthLayout";
import { RegisterForm } from "@/features/auth/components/RegisterForm";
import { useNavigate, useSearchParams } from "react-router";

export const RegisterRoute = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo");

  return (
    <>
      <AuthLayout title="Register your account | Shortivo">
        <RegisterForm
          onSuccess={() => {}}
          navigateTo={(path: string) => {
            navigate(path);
          }}
        />
      </AuthLayout>
    </>
  );
};
