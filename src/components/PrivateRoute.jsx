import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Loader from "./Loader";


const PrivateRoute = () => {
  const { user, loading } = useContext(AuthContext);

  
  if (loading) {
    return <Loader/>
  }

  if (user) {
  return <Outlet />;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;

