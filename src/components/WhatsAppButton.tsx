import WhatsAppIcon from "@/components/WhatsAppIcon";

const WhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/254721521009?text=Hello%2C%20I%20would%20like%20to%20book%20a%20service%20with%20Track%20%26%20Trace%20Adventures."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 bg-white rounded-full p-3.5 shadow-2xl border border-[#25D366]/30 transition-transform hover:scale-110 hover:shadow-[#25D366]/25"
      aria-label="Chat with us on WhatsApp"
    >
      <WhatsAppIcon className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
