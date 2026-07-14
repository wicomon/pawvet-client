import Link from "next/link";
import BrandIcon from "@/components/brand/BrandIcon";
import AuthBrandPanel from "@/components/auth/AuthBrandPanel";
import { BRAND } from "@/components/landing/content";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen items-stretch bg-wv-canvas">
      <AuthBrandPanel />

      <main className="flex flex-1 min-w-0 items-center justify-center px-6 py-10 sm:px-10 lg:px-14">
        <div className="flex w-full max-w-[420px] flex-col gap-[26px]">
          <Link
            href="/"
            className="flex lg:hidden items-center justify-center gap-2.5 rounded-[10px] outline-none focus-visible:shadow-focus"
          >
            <span className="grid h-[34px] w-[34px] place-items-center rounded-xl bg-wv-navy">
              <BrandIcon size={20} tone="verde" />
            </span>
            <span className="font-heading text-xl font-bold text-wv-navy">
              {BRAND}
            </span>
          </Link>

          {children}
        </div>
      </main>
    </div>
  );
}
