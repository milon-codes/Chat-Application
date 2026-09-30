

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom"; // Outlet ইম্পোর্ট করুন
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";

const PublicRoute = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <Loader />; 
  }

  if (user) {
    return <Navigate to="/chat" replace />;
  }

  // এখানে children এর পরিবর্তে Outlet হবে
  return <Outlet />; 
};

export default PublicRoute;
