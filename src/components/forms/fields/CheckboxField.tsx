import { useField } from "formik";

type CheckboxFieldProps = {
  label: string;
  name: string;
  helperText?: string;
};

// Formik checkbox, same accessible pattern as TextField/SelectField (real
// <label htmlFor>, aria-describedby). Used for the four role permission
// flags (canRead/canCreate/canUpdate/canDelete) in RoleFormFields.
export default function CheckboxField({ label, name, helperText }: CheckboxFieldProps) {
  const [field] = useField({ name, type: "checkbox" });
  const fieldId = `role-field-${name}`;
  const helperId = `${fieldId}-helper`;

  return (
    <label
      htmlFor={fieldId}
      className="flex cursor-pointer items-start gap-2.5 rounded-[10px] border-[1.5px] border-wv-btn-border bg-white px-3.75 py-3 transition-colors duration-150 ease-out hover:bg-wv-mint-soft/40"
    >
      <input
        {...field}
        id={fieldId}
        type="checkbox"
        checked={field.value ?? false}
        aria-describedby={helperText ? helperId : undefined}
        className="mt-0.75 h-4 w-4 shrink-0 accent-wv-teal"
      />
      <span className="flex flex-col gap-0.5">
        <span className="text-[13.5px] font-extrabold text-wv-navy">{label}</span>
        {helperText && (
          <span id={helperId} className="text-[12px] font-semibold text-wv-faint">
            {helperText}
          </span>
        )}
      </span>
    </label>
  );
}
