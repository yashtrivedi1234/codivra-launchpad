import { Navigate, useLocation } from "react-router-dom";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

const RequireAdmin = ({ children }: Props) => {
  const location = useLocation();

  const token =
    typeof window !== "undefined"
      ? window.localStorage.getItem("admin_token")
      : null;

  // Allow access if token exists OR if it's development mode (demo access)
  const isDemoMode = import.meta.env.DEV;

  if (!token && !isDemoMode) {
    return (
      <Navigate
        to="/admin/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <>{children}</>;
};

export default RequireAdmin;


