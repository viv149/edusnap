
import React from 'react';
import { GraduationCap, Facebook, Twitter, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-ignou-dark text-white">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <GraduationCap className="h-6 w-6 text-white mr-2" />
              <span className="font-bold text-lg">IGNOU Help Hub</span>
            </div>
            <p className="text-gray-300 mb-4">
              A one-stop portal for IGNOU students to access notices, find official links, and get assignment help.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-300 hover:text-white">Home</a></li>
              <li><a href="#notices" className="text-gray-300 hover:text-white">Notices & Updates</a></li>
              <li><a href="#assignment" className="text-gray-300 hover:text-white">Assignment Help</a></li>
              <li><a href="#links" className="text-gray-300 hover:text-white">Important Links</a></li>
              <li><a href="#contact" className="text-gray-300 hover:text-white">Contact Us</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">IGNOU Resources</h3>
            <ul className="space-y-2">
              <li><a href="https://ignou.ac.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Official Website</a></li>
              <li><a href="http://egyankosh.ac.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">eGyankosh</a></li>
              <li><a href="https://exam.ignou.ac.in/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Exam Registration</a></li>
              <li><a href="https://ignou.ac.in/ignou/studentzone/results/1" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Results Portal</a></li>
              <li><a href="https://ignou.ac.in/ignou/aboutignou/regional/website" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white">Regional Centers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-gray-300">WhatsApp: +91 98765 43210</li>
              <li className="text-gray-300">Email: support@ignouhelphub.com</li>
              <li className="text-gray-300">Hours: 9 AM - 6 PM (Mon-Sat)</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {currentYear} IGNOU Help Hub. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Disclaimer: This is not an official IGNOU website. We provide assistance and resources for IGNOU students.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
