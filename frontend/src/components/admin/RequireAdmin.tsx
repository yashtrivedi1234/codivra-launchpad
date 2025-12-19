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

  if (!token) {
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


