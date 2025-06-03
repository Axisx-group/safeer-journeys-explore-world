
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
    <div className="min-h-screen bg-white w-full overflow-x-hidden">
      <Navbar />
      
      {/* Main content with proper responsive layout */}
      <div className="w-full max-w-full">
        <div className="w-full overflow-x-hidden">
          <Hero />
        </div>
        
        {/* Unified Search Section */}
        <div className="relative w-full overflow-x-hidden">
          <UnifiedSearchSection />
        </div>
        
        <div className="w-full overflow-x-hidden">
          <AIAssistantSection 
            showAIAssistant={showAIAssistant}
            setShowAIAssistant={setShowAIAssistant}
          />
        </div>

        <div className="w-full overflow-x-hidden">
          <TravelOffersSections />
        </div>

        {/* Advanced Features with proper spacing */}
        <div className="space-y-0 bg-gray-50 w-full overflow-x-hidden">
          
        </div>

        <div className="w-full overflow-x-hidden">
          <MainContentSections />
        </div>

        <div className="w-full overflow-x-hidden">
          <Footer />
        </div>
        
        <div className="w-full overflow-x-hidden">
          <ChatInterfaces />
        </div>
      </div>
    </div>
  );
};

export default Index;
