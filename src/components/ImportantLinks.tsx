
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, BookOpen, GraduationCap, FileText, Award, Globe, MapPin, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchLinksFromSheet, SheetLink } from "@/utils/googleSheets";
import { useToast } from "@/hooks/use-toast";

// Default link data
import officialPortalsData from "@/data/officialPortals.json";
import academicResourcesData from "@/data/academicResources.json";
import examinationsData from "@/data/examinations.json";
import supportData from "@/data/supportData.json";

const ImportantLinks = () => {
  // State for link data
  const [officialPortals, setOfficialPortals] = useState(officialPortalsData);
  const [academicResources, setAcademicResources] = useState(academicResourcesData);
  const [examinations, setExaminations] = useState(examinationsData);
  const [support, setSupport] = useState(supportData);
  
  const [useSheetData, setUseSheetData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Function to get the appropriate icon component
  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'globe': return <Globe className="h-5 w-5" />;
      case 'graduationcap': return <GraduationCap className="h-5 w-5" />;
      case 'bookopen': return <BookOpen className="h-5 w-5" />;
      case 'filetext': return <FileText className="h-5 w-5" />;
      case 'award': return <Award className="h-5 w-5" />;
      case 'mappin': return <MapPin className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  // Fetch data from Google Sheets
  const fetchLinksData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Replace with your actual SheetDB API endpoint
      const sheetId = '1HGjBcS9RvqSAy0OZdTn8ZTTJITqT38y2D__oOlp_BWo';
      
      // Fetch data for each section
      const officialPortalsLinks = await fetchLinksFromSheet(sheetId, 'OfficialPortals');
      const academicResourcesLinks = await fetchLinksFromSheet(sheetId, 'AcademicResources');
      const examinationsLinks = await fetchLinksFromSheet(sheetId, 'Examinations');
      const supportLinks = await fetchLinksFromSheet(sheetId, 'Support');
      
      // Update state with fetched data
      setOfficialPortals(officialPortalsLinks);
      setAcademicResources(academicResourcesLinks);
      setExaminations(examinationsLinks);
      setSupport(supportLinks);
      
      toast({
        title: "Success!",
        description: "Latest links loaded from Google Sheets",
        duration: 3000,
      });
    } catch (error) {
      console.error('Error fetching links from Google Sheet:', error);
      setError("Failed to load links from Google Sheets. Using local data instead.");
      
      // Revert to default data
      setOfficialPortals(officialPortalsData);
      setAcademicResources(academicResourcesData);
      setExaminations(examinationsData);
      setSupport(supportData);
      
      toast({
        variant: "destructive",
        title: "Error loading links",
        description: "Failed to load from Google Sheets. Using local data instead.",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (useSheetData) {
      fetchLinksData();
    } else {
      // Use local JSON data
      setOfficialPortals(officialPortalsData);
      setAcademicResources(academicResourcesData);
      setExaminations(examinationsData);
      setSupport(supportData);
      setError(null);
    }
  }, [useSheetData]);

  const toggleDataSource = () => {
    setUseSheetData(prev => !prev);
  };

  // Important links categorized
  const linkCategories = [
    {
      title: "Official Portals",
      links: officialPortals
    },
    {
      title: "Academic Resources",
      links: academicResources
    },
    {
      title: "Examinations",
      links: examinations
    },
    {
      title: "Support",
      links: support
    },
  ];

  return (
    <section id="links" className="page-section bg-gray-50">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-ignou-dark mb-2">Important Links</h2>
          <p className="text-gray-600">Quick access to official IGNOU resources and portals</p>
          
          <Button 
            variant="outline" 
            onClick={toggleDataSource}
            className="flex items-center gap-2 mt-4 mb-6"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Loading..." : (useSheetData ? "Using Google Sheet Data" : "Using Local Data")}
          </Button>
          
          {error && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md text-left mb-6 max-w-xl mx-auto">
              <p className="text-sm text-amber-700">{error}</p>
            </div>
          )}
          
          {useSheetData && !error && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-left mb-6 max-w-xl mx-auto">
              <h4 className="font-bold text-blue-700 mb-1">Google Sheet Format</h4>
              <p className="text-sm text-blue-600 mb-2">
                To update links, use the following sheet names with these columns:
              </p>
              <ul className="list-disc ml-5 text-sm text-blue-600">
                <li><strong>OfficialPortals, AcademicResources, Examinations, Support sheets:</strong></li>
                <li><strong>title</strong>: Name of the link</li>
                <li><strong>description</strong>: Brief description</li>
                <li><strong>url</strong>: Complete URL</li>
                <li><strong>icon</strong>: Icon name (globe, fileText, etc.)</li>
              </ul>
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {linkCategories.map((category, index) => (
            <div key={index}>
              <h3 className="text-xl font-semibold mb-4 text-ignou-purple">{category.title}</h3>
              <div className="space-y-4">
                {category.links.map((link: any, linkIndex: number) => (
                  <Card key={linkIndex} className="hover:shadow-md transition-shadow duration-300">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex items-center">
                        <span className="bg-ignou-light p-2 rounded-full mr-3">
                          {getIconComponent(link.icon)}
                        </span>
                        {link.title}
                      </CardTitle>
                      <CardDescription>{link.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-0">
                      <a 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-ignou-purple hover:text-ignou-dark flex items-center text-sm font-medium"
                      >
                        Visit Website <ExternalLink className="ml-1 h-3 w-3" />
                      </a>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImportantLinks;
