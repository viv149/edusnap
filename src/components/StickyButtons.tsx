
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowUp } from "lucide-react";

const StickyButtons = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Function to handle WhatsApp contact
  const contactWhatsApp = () => {
    const message = "Hi, I need help with my IGNOU assignment for [Subject]";
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Function to scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Show button when page is scrolled down
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <>
      {/* WhatsApp Button */}
      <Button 
        onClick={contactWhatsApp}
        className="sticky-whatsapp bg-[#25D366] hover:bg-[#128C7E]"
        size="icon"
        aria-label="Contact us on WhatsApp"
      >
        <MessageSquare className="h-6 w-6 text-white" />
      </Button>

      {/* Scroll to Top Button */}
      <Button
        onClick={scrollToTop}
        className={`scroll-to-top ${isVisible ? 'visible' : ''}`}
        size="icon"
        aria-label="Scroll to top"
      >
        <ArrowUp className="h-6 w-6" />
      </Button>
    </>
  );
};

export default StickyButtons;
