import { useField } from "formik";

type SelectFieldProps = {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
};

// Reusable Formik <select>. Same accessible pattern as TextField — unlike
// the bfa-front CustomSelectInput, this never emits a hardcoded disabled
// "Seleccionar" placeholder with value={0} (a magic number that risked
// colliding with a real option id); an empty string default plus Yup's
// `.required()` handles that instead.
export default function SelectField({ label, name, options, required }: SelectFieldProps) {
  const [field, meta] = useField(name);
  const invalid = Boolean(meta.touched && meta.error);
  const fieldId = `menu-field-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div className="flex flex-col gap-1.75">
      <label htmlFor={fieldId} className="text-[13px] font-extrabold text-wv-navy">
        {label} {required && <span className="text-danger">*</span>}
      </label>
      <select
        {...field}
        id={fieldId}
        aria-invalid={invalid}
        aria-describedby={invalid ? errorId : undefined}
        className={`h-11.5 w-full rounded-field border-[1.5px] bg-white px-3.75 text-[14.5px] font-semibold text-wv-navy outline-none transition-[border-color,box-shadow] duration-200 focus-visible:border-wv-teal focus-visible:shadow-focus ${
          invalid ? "border-danger-border" : "border-wv-btn-border"
        }`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {invalid && (
        <div id={errorId} role="alert" className="text-[12.5px] font-semibold text-danger">
          {meta.error}
        </div>
      )}
    </div>
  );
}
