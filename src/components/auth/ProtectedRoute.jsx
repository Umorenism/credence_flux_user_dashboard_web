import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/get-started" replace />; // redirect if no token
  }
  return <Outlet />; // render child routes if token exists
}
