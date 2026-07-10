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
        <label htmlFor={emailId} className="text-[12.5px] font-bold text-wv-navy">
          Correo institucional
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="nombre@clinica.com"
          autoComplete="email"
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? errorId : undefined}
          className={`w-full h-12 rounded-field border-[1.5px] bg-white px-4 text-[14.5px] text-wv-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-wv-faint focus-visible:border-wv-teal focus-visible:shadow-focus focus-visible:bg-white ${
            emailInvalid ? "border-danger-border" : "border-wv-border"
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
          className="text-[12.5px] font-bold text-wv-navy"
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
            className={`w-full h-12 rounded-field border-[1.5px] bg-white pl-4 pr-[52px] text-[14.5px] text-wv-ink outline-none transition-[border-color,box-shadow,background-color] duration-200 placeholder:text-wv-faint focus-visible:border-wv-teal focus-visible:shadow-focus focus-visible:bg-white ${
              passwordInvalid ? "border-danger-border" : "border-wv-border"
            }`}
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            aria-label={showPass ? "Ocultar contraseña" : "Mostrar contraseña"}
            aria-pressed={showPass}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 w-10 h-9 rounded-[10px] flex items-center justify-center cursor-pointer text-wv-muted text-xs font-bold transition-[background-color,transform] duration-150 active:scale-[0.93] hover:bg-wv-mint-soft"
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
        className="h-[52px] w-full flex items-center justify-center gap-2.5 rounded-xl bg-wv-teal text-base font-extrabold text-white shadow-[0_8px_20px_rgba(14,140,111,0.25)] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus active:scale-[0.97] disabled:cursor-not-allowed mt-1"
      >
        {pending && (
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-[spin_500ms_linear_infinite]" />
        )}
        {pending ? "Verificando…" : "Entrar"}
      </button>
    </form>
  );
}
