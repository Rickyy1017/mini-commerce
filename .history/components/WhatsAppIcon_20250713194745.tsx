'use client';

import { FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

export default function WhatsAppIcon() {
  const whatsappLink = 'https://wa.link/5er8n1';

  const shakeAnimation = {
    y: [0, -5, 5, -5, 5, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      repeatDelay: 1.4,
      ease: 'easeInOut',
    },
  };

