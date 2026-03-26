import { MessageCircle } from "lucide-react";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/254721521009?text=Hello%2C%20I%20would%20like%20to%20book%20a%20service%20with%20Track%20%26%20Trace%20Adventures."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-[hsl(142,70%,40%)] hover:bg-[hsl(142,70%,35%)] text-white rounded-full p-4 shadow-2xl transition-transform hover:scale-110"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
};

export default WhatsAppButton;
