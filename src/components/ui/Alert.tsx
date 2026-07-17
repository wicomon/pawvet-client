import { CheckCircle2, XCircle } from "lucide-react";
import type { Toast } from "@/types/ui.types";

export type AlertPosition = "top-right" | "top-left" | "bottom-right" | "bottom-left" | "middle-right" | "middle-left";

type AlertProps = {
  kind: Toast["kind"];
  message: string;
  position?: AlertPosition;
};

const POSITION_CLASSES: Record<AlertPosition, string> = {
  "top-right": "top-4 right-4",
  "top-left": "top-4 left-4",
  "middle-right": "top-1/2 right-4 -translate-y-1/2",
  "middle-left": "top-1/2 left-4 -translate-y-1/2",
  "bottom-right": "bottom-4 right-4",
  "bottom-left": "bottom-4 left-4",
};

export default function Alert({ kind, message, position = "middle-right" }: AlertProps) {
  const Icon = kind === "success" ? CheckCircle2 : XCircle;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed z-150 flex w-full max-w-sm items-center gap-2 rounded-xl px-3.5 py-2.5 text-[13px] font-semibold shadow-card animate-[rise_250ms_var(--ease-out-strong)_both] ${POSITION_CLASSES[position]} ${
        kind === "success" ? "bg-wv-mint-soft text-wv-teal-deep" : "bg-danger-bg text-danger"
      }`}
    >
      <Icon aria-hidden="true" className="h-4 w-4 shrink-0" />
      {message}
    </div>
  );
}
