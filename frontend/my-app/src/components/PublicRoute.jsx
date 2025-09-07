import { Navigate } from "react-router-dom";
import useAuthUser from "../hooks/useAuthUser";

const PublicRoute = ({ children }) => {
  const { authUser, isLoading } = useAuthUser();

  if (isLoading) return null;

  if (authUser) {
    // إذا مسجل الدخول بالفعل، اذهب للصفحة الرئيسية
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
