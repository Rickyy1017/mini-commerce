"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

const shakeVariants = {
  shake: {
    y: [0, -20, 30, -10, 30, 0],
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
      variants={shakeVariants}
      animate="shake"
    >
      <FaWhatsapp size={24} />
    </motion.a>
  );
}
