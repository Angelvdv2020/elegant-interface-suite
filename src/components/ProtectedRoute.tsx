import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

export default ProtectedRoute;
