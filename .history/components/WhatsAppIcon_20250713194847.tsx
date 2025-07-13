"use client";

import { FaWhatsapp } from "react-icons/fa";
import { motion } from "framer-motion";

export default function WhatsAppIcon() {
  const whatsappLink = "https://wa.link/5er8n1";

  const shakeAnimation = {
    y: [0, 5, 5, 15, 5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 1.4,
      ease: ["easeInOut"],
    },
  };

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition cursor-pointer"
      aria-label="Chat on WhatsApp"
      animate={shakeAnimation}
    >
      <FaWhatsapp size={24} />
    </motion.a>
  );
}
