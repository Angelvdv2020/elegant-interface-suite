import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import AdminRoute from "@/components/AdminRoute";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ServicesPage from "./pages/ServicesPage.tsx";
import RoutersPage from "./pages/RoutersPage.tsx";
import ToolsPage from "./pages/ToolsPage.tsx";
import RoutersOpenWrt from "./pages/RoutersOpenWrt.tsx";
import RoutersKeenetic from "./pages/RoutersKeenetic.tsx";
import VlessSetup from "./pages/VlessSetup.tsx";
import SetupHub from "./pages/SetupHub.tsx";
import FAQPage from "./pages/FAQPage.tsx";
import BlogPage from "./pages/BlogPage.tsx";
import BlogPostPage from "./pages/BlogPostPage.tsx";
import ChatPage from "./pages/ChatPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignupPage.tsx";
import ActivationPage from "./pages/ActivationPage.tsx";
import DashboardPage from "./pages/DashboardPage.tsx";
import TopupPage from "./pages/TopupPage.tsx";
import SettingsPage from "./pages/SettingsPage.tsx";
import PricingPage from "./pages/PricingPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import XrayGeneratorPage from "./pages/XrayGeneratorPage.tsx";
import ClashConvertorPage from "./pages/ClashConvertorPage.tsx";
import FeaturesPage from "./pages/FeaturesPage.tsx";
import ReferralPage from "./pages/ReferralPage.tsx";
import AppAndroidPage from "./pages/AppAndroidPage.tsx";
import AppWindowsPage from "./pages/AppWindowsPage.tsx";
import AppIOSPage from "./pages/AppIOSPage.tsx";
import AppMacOSPage from "./pages/AppMacOSPage.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/routers" element={<ProtectedRoute><RoutersPage /></ProtectedRoute>} />
              <Route path="/tools" element={<ToolsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/referral" element={<ReferralPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/activate" element={<ActivationPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
              <Route path="/dashboard/topup" element={<ProtectedRoute><TopupPage /></ProtectedRoute>} />
              <Route path="/dashboard/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
              <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
              <Route path="/setup" element={<SetupHub />} />
              <Route path="/setup/:platform" element={<SetupHub />} />
              <Route path="/routers/openwrt" element={<ProtectedRoute><RoutersOpenWrt /></ProtectedRoute>} />
              <Route path="/routers/keenetic" element={<ProtectedRoute><RoutersKeenetic /></ProtectedRoute>} />
              <Route path="/routers/vless-setup" element={<ProtectedRoute><VlessSetup /></ProtectedRoute>} />
              <Route path="/faq" element={<FAQPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/blog/:id" element={<BlogPostPage />} />
              <Route path="/tools/xray-generator" element={<XrayGeneratorPage />} />
              <Route path="/tools/clash-convertor" element={<ClashConvertorPage />} />
              <Route path="/apps/android" element={<AppAndroidPage />} />
              <Route path="/apps/windows" element={<AppWindowsPage />} />
              <Route path="/apps/ios" element={<AppIOSPage />} />
              <Route path="/apps/macos" element={<AppMacOSPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
