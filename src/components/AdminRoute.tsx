import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { ReactNode } from "react";

const AdminRoute = ({ children }: { children: ReactNode }) => {
  const { user, token } = useAuth();
  if (!token) return <Navigate to="/login" replace />;
  if (user && user.role !== "admin" && user.role !== "superadmin") return <Navigate to="/dashboard" replace />;
  return <>{children}</>;
};

export default AdminRoute;
