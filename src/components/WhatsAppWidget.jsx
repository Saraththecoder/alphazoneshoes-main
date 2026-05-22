import React from 'react';
import { PiWhatsappLogo } from 'react-icons/pi';
import './WhatsAppWidget.css';

const WhatsAppWidget = () => {
  return (
    <a 
      href="https://wa.me/919999999999" 
      target="_blank" 
      rel="noopener noreferrer" 
      className="whatsapp-widget"
      aria-label="Chat with us on WhatsApp"
    >
      <PiWhatsappLogo size={32} weight="fill" />
    </a>
  );
};

export default WhatsAppWidget;
