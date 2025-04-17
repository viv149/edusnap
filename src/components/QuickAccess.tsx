
import React from 'react';
import { 
  FileText, 
  Calendar, 
  Award, 
  Bell, 
  MessageSquare 
} from "lucide-react";
import { Button } from "@/components/ui/button";

const QuickAccess = () => {
  // WhatsApp contact function
  const contactWhatsApp = () => {
    window.open('https://wa.me/919145855703?text=Hi,%20I%20need%20help%20with%20my%20IGNOU%20assignment', '_blank');
  };

  // Quick access items with icons, text, and destinations
  const quickAccessItems = [
    {
      icon: <FileText className="h-6 w-6 mb-2" />,
      text: "Admission Notice",
      href: "https://ignou.ac.in/announcements",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: <Calendar className="h-6 w-6 mb-2" />,
      text: "Assignment Submission",
      href: "https://ignou.ac.in/userfiles/Assignment%20submission.pdf",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: <Bell className="h-6 w-6 mb-2" />,
      text: "Exam Notice",
      href: "https://ignou.ac.in/ignou/bulletinboard/announcements/latest/1",
      color: "bg-yellow-100 text-yellow-700"
    },
    {
      icon: <Award className="h-6 w-6 mb-2" />,
      text: "Results",
      href: "https://ignou.ac.in/ignou/studentzone/results/1",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: <MessageSquare className="h-6 w-6 mb-2" />,
      text: "WhatsApp Help",
      onClick: contactWhatsApp,
      color: "bg-green-100 text-green-700"
    },
  ];

  return (
    <section className="container px-4 py-10 -mt-10 relative z-10">
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {quickAccessItems.map((item, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`hover-scale flex flex-col items-center justify-center h-28 rounded-lg ${item.color}`}
              onClick={item.onClick}
              asChild={!item.onClick}
            >
              {item.onClick ? (
                <>
                  {item.icon}
                  <span className="text-sm font-medium text-center">{item.text}</span>
                </>
              ) : (
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center justify-center h-full w-full">
                  {item.icon}
                  <span className="text-sm font-medium text-center">{item.text}</span>
                </a>
              )}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
