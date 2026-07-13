"use client";

import { useActionState, useId, useState } from "react";
import { login } from "@/app/actions/auth";

export default function LoginForm() {
  const [showPass, setShowPass] = useState(false);
  const [state, formAction, pending] = useActionState(login, undefined);

  const emailId = useId();
  const passwordId = useId();
  const errorId = useId();
  const rememberId = useId();

  const emailInvalid = Boolean(state?.errors?.email);
  const passwordInvalid = Boolean(state?.errors?.password);

  return (
    <form
      action={formAction}
      className="flex flex-col gap-4 animate-[rise_400ms_var(--ease-out-strong)_100ms_both]"
    >
      <div className="flex flex-col gap-[7px]">
        <label htmlFor={emailId} className="text-[13px] font-extrabold text-wv-navy">
          Correo electrónico
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="carla@sanborjavet.pe"
          autoComplete="email"
          aria-invalid={emailInvalid}
          aria-describedby={emailInvalid ? errorId : undefined}
          className={`w-full h-[50px] rounded-field border-[1.5px] bg-white px-[15px] text-[15px] font-semibold text-wv-navy outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-wv-faint focus-visible:border-wv-teal focus-visible:shadow-focus ${
            emailInvalid ? "border-danger-border" : "border-wv-btn-border"
          }`}
        />
        {state?.errors?.email?.map((error) => (
          <div key={error} className="text-[12.5px] font-semibold text-danger">
            {error}
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-[7px]">
        <div className="flex items-baseline justify-between">
          <label htmlFor={passwordId} className="text-[13px] font-extrabold text-wv-navy">
            Contraseña
          </label>
          <span
            aria-disabled="true"
            title="Próximamente"
            className="cursor-not-allowed text-[13px] font-bold text-wv-faint"
          >
            ¿La olvidaste?
          </span>
        </div>
        <div className="relative">
          <input
            id={passwordId}
            name="password"
            type={showPass ? "text" : "password"}
            placeholder="••••••••"
            autoComplete="current-password"
            aria-invalid={passwordInvalid}
            aria-describedby={passwordInvalid ? errorId : undefined}
            className={`w-full h-[50px] rounded-field border-[1.5px] bg-white pl-[15px] pr-[52px] text-[15px] font-semibold text-wv-navy outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-wv-faint focus-visible:border-wv-teal focus-visible:shadow-focus ${
              passwordInvalid ? "border-danger-border" : "border-wv-btn-border"
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

      <label
        htmlFor={rememberId}
        className="flex items-center gap-[9px] cursor-pointer select-none"
      >
        <input
          id={rememberId}
          name="remember"
          type="checkbox"
          defaultChecked
          className="h-4 w-4 accent-wv-teal"
        />
        <span className="text-[13.5px] font-semibold text-wv-muted">
          Mantener sesión iniciada
        </span>
      </label>

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
        className="mt-0.5 h-[52px] w-full flex items-center justify-center gap-2.5 rounded-[11px] bg-wv-teal text-[15.5px] font-extrabold text-white shadow-[0_8px_22px_rgba(14,140,111,0.26)] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus active:scale-[0.97] disabled:cursor-not-allowed"
      >
        {pending && (
          <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-[spin_500ms_linear_infinite]" />
        )}
        {pending ? "Verificando…" : "Entrar al panel"}
      </button>
    </form>
  );
}
