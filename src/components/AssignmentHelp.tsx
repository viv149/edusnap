
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Check, FileText, MessagesSquare, FileCheck, PencilRuler, Clock } from "lucide-react";

const AssignmentHelp = () => {
  // Function to open WhatsApp with a template message
  const contactForHelp = () => {
    const message = "Hi, I need help with my IGNOU assignment for [Subject]";
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(message)}`, '_blank');
  };

  // Assignment help features
  const features = [
    {
      icon: <FileCheck className="h-10 w-10 text-ignou-purple" />,
      title: "Handwritten Assignments",
      description: "Get high-quality handwritten assignments as per IGNOU guidelines."
    },
    {
      icon: <PencilRuler className="h-10 w-10 text-ignou-purple" />,
      title: "All Programs Covered",
      description: "We provide help for all IGNOU programs and courses."
    },
    {
      icon: <Clock className="h-10 w-10 text-ignou-purple" />,
      title: "Quick Turnaround",
      description: "Get your assignments completed within 3-5 days."
    },
    {
      icon: <MessagesSquare className="h-10 w-10 text-ignou-purple" />,
      title: "24/7 WhatsApp Support",
      description: "Get a response within hours of your WhatsApp query."
    }
  ];

  // Steps to get assignment help
  const steps = [
    {
      number: 1,
      title: "Contact Us via WhatsApp",
      description: "Send us your assignment requirements through WhatsApp."
    },
    {
      number: 2,
      title: "Get a Quote",
      description: "We will provide you with a quote based on your requirements."
    },
    {
      number: 3,
      title: "Make Payment",
      description: "Make payment through UPI, bank transfer, or other available methods."
    },
    {
      number: 4,
      title: "Receive Your Assignment",
      description: "Get your handwritten assignment within the agreed timeframe."
    }
  ];

  // Sample handwritten assignment images - Using more appropriate images
  const sampleImages = [
    {
      src: "/assets/images/notes-1.jpg",
      alt: "Handwritten Assignment Sample 1"
    },
    {
      src: "/assets/images/notes-2.jpg",
      alt: "Handwritten Assignment Sample 2"
    },
    {
      src: "/assets/images/notes-3.jpg",
      alt: "Handwritten Assignment Sample 3"
    }
  ];

  return (
    <section id="assignment" className="page-section bg-gradient-to-br from-ignou-light to-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <span className="inline-block bg-ignou-purple text-white px-4 py-1 rounded-full text-sm font-medium mb-2">Our Specialty</span>
          <h2 className="text-3xl font-bold text-ignou-dark mb-2">Professional Assignment Help</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get expert help with your IGNOU assignments. We provide handwritten assignments for all programs and courses that follow IGNOU guidelines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 hover-scale">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Handwritten Assignment Samples */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">Sample Handwritten Assignments</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {sampleImages.map((image, index) => (
              <div key={index} className="rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                <img 
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 bg-white">
                  <p className="font-medium text-center text-ignou-dark">Sample {index + 1}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 md:p-10 mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">How to Get Assignment Help</h3>
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step) => (
              <div key={step.number} className="relative">
                <div className="flex flex-col items-center">
                  <div className="bg-ignou-purple text-white rounded-full w-12 h-12 flex items-center justify-center font-bold mb-4 text-xl">
                    {step.number}
                  </div>
                  <h4 className="text-lg font-medium mb-2 text-center">{step.title}</h4>
                  <p className="text-gray-600 text-center">{step.description}</p>
                </div>
                {step.number < steps.length && (
                  <div className="hidden md:block absolute top-6 left-full w-full h-0.5 bg-ignou-purple transform -translate-x-1/2" style={{width: '50%'}}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-ignou-purple rounded-lg shadow-lg p-6 md:p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-10 md:w-2/3">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Ready to Get Your Assignment Done?</h3>
              <p className="mb-4 text-white/80">
                Contact us on WhatsApp for quick and reliable assignment help. We'll get back to you within hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button onClick={contactForHelp} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                  <MessagesSquare className="mr-2 h-5 w-5" />
                  Contact on WhatsApp
                </Button>
                <Button variant="outline" asChild className="border-white text-ignou-dark bg-white hover:bg-gray-100">
                  <a href="#contact" className="flex items-center">
                    <FileText className="mr-2 h-5 w-5" />
                    Learn More
                  </a>
                </Button>
              </div>
            </div>
            <img 
              src="/assets/images/notes.jpg" 
              alt="Assignment Help" 
              className="rounded-lg shadow-md w-full md:w-1/3 object-cover" 
              style={{ aspectRatio: "3/2" }}
            />
          </div>
        </div>

        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <Check className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                All our assignments are checked for plagiarism and follow IGNOU guidelines for maximum marks.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AssignmentHelp;
