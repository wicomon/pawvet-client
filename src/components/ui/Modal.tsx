"use client";

import { useEffect, useRef } from "react";

type ModalProps = {
  title: string;
  titleId: string;
  onClose: () => void;
  children: React.ReactNode;
};

// Shared dialog primitive (originally menus-only, promoted here once /roles
// needed a second modal instance — `titleId` moved from a hardcoded constant
// to a prop so two modals can be mounted without colliding aria-labelledby
// ids). Scrim is a strong bg-wv-navy-deep/50 so the dialog reads clearly
// above it (per ui-ux-pro-max "scrim-legibility"). Handles: Esc to close,
// focus moved to the dialog on open, focus returned to the trigger element
// on close, and role="dialog"/aria-modal so screen readers announce it
// correctly.
export default function Modal({ title, titleId, onClose, children }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    dialogRef.current?.querySelector<HTMLElement>("input, select, textarea, button")?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        aria-hidden="true"
        onClick={onClose}
        className="absolute inset-0 bg-wv-navy-deep/50"
      />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative flex max-h-[90vh] w-full max-w-[520px] flex-col gap-5 overflow-y-auto rounded-card bg-card p-6 shadow-card animate-[rise_250ms_var(--ease-out-strong)_both]"
      >
        <div className="flex items-center justify-between gap-3">
          <h2 id={titleId} className="font-heading text-[18px] font-bold text-wv-navy">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Cerrar"
            className="grid h-9 w-9 shrink-0 cursor-pointer place-items-center rounded-[10px] text-wv-muted outline-none transition-colors duration-150 ease-out hover:bg-wv-mint-soft focus-visible:shadow-focus"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
