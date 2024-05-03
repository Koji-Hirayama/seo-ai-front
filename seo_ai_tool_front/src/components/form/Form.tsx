import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";

type FormProps<TFormData extends FieldValues> = {
  children: React.ReactNode;
  useFormMethods: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => void;
};

const Form = <TFormData extends FieldValues>({
  children,
  useFormMethods,
  onSubmit,
}: FormProps<TFormData>) => {
  return (
    <FormProvider {...useFormMethods}>
      <form
        className="grid grid-cols-1 gap-8"
        onSubmit={useFormMethods.handleSubmit(onSubmit)}
      >
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
