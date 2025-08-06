import { Navigate } from "react-router-dom";
//import { auth } from "../config/firebase";
import type { ReactNode } from "react";
import { useAppSelector } from "../store/hooks";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles: ("user" | "admin" | "super-admin")[]; // restrictable
}

const PrivateRoute = ({ children, allowedRoles }: PrivateRouteProps) => {
  const { uid, role } = useAppSelector((state) => state.user);

  if (!uid) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
return <div className="text-red-600 text-center mt-10">You are not authorized to access this page.</div>;
  }

  return <>{children}</>;
};

export default PrivateRoute;