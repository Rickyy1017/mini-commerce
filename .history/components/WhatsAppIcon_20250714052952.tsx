"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const shakeVariants = {
  shake: {
    y: [-5, -10, 20, -10, 20, -5],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut" as any,
    },
  },
};

export default function WhatsAppIcon() {
  const whatsappLink = "https://wa.link/5er8n1";

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition cursor-pointer"
      aria-label="Chat on WhatsApp"
      animate="shake"
    >
      <FaWhatsapp size={24} />
    </motion.a>
  );
}
