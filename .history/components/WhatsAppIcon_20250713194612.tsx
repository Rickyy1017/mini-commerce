'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppIcon() {
  const whatsappLink = 'https://wa.link/5er8n1';

  const shakeAnimation = {
    y: [0, -10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "easeInOut",
    },
  };

  return (
    <motion.a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
}
