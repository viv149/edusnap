
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, Mail, Phone, AlertCircle } from "lucide-react";

const ContactSection = () => {
  // WhatsApp contact function
  const contactWhatsApp = () => {
    const message = "Hi, I'd like to inquire about IGNOU services";
    window.open(`https://wa.me/919145855703?text=${encodeURIComponent(message)}`, '_blank');
  };

  // FAQ items
  const faqItems = [
    {
      question: "How do I submit my assignments?",
      answer: "You can submit your assignments at your Regional Centre or upload them on the IGNOU online portal if available for your program."
    },
    {
      question: "When will I receive my study materials?",
      answer: "Study materials are usually dispatched within 2-4 weeks after confirmation of admission. You can also access digital materials on eGyankosh."
    },
    {
      question: "How do I check my exam results?",
      answer: "You can check your results on the IGNOU website under the Student Zone > Results section by entering your enrollment number."
    },
    {
      question: "Can I change my program or courses after admission?",
      answer: "Yes, you can apply for program or course change within the specified period after admission. Contact your Regional Centre for details."
    }
  ];

  return (
    <section id="contact" className="page-section">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ignou-dark mb-2">Contact & Support</h2>
          <p className="text-gray-600">Get in touch with us for any queries or assistance</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-green-100 p-3 rounded-full mb-4">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">WhatsApp Support</h3>
              <p className="text-gray-600 mb-4">Get quick responses to your queries via WhatsApp</p>
              <Button onClick={contactWhatsApp} className="bg-[#25D366] hover:bg-[#128C7E] text-white">
                Chat on WhatsApp
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-blue-100 p-3 rounded-full mb-4">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">Send us an email for detailed inquiries</p>
              <Button asChild variant="outline">
                <a href="mailto:support@ignouhelphub.com">rks914585@gmail.com</a>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover-scale">
            <CardContent className="p-6 flex flex-col items-center text-center">
              <div className="bg-purple-100 p-3 rounded-full mb-4">
                <Phone className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-600 mb-4">Call us during business hours for immediate assistance</p>
              <Button asChild variant="outline">
                <a href="tel:+919876543210">+91 9145855703</a>
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="bg-ignou-light rounded-lg p-6 md:p-10">
          <div className="flex items-center mb-6">
            <AlertCircle className="h-6 w-6 text-ignou-purple mr-2" />
            <h3 className="text-2xl font-bold">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                <h4 className="text-lg font-medium mb-2">{item.question}</h4>
                <p className="text-gray-600">{item.answer}</p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 mb-4">Have more questions? Contact us directly!</p>
            <Button onClick={contactWhatsApp} className="bg-ignou-purple hover:bg-ignou-dark text-white">
              Get Support Now
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
