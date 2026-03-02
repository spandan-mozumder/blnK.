import type { PropsWithChildren } from "react";
import { Navigate } from "react-router";
import { useAppSelector } from "@/store/hooks";

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AdminRoute = ({ children }: PropsWithChildren) => {
  const { user, loading } = useAppSelector((state) => state.auth);

  if (loading) return null;

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "admin" && user.role !== "seller") {
    return <Navigate to="/products" replace />;
  }

  return <>{children}</>;
};
