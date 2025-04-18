
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ExternalLink, BookOpen, GraduationCap, FileText, Award, Globe, MapPin, RefreshCw, Radio, Tv, Headphones, Monitor, Book, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fetchLinksFromSheet } from "@/utils/googleSheets";
import { useToast } from "@/hooks/use-toast";

// Default link data
import officialPortalsData from "@/data/officialPortals.json";
import academicResourcesData from "@/data/academicResources.json";
import examinationsData from "@/data/examinations.json";
import supportData from "@/data/supportData.json";

const ImportantLinks = () => {
  const [officialPortals, setOfficialPortals] = useState(officialPortalsData);
  const [academicResources, setAcademicResources] = useState(academicResourcesData);
  const [examinations, setExaminations] = useState(examinationsData);
  const [support, setSupport] = useState(supportData);
  const [activeTab, setActiveTab] = useState("official");
  
  const [useSheetData, setUseSheetData] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const getIconComponent = (iconName: string) => {
    switch (iconName?.toLowerCase()) {
      case 'globe': return <Globe className="h-5 w-5" />;
      case 'graduationcap': return <GraduationCap className="h-5 w-5" />;
      case 'book': return <Book className="h-5 w-5" />;
      case 'filetext': return <FileText className="h-5 w-5" />;
      case 'award': return <Award className="h-5 w-5" />;
      case 'mappin': return <MapPin className="h-5 w-5" />;
      case 'radio': return <Radio className="h-5 w-5" />;
      case 'tv': return <Tv className="h-5 w-5" />;
      case 'headphones': return <Headphones className="h-5 w-5" />;
      case 'monitor': return <Monitor className="h-5 w-5" />;
      case 'user': return <User className="h-5 w-5" />;
      default: return <Globe className="h-5 w-5" />;
    }
  };

  const fetchLinksData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const sheetId = '1HGjBcS9RvqSAy0OZTTn8ZTTJITqT38y2D__oOlp_BWo';
      
      const officialPortalsLinks = await fetchLinksFromSheet(sheetId, 'OfficialPortals');
      const academicResourcesLinks = await fetchLinksFromSheet(sheetId, 'AcademicResources');
      const examinationsLinks = await fetchLinksFromSheet(sheetId, 'Examinations');
      const supportLinks = await fetchLinksFromSheet(sheetId, 'Support');
      
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

  return (
    <section id="links" className="page-section bg-gray-50">
      <div className="container px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-ignou-dark mb-2">Important Links</h2>
          <p className="text-gray-600 mb-6">Quick access to official IGNOU resources and portals</p>
          
          <Button 
            variant="outline" 
            onClick={toggleDataSource}
            className="flex items-center gap-2 mb-6"
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            {loading ? "Loading..." : (useSheetData ? "Using Google Sheet Data" : "Using Local Data")}
          </Button>

          {useSheetData && !error && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-md text-left mb-6 max-w-xl mx-auto">
              <h4 className="font-bold text-blue-700 mb-1">Google Sheet Format</h4>
              <p className="text-sm text-blue-600 mb-2">
                To update links, use the following columns in your Google Sheet:
              </p>
              <ul className="list-disc ml-5 text-sm text-blue-600">
                <li><strong>icon</strong>: globe, graduationcap, book, filetext, award, mappin, radio, tv, headphones, monitor, user</li>
                <li><strong>title</strong>: The link title</li>
                <li><strong>description</strong>: A brief description</li>
                <li><strong>url</strong>: Full URL to the website</li>
              </ul>
              <p className="text-sm text-blue-600 mt-2">
                <a 
                  href="https://docs.google.com/spreadsheets/d/1HGjBcS9RvqSAy0OZTTn8ZTTJITqT38y2D__oOlp_BWo/copy" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold underline"
                >
                  Click here
                </a> to make a copy of the template Google Sheet
              </p>
            </div>
          )}

          {error && (
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-md text-left mb-6 max-w-xl mx-auto">
              <p className="text-sm text-amber-700">{error}</p>
            </div>
          )}
        </div>

        <Tabs defaultValue="official" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
            <TabsTrigger value="official">Official Portals</TabsTrigger>
            <TabsTrigger value="academic">Academic Resources</TabsTrigger>
            <TabsTrigger value="examinations">Examinations</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          <TabsContent value="official" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {officialPortals.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
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
          </TabsContent>

          <TabsContent value="academic" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {academicResources.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
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
          </TabsContent>

          <TabsContent value="examinations" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {examinations.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
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
          </TabsContent>

          <TabsContent value="support" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {support.map((link, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow duration-300">
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
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ImportantLinks;
