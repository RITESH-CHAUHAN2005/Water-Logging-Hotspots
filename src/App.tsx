import { useEffect } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext"; // Import AuthProvider
import MapPage from "./pages/MapPage";
import Analytics from "./pages/Analytics";
import Wards from "./pages/Wards";
import Alerts from "./pages/Alerts";
import Login from "./pages/Login";
import WardAdminLogin from "./pages/WardAdminLogin";
import SuperAdminLogin from "./pages/SuperAdminLogin";
import FieldWorkerLogin from "./pages/FieldWorkerLogin";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import WardAdminDashboard from "./pages/WardAdminDashboard";
import SuperAdminDashboard from "./pages/SuperAdminDashboard";
import FieldWorkerDashboard from "./pages/FieldWorkerDashboard";
import FieldWorkerAnalytics from "./pages/FieldWorkerAnalytics";
import LandingPage from "./pages/LandingPage";
import NotFound from "./pages/NotFound";
import { wards } from "@/data/mockData";

const queryClient = new QueryClient();

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}

// Ward Admin-only Route Component
function WardAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'ward_admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Super Admin-only Route Component
function SuperAdminRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (user?.role !== 'super_admin') {
    return <Navigate to="/" replace />;
  }
  
  return <>{children}</>;
}

// Dashboard Redirect based on role - For authenticated users only
function DashboardRedirect() {
  const { user, isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }
  
  // If not authenticated, show landing page
  if (!isAuthenticated) {
    return <LandingPage />;
  }
  
  if (user?.role === 'super_admin') {
    return <Navigate to="/super-admin-dashboard" replace />;
  }
  
  if (user?.role === 'ward_admin') {
    return <Navigate to="/ward-admin-dashboard" replace />;
  }
  
  return <Navigate to="/user-dashboard" replace />;
}

function App() {
  useEffect(() => {
    const existingWardsData = localStorage.getItem('wardsData');
    
    if (!existingWardsData) {
      localStorage.setItem('wardsData', JSON.stringify(wards));
      console.log('✅ Wards data initialized');
    } else {
      try {
        const parsed = JSON.parse(existingWardsData);
        if (!Array.isArray(parsed) || parsed.length !== wards.length) {
          localStorage.setItem('wardsData', JSON.stringify(wards));
          console.log('✅ Wards data updated');
        }
      } catch (error) {
        localStorage.setItem('wardsData', JSON.stringify(wards));
        console.log('✅ Wards data reinitialized');
      }
    }

    const existingHotspots = localStorage.getItem('markedHotspots');
    if (!existingHotspots) {
      localStorage.setItem('markedHotspots', JSON.stringify([]));
      console.log('✅ Hotspots storage initialized');
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <HelmetProvider>
        <ThemeProvider>
          <AuthProvider> {/* Wrap with AuthProvider */}
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<DashboardRedirect />} />
                  
                  {/* Role-specific login routes */}
                  <Route path="/login" element={<Login />} />
                  <Route path="/ward/login" element={<WardAdminLogin />} />
                  <Route path="/admin/login" element={<SuperAdminLogin />} />
                  <Route path="/field-worker/login" element={<FieldWorkerLogin />} />
                  
                  <Route path="/register" element={<Register />} />
                  
                  {/* Dashboard routes */}
                  <Route path="/user-dashboard" element={<ProtectedRoute><UserDashboard /></ProtectedRoute>} />
                  <Route path="/ward-admin-dashboard" element={<WardAdminRoute><WardAdminDashboard /></WardAdminRoute>} />
                  <Route path="/super-admin-dashboard" element={<SuperAdminRoute><SuperAdminDashboard /></SuperAdminRoute>} />
                  <Route path="/field-worker" element={<ProtectedRoute><FieldWorkerDashboard /></ProtectedRoute>} />
                  <Route path="/field-worker/analytics" element={<ProtectedRoute><FieldWorkerAnalytics /></ProtectedRoute>} />
                  
                  {/* Feature routes */}
                  <Route path="/map" element={<ProtectedRoute><MapPage /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                  <Route path="/wards" element={<ProtectedRoute><Wards /></ProtectedRoute>} />
                  <Route path="/alerts" element={<ProtectedRoute><Alerts /></ProtectedRoute>} />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </AuthProvider>
        </ThemeProvider>
      </HelmetProvider>
    </QueryClientProvider>
  );
}

export default App;
