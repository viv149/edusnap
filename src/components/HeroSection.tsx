
import React from 'react';
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

const HeroSection = () => {
  // WhatsApp contact function
  const contactWhatsApp = () => {
    const message = "Hi, I need help with my IGNOU assignment for [Subject]";
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <section className="relative bg-ignou-dark text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: "url('/assets/images/hero-img.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: "0.4"
        }}
      ></div>

      {/* Content */}
      <div className="container px-4 py-20 md:py-28 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-6">
            Need Help with IGNOU Assignments? We've Got You Covered!
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-200">
            Professional, timely, and quality assignment services for all IGNOU programs and courses.
          </p>
          <Button 
            onClick={contactWhatsApp}
            className="bg-[#25D366] hover:bg-[#128C7E] text-white text-lg py-6 px-8"
          >
            <MessageSquare className="mr-2 h-6 w-6" />
            Message us on WhatsApp
          </Button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
