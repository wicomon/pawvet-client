import { useField } from "formik";

type TextFieldProps = {
  label: string;
  name: string;
  type?: "text" | "number" | "email";
  placeholder?: string;
  helperText?: string;
  required?: boolean;
};

// Reusable Formik text input. Modeled after the bfa-front CustomTextInput
// (useField + inline error) but styled with this app's wv- tokens and made
// accessible: real <label htmlFor>, aria-invalid/aria-describedby, and the
// error rendered with role="alert" so screen readers announce it.
// Validates on blur (Formik's default), not on every keystroke.
export default function TextField({
  label,
  name,
  type = "text",
  placeholder,
  helperText,
  required,
}: TextFieldProps) {
  const [field, meta] = useField(name);
  const invalid = Boolean(meta.touched && meta.error);
  const fieldId = `menu-field-${name}`;
  const errorId = `${fieldId}-error`;
  const helperId = `${fieldId}-helper`;

  return (
    <div className="flex flex-col gap-[7px]">
      <label htmlFor={fieldId} className="text-[13px] font-extrabold text-wv-navy">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <input
        {...field}
        id={fieldId}
        type={type}
        placeholder={placeholder}
        value={field.value ?? ""}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : helperText ? helperId : undefined}
        className={`h-[46px] w-full rounded-field border-[1.5px] bg-white px-[15px] text-[14.5px] font-semibold text-wv-navy outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-wv-faint focus-visible:border-wv-teal focus-visible:shadow-focus ${
          invalid ? "border-danger-border" : "border-wv-btn-border"
        }`}
      />
      {invalid ? (
        <div id={errorId} role="alert" className="text-[12.5px] font-semibold text-danger">
          {meta.error}
        </div>
      ) : (
        helperText && (
          <div id={helperId} className="text-[12.5px] font-semibold text-wv-faint">
            {helperText}
          </div>
        )
      )}
    </div>
  );
}
