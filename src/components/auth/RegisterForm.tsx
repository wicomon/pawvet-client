"use client";

import { useId, useState } from "react";

// No authRegister mutation exists on pawvet-server yet (only authLogin) —
// this form is UI-complete but its submit is an inert placeholder until the
// backend adds account creation. Confirmed with the user during planning.
export default function RegisterForm() {
  const [submitted, setSubmitted] = useState(false);
  const firstNameId = useId();
  const lastNameId = useId();
  const clinicId = useId();
  const emailId = useId();
  const passwordId = useId();

  const fieldClass =
    "w-full h-[50px] rounded-field border-[1.5px] border-wv-btn-border bg-white px-[15px] text-[15px] font-semibold text-wv-navy outline-none transition-[border-color,box-shadow] duration-200 placeholder:text-wv-faint focus-visible:border-wv-teal focus-visible:shadow-focus";
  const labelClass = "text-[13px] font-extrabold text-wv-navy";

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSubmitted(true);
      }}
      className="flex flex-col gap-4 animate-[rise_400ms_var(--ease-out-strong)_100ms_both]"
    >
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-[7px]">
          <label htmlFor={firstNameId} className={labelClass}>
            Nombre
          </label>
          <input id={firstNameId} name="firstName" type="text" placeholder="Carla" className={fieldClass} />
        </div>
        <div className="flex flex-col gap-[7px]">
          <label htmlFor={lastNameId} className={labelClass}>
            Apellido
          </label>
          <input id={lastNameId} name="lastName" type="text" placeholder="Vega" className={fieldClass} />
        </div>
      </div>

      <div className="flex flex-col gap-[7px]">
        <label htmlFor={clinicId} className={labelClass}>
          Nombre de tu clínica o pet shop
        </label>
        <input id={clinicId} name="clinicName" type="text" placeholder="San Borja Vet" className={fieldClass} />
      </div>

      <div className="flex flex-col gap-[7px]">
        <label htmlFor={emailId} className={labelClass}>
          Correo electrónico
        </label>
        <input
          id={emailId}
          name="email"
          type="email"
          placeholder="carla@sanborjavet.pe"
          autoComplete="email"
          className={fieldClass}
        />
      </div>

      <div className="flex flex-col gap-[7px]">
        <label htmlFor={passwordId} className={labelClass}>
          Contraseña
        </label>
        <input
          id={passwordId}
          name="password"
          type="password"
          placeholder="Mínimo 8 caracteres"
          autoComplete="new-password"
          className={fieldClass}
        />
      </div>

      {submitted && (
        <div
          role="status"
          className="text-[13px] font-semibold text-wv-teal-deep bg-wv-mint-soft rounded-xl px-3.5 py-2.5"
        >
          El registro estará disponible muy pronto. Por ahora, pídele acceso a tu administrador.
        </div>
      )}

      <button
        type="submit"
        className="mt-0.5 h-[52px] w-full flex items-center justify-center gap-2.5 rounded-[11px] bg-wv-teal text-[15.5px] font-extrabold text-white shadow-[0_8px_22px_rgba(14,140,111,0.26)] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-teal-hover focus-visible:shadow-focus active:scale-[0.97]"
      >
        Crear cuenta gratis
      </button>

      <p className="m-0 text-center text-[12.5px] font-semibold leading-relaxed text-wv-faint">
        Al registrarte aceptas los{" "}
        <span aria-disabled="true" className="cursor-not-allowed font-bold text-wv-faint">
          Términos
        </span>{" "}
        y la{" "}
        <span aria-disabled="true" className="cursor-not-allowed font-bold text-wv-faint">
          Política de privacidad
        </span>
        .
      </p>
    </form>
  );
}
