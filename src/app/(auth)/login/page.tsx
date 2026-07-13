import Link from "next/link";
import type { Metadata } from "next";
import AuthModeTabs from "@/components/auth/AuthModeTabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { authCopy, type AuthMode } from "@/components/auth/content";

export const metadata: Metadata = {
  title: "Acceso — WicoVet",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>;
}) {
  const { mode: rawMode } = await searchParams;
  const mode: AuthMode = rawMode === "register" ? "register" : "login";
  const copy = authCopy(mode);

  return (
    <>
      <AuthModeTabs mode={mode} />

      <div className="flex flex-col gap-1.5 animate-[rise_400ms_var(--ease-out-strong)_both]">
        <h1 className="font-heading text-[27px] font-extrabold text-wv-navy m-0">
          {copy.headline}
        </h1>
        <p className="m-0 text-[14.5px] font-semibold text-wv-muted-2">
          {copy.subhead}
        </p>
      </div>

      {mode === "login" ? <LoginForm /> : <RegisterForm />}

      <p className="m-0 text-center text-[13.5px] font-semibold text-wv-muted-2">
        {copy.footerPrompt}{" "}
        <Link
          href={mode === "login" ? "/login?mode=register" : "/login"}
          className="font-extrabold text-wv-teal outline-none focus-visible:shadow-focus hover:text-wv-teal-hover"
        >
          {copy.footerAction}
        </Link>
      </p>
    </>
  );
}
