import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, FileText, ExternalLink, RefreshCw, AlertTriangle, Download } from "lucide-react";
import noticesData from "@/data/notices.json";
import { fetchNoticesFromSheet, SheetNotice } from "@/utils/googleSheets";
import { useToast } from "@/hooks/use-toast";

const NoticesSection = () => {
  const [notices, setNotices] = useState<SheetNotice[]>([]);
  const [loading, setLoading] = useState(false);
  const [useSheetData, setUseSheetData] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchNoticesFromGoogleSheet = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const URL = 'https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLjXlMWIoNXkv9b6Q2-id-FceUh10fumwUQThg43zuq6kuuSsqFW1_-jG8Yz69U8QqW1k3-RSSaetGw12D6Wb7rzoB6-Hvorw6pItfCtbxqNCWAMvrxXsPLavQzhYlQ3PVbeZLZDE9zQFc_71OtM-UTUTdKPKqGbo7ERnrC__Hwe6989u4tQbEx5lNqs5N3aW68fkAinau_J3kmG3B3W2yFzmHIA-TYWhdNeIy4pvasfq4R3WSMScubU6nOO1ukZSt4siR8HOfgWWzQW5ZE_Dj9WBpiTxVC7zvmpJOEo&lib=MaxfsNVxpVoW9bX8V-F9C9uAH1y8iT0Th';
      const data = await fetchNoticesFromSheet(URL);
      setNotices(data);
      
      toast({
        title: "Success!",
        description: "Latest notices loaded from Google Sheets",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching notices from Google Sheet:', error);
      setError("Failed to load data from Google Sheets. Using local data instead.");
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

  const handleDownloadCSV = () => {
    const headers = ['category', 'title', 'date', 'description', 'link'];
    const csvContent = [
      headers.join(','),
      ...notices.map(notice => [
        notice.category,
        `"${notice.title.replace(/"/g, '""')}"`,
        notice.date,
        `"${notice.description.replace(/"/g, '""')}"`,
        notice.link
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'ignou_notices.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (useSheetData) {
      fetchNoticesFromGoogleSheet();
    } else {
      setNotices(noticesData);
      setError(null);
    }
  }, [useSheetData]);

  const toggleDataSource = () => {
    setUseSheetData(prev => !prev);
  };

  return (
    <section id="notices" className="page-section bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-ignou-dark mb-2">Latest Notices & Updates</h2>
          <p className="text-gray-600 mb-4">Stay updated with the latest announcements from IGNOU</p>
          {/* <div className="flex items-center justify-center gap-4 mb-6">
            <Button 
              variant="outline" 
              onClick={toggleDataSource}
              className="flex items-center gap-2"
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
              {loading ? "Loading..." : (useSheetData ? "Using Google Sheet Data" : "Using Local Data")}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleDownloadCSV}
              className="flex items-center gap-2"
              disabled={loading || notices.length === 0}
            >
              <Download className="h-4 w-4" />
              Download Notices Sheet
            </Button>
          </div> */}
          
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
                <Button 
                  asChild 
                  variant="outline" 
                  className="w-full flex items-center justify-center bg-white hover:bg-ignou-purple hover:text-white transition-colors"
                >
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
          <Button 
            asChild 
            variant="outline" 
            className="text-ignou-purple hover:bg-ignou-purple hover:text-white transition-colors"
          >
            <a 
              href="https://www.ignou.ac.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center"
            >
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
