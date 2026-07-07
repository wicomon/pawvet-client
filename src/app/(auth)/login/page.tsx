import LoginForm from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="animate-[rise_400ms_var(--ease-out-strong)_both]">
        <h1 className="font-display text-[26px] font-bold text-ink m-0 mb-1.5">
          Hola de nuevo
        </h1>
        <div className="text-sm text-muted font-medium mb-7">
          Accede a tus cursos y entregas.
        </div>
      </div>

      <LoginForm />
    </>
  );
}
