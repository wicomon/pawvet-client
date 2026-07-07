"use client";

import { useActionState, useId, useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [state, formAction, pending] = useActionState(login, undefined);

  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();

  const emailInvalid = Boolean(state?.errors?.email);
  const passwordInvalid = Boolean(state?.errors?.password);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 animate-[rise_400ms_var(--ease-out-strong)_100ms_both]"
    >
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={emailId} className="text-[12.5px] font-bold text-label">
          Correo institucional
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="nombre@escuela.edu"
          autoComplete="email"
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? errorId : undefined}
          className={`w-full h-12 rounded-field border-[1.5px] bg-field px-4 text-[14.5px] text-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-placeholder focus-visible:border-brand focus-visible:shadow-focus focus-visible:bg-card ${
            emailInvalid ? "border-danger-border" : "border-subtle"
          }`}
        />
        {state?.errors?.email?.map((error) => (
          <div key={error} className="text-[12.5px] font-semibold text-danger">
            {error}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[7px]">
        <label
          htmlFor={passwordId}
          className="text-[12.5px] font-bold text-label"
        >
          Contraseña
        </label>
        <div className="relative">
          <input
            id={passwordId}
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={passwordInvalid}
            aria-describedby={passwordInvalid ? errorId : undefined}
            className={`w-full h-12 rounded-field border-[1.5px] bg-field pl-4 pr-[52px] text-[14.5px] text-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-placeholder focus-visible:border-brand focus-visible:shadow-focus focus-visible:bg-card ${
              passwordInvalid ? "border-danger-border" : "border-subtle"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={showPass}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-9 rounded-[10px] flex items-center justify-center cursor-pointer text-muted text-xs font-bold transition-[background-color,transform] duration-150 active:scale-[0.93] hover:bg-track"
          >
            {showPass ? "Ocultar" : "Ver"}
          </button>
        </div>
        {state?.errors?.password?.map((error) => (
          <div key={error} className="text-[12.5px] font-semibold text-danger">
            {error}
          </div>
        ))}
      </div>

      {state?.message && (
        <div
          id={errorId}
          role="alert"
          className="text-[13px] font-semibold text-danger bg-danger-bg rounded-xl px-3.5 py-2.5"
        >
          {state.message}
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="h-[50px] rounded-field border-none text-on-brand font-display font-bold text-[15px] cursor-pointer flex items-center justify-center gap-2.5 mt-1 transition-[transform,background-color] duration-200 active:scale-[0.97] disabled:cursor-not-allowed bg-brand hover:bg-brand-hover"
      >
        {pending && (
          <span className="w-4 h-4 rounded-full border-2 border-on-brand-line border-t-on-brand animate-[spin_500ms_linear_infinite]" />
        )}
        {pending ? "Verificando…" : "Entrar"}
      </button>
    </form>
  );
}
