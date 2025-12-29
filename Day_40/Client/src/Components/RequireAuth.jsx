import React from "react";
import { useAuthContext } from "../Context/AuthContext";
import { Navigate } from "react-router-dom";

const RequireAuth = ({ children }) => {
  const { token,loading } = useAuthContext();

  if(loading) return <h2>Loading...</h2>

  if (!token) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
};

export default RequireAuth;
