
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import BookingPage from "./pages/BookingPage";
import SupportPage from "./pages/SupportPage";
import ServicesPage from "./pages/ServicesPage";
import PaymentPage from "./pages/PaymentPage";
import AboutPage from "./pages/AboutPage";
import OffersPage from "./pages/OffersPage";
import AdminPage from "./pages/AdminPage";
import PackageDetailsPage from "./pages/PackageDetailsPage";
import DestinationDetailsPage from "./pages/DestinationDetailsPage";
import HotelsPage from "./pages/HotelsPage";
import CarRentalPage from "./pages/CarRentalPage";
import CurrencyExchangePage from "./pages/CurrencyExchangePage";
import FAQPage from "./pages/FAQPage";
import ManageTripsPage from "./pages/ManageTripsPage";
import CustomerServicePage from "./pages/CustomerServicePage";
import SafetyInfoPage from "./pages/SafetyInfoPage";
import TermsPage from "./pages/TermsPage";
import PrivacyPage from "./pages/PrivacyPage";
import CookieSettingsPage from "./pages/CookieSettingsPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/offers" element={<OffersPage />} />
            <Route path="/support" element={<SupportPage />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/hotels" element={<HotelsPage />} />
            <Route path="/car-rental" element={<CarRentalPage />} />
            <Route path="/currency-exchange" element={<CurrencyExchangePage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/manage-trips" element={<ManageTripsPage />} />
            <Route path="/customer-service" element={<CustomerServicePage />} />
            <Route path="/safety-info" element={<SafetyInfoPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/cookie-settings" element={<CookieSettingsPage />} />
            <Route path="/package/:id" element={<PackageDetailsPage />} />
            <Route path="/destination/:id" element={<DestinationDetailsPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
