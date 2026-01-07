"use client";

import { usePathname } from "next/navigation";
import { MessageCircle } from "lucide-react";

export default function WhatsAppFloat() {
  const pathname = usePathname();
  const phoneNumber = "905326223367"; // WhatsApp formatında
  const message = "Merhaba, ürünleriniz hakkında bilgi almak istiyorum.";

  // Hide on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const handleClick = () => {
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle size={32} />
    </button>
  );
}

