import React from "react";
import { FieldValues, FormProvider, UseFormReturn } from "react-hook-form";
import Modal from "../modals/Modal";

type FormModalProps<TFormData extends FieldValues> = {
  children: React.ReactNode;
  title: string;
  useFormMethods: UseFormReturn<TFormData>;
  onSubmit: (data: TFormData) => void;
  isOpen: boolean;
  onClose: () => void;
  isCloseButton?: boolean;
  width?: string;
};
const FormModal = <TFormData extends FieldValues>({
  children,
  title,
  useFormMethods,
  onSubmit,
  isOpen,
  onClose,
  isCloseButton = false,
  width = "50%",
}: FormModalProps<TFormData>) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isCloseButton={isCloseButton}
      width={width}
    >
      <p className="text-center text-[16px] font-medium text-textColor3">
        {title}
      </p>
      <FormProvider {...useFormMethods}>
        <form
          className="mt-5 grid grid-cols-1 gap-8"
          onSubmit={useFormMethods.handleSubmit(onSubmit)}
        >
          {children}
        </form>
      </FormProvider>
    </Modal>
  );
};

export default FormModal;
