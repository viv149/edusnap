
import React from 'react';
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
      <div className="container flex justify-between items-center py-3 px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-ignou-purple" />
          <span className="font-bold text-lg md:text-xl">EduSnap</span>
        </div>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#notices" className="text-gray-600 hover:text-ignou-purple">Notices</a>
          <a href="#assignment" className="text-gray-600 hover:text-ignou-purple">Assignment Help</a>
          <a href="#links" className="text-gray-600 hover:text-ignou-purple">Important Links</a>
          <a href="#contact" className="text-gray-600 hover:text-ignou-purple">Contact</a>
          <Button variant="outline" className="border-ignou-purple text-ignou-purple hover:bg-ignou-purple hover:text-white">
            WhatsApp Support
          </Button>
        </nav>
        
        {/* Mobile Menu Button */}
        <button 
          onClick={toggleMobileMenu}
          className="md:hidden p-2"
          aria-label="Toggle menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      
      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <nav className="md:hidden bg-white border-t px-4 py-2 animate-fade-in">
          <div className="flex flex-col space-y-3 py-2">
            <a href="#notices" className="text-gray-600 hover:text-ignou-purple py-2 border-b">Notices</a>
            <a href="#assignment" className="text-gray-600 hover:text-ignou-purple py-2 border-b">Assignment Help</a>
            <a href="#links" className="text-gray-600 hover:text-ignou-purple py-2 border-b">Important Links</a>
            <a href="#contact" className="text-gray-600 hover:text-ignou-purple py-2 border-b">Contact</a>
            <Button variant="outline" className="border-ignou-purple text-ignou-purple hover:bg-ignou-purple hover:text-white">
              WhatsApp Support
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
