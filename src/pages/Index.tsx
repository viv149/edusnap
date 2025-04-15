
import React from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import QuickAccess from '@/components/QuickAccess';
import NoticesSection from '@/components/NoticesSection';
import AssignmentHelp from '@/components/AssignmentHelp';
import ImportantLinks from '@/components/ImportantLinks';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import StickyButtons from '@/components/StickyButtons';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <QuickAccess />
        <NoticesSection />
        <AssignmentHelp />
        <ImportantLinks />
        <ContactSection />
      </main>
      <Footer />
      <StickyButtons />
    </div>
  );
};

export default Index;
