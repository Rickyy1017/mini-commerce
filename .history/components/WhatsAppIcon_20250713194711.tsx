'use client';

import { FiMessageSquare } from 'react-icons/fi';

export default function WhatsAppIcon() {
  const whatsappLink = 'https://wa.link/5er8n1';

  return (
    <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-6 z-50 bg-green-500 text-white rounded-full p-4 shadow-lg hover:bg-green-600 transition cursor-pointer"
      aria-label="Chat on WhatsApp"
