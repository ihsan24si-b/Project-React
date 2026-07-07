import { Navigate, useLocation } from "react-router-dom";

function getUser() {
  if (typeof window === "undefined") return null;
  try {
    return JSON.parse(window.localStorage.getItem("user"));
  } catch {
    return null;
  }
}

export function RequireAuth({ children }) {
  const user = getUser();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}

export function RequireAdmin({ children }) {
  const user = getUser();
  const location = useLocation();

  if (!user || user.role !== "admin") {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
}
