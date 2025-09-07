import { Navigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const PrivateRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return null; 

  if (!authUser) {

    return <Navigate to="/login" replace />;
  }

  return children; 
};

export default PrivateRoute;
