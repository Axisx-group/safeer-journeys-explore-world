
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import UnifiedSearchSection from "@/components/UnifiedSearchSection";
import AIAssistantSection from "@/components/home/AIAssistantSection";
import TravelOffersSections from "@/components/home/TravelOffersSections";
import MainContentSections from "@/components/home/MainContentSections";
import Footer from "@/components/Footer";
import ChatInterfaces from "@/components/home/ChatInterfaces";
import { useState } from "react";

const Index = () => {
  const [showAIAssistant, setShowAIAssistant] = useState(false);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />
      
      {/* Main content with proper top spacing */}
      <div className="w-full">
        <Hero />
        
        {/* Unified Search Section */}
        <div className="relative">
          <UnifiedSearchSection />
        </div>
        
        <AIAssistantSection 
          showAIAssistant={showAIAssistant}
          setShowAIAssistant={setShowAIAssistant}
        />

        <TravelOffersSections />

        {/* Advanced Features with proper spacing */}
        <div className="space-y-0 bg-gray-50">
          
        </div>

        <MainContentSections />

        <Footer />
        
        <ChatInterfaces />
      </div>
    </div>
  );
};

export default Index;
