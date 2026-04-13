import {
  FormProvider,
  useForm,
  type FieldError,
  type FieldErrors,
  type FieldValues,
  type FormState,
  type SubmitHandler,
  type UseFormRegister,
  type UseFormWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "../label";
import { Small } from "../typography";
import type { ZodType, z } from "zod";
import type React from "react";
import { cloneElement, isValidElement, type ReactElement } from "react";
import { cn } from "@/lib/utils";
import { EyeOffIcon, EyeIcon as EyeIC } from "lucide-react";

type FormProps<TFormValues extends FieldValues, Schema> = {
  schema: Schema;
  onSubmit: SubmitHandler<TFormValues>;
  children: (props: {
    register: UseFormRegister<TFormValues>;
    errors: FieldErrors<TFormValues>;
    watch: UseFormWatch<TFormValues>;
    state: FormState<TFormValues>;
  }) => React.ReactNode;
  id?: string;
  className?: string;
};

export const Form = <
  Schema extends ZodType<any, any, any>,
  TFormValues extends FieldValues = z.infer<Schema>,
>({
  schema,
  onSubmit,
  children,
  id,
  className,
}: FormProps<TFormValues, Schema>) => {
  const methods = useForm<TFormValues>({
    resolver: zodResolver(schema),
    criteriaMode: "all",
    mode: "onBlur",
  });

  return (
    <FormProvider {...methods}>
      <form
        id={id}
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {children({
          register: methods.register,
          errors: methods.formState.errors,
          watch: methods.watch,
          state: methods.formState,
        })}
      </form>
    </FormProvider>
  );
};

type FormFieldChild = ReactElement<{
  className?: string;
  "aria-invalid"?: "true" | "false";
}>;

type FormFieldProps = {
  label: string;
  error?: FieldError;
  children: FormFieldChild | React.ReactNode;
};

export function FormField({ label, error, children }: FormFieldProps) {
  const child = isValidElement<{ className?: string; "aria-invalid"?: string }>(
    children,
  )
    ? cloneElement(children as FormFieldChild, {
        "aria-invalid": error ? "true" : "false",
        className: cn(
          (children as FormFieldChild).props.className,
          error && "border-red-500 focus-visible:ring-red-200",
        ),
      })
    : children;

  return (
    <div className="my-4">
      <Label className="block text-md font-medium my-2">{label}</Label>
      {child}
      {error?.message && (
        <Small className="text-red-600 mt-1">{error.message}</Small>
      )}
    </div>
  );
}

type PasswordFormFieldProps = {
  label: string;
  error?: FieldError;
  children: FormFieldChild | React.ReactNode;
  showPassword: boolean;
  setShowPassword: (state: boolean) => void;
};

export function PasswordFormField({
  label,
  error,
  children,
  showPassword,
  setShowPassword,
}: PasswordFormFieldProps) {
  const child = isValidElement<{ className?: string; "aria-invalid"?: string }>(
    children,
  )
    ? cloneElement(children as FormFieldChild, {
        "aria-invalid": error ? "true" : "false",
        className: cn(
          (children as FormFieldChild).props.className,
          error && "border-red-500 focus-visible:ring-red-200",
        ),
      })
    : children;

  return (
    <div className="my-4">
      <div className="flex w-full items-center justify-between">
        <Label className="block text-md font-medium my-2">{label}</Label>
        <div
          onClick={() => {
            setShowPassword(!showPassword);
          }}
          className="flex gap-1 cursor-pointer"
        >
          {!showPassword ? (
            <EyeIC className="size-5 " />
          ) : (
            <EyeOffIcon className="size-5" />
          )}

          <Small>show</Small>
        </div>
      </div>
      {child}
    </div>
  );
}
