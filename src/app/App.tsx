import { AuthLayout } from "@/components/layouts/AuthLayout";
import { H1 } from "@/components/ui/typography";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const App = () => {
  return (
    <>
      <AuthLayout title="Create a new account | Shortivo">
        <RegisterForm />
      </AuthLayout>
    </>
  );
};
