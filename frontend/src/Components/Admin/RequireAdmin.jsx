import { Navigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../LoadingSpinner";

const API = import.meta.env.VITE_API_URL;

const fetchCurrentAdmin = async () => {
  const res = await fetch(`${API}/api/admin/auth/me`, { credentials: "include" });
  if (!res.ok) throw new Error("Not authenticated");
  return res.json();
};

const RequireAdmin = ({ children }) => {
  const location = useLocation();

  const {
    data: admin,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["currentAdmin"],
    queryFn: fetchCurrentAdmin,
    retry: false,
    staleTime: Infinity,
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (isError || !admin) {
    return <Navigate to="/nexus-hq/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAdmin;
