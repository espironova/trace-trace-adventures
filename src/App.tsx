import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes } from 'react-router-dom'
import Seo from "@/components/Seo";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./routes/Index.tsx";
import About from "./routes/About.tsx";
import Services from "./routes/Services.tsx";
import AirportTransfers from "./routes/AirportTransfers.tsx";
import SgrTransfers from "./routes/SgrTransfers.tsx";
import SafariTours from "./routes/SafariTours.tsx";
import CarHire from "./routes/CarHire.tsx";
import LongDistance from "./routes/LongDistance.tsx";
import CorporateTransport from "./routes/CorporateTransport.tsx";
import HotelTransfers from "./routes/HotelTransfers.tsx";
import SchoolsTransport from "./routes/SchoolsTransport.tsx";
import Fleet from "./routes/Fleet.tsx";
import Destinations from "./routes/Destinations.tsx";
import BlogsReviews from "./routes/BlogsReviews.tsx";
import BlogDetail from "./routes/BlogDetail.tsx";
import Contact from "./routes/Contact.tsx";
import NotFound from "./routes/NotFound.tsx";
import QrLanding from "./routes/QrLanding.tsx";
import Admin from "./routes/Admin.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      
        <Seo />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/airport-transfers" element={<AirportTransfers />} />
          <Route path="/services/sgr-transfers" element={<SgrTransfers />} />
          <Route path="/services/safari-tours" element={<SafariTours />} />
          <Route path="/services/car-hire" element={<CarHire />} />
          <Route path="/services/long-distance" element={<LongDistance />} />
          <Route path="/services/corporate-transport" element={<CorporateTransport />} />
          <Route path="/services/hotel-transfers" element={<HotelTransfers />} />
          <Route path="/services/schools-transport" element={<SchoolsTransport />} />
          <Route path="/fleet" element={<Fleet />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/blogs-reviews" element={<BlogsReviews />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/qr-code" element={<QrLanding />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
