import { Button } from "@/components/ui/button";
import { Form, FormField, PasswordFormField } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { H3, P } from "@/components/ui/typography";
import { z } from "zod";
import googleICPath from "@/assets/ic_google_color.svg";
import { useContext, useState } from "react";
import { paths } from "@/config/paths";
import { AuthContext } from "@/lib/auth-context";
import { env } from "@/config/env";

const passwordRules = [
  {
    label: "Must be at least 5 characters",
    test: (val: string) => val.length >= 5,
  },
  {
    label: "Contains a number",
    test: (val: string) => /[0-9]/.test(val),
  },
  {
    label: "Contains upppercase",
    test: (val: string) => /[A-Z]/.test(val),
  },
];

type PasswordCheck = {
  label: string;
  isValid: boolean;
};

function checkPassword(password: string): PasswordCheck[] {
  return passwordRules.map((rule) => ({
    label: rule.label,
    isValid: rule.test(password),
  }));
}

const passwordSchema = z.string().superRefine((val, ctx) => {
  passwordRules.forEach((rule) => {
    if (!rule.test(val)) {
      ctx.addIssue({
        code: "custom",
        message: rule.label,
      });
    }
  });
});

const schema = z.object({
  username: z.string().min(4, "Username is required"),
  email: z.string().nonempty("Email is required").email("Invalid email"),
  password: passwordSchema,
});

type RegisterFormValues = z.infer<typeof schema>;

type RegisterForm = {
  onSuccess: () => void;
  navigateTo: (path: string) => void;
};

export const RegisterForm = ({ onSuccess, navigateTo }: RegisterForm) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showCheckList, setShowCheckList] = useState(false);
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const ctx = useContext(AuthContext);

  const onSubmit = async (data: RegisterFormValues) => {
    if (!ctx) {
      setErrMessage("Authentication is not available.");
      return;
    }

    setErrMessage(null);

    try {
      await ctx.register(data);
      onSuccess();
    } catch (err: unknown) {
      setErrMessage(
        err instanceof Error ? err.message : "Something went wrong",
      );
    }
  };

  const handleGoogleLogin = () => {
    window.location.assign(`${env.API_URL}/auth/google`);
  };

  return (
    <div>
      <div>
        <H3 className="text-center xl:text-left">
          Get started - create your account
        </H3>
        <P className="text-center text-sm xl:text-left mt-1">
          Already part of us?{" "}
          <span
            className="text-blue-400 cursor-pointer"
            onClick={() => {
              navigateTo(paths.auth.login.path);
            }}
          >
            Log in
          </span>
        </P>
      </div>

      <div className="my-10">
        <Button
          type="button"
          variant={"outline"}
          className="border w-full py-5 flex gap-1"
          disabled={ctx?.isAuthActionLoading}
          onClick={() => {
            handleGoogleLogin();
          }}
        >
          <img src={googleICPath} className="size-4" />
          Google
        </Button>
        <div className="flex items-center gap-4 my-4 w-full mt-8">
          <div className="flex-1 border-t-2 border-muted" />
          <span className="text-xs text-muted-foreground font-medium">OR</span>
          <div className="flex-1 border-t-2 border-muted" />
        </div>
      </div>

      {errMessage && <p className="text-red-500 mb-6">{errMessage}</p>}

      <Form id="register-form" schema={schema} onSubmit={onSubmit}>
        {({ register, errors, watch, state }) => {
          const password = watch("password", "");
          const checks = checkPassword(password);

          return (
            <>
              <FormField label="Username" error={errors.username}>
                <Input {...register("username")} />
              </FormField>

              <FormField label="Email" error={errors.email}>
                <Input type="email" {...register("email")} />
              </FormField>

              <PasswordFormField
                label="Password"
                error={errors.password}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  onFocus={() => setShowCheckList(true)}
                />
              </PasswordFormField>

              {state.touchedFields && showCheckList && (
                <ul className="mt-2 space-y-1">
                  {checks.map((c, i) => (
                    <li
                      key={i}
                      className={
                        c.isValid
                          ? "text-green-500"
                          : errors.password
                            ? "text-red-500"
                            : "text-gray-500"
                      }
                    >
                      {c.isValid ? "✔" : "✖"} {c.label}
                    </li>
                  ))}
                </ul>
              )}
            </>
          );
        }}
      </Form>
      <Button
        type="submit"
        form="register-form"
        className="my-4 w-full py-5"
        disabled={ctx?.isAuthActionLoading}
      >
        Create account
      </Button>
    </div>
  );
};
