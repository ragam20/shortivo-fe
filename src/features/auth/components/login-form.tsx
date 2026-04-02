import { Form, FormField, PasswordFormField } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { H3, P } from "@/components/ui/typography";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import googleICPath from "@/assets/ic_google_color.svg";
import { useContext, useState } from "react";
import { paths } from "@/config/paths";
import { AuthContext } from "@/lib/auth-context";

const schema = z.object({
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: z.string().nonempty("Password is required"),
});

type LoginFormValues = z.infer<typeof schema>;

type LoginForm = {
  onSuccess: () => void;
  navigateTo: (path: string) => void;
};

export const LoginForm = ({ onSuccess, navigateTo }: LoginForm) => {
  const [showPassword, setShowPassword] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const ctx = useContext(AuthContext);

  const onSubmit = async (data: LoginFormValues) => {
    if (!ctx) {
      setErrMessage("Authentication is not available.");
      return;
    }

    setErrMessage(null);
    try {
      await ctx.login(data);
      onSuccess();
    } catch (err: any) {
      setErrMessage(err.message);
    }
  };

  return (
    <>
      <div>
        <div>
          <H3 className="text-center xl:text-left">
            Access your account and share now
          </H3>
          <P className="text-center text-sm xl:text-left mt-1">
            Don't have account?{" "}
            <span
              className="text-blue-400 cursor-pointer"
              onClick={() => {
                navigateTo(paths.auth.register.path);
              }}
            >
              Sign up
            </span>
          </P>
        </div>

        <div className="my-10">
          <Button
            variant={"outline"}
            className="border w-full py-5 flex gap-1"
            disabled={ctx?.isAuthActionLoading}
          >
            <img src={googleICPath} className="size-4" />
            Google
          </Button>
          <div className="flex items-center gap-4 my-4 w-full mt-8">
            <div className="flex-1 border-t-2 border-muted" />
            <span className="text-xs text-muted-foreground font-medium">
              OR
            </span>
            <div className="flex-1 border-t-2 border-muted" />
          </div>
        </div>

        {errMessage && <p className="text-red-500 my-9 ">{errMessage}</p>}

        <Form
          id="login-form"
          className="my-10"
          schema={schema}
          onSubmit={onSubmit}
        >
          {({ register, errors }) => (
            <>
              <FormField label="Email" error={errors.email}>
                <Input
                  type="email"
                  className="border focus-visible:ring-primary/10 outline-none p-5 w-full"
                  {...register("email")}
                />
              </FormField>

              <PasswordFormField
                label="Password"
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  className="border focus-visible:ring-primary/10 outline-none p-5 w-full"
                  {...register("password")}
                />
              </PasswordFormField>
            </>
          )}
        </Form>
        <Button
          type="submit"
          form="login-form"
          className="my-4 w-full py-5"
          disabled={ctx?.isAuthActionLoading}
        >
          Sign In
        </Button>
      </div>
    </>
  );
};
