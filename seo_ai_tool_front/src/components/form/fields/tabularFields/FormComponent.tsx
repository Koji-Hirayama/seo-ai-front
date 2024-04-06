import { useForm, useFieldArray } from "react-hook-form";

export const FormComponent = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      emails: [{ email: "" }],
    },
  });
  const { fields, insert, append, remove, replace } = useFieldArray({
    name: "emails",
    control,
  });

  const onSubmit = (data: any) => {
    const { emails } = data;
    console.log(emails);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="text-textColor3">
        {fields.map((field, index) => (
          <>
            <input
              key={field.id}
              type="email"
              {...register(`emails.${index}.email`)}
            />
            <button type="button" onClick={() => remove(index)}>
              remove
            </button>
          </>
        ))}
      </div>
      <button type="button" onClick={() => append({ email: "" })}>
        add
      </button>
      <button
        type="button"
        onClick={() => {
          replace([{ email: "new email" }]);
        }}
      >
        replace
      </button>
      <button type="button" onClick={() => insert(0, { email: "" })}>
        insert
      </button>
      <button type="submit">submit</button>
    </form>
  );
};
