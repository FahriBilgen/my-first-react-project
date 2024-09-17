import { Navigate } from "react-router-dom";
import { message } from "antd";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (!token) {
      message.error("Lütfen önce giriş yapınız!");
    }
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
