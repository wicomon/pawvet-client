type SubmitButtonProps = {
  label: string;
  pendingLabel: string;
  pending: boolean;
};

// Shared submit button styling, lifted from src/components/auth/LoginForm.tsx
// (same spinner + disabled-state treatment) so every Formik form in the app
// looks and behaves consistently.
export default function SubmitButton({ label, pendingLabel, pending }: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending}
      className="flex h-11.5 w-full items-center justify-center gap-2.5 rounded-[11px] bg-wv-teal text-[14.5px] font-extrabold text-white outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 hover:cursor-pointer"
    >
      {pending && (
        <span className="h-4 w-4 animate-[spin_500ms_linear_infinite] rounded-full border-2 border-white/40 border-t-white" />
      )}
      {pending ? pendingLabel : label}
    </button>
  );
}
