
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { Header } from "@/components/Header";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Products from "./pages/Products";
import VerifyPrescription from "./pages/Prescriptions";
import Prescriptions from "./pages/per";
import PaymentPage from "./pages/pay";
import Checkout from "./pages/Checkout";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookConsultation from "./components/BookConsultation";
import ChatBot from "./pages/ChatBot";
import VerificationStatus from "./pages/Verificationstatus";
import ConsultationsList from "./pages/ConsultationsList ";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";

const App = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div className="min-h-screen bg-gray-50">
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/About" element={<About/>}/>
              <Route path="/Contact" element={<Contact/>}/>
              <Route path="/auth" element={<Auth />} />
              <Route path="/products" element={<Products />} />
              <Route path="/prescriptions" element={<VerifyPrescription />} />
              <Route path="/per" element={<Prescriptions/>}/>
              <Route path="/pay" element={<PaymentPage/>}/>
              <Route path="/Checkout" element={<Checkout/>}/>
              <Route path="/BookConsultation" element={<BookConsultation/>}/>
              <Route path="/Verificationstatus" element={<VerificationStatus/>}/>
              <Route path="/ConsultationsList" element={<ConsultationsList/>}/>
              <Route path="/Dashboard" element={<Dashboard/>}/>
              <Route path="/admin-dashboard" element={<AdminDashboard/>}/>
            </Routes>
            <ChatBot />
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
