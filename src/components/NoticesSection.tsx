import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ExternalLink, AlertTriangle } from "lucide-react";
import noticesData from "@/data/notices.json";
import { fetchNoticesFromSheet, SheetNotice } from "@/utils/googleSheets";
import { useToast } from "@/hooks/use-toast";

const NoticesSection = () => {
  const [notices, setNotices] = useState<SheetNotice[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNoticesFromGoogleSheet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const sheetId = 'c06f2b1d-b74e-4d08-9bc6-16224eab8b00';
      const data = await fetchNoticesFromSheet(sheetId);
      setNotices(data);
      toast({
        title: "Success!",
        description: "Latest notices loaded from Google Sheets",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching notices from Google Sheet:', error);
      setError("Failed to load data from Google Sheets. Showing local data instead.");
      setNotices(noticesData);
      toast({
        variant: "destructive",
        title: "Error loading data",
        description: "Failed to load from Google Sheets. Using local data instead.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNoticesFromGoogleSheet();
  }, []);

  return (
    <section id="notices" className="page-section bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-ignou-dark mb-2">Latest Notices & Updates</h2>
          <p className="text-gray-600 mb-4">Stay updated with the latest announcements from IGNOU</p>

          {error && (
            <div className="flex items-center justify-center gap-2 text-amber-600 mb-4">
              <AlertTriangle size={16} />
              <p className="text-sm">{error}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {notices.map((notice, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium 
                    ${notice.category === "Admission" ? "bg-blue-100 text-blue-700" : 
                    notice.category === "Examination" ? "bg-yellow-100 text-yellow-700" :
                    notice.category === "Assignment" ? "bg-green-100 text-green-700" :
                    "bg-purple-100 text-purple-700"}`}>
                    {notice.category}
                  </span>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-3 w-3 mr-1" />
                    {notice.date}
                  </div>
                </div>
                <CardTitle className="text-lg mt-2">{notice.title}</CardTitle>
                <CardDescription className="line-clamp-2">{notice.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button asChild variant="outline" className="w-full flex items-center justify-center text-ignou-purple hover:text-white">
                  <a href={notice.link} target="_blank" rel="noopener noreferrer">
                    <FileText className="h-4 w-4 mr-2" />
                    Read Full Notice
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="text-ignou-purple hover:bg-ignou-purple hover:text-white">
            <a href="https://ignou.ac.in/bulletinboard/announcements/latest/1" target="_blank" rel="noopener noreferrer" className="flex items-center">
              View All Notices
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NoticesSection;
