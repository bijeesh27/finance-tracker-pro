import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  // Change "token" to "user" to match your Login component
  const isAuthenticated = localStorage.getItem("user"); 
  
  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

export const PublicRoute = ({ children }) => {
  // Change "token" to "user" to match your Login component
  const isAuthenticated = localStorage.getItem("user");
  
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
};