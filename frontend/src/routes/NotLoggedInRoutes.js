import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const NotLoggedInRoutes = () => {

  const { user } = useSelector((state) => ({ ...state }));
  
  return user ? <Navigate to="/" /> : <Outlet />;
};
