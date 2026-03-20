import { Button } from "@/components/ui/button";
import { Form, FormField } from "@/components/ui/form/form";
import { Input } from "@/components/ui/input";
import { H3, P } from "@/components/ui/typography";
import { z } from "zod";
import googleICPath from "@/assets/ic_google_color.svg";

type RegisterForm = {
  onSuccess: () => void;
};

const schema = z.object({
  username: z.string().min(4, "Username is required"),
  email: z.string().min(1, "Email is required").email("Invalid Email"),
  password: z.string().min(5, "Password is required | at least 5 charachters"),
});

type RegisterFormValues = z.infer<typeof schema>;

export const RegisterForm = () => {
  const onSubmit = (data: RegisterFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <div>
        <H3 className="text-center xl:text-left">
          Get started - create your account
        </H3>
        <P className="text-center text-sm xl:text-left mt-1">
          Already part of us?{" "}
          <span className="text-blue-400 cursor-pointer" onClick={() => {}}>
            Log in
          </span>
        </P>
      </div>

      <div className="my-10">
        <Button variant={"outline"} className="border w-full py-5 flex gap-1">
          <img src={googleICPath} className="size-4" />
          Google
        </Button>
        <div className="flex items-center gap-4 my-4 w-full mt-8">
          <div className="flex-1 border-t-2 border-muted" />
          <span className="text-xs text-muted-foreground font-medium">OR</span>
          <div className="flex-1 border-t-2 border-muted" />
        </div>
      </div>

      <Form id="register-form" schema={schema} onSubmit={onSubmit}>
        {({ register, errors }) => (
          <>
            <FormField label="Username" error={errors.username}>
              <Input
                className="border focus-visible:ring-primary/10 outline-none p-5 w-full"
                {...register("username")}
              />
            </FormField>

            <FormField label="Email" error={errors.email}>
              <Input
                type="email"
                className="border p-5 focus-visible:ring-primary/10 w-full"
                {...register("email")}
              />
            </FormField>

            <FormField label="Password" error={errors.password}>
              <Input
                type="password"
                className="border p-5 focus-visible:ring-primary/10 w-full"
                {...register("password")}
              />
            </FormField>
          </>
        )}
      </Form>
      <Button type="submit" form="register-form" className="my-4 w-full py-5">
        Create account
      </Button>
    </div>
  );
};
