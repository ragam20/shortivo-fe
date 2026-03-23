import { AuthLayout } from "@/components/layouts/AuthLayout";
import { LoginForm } from "@/features/auth/components/LoginForm";
import { RegisterForm } from "@/features/auth/components/RegisterForm";

export const App = () => {
  return (
    <>
      <AuthLayout title="Login Account | Shortivo">
        <RegisterForm />
      </AuthLayout>
    </>
  );
};
