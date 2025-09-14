import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Payment from "./pages/Payment";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  // Initialize demo user if not exists
  const initializeDemoUser = () => {
    const users = JSON.parse(localStorage.getItem('samanyay_users') || '[]');
    const demoUser = users.find((u: any) => u.email === 'demo@lawfirm.com');
    
    if (!demoUser) {
      const newDemoUser = {
        id: 'demo-user',
        firstName: 'Demo',
        lastName: 'User',
        email: 'demo@lawfirm.com',
        password: 'demo123',
        isPro: false,
        createdAt: new Date().toISOString()
      };
      users.push(newDemoUser);
      localStorage.setItem('samanyay_users', JSON.stringify(users));
    }
  };

  // Initialize demo data on app start
  React.useEffect(() => {
    initializeDemoUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/upgrade" element={<Payment />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
