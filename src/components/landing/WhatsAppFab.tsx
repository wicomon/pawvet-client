import WhatsAppIcon from "@/assets/icons/WhatsAppIcon";
import { whatsappUrl } from "./content";

export default function WhatsAppFab() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Habla con ventas por WhatsApp"
      className="fixed bottom-6 right-6 z-[60] grid h-14.5 w-14.5 place-items-center rounded-full bg-wv-mint text-[#06231B] shadow-[0_10px_28px_rgba(23,190,154,0.4)] outline-none transition-[background-color,transform] duration-150 ease-out hover:bg-wv-mint-bright focus-visible:shadow-focus active:scale-[0.97]"
    >
      <WhatsAppIcon className="h-8 w-8 fill-current" />
      <span className="sr-only">WhatsApp</span>
    </a>
  );
}
